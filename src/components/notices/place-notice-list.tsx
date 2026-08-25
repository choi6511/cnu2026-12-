"use client";

import { useCallback, useEffect, useState } from "react";

import type { PlaceId } from "@/data/places";
import { formatKstDate, formatKstDateTime } from "@/lib/notices/format-kst";
import { recentSevenDayBoundaryMs } from "@/lib/notices/date-kst";
import { getPublicSupabaseClient } from "@/lib/supabase/public";

type NoticeRow = Readonly<{
  id: string;
  title: string;
  published_at: string;
  original_url: string;
}>;

type CrawlRunRow = Readonly<{
  finished_at: string;
}>;

type NoticeState =
  | Readonly<{ kind: "loading" }>
  | Readonly<{ kind: "offline" }>
  | Readonly<{ kind: "error" }>
  | Readonly<{
      kind: "ready";
      notices: readonly NoticeRow[];
      lastSuccessfulRefresh: string | null;
    }>;

type PlaceNoticeListProps = Readonly<{
  placeId: PlaceId;
  placeName: string;
}>;

function isOnline(): boolean {
  return typeof navigator === "undefined" || navigator.onLine;
}

export function PlaceNoticeList({ placeId, placeName }: PlaceNoticeListProps) {
  const [state, setState] = useState<NoticeState>({ kind: "loading" });

  const loadNotices = useCallback(async () => {
    if (!isOnline()) {
      setState({ kind: "offline" });
      return;
    }

    const supabase = getPublicSupabaseClient();
    if (!supabase) {
      setState({ kind: "error" });
      return;
    }

    setState({ kind: "loading" });
    const boundary = new Date(recentSevenDayBoundaryMs(new Date())).toISOString();
    const [noticesResult, latestRunResult] = await Promise.all([
      supabase
        .from("notices")
        .select("id,title,published_at,original_url")
        .eq("source_id", placeId)
        .gte("published_at", boundary)
        .order("published_at", { ascending: false }),
      supabase
        .from("crawl_runs")
        .select("finished_at")
        .eq("source_id", placeId)
        .eq("status", "success")
        .order("finished_at", { ascending: false })
        .limit(1),
    ]);

    if (noticesResult.error || latestRunResult.error) {
      setState({ kind: "error" });
      return;
    }

    const lastSuccessfulRefresh = (latestRunResult.data as CrawlRunRow[] | null)?.[0]
      ?.finished_at;
    setState({
      kind: "ready",
      notices: (noticesResult.data as NoticeRow[] | null) ?? [],
      lastSuccessfulRefresh: lastSuccessfulRefresh ?? null,
    });
  }, [placeId]);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      void loadNotices();
    }, 0);

    return () => window.clearTimeout(timerId);
  }, [loadNotices]);

  useEffect(() => {
    const showOfflineNotice = () => setState({ kind: "offline" });
    window.addEventListener("offline", showOfflineNotice);
    return () => window.removeEventListener("offline", showOfflineNotice);
  }, []);

  if (state.kind === "loading") {
    return <p className="notice-state" role="status">최근 공지를 불러오는 중이에요.</p>;
  }

  if (state.kind === "offline") {
    return (
      <p className="notice-state notice-state-offline" role="status">
        최신 공지는 인터넷 연결이 필요해요.
      </p>
    );
  }

  if (state.kind === "error") {
    return (
      <div className="notice-state notice-state-error" role="alert">
        <p>최근 공지를 불러오지 못했어요. 잠시 후 다시 시도해주세요.</p>
        <button type="button" className="notice-retry-button" onClick={() => void loadNotices()}>
          다시 시도
        </button>
      </div>
    );
  }

  const lastRefreshText = state.lastSuccessfulRefresh
    ? formatKstDateTime(state.lastSuccessfulRefresh)
    : null;

  return (
    <section className="notice-panel" aria-labelledby="notice-list-title">
      <div className="notice-panel-heading">
        <div>
          <p className="screen-kicker">최근 7일</p>
          <h2 id="notice-list-title">{placeName} 공지</h2>
        </div>
        <p className="notice-refresh-status">
          {lastRefreshText
            ? `마지막 성공 갱신: ${lastRefreshText}`
            : "아직 성공적으로 갱신된 기록이 없어요."}
        </p>
      </div>

      {state.notices.length === 0 ? (
        <p className="notice-empty">최근 일주일 내 새롭게 올라온 공지사항이 존재하지 않음</p>
      ) : (
        <ul className="notice-list">
          {state.notices.map((notice) => (
            <li key={notice.id}>
              <a href={notice.original_url} target="_blank" rel="noreferrer">
                <span>{notice.title}</span>
                <small>{formatKstDate(notice.published_at) ?? "게시일 미상"}</small>
                <strong>원문 보기 <span aria-hidden="true">↗</span></strong>
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
