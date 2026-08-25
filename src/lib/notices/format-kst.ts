const KST_DATE_FORMATTER = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "long",
  day: "numeric",
});

const KST_DATE_TIME_FORMATTER = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function formatInKst(value: string, formatter: Intl.DateTimeFormat): string | null {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : formatter.format(date);
}

export function formatKstDate(value: string): string | null {
  return formatInKst(value, KST_DATE_FORMATTER);
}

export function formatKstDateTime(value: string): string | null {
  return formatInKst(value, KST_DATE_TIME_FORMATTER);
}
