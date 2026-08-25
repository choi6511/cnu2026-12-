import { isPlaceId, type PlaceId } from "@/data/places";

export const COLLECTION_DB_NAME = "chacha-campus";
export const COLLECTION_STORE_NAME = "collection";

const COLLECTION_DB_VERSION = 1;

export type CollectionRecord = Readonly<{
  placeId: PlaceId;
  acquiredAt: string;
  photoBlob: Blob;
  photoMimeType: string;
}>;

export type CollectionStorageErrorCode =
  | "UNAVAILABLE"
  | "OPEN_FAILED"
  | "READ_FAILED"
  | "WRITE_FAILED"
  | "QUOTA_EXCEEDED"
  | "INVALID_RECORD";

export class CollectionStorageError extends Error {
  readonly code: CollectionStorageErrorCode;
  readonly cause?: unknown;

  constructor(
    code: CollectionStorageErrorCode,
    message: string,
    cause?: unknown,
  ) {
    super(message);
    this.name = "CollectionStorageError";
    this.code = code;
    this.cause = cause;
  }
}

export type SaveCollectionRecordResult =
  | Readonly<{ status: "created"; record: CollectionRecord }>
  | Readonly<{ status: "existing"; record: CollectionRecord }>;

function errorName(error: unknown): string | undefined {
  if (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    typeof error.name === "string"
  ) {
    return error.name;
  }

  return undefined;
}

function storageError(
  fallbackCode: CollectionStorageErrorCode,
  message: string,
  cause?: unknown,
): CollectionStorageError {
  if (cause instanceof CollectionStorageError) {
    return cause;
  }

  if (errorName(cause) === "QuotaExceededError") {
    return new CollectionStorageError(
      "QUOTA_EXCEEDED",
      "기기 저장 공간이 부족해 사진을 저장하지 못했습니다.",
      cause,
    );
  }

  return new CollectionStorageError(fallbackCode, message, cause);
}

function getIndexedDbFactory(): IDBFactory {
  if (typeof globalThis.indexedDB === "undefined") {
    throw new CollectionStorageError(
      "UNAVAILABLE",
      "이 브라우저에서는 도감 저장소를 사용할 수 없습니다.",
    );
  }

  return globalThis.indexedDB;
}

function openCollectionDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    let request: IDBOpenDBRequest;

    try {
      request = getIndexedDbFactory().open(
        COLLECTION_DB_NAME,
        COLLECTION_DB_VERSION,
      );
    } catch (error) {
      reject(
        storageError(
          "OPEN_FAILED",
          "도감 저장소를 열지 못했습니다.",
          error,
        ),
      );
      return;
    }

    let settled = false;

    request.onupgradeneeded = () => {
      const database = request.result;

      if (!database.objectStoreNames.contains(COLLECTION_STORE_NAME)) {
        database.createObjectStore(COLLECTION_STORE_NAME, {
          keyPath: "placeId",
        });
      }
    };

    request.onsuccess = () => {
      const database = request.result;

      if (settled) {
        database.close();
        return;
      }

      settled = true;
      database.onversionchange = () => database.close();
      resolve(database);
    };

    request.onerror = () => {
      if (settled) {
        return;
      }

      settled = true;
      reject(
        storageError(
          "OPEN_FAILED",
          "도감 저장소를 열지 못했습니다.",
          request.error,
        ),
      );
    };

    request.onblocked = () => {
      if (settled) {
        return;
      }

      settled = true;
      reject(
        new CollectionStorageError(
          "OPEN_FAILED",
          "다른 탭에서 도감 저장소를 사용 중입니다. 다른 탭을 닫고 다시 시도해 주세요.",
        ),
      );
    };
  });
}

function isCollectionRecord(value: unknown): value is CollectionRecord {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const record = value as Partial<CollectionRecord>;

  return (
    typeof record.placeId === "string" &&
    isPlaceId(record.placeId) &&
    typeof record.acquiredAt === "string" &&
    record.acquiredAt.length > 0 &&
    !Number.isNaN(Date.parse(record.acquiredAt)) &&
    record.photoBlob instanceof Blob &&
    typeof record.photoMimeType === "string" &&
    record.photoMimeType.startsWith("image/") &&
    record.photoBlob.type === record.photoMimeType
  );
}

