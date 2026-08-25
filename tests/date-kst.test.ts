import { describe, expect, it } from "vitest";

import {
  isWithinRecentSevenDays,
  recentSevenDayBoundaryMs,
} from "@/lib/notices/date-kst";

describe("최근 7일 KST 경계", () => {
  it("오늘 포함 7개 달력 날짜의 시작을 KST 00:00 기준으로 계산한다", () => {
    const now = new Date("2026-08-25T02:00:00.000Z"); // 2026-08-25 11:00 KST
    const boundaryMs = recentSevenDayBoundaryMs(now);

    // 2026-08-19 00:00 KST === 2026-08-18 15:00 UTC
    expect(new Date(boundaryMs).toISOString()).toBe(
      "2026-08-18T15:00:00.000Z",
    );
  });

  it("경계 시각과 정확히 같은 게시일은 포함한다", () => {
    const now = new Date("2026-08-25T02:00:00.000Z");
    expect(
      isWithinRecentSevenDays("2026-08-18T15:00:00.000Z", now),
    ).toBe(true);
  });

  it("경계 시각보다 1ms 이른 게시일은 제외한다", () => {
    const now = new Date("2026-08-25T02:00:00.000Z");
    expect(
      isWithinRecentSevenDays("2026-08-18T14:59:59.999Z", now),
    ).toBe(false);
  });

  it("KST 자정을 넘는 순간 경계가 하루 이동한다", () => {
    const beforeMidnightKst = new Date("2026-08-25T14:59:59.000Z"); // 23:59:59 KST
    const afterMidnightKst = new Date("2026-08-25T15:00:00.000Z"); // 00:00:00 KST 다음날

    expect(recentSevenDayBoundaryMs(afterMidnightKst)).toBe(
      recentSevenDayBoundaryMs(beforeMidnightKst) + 24 * 60 * 60 * 1000,
    );
  });

  it("해석할 수 없는 게시일은 최근 공지로 판단하지 않는다", () => {
    const now = new Date("2026-08-25T02:00:00.000Z");
    expect(isWithinRecentSevenDays("not-a-date", now)).toBe(false);
  });
});
