# 개발일지 — 공지 수동 갱신 재실행 차단

## 메타데이터

- 상태: `막힘`
- 시작 시각: `2026-08-25 22:35 KST`
- 종료 시각: `2026-08-25 22:41 KST`
- 관련 요구사항: `PRD.md` 9장, 필수 테스트 10·11 / W11
- 이전 일지: `docs/dev-logs/2026-08-25_2230_notice-refresh_blocked.md`

## 1. 작업 개요

- 이번 작업 단위에서 만들기로 한 것: Apify Actor로 세 출처의 구조화 공지 행을 수집하고, 검증된 결과만 Supabase에 반영한다.
- 실제로 완료한 범위: Apify 및 Supabase 연결을 실제 도구로 확인하고, 대상 Supabase 프로젝트와 테이블·RLS 상태를 확인했다. 구조화 출력을 위한 Apify Web Scraper 실행도 세 출처별로 요청했다.
- 범위에서 제외하거나 다음으로 넘긴 것: Actor 실행 완료, 결과 검증, `notices` upsert, `crawl_runs` 기록과 저장 표본 확인.

## 2. 변경 사항

| 파일 | 변경 내용 | 이유 |
| --- | --- | --- |
| `docs/dev-logs/2026-08-25_2241_notice-refresh_blocked.md` | 실행 차단 원인과 재개 절차 기록 | 권한 미승인 상태를 성공이나 DB 갱신으로 보고하지 않기 위해 |

코드와 Supabase 데이터는 변경하지 않았다.

## 3. 구현 판단

- 선택한 구조 또는 접근: 목록 페이지의 제목·게시일·원문 URL을 `apify/web-scraper`의 Page Function 안에서 구조화 데이터로 생성한다. 앱 코드와 Codex는 Actor가 반환한 행만 검증·정규화한다.
- 대안과 선택 이유: RAG Actor의 원시 HTML을 애플리케이션 또는 Codex에서 직접 파싱하지 않았다. 이는 PRD의 Apify Actor 책임 경계를 지킨다.
- PRD 또는 기존 구현과의 관계: Supabase 쓰기는 정상 Actor 결과가 있을 때만 수행하고, 실패 출처 기존 공지는 유지한다.

## 4. 문제 및 막힌 지점

- 증상: `apify/web-scraper` 호출이 세 출처 모두 실행 전 중단됐다.
- 재현 방법: MCP `call_actor`로 `apify/web-scraper`를 호출한다.
- 원인: Apify가 이 Actor를 full-access Actor로 분류해 사용자 계정에서 별도 권한 승인을 요구한다.
- 영향을 받은 범위: 세 출처의 최신 공지 수집과 Supabase 반영 전체.

## 5. 해결 방법

- 시도한 방법: Apify Actor 검색·상세 입력 schema 확인, Supabase 프로젝트와 `public.notices`, `public.crawl_runs` 확인, 세 출처 병렬 실행 요청.
- 최종 해결책: 사용자가 Apify Console의 권한 승인 URL을 열어 `apify/web-scraper` 권한을 승인한 뒤 같은 수동 갱신 요청을 재실행한다.
- 같은 문제가 재발할 때 확인할 항목: Actor full-access 승인 상태, Apify 계정 권한, dataset 구조화 필드, Supabase 플러그인 대상 프로젝트.

## 6. 검증 결과

| 검증 | 실행 방법 | 결과 | 비고 |
| --- | --- | --- | --- |
| Apify MCP | Actor 검색·상세 조회 | 통과 | `apify/web-scraper` input schema 확인 |
| Supabase 연결 | 프로젝트·테이블 조회 | 통과 | `gcckxsabdzqkewzfbzmj`, `notices` 30건, `crawl_runs` 3건, RLS 활성화 |
| 구조화 Actor 실행 | library, language-center, industry-center 병렬 `call_actor` | 실패 | full-access 권한 승인 전 실행 불가 |
| Supabase upsert·운영 로그 | 정상 Actor 결과 후 실행 예정 | 미실행 | 구조화 결과가 없어 DB 변경 0건 |
| 타입 검사·린트·테스트·빌드 | 미실행 | 미실행 | 코드 변경 없는 외부 수동 운영 작업 |

## 7. 미해결 사항 및 위험

- 남은 문제: Apify Web Scraper full-access 권한 승인.
- 임시 처리 또는 mock: 없음.
- 외부 키·계정·콘텐츠 의존성: Apify Console의 Actor 권한 승인.
- 다음 작업에 영향을 줄 위험: 승인 전에는 Apify MCP가 이 Actor 실행을 거부하므로 원시 HTML Actor로 대체하거나 DB를 갱신하면 안 된다.

## 8. 다음 작업 지침

- 다음 작업 ID와 이름: W11 운영자 수동 갱신 재실행
- 시작 전에 읽을 파일: `docs/MANUAL_NOTICE_REFRESH.md`, `src/lib/notices/apify-result.ts`, 이 일지
- 첫 번째로 할 일: `https://console.apify.com/actors/moJRLRc85AitArpNN?approvePermissions=true`에서 권한 승인 뒤 세 구조화 Actor 실행을 재시도한다.
- 유지해야 할 인터페이스/결정: 세 출처 독립 실행, 구조화 필드만 검증·upsert, 실패 데이터 보존, 자동 갱신 금지.
- 피해야 할 함정: full-access 승인을 우회하려고 앱 코드로 HTML을 파싱하거나 기존 공지 데이터를 삭제하는 것.
