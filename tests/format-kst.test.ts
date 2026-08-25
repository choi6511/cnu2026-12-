import { describe, expect, it } from "vitest";

import { formatKstDate, formatKstDateTime } from "@/lib/notices/format-kst";

describe("KST 공지 표시 형식", () => {
  it("UTC 게시일을 한국 날짜로 표시한다", () => {
    expect(formatKstDate("2026-08-18T15:00:00.000Z")).toBe("2026년 8월 19일");
  });

  it("마지막 성공 갱신 시각을 한국 시간으로 표시한다", () => {
    expect(formatKstDateTime("2026-08-25T02:05:00.000Z")).toContain("2026년 8월 25일");
  });

  it("해석할 수 없는 시각은 표시하지 않는다", () => {
    expect(formatKstDate("invalid")).toBeNull();
    expect(formatKstDateTime("invalid")).toBeNull();
  });
});
