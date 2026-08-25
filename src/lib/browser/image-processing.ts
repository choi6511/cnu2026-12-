export const MAX_PHOTO_EDGE = 1280;
export const PHOTO_COMPRESSION_QUALITY = 0.75;
export const COMPRESSED_PHOTO_MIME_TYPE = "image/webp";

const SUPPORTED_INPUT_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export type ImageProcessingErrorCode =
  | "EMPTY_FILE"
  | "UNSUPPORTED_TYPE"
  | "DECODE_FAILED"
  | "CANVAS_UNAVAILABLE"
  | "ENCODE_FAILED";

export class ImageProcessingError extends Error {
  readonly code: ImageProcessingErrorCode;
  readonly cause?: unknown;

  constructor(
    code: ImageProcessingErrorCode,
    message: string,
    cause?: unknown,
  ) {
    super(message);
    this.name = "ImageProcessingError";
    this.code = code;
    this.cause = cause;
  }
}

export type CompressedPhoto = Readonly<{
  blob: Blob;
  height: number;
  mimeType: typeof COMPRESSED_PHOTO_MIME_TYPE;
  width: number;
}>;

export function validateImageFile(file: Pick<File, "size" | "type">): void {
  if (file.size <= 0) {
    throw new ImageProcessingError(
      "EMPTY_FILE",
      "내용이 없는 파일은 사용할 수 없습니다. 다른 사진을 선택해 주세요.",
    );
  }

  if (!SUPPORTED_INPUT_TYPES.has(file.type.toLowerCase())) {
    throw new ImageProcessingError(
      "UNSUPPORTED_TYPE",
      "JPG, PNG 또는 WebP 사진만 사용할 수 있습니다.",
    );
  }
}

export function calculateConstrainedDimensions(
  width: number,
  height: number,
  maxEdge = MAX_PHOTO_EDGE,
): Readonly<{ width: number; height: number }> {
  if (
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    !Number.isFinite(maxEdge) ||
    width <= 0 ||
    height <= 0 ||
    maxEdge <= 0
  ) {
    throw new ImageProcessingError(
      "DECODE_FAILED",
      "사진 크기를 확인할 수 없습니다. 다른 사진을 선택해 주세요.",
    );
  }

  const scale = Math.min(1, maxEdge / Math.max(width, height));

  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  };
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  mimeType: typeof COMPRESSED_PHOTO_MIME_TYPE,
  quality: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob || blob.type !== mimeType) {
          reject(
            new ImageProcessingError(
              "ENCODE_FAILED",
              "사진을 압축하지 못했습니다. 다른 사진으로 다시 시도해 주세요.",
            ),
          );
          return;
        }

        resolve(blob);
      },
      mimeType,
      quality,
    );
  });
}

export async function compressImageFile(file: File): Promise<CompressedPhoto> {
  validateImageFile(file);

  let image: ImageBitmap;

  try {
    image = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch (error) {
    throw new ImageProcessingError(
      "DECODE_FAILED",
      "사진을 읽지 못했습니다. 지원되는 다른 사진을 선택해 주세요.",
      error,
    );
  }

  try {
    const dimensions = calculateConstrainedDimensions(
      image.width,
      image.height,
    );
    const canvas = document.createElement("canvas");
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const context = canvas.getContext("2d");

    if (!context) {
      throw new ImageProcessingError(
        "CANVAS_UNAVAILABLE",
        "이 브라우저에서는 사진을 처리할 수 없습니다.",
      );
    }

    context.drawImage(image, 0, 0, dimensions.width, dimensions.height);
    const blob = await canvasToBlob(
      canvas,
      COMPRESSED_PHOTO_MIME_TYPE,
      PHOTO_COMPRESSION_QUALITY,
    );

    return {
      blob,
      height: dimensions.height,
      mimeType: COMPRESSED_PHOTO_MIME_TYPE,
      width: dimensions.width,
    };
  } finally {
    image.close();
  }
}
