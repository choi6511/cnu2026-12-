# 개발일지 — 공지 수동 갱신 재실행 차단

## 메타데이터

- 상태: `막힘`
- 시작 시각: `2026-08-25 22:27 KST`
- 종료 시각: `2026-08-25 22:30 KST`
- 관련 요구사항: `PRD.md` 9장, 필수 테스트 10·11 / W11
- 이전 일지: `docs/dev-logs/2026-08-25_2216_notice-refresh_blocked.md`

## 1. 작업 개요

- 이번 작업 단위에서 만들기로 한 것: 운영자의 명시적 요청에 따라 세 Apify Actor를 독립 실행하고, 검증된 공지만 Supabase에 반영한다.
- 실제로 완료한 범위: Apify MCP로 세 출처 실행을 시작하고 완료 상태와 dataset을 확인했다.
- 범위에서 제외하거나 다음으로 넘긴 것: 구조화된 `NoticeInput[]` 검증, Supabase upsert, `crawl_runs` 기록과 저장 표본 재검증.

## 2. 변경 사항

| 파일 | 변경 내용 | 이유 |
| --- | --- | --- |
| `docs/dev-logs/2026-08-25_2230_notice-refresh_blocked.md` | 이번 수동 갱신의 차단 상태와 Apify 실행 증거 기록 | 원시 HTML을 공지 데이터로 오인하거나 DB를 변경하지 않기 위해 |

코드와 Supabase 데이터는 변경하지 않았다.

## 3. 구현 판단

- 선택한 구조 또는 접근: Apify의 `apify/rag-web-browser`를 출처별로 독립 실행하고 dataset의 출력 필드가 제목·게시일·원문 URL인지 확인했다.
- 대안과 선택 이유: Apify가 반환한 원시 HTML을 Codex나 앱 코드가 직접 파싱해 공지 행으로 만들지 않았다. PRD와 프로젝트 규칙은 Actor가 해당 필드를 추출하고, 앱/Codex는 구조화 결과만 검증·정규화하도록 정한다.
- PRD 또는 기존 구현과의 관계: 유효한 구조화 행과 Supabase 반영 표본이 모두 없는 경우 기존 `notices`와 마지막 성공 기록을 보존하는 PRD 9.5를 따른다.

## 4. 문제 및 막힌 지점

- 증상: `library`, `language-center` 실행은 `SUCCEEDED`였지만 dataset은 각각 원시 HTML 1행뿐이었고 `title`, `published_at`, `original_url` 구조화 필드가 없었다. `industry-center`는 90초 제한에서 `TIMED-OUT`으로 종료했다.
- 재현 방법: Apify run `lUr2Ingy9eAUQyMiK`, `2CyfjRR2YYNMm6nsr`, `IX2MTaqpbwxD2vQXs`의 dataset을 조회한다.
- 원인: 일반 RAG Browser Actor가 게시판 목록을 구조화 공지 행으로 변환하지 않았고, 산학연교육연구관의 동적 페이지는 제한 시간 안에 로드되지 않았다. 현재 세션에는 Supabase 플러그인 실행 도구도 노출되지 않았다.
- 영향을 받은 범위: 세 출처의 신규 공지 upsert와 `crawl_runs` 운영 로그 작성 전체.

## 5. 해결 방법

- 시도한 방법: library와 language-center는 raw HTTP, industry-center는 Playwright로 실행했다. `fetch_actor_details`로 입력 스키마를 확인하고 run/dataset 결과를 실제로 조회했다.
- 최종 해결책: 이번 실행은 실패/검증불가로 기록하고 DB를 변경하지 않는다. 다음 실행 전에 세 출처별 제목·날짜·원문 URL을 dataset 행으로 직접 내보내는 Apify Actor 또는 저장된 Actor task를 확인해야 한다.
- 같은 문제가 재발할 때 확인할 항목: 실행 전 Actor input/output schema, dataset 필드명, industry-center의 렌더링 시간 제한, Supabase MCP의 프로젝트·쓰기 도구 노출 상태.

## 6. 검증 결과

| 검증 | 실행 방법 | 결과 | 비고 |
| --- | --- | --- | --- |
| Apify Actor 입력 확인 | `fetch_actor_details(apify/rag-web-browser)` | 통과 | URL·HTML 출력 스키마 확인 |
| library 실행 | run `lUr2Ingy9eAUQyMiK`, dataset `HkhdGQkMWB9b6BmSw` | 실패 | `SUCCEEDED`, 원시 HTML 1행, 구조화 공지 0건 |
| language-center 실행 | run `2CyfjRR2YYNMm6nsr`, dataset `lpU8j4GggvpGcBg0t` | 실패 | `SUCCEEDED`, 원시 HTML 1행, 구조화 공지 0건 |
| industry-center 실행 | run `IX2MTaqpbwxD2vQXs`, dataset `gVktZqbIjkMG3uM9M` | 실패 | `TIMED-OUT`, dataset 0건 |
| Supabase 반영·표본 | Supabase 플러그인 도구 확인 | 미실행 | 현재 세션에 Supabase MCP 도구가 없음; 안전상 DB 변경 0건 |
| 타입 검사·린트·테스트·빌드 | 미실행 | 미실행 | 코드 변경이 없으며 외부 수동 운영 작업만 수행 |

## 7. 미해결 사항 및 위험

- 남은 문제: 세 출처에 대해 구조화 공지 필드를 출력하는 재사용 가능한 Apify Actor/task와 연결된 Supabase 플러그인이 필요하다.
- 임시 처리 또는 mock: 없음. 원시 HTML이나 기존 fixture로 최신 공지를 가짜 반영하지 않았다.
- 외부 키·계정·콘텐츠 의존성: Apify Actor/task 실행 권한과 Supabase OAuth 연결·쓰기 권한.
- 다음 작업에 영향을 줄 위험: `SUCCEEDED`는 저장 성공이 아니며, 정상 dataset·검증·DB 표본 없이 마지막 성공 시각을 갱신하면 안 된다.

## 8. 다음 작업 지침

- 다음 작업 ID와 이름: W11 운영자 수동 갱신 재실행
- 시작 전에 읽을 파일: `docs/MANUAL_NOTICE_REFRESH.md`, `src/lib/notices/apify-result.ts`, 이 일지
- 첫 번째로 할 일: Apify에서 세 출처별 구조화 출력 Actor/task의 정확한 이름과 input schema를 확인한 뒤 실행하고, Supabase 플러그인 연결을 확인한다.
- 유지해야 할 인터페이스/결정: 세 출처 독립 실행, 정상 `NoticeInput[]`만 upsert, 실패 출처 데이터 보존, 자동 갱신 금지.
- 피해야 할 함정: 학교 HTML을 직접 파싱하거나 RAG Actor의 원시 HTML을 공지 행으로 변환하는 대체 구현, 비밀값 노출, `SUCCEEDED`만으로 성공 보고.
