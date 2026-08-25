import "fake-indexeddb/auto";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  COLLECTION_DB_NAME,
  CollectionStorageError,
  getAllCollectionRecords,
  getCollectionRecord,
  hasCollectionRecord,
  saveCollectionRecordOnce,
  type CollectionRecord,
} from "@/lib/browser/collection-db";

const indexedDbFactory = globalThis.indexedDB;

function record(
  placeId: CollectionRecord["placeId"],
  acquiredAt = "2026-08-25T04:00:00.000Z",
  photoBytes: number[] = [1, 2, 3],
): CollectionRecord {
  const photoMimeType = "image/webp";

  return {
    placeId,
    acquiredAt,
    photoBlob: new Blob([new Uint8Array(photoBytes)], {
      type: photoMimeType,
    }),
    photoMimeType,
  };
}

function deleteDatabase(): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = indexedDbFactory.deleteDatabase(COLLECTION_DB_NAME);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
    request.onblocked = () => reject(new Error("테스트 DB 삭제가 차단됐습니다."));
  });
}

beforeEach(async () => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  await deleteDatabase();
});

afterEach(async () => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  await deleteDatabase();
});

describe("collection IndexedDB", () => {
  it("Blob을 포함한 최초 기록을 저장하고 새 연결에서 다시 읽는다", async () => {
    const firstRecord = record("library");
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    const saved = await saveCollectionRecordOnce(firstRecord);
    const loaded = await getCollectionRecord("library");

    expect(saved.status).toBe("created");
    expect(loaded?.placeId).toBe(firstRecord.placeId);
    expect(loaded?.acquiredAt).toBe(firstRecord.acquiredAt);
    expect(loaded?.photoMimeType).toBe("image/webp");
    expect(await loaded?.photoBlob.arrayBuffer()).toEqual(
      new Uint8Array([1, 2, 3]).buffer,
    );
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("같은 장소를 다시 저장해도 최초 사진과 획득일을 교체하지 않는다", async () => {
    const original = record("language-center");
    const replacement = record(
      "language-center",
      "2026-08-25T05:00:00.000Z",
      [9, 9, 9],
    );

    await saveCollectionRecordOnce(original);
    const duplicate = await saveCollectionRecordOnce(replacement);
    const loaded = await getCollectionRecord("language-center");

    expect(duplicate.status).toBe("existing");
    expect(duplicate.record.acquiredAt).toBe(original.acquiredAt);
    expect(await duplicate.record.photoBlob.arrayBuffer()).toEqual(
      new Uint8Array([1, 2, 3]).buffer,
    );
    expect(loaded?.acquiredAt).toBe(original.acquiredAt);
    expect(await loaded?.photoBlob.arrayBuffer()).toEqual(
      new Uint8Array([1, 2, 3]).buffer,
    );
  });

  it("동시에 같은 장소를 저장해도 하나만 생성한다", async () => {
    const first = record("industry-center");
    const second = record(
      "industry-center",
      "2026-08-25T06:00:00.000Z",
      [7, 8, 9],
    );

    const results = await Promise.all([
      saveCollectionRecordOnce(first),
      saveCollectionRecordOnce(second),
    ]);
    const loaded = await getCollectionRecord("industry-center");

    expect(results.map(({ status }) => status).sort()).toEqual([
      "created",
      "existing",
    ]);
    expect(loaded?.acquiredAt).toBe(first.acquiredAt);
    expect(await loaded?.photoBlob.arrayBuffer()).toEqual(
      new Uint8Array([1, 2, 3]).buffer,
    );
  });

  it("세 장소의 존재 여부와 전체 기록을 조회한다", async () => {
    await Promise.all([
      saveCollectionRecordOnce(record("library")),
      saveCollectionRecordOnce(record("language-center")),
      saveCollectionRecordOnce(record("industry-center")),
    ]);

    expect(await hasCollectionRecord("library")).toBe(true);
    expect((await getAllCollectionRecords()).map(({ placeId }) => placeId).sort())
      .toEqual(["industry-center", "language-center", "library"]);
  });

  it("지원되지 않는 환경에서는 명시적인 실패를 반환한다", async () => {
    vi.stubGlobal("indexedDB", undefined);

    await expect(getCollectionRecord("library")).rejects.toMatchObject({
      name: "CollectionStorageError",
      code: "UNAVAILABLE",
    });
  });

  it("저장 공간 초과를 성공으로 처리하지 않는다", async () => {
    vi.spyOn(IDBObjectStore.prototype, "add").mockImplementation(() => {
      throw new DOMException("저장 공간 초과", "QuotaExceededError");
    });

    await expect(
      saveCollectionRecordOnce(record("library")),
    ).rejects.toMatchObject({
      name: "CollectionStorageError",
      code: "QUOTA_EXCEEDED",
    });
    await expect(hasCollectionRecord("library")).resolves.toBe(false);
  });

  it("잘못된 레코드는 저장 성공으로 처리하지 않는다", async () => {
    const invalid = {
      ...record("library"),
      photoMimeType: "text/plain",
    } as CollectionRecord;

    await expect(saveCollectionRecordOnce(invalid)).rejects.toBeInstanceOf(
      CollectionStorageError,
    );
    await expect(hasCollectionRecord("library")).resolves.toBe(false);
  });
});
