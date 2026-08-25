import { describe, expect, it } from "vitest";

import industryCenterFixture from "./fixtures/apify/industry-center.json";
import languageCenterFixture from "./fixtures/apify/language-center.json";
import libraryFixture from "./fixtures/apify/library.json";

import { normalizeApifyNoticeRows } from "@/lib/notices/apify-result";

describe("Apify 공지 결과 정규화", () => {
  it.each([
    ["library", libraryFixture],
    ["language-center", languageCenterFixture],
    ["industry-center", industryCenterFixture],
  ] as const)("%s fixture를 NoticeInput[]으로 바꾼다", (sourceId, fixture) => {
    const result = normalizeApifyNoticeRows(sourceId, fixture.items, fixture.scrapedAt);

    expect(result.rejected).toEqual([]);
    expect(result.notices).toHaveLength(2);
    expect(result.notices.every((notice) => notice.sourceId === sourceId)).toBe(true);
    expect(result.notices.every((notice) => notice.originalUrl.startsWith("https://"))).toBe(true);
    expect(result.notices.every((notice) => notice.publishedAt.endsWith("+09:00"))).toBe(true);
  });

  it("산학협력단의 두 자리 연도 날짜를 KST 날짜로 정규화한다", () => {
    const result = normalizeApifyNoticeRows(
      "industry-center",
      industryCenterFixture.items,
      industryCenterFixture.scrapedAt,
    );

    expect(result.notices[0]?.publishedAt).toBe("2026-08-18T00:00:00+09:00");
  });

  it("날짜·출처 URL·중복 URL이 잘못된 행은 저장 대상에서 제외한다", () => {
    const result = normalizeApifyNoticeRows("library", [
      {
        title: "정상 공지",
        published_at: "2026-08-24",
        original_url: "/bbs/content/1_1",
      },
      {
        title: "잘못된 날짜",
        published_at: "2026-02-30",
        original_url: "/bbs/content/1_2",
      },
      {
        title: "다른 기관 링크",
        published_at: "2026-08-24",
        original_url: "https://dream.cnu.ac.kr/bbs/view.php?wnum=1",
      },
      {
        title: "중복 링크",
        published_at: "2026-08-24",
        original_url: "/bbs/content/1_1",
      },
    ], "2026-08-25T07:54:45.727Z");

    expect(result.notices).toHaveLength(1);
    expect(result.rejected.map((item) => item.reason)).toEqual([
      "invalid_published_at",
      "invalid_original_url",
      "duplicate_original_url",
    ]);
  });
});
