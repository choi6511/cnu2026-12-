# 개발일지 — 공지 수동 갱신 재시도

## 메타데이터

- 상태: `막힘`
- 시작 시각: `2026-08-25 21:52 KST`
- 종료 시각: `2026-08-25 21:58 KST`
- 관련 요구사항: `PRD.md` 9장, 10장, 필수 테스트 10·11 / W11
- 이전 일지: `docs/dev-logs/2026-08-25_2205_notice-refresh_blocked.md`

## 1. 작업 개요

- 이번 작업 단위에서 만들기로 한 것: 운영자의 명시적 요청에 따라 Apify의 `library`, `language-center`, `industry-center` Actor를 독립 실행하고, 정상 결과만 Supabase에 반영한다.
- 실제로 완료한 범위: 필수 문서와 최근 인계를 확인하고 현재 세션의 Apify·Supabase 연결 상태를 재점검했다. Supabase 기존 데이터, RLS, Advisor 상태를 읽기 전용으로 검증했다.
- 범위에서 제외하거나 다음으로 넘긴 것: Apify Actor 실행, dataset 검증, 신규 공지 upsert와 신규 `crawl_runs` 기록은 Apify MCP 연결이 없어 수행하지 못했다.

## 2. 변경 사항

| 파일 | 변경 내용 | 이유 |
| --- | --- | --- |
| `docs/dev-logs/2026-08-25_2158_notice-refresh_blocked.md` | 재시도 결과와 Supabase 보존 상태 기록 | 실패를 성공으로 오인하지 않고 다음 실행이 바로 이어지도록 하기 위해 |

애플리케이션 코드와 Supabase 데이터는 변경하지 않았다.

## 3. 구현 판단

- 선택한 구조 또는 접근: Apify MCP만 학교 홈페이지 수집을 담당하도록 기존 경계를 유지하고, 연결 불가 시 Supabase를 읽기 전용으로 확인했다.
- 대안과 선택 이유: 현재 노출된 Octoparse 도구나 자체 `fetch`/HTML 파서를 대체 수단으로 사용하지 않았다. AGENTS.md와 PRD가 Apify Actor를 필수 증거로 지정하기 때문이다.
- PRD 또는 기존 구현과의 관계: 실패한 갱신은 기존 공지와 마지막 성공 기록을 보존해야 한다는 PRD 9.5 규칙을 따랐다.

## 4. 문제 및 막힌 지점

- 증상: 현재 세션의 도구 목록과 MCP 리소스에 Apify 서버/Actor 실행 도구가 없다.
- 재현 방법: 현재 도구 목록에서 `apify`를 검색하고 MCP 리소스/템플릿 목록을 확인한다. Supabase와 Octoparse는 보이지만 Apify는 반환되지 않는다.
- 원인: 직전 일지에서 Apify OAuth refresh token이 `invalid_grant`로 거부된 뒤 현재 세션에 Apify MCP가 연결되지 않은 상태다.
- 영향을 받은 범위: 세 Actor 실행, run/dataset ID 수집, 결과 정규화, 신규 Supabase 반영 전체.

## 5. 해결 방법

- 시도한 방법: 세션 도구 전체 검색, MCP 리소스 확인, 최근 차단 일지 확인, Supabase 연결과 대상 프로젝트 확인.
- 최종 해결책: 이번 세션 안에서는 해결할 수 없다. 사용자가 Apify MCP OAuth 연결을 다시 인증한 후 동일 요청을 재실행해야 한다.
- 같은 문제가 재발할 때 확인할 항목: Apify 도구 노출 여부, OAuth 연결 상태, 세 Actor 이름, 실행 권한, dataset 읽기 권한.

## 6. 검증 결과

| 검증 | 실행 방법 | 결과 | 비고 |
| --- | --- | --- | --- |
| 타입 검사 | 미실행 | 미실행 | 코드 변경 없음 |
| 린트 | 미실행 | 미실행 | 코드 변경 없음 |
| 테스트 | Supabase `list_tables`, `execute_sql` | 통과 | `notices` 30건, `crawl_runs` 3건 유지 |
| 빌드 | 미실행 | 미실행 | 코드 변경 없음 |
| 수동 검증 | Supabase Security/Performance Advisor | 통과 | 두 Advisor 모두 lint 0건 |

추가 확인:

- 대상 프로젝트: `gcckxsabdzqkewzfbzmj` (`choi6511's Project`, `ACTIVE_HEALTHY`)
- `notices`: `library` 10건, `language-center` 10건, `industry-center` 10건
- `crawl_runs`: 출처별 성공 1건씩, 총 3건
- `notices`, `crawl_runs`: RLS 활성화
- 이번 재시도로 추가·수정·삭제된 Supabase 행: 0건

## 7. 미해결 사항 및 위험

- 남은 문제: Apify MCP 재인증 전에는 최신 공지를 수집할 수 없다.
- 임시 처리 또는 mock: 없음. 기존 마지막 성공 데이터만 보존했다.
- 외부 키·계정·콘텐츠 의존성: Apify OAuth 연결과 Actor/dataset 접근 권한이 필요하다.
- 다음 작업에 영향을 줄 위험: 기존 `scraped_at`과 마지막 성공 `finished_at`은 2026-08-25 16:54~16:56 KST이며, 이번 요청 시각의 최신 상태를 반영하지 않는다.

## 8. 다음 작업 지침

- 다음 작업 ID와 이름: W11 운영자 수동 갱신 재실행
- 시작 전에 읽을 파일: `docs/MANUAL_NOTICE_REFRESH.md`, `src/lib/notices/apify-result.ts`, 이 일지
- 첫 번째로 할 일: Apify MCP를 다시 인증하고 현재 세션에 Actor 실행 도구가 보이는지 확인한다.
- 유지해야 할 인터페이스/결정: 세 출처 독립 실행, 정상 행만 upsert, 실패 출처 기존 데이터 보존, 출처별 `crawl_runs` 기록.
- 피해야 할 함정: Actor 실행 접수나 `SUCCEEDED` 상태만으로 저장 성공이라 보고하지 말고 dataset 정상 행과 Supabase 반영 표본까지 확인한다.
