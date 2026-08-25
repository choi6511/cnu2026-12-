import type { PlaceId } from "@/data/places";

import type { NoticeInput } from "./types";

type UnknownRecord = Record<string, unknown>;

export type ApifyNoticeRow = Readonly<{
  title?: unknown;
  published_at?: unknown;
  publishedAt?: unknown;
  original_url?: unknown;
  originalUrl?: unknown;
  url?: unknown;
  scraped_at?: unknown;
  scrapedAt?: unknown;
}>;

export type RejectedApifyNotice = Readonly<{
  index: number;
  reason:
    | "invalid_row"
    | "missing_title"
    | "invalid_published_at"
    | "invalid_original_url"
    | "invalid_scraped_at"
    | "duplicate_original_url";
}>;

export type ApifyNormalizationResult = Readonly<{
  notices: readonly NoticeInput[];
  rejected: readonly RejectedApifyNotice[];
}>;

const SOURCE_ORIGINS: Record<PlaceId, string> = {
  library: "https://library.cnu.ac.kr",
  "language-center": "https://dream.cnu.ac.kr",
  "industry-center": "https://iuc.cnu.ac.kr",
};

function asRecord(value: unknown): UnknownRecord | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as UnknownRecord)
    : null;
}

function readString(row: UnknownRecord, keys: readonly string[]): string | null {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return null;
}

function normalizePublishedAt(value: string): string | null {
  const match = value.match(/^(\d{2}|\d{4})[.-](\d{1,2})[.-](\d{1,2})$/);
  if (!match) {
    return null;
  }

  const year = match[1].length === 2 ? 2000 + Number(match[1]) : Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const candidate = new Date(Date.UTC(year, month - 1, day));

  if (
    candidate.getUTCFullYear() !== year ||
    candidate.getUTCMonth() !== month - 1 ||
    candidate.getUTCDate() !== day
  ) {
    return null;
  }

  return `${year.toString().padStart(4, "0")}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}T00:00:00+09:00`;
}

function normalizeOriginalUrl(value: string, sourceId: PlaceId): string | null {
  try {
    const origin = SOURCE_ORIGINS[sourceId];
    const url = new URL(value, origin);

    if (url.protocol !== "https:" || url.origin !== origin) {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}

function normalizeScrapedAt(value: string): string | null {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

/**
 * Apify Actor가 반환한 행을 앱 공통 계약으로 제한한다. HTML을 읽거나 파싱하지
 * 않으며, 상대 링크·기관별 날짜 표기만 저장 직전에 정규화한다.
 */
export function normalizeApifyNoticeRows(
  sourceId: PlaceId,
  rows: readonly unknown[],
  defaultScrapedAt: string,
): ApifyNormalizationResult {
  const notices: NoticeInput[] = [];
  const rejected: RejectedApifyNotice[] = [];
  const originalUrls = new Set<string>();

  rows.forEach((value, index) => {
    const row = asRecord(value);
    if (!row) {
      rejected.push({ index, reason: "invalid_row" });
      return;
    }

    const title = readString(row, ["title"]);
    if (!title) {
      rejected.push({ index, reason: "missing_title" });
      return;
    }

    const rawPublishedAt = readString(row, ["published_at", "publishedAt"]);
    const publishedAt = rawPublishedAt && normalizePublishedAt(rawPublishedAt);
    if (!publishedAt) {
      rejected.push({ index, reason: "invalid_published_at" });
      return;
    }

    const rawOriginalUrl = readString(row, ["original_url", "originalUrl", "url"]);
    const originalUrl = rawOriginalUrl && normalizeOriginalUrl(rawOriginalUrl, sourceId);
    if (!originalUrl) {
      rejected.push({ index, reason: "invalid_original_url" });
      return;
    }

    const rawScrapedAt = readString(row, ["scraped_at", "scrapedAt"]) ?? defaultScrapedAt;
    const scrapedAt = normalizeScrapedAt(rawScrapedAt);
    if (!scrapedAt) {
      rejected.push({ index, reason: "invalid_scraped_at" });
      return;
    }

    if (originalUrls.has(originalUrl)) {
      rejected.push({ index, reason: "duplicate_original_url" });
      return;
    }

    originalUrls.add(originalUrl);
    notices.push({ sourceId, title, publishedAt, originalUrl, scrapedAt });
  });

  return { notices, rejected };
}
