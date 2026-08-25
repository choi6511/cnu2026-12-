import { afterEach, describe, expect, it, vi } from "vitest";

import {
  calculateConstrainedDimensions,
  compressImageFile,
  ImageProcessingError,
  validateImageFile,
} from "@/lib/browser/image-processing";

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("방문 인증 이미지 처리", () => {
  it("긴 변이 1280px를 넘지 않도록 비율을 유지한다", () => {
    expect(calculateConstrainedDimensions(4000, 3000)).toEqual({
      width: 1280,
      height: 960,
    });
    expect(calculateConstrainedDimensions(900, 1200)).toEqual({
      width: 900,
      height: 1200,
    });
  });

  it("JPG, PNG, WebP만 입력으로 허용한다", () => {
    expect(() => validateImageFile({ size: 10, type: "image/jpeg" })).not.toThrow();
    expect(() => validateImageFile({ size: 10, type: "image/png" })).not.toThrow();
    expect(() => validateImageFile({ size: 10, type: "image/webp" })).not.toThrow();
    expect(() => validateImageFile({ size: 10, type: "text/plain" })).toThrow(
      ImageProcessingError,
    );
    expect(() => validateImageFile({ size: 0, type: "image/jpeg" })).toThrow(
      ImageProcessingError,
    );
  });

  it("브라우저에서 0.75 품질 WebP로 압축한다", async () => {
    const drawImage = vi.fn();
    const close = vi.fn();
    const canvas = {
      getContext: vi.fn(() => ({ drawImage })),
      height: 0,
      toBlob: vi.fn((callback: BlobCallback, type?: string, quality?: number) => {
        expect(type).toBe("image/webp");
        expect(quality).toBe(0.75);
        callback(new Blob([new Uint8Array([1, 2])], { type: "image/webp" }));
      }),
      width: 0,
    } as unknown as HTMLCanvasElement;
    vi.stubGlobal(
      "createImageBitmap",
      vi.fn(async () => ({ close, height: 3000, width: 4000 })),
    );
    vi.stubGlobal("document", { createElement: vi.fn(() => canvas) });

    const file = new Blob([new Uint8Array([1])], {
      type: "image/jpeg",
    }) as File;
    const result = await compressImageFile(file);

    expect(result).toMatchObject({
      height: 960,
      mimeType: "image/webp",
      width: 1280,
    });
    expect(canvas.width).toBe(1280);
    expect(canvas.height).toBe(960);
    expect(drawImage).toHaveBeenCalledWith(
      expect.anything(),
      0,
      0,
      1280,
      960,
    );
    expect(close).toHaveBeenCalledOnce();
  });

  it("이미지 디코딩 실패를 저장 가능한 사진으로 처리하지 않는다", async () => {
    vi.stubGlobal(
      "createImageBitmap",
      vi.fn(async () => {
        throw new Error("decode failed");
      }),
    );
    const file = new Blob([new Uint8Array([1])], {
      type: "image/png",
    }) as File;

    await expect(compressImageFile(file)).rejects.toMatchObject({
      code: "DECODE_FAILED",
      name: "ImageProcessingError",
    });
  });
});
