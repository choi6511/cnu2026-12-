import type { PlaceId } from "@/data/places";

export type NoticeInput = {
  sourceId: PlaceId;
  title: string;
  publishedAt: string;
  originalUrl: string;
  scrapedAt: string;
};

export type Notice = {
  id: string;
  sourceId: PlaceId;
  title: string;
  publishedAt: string;
  originalUrl: string;
  scrapedAt: string;
};

export type CrawlRunStatus = "success" | "failed";

export type CrawlRun = {
  id: string;
  sourceId: PlaceId;
  status: CrawlRunStatus;
  itemCount: number;
  errorMessage: string | null;
  startedAt: string;
  finishedAt: string;
};
