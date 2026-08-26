# 공지 수동 갱신 안내

## 가장 쉬운 사용법

Codex에서 이 프로젝트를 연 뒤 다음과 같이 요청한다.

```text
공지 갱신해줘.
Apify의 library, language-center, industry-center Actor 실행을 요청하고,
성공한 결과만 Supabase에 반영한 뒤 출처별 건수와 표본을 알려줘.
```

이 요청을 받으면 Codex는 다음 순서로 작업해야 한다.

1. Apify MCP 연결을 확인한다.
2. Supabase 플러그인의 대상 프로젝트를 확인한다.
3. Apify Actor 실행 세 개를 각각 시작한다.
4. 각 작업이 실제 완료될 때까지 상태를 확인한다.
5. 제목, 게시일, 원문 URL과 출처 ID를 검증한다.
6. 성공한 출처만 Supabase `notices`에 반영한다.
7. 출처별 결과를 `crawl_runs`에 기록한다.
8. Supabase 저장값을 다시 읽어 표본을 확인한다.
9. 성공·실패·반영 개수를 운영자에게 보고한다.

## 실행 전에 필요한 것

- Apify OAuth 또는 API token이 Apify MCP 연결에 등록되어 있어야 한다.
- Apify MCP 도구가 현재 Codex 세션의 도구 목록에 보여야 한다.
- Supabase 플러그인이 올바른 프로젝트에 연결되어 있어야 한다.
- Apify에 아래 출처별 Actor 실행 구성이 존재해야 한다.

| 작업 이름 | 공지 출처 |
| --- | --- |
| `library` | 충남대학교 중앙도서관 |
| `language-center` | 충남대학교 국제언어교육센터 |
| `industry-center` | 충남대학교 산학연교육연구관 |

토큰은 채팅, Git, `.env.example`에 적지 않는다. Apify OAuth 연결 또는 비밀 자격증명으로만 보관한다.

## Apify Console에서 먼저 직접 실행하는 방법

Apify Console에서 세 Actor를 직접 실행해도 된다. 세 실행이 끝난 뒤 Codex에 다음처럼 요청한다.

```text
Apify에서 공지 Actor 실행 세 개를 완료했어.
완료된 결과를 확인해서 성공한 출처만 Supabase에 반영해줘.
```

이 방법도 수동 갱신이다. 작업 실행은 사용자가 하고, 결과 검증과 Supabase 반영은 Codex가 맡는다.

## 성공했을 때 받아야 하는 보고

```text
공지 수동 갱신 결과
- library: 성공 / 수집 N건 / 반영 N건
- language-center: 성공 / 수집 N건 / 반영 N건
- industry-center: 실패 / 기존 데이터 유지 / 실패 이유
- Supabase 표본 확인: 완료
- 마지막 성공 갱신 시각: YYYY-MM-DD HH:mm KST
```

`Actor 실행 요청이 접수됨`은 성공이 아니다. Apify dataset 결과가 준비되고 Supabase 저장값까지 확인되어야 성공이다.

## 실패했을 때

- 한 출처가 실패해도 다른 성공 출처는 반영한다.
- 실패 출처의 기존 공지는 삭제하지 않는다.
- 날짜나 원문 URL이 잘못된 행은 저장하지 않는다.
- 재시도 전에 Apify가 알려준 대기 시간이나 사용자 조치가 있는지 확인한다.
- 키가 보이지 않거나 플러그인이 연결되지 않았으면 작업을 성공으로 처리하지 않는다.

## 발표 전 권장 순서

1. 발표 전에 인터넷 연결을 확인한다.
2. Codex에 `공지 갱신해줘`라고 요청한다.
3. 출처별 결과 보고를 확인한다.
4. 앱의 세 장소 공지 화면에서 제목·날짜·원문 링크를 한 건씩 확인한다.
5. 실패한 출처가 있다면 기존 공지가 유지되는지 확인한다.

## 자동 갱신과의 차이

| 수동 갱신 | 자동 갱신 |
| --- | --- |
| 운영자가 요청할 때만 실행 | 정해진 시간마다 실행 |
| 발표 직전에 상태를 보면서 실행 가능 | 실패해도 늦게 발견할 수 있음 |
| Cron API와 예약 설정이 필요 없음 | Vercel Cron과 서버 API가 필요함 |
| 이번 해커톤 MVP 방식 | MVP 이후 선택 기능 |

## 2026-08-25 재실행 검증 기록

W11 운영 절차를 확인하기 위해 세 출처를 동시에 독립 실행했다. 각 실행은 Apify에서 `SUCCEEDED`로 끝났지만, 이번 목록 페이지 응답은 신규 구조화 공지 행을 반환하지 않아 신규 반영은 하지 않았다. 기존 `notices`와 마지막 성공 기록은 삭제·교체하지 않는다.

| 출처 | Apify run ID | dataset | 결과 | 반영 원칙 |
| --- | --- | --- | --- | --- |
| library | `uxqgIrxPfeNj9rXO2` | `zXlIyfL0mLaZR8gZr` | 1개 페이지 응답, 신규 행 0건 | 기존 공지 유지 |
| language-center | `xf1PL0LUH5AwPaBdK` | `EPDAlcYhvD8lByrn3` | 0건 | 기존 공지 유지 |
| industry-center | `cgF42XqLaTTy4R1Ng` | `Aab0XBoHRTvyZyoLF` | 0건 | 기존 공지 유지 |

이 기록은 `SUCCEEDED` 상태만으로 저장 성공이라고 판단하지 않고, dataset 행을 정규화·검증한 뒤 정상 행이 있을 때만 upsert해야 한다는 W11 완료 조건을 검증한다.

## 2026-08-25 구조화 갱신 성공 기록

Apify Web Scraper의 구조화 Page Function으로 세 목록 페이지에서 `title`, `published_at`, `original_url`, `scraped_at`만 추출했다. Codex가 출처 도메인·날짜 형식·오류 행을 검증한 뒤 정상 행 48건만 Supabase에 upsert하고, 각 출처의 `crawl_runs` 성공 로그를 남겼다.

| 출처 | Apify run ID | dataset | 추출·반영 | 완료 시각 (KST) |
| --- | --- | --- | --- | --- |
| library | `tj72NqJosZwBVYkEx` | `aGdIxg6vIvOAnFCyi` | 15건 / 15건 | 2026-08-25 22:45:06 |
| language-center | `RQkDqHN6wDlqXbm8t` | `6v3b7V0bM9jQlewWV` | 21건 / 21건 | 2026-08-25 22:43:37 |
| industry-center | `VE3gzFFONFkfurXB5` | `EB2aXuBU5bXSVjr0S` | 12건 / 12건 | 2026-08-25 22:44:31 |

Supabase 확인 결과는 `notices`가 출처별 15·21·12건이고, 해당 세 `crawl_runs`의 `item_count`도 각각 15·21·12건이다. Security Advisor의 security lint는 0건이었다.
