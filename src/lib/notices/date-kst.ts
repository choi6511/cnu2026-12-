const KST_OFFSET_MS = 9 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;
const RECENT_WINDOW_DAYS = 7;

function toKstMidnightUtcMs(date: Date): number {
  const kstMs = date.getTime() + KST_OFFSET_MS;
  const kstDayStartMs = Math.floor(kstMs / DAY_MS) * DAY_MS;
  return kstDayStartMs - KST_OFFSET_MS;
}

/**
 * PRD 9.4: published_at >= 오늘 00:00 KST - 6일. 오늘을 포함한 7개 달력 날짜의
 * 시작 경계를 UTC 타임스탬프(ms)로 반환한다.
 */
export function recentSevenDayBoundaryMs(now: Date): number {
  const todayKstMidnightMs = toKstMidnightUtcMs(now);
  return todayKstMidnightMs - (RECENT_WINDOW_DAYS - 1) * DAY_MS;
}

export function isWithinRecentSevenDays(publishedAt: string, now: Date): boolean {
  const publishedMs = Date.parse(publishedAt);
  if (Number.isNaN(publishedMs)) {
    return false;
  }
  return publishedMs >= recentSevenDayBoundaryMs(now);
}
