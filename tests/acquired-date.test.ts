import { describe, expect, it } from "vitest";

import { formatAcquiredDate } from "@/lib/format/acquired-date";

describe("획득일 표시", () => {
  it("UTC 기록을 한국 시간 날짜로 표시한다", () => {
    expect(formatAcquiredDate("2026-08-24T15:30:00.000Z")).toBe(
      "2026년 8월 25일",
    );
  });

  it("해석할 수 없는 날짜에는 안전한 안내를 표시한다", () => {
    expect(formatAcquiredDate("not-a-date")).toBe("날짜 확인 필요");
  });
});