function assertCollectionRecord(value: unknown): asserts value is CollectionRecord {
  if (!isCollectionRecord(value)) {
    throw new CollectionStorageError(
      "INVALID_RECORD",
      "도감 기록 형식이 올바르지 않습니다.",
    );
  }
}

async function readFromCollectionStore<T>(
  makeRequest: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  const database = await openCollectionDatabase();

  return new Promise((resolve, reject) => {
    let result: T;
    let transaction: IDBTransaction;

    try {
      transaction = database.transaction(COLLECTION_STORE_NAME, "readonly");
      const request = makeRequest(
        transaction.objectStore(COLLECTION_STORE_NAME),
      );

      request.onsuccess = () => {
        result = request.result;
      };

      request.onerror = () => {
        reject(
          storageError(
            "READ_FAILED",
            "도감 기록을 읽지 못했습니다.",
            request.error,
          ),
        );
      };
    } catch (error) {
      database.close();
      reject(
        storageError(
          "READ_FAILED",
          "도감 기록을 읽지 못했습니다.",
          error,
        ),
      );
      return;
    }

    transaction.oncomplete = () => {
      database.close();
      resolve(result);
    };

    transaction.onerror = () => {
      database.close();
      reject(
        storageError(
          "READ_FAILED",
          "도감 기록을 읽지 못했습니다.",
          transaction.error,
        ),
      );
    };

    transaction.onabort = () => {
      database.close();
      reject(
        storageError(
          "READ_FAILED",
          "도감 기록 읽기가 중단되었습니다.",
          transaction.error,
        ),
      );
    };
  });
}

export async function getCollectionRecord(
  placeId: PlaceId,
): Promise<CollectionRecord | undefined> {
  const value = await readFromCollectionStore<unknown>((store) =>
    store.get(placeId),
  );

  if (typeof value === "undefined") {
    return undefined;
  }

  assertCollectionRecord(value);
  return value;
}

export async function getAllCollectionRecords(): Promise<CollectionRecord[]> {
  const values = await readFromCollectionStore<unknown[]>((store) =>
    store.getAll(),
  );

  return values.map((value) => {
    assertCollectionRecord(value);
    return value;
  });
}

export async function hasCollectionRecord(placeId: PlaceId): Promise<boolean> {
  const key = await readFromCollectionStore<IDBValidKey | undefined>((store) =>
    store.getKey(placeId),
  );

  return typeof key !== "undefined";
}

export async function saveCollectionRecordOnce(
  record: CollectionRecord,
): Promise<SaveCollectionRecordResult> {
  assertCollectionRecord(record);
  const database = await openCollectionDatabase();

  return new Promise((resolve, reject) => {
    let transaction: IDBTransaction;
    let result: SaveCollectionRecordResult | undefined;

    try {
      transaction = database.transaction(COLLECTION_STORE_NAME, "readwrite");
      const store = transaction.objectStore(COLLECTION_STORE_NAME);
      const addRequest = store.add(record);

      addRequest.onsuccess = () => {
        result = { status: "created", record };
      };

      addRequest.onerror = (event) => {
        if (errorName(addRequest.error) !== "ConstraintError") {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        const existingRequest = store.get(record.placeId);
        existingRequest.onsuccess = () => {
          try {
            assertCollectionRecord(existingRequest.result);
            result = { status: "existing", record: existingRequest.result };
          } catch (error) {
            reject(error);
            transaction.abort();
          }
        };
      };
    } catch (error) {
      database.close();
      reject(
        storageError(
          "WRITE_FAILED",
          "도감 기록을 저장하지 못했습니다.",
          error,
        ),
      );
      return;
    }

    transaction.oncomplete = () => {
      database.close();

      if (result) {
        resolve(result);
        return;
      }

      reject(
        new CollectionStorageError(
          "WRITE_FAILED",
          "저장 결과를 확인하지 못했습니다.",
        ),
      );
    };

    transaction.onerror = () => {
      database.close();
      reject(
        storageError(
          "WRITE_FAILED",
          "도감 기록을 저장하지 못했습니다.",
          transaction.error,
        ),
      );
    };

    transaction.onabort = () => {
      database.close();
      reject(
        storageError(
          "WRITE_FAILED",
          "도감 기록 저장이 중단되었습니다.",
          transaction.error,
        ),
      );
    };
  });
}
