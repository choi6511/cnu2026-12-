# 개발일지 — 공지 화면 조회 오류 진단

## 메타데이터

- 상태: `진행 중`
- 시작 시각: `2026-08-25 22:48 KST`
- 종료 시각: `2026-08-25 22:53 KST`
- 관련 요구사항: `PRD.md` 7.3, 10.3 / W12·W14
- 이전 일지: `docs/dev-logs/2026-08-25_2247_W11_complete.md`

## 1. 작업 개요

- 이번 작업 단위에서 확인한 것: Supabase에 반영된 공지가 프로덕션 앱에 표시되지 않는 원인.
- 실제로 완료한 범위: 프로덕션 오류 재현, 클라이언트 조회 코드·Supabase 데이터·RLS·공개 권한·배포 번들을 확인했다.
- 범위에서 제외하거나 다음으로 넘긴 것: Vercel Production 환경변수 수정과 재배포, 수정 후 브라우저 재검증.

## 2. 변경 사항

| 파일 | 변경 내용 | 이유 |
| --- | --- | --- |
| `docs/dev-logs/2026-08-25_2253_notice-ui-diagnosis_in-progress.md` | 진단 증거와 복구 절차 기록 | 코드·DB를 추측으로 수정하지 않고 다음 작업을 명확히 하기 위해 |

코드와 Supabase 데이터는 변경하지 않았다.

## 3. 구현 판단

- 선택한 구조 또는 접근: 프로덕션 브라우저 오류와 DB의 anon 권한·RLS를 분리해 확인했다.
- 대안과 선택 이유: 데이터 재수집이나 RLS 완화는 수행하지 않았다. DB 저장·권한이 정상인 상황에서 문제는 배포 설정 경계에 있다.
- PRD 또는 기존 구현과의 관계: 브라우저에는 public Supabase URL·publishable key만 제공하고, secret key는 노출하지 않는 원칙을 유지한다.

## 4. 문제 및 막힌 지점

- 증상: `/places/library/notices`에서 `최근 공지를 불러오지 못했어요`가 표시된다.
- 재현 방법: Production URL `https://cnu2026-12-five.vercel.app/places/library/notices`를 열고 조회 완료를 기다린다.
- 원인: `getPublicSupabaseClient()`는 `NEXT_PUBLIC_SUPABASE_URL` 또는 `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`가 없으면 `null`을 반환한다. Production 번들에서 Supabase 프로젝트 URL이 확인되지 않았고, 이 경로가 화면의 error 상태를 만든다.
- 영향을 받은 범위: 세 장소의 공지 조회와 마지막 성공 갱신 시각 표시.

## 5. 해결 방법

- 시도한 방법: Production 브라우저 재현, 코드 경로 확인, Supabase 데이터·RLS·anon SELECT 권한 및 번들 공개 설정 점검.
- 최종 해결책: Vercel 프로젝트 `cnu2026-12`의 Production 환경변수에 `NEXT_PUBLIC_SUPABASE_URL`과 `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`를 올바른 값으로 설정하고 재배포한다.
- 같은 문제가 재발할 때 확인할 항목: Vercel의 Production/Preview 환경 구분, 변수명 철자, 값 입력 후 새 Production deployment 생성 여부.

## 6. 검증 결과

| 검증 | 실행 방법 | 결과 | 비고 |
| --- | --- | --- | --- |
| Production 화면 | in-app Browser에서 library notices 페이지 확인 | 실패 재현 | 동일 오류 UI 표시 |
| Supabase 데이터 | `notices`, `crawl_runs` 조회 | 통과 | 출처별 notices 15·21·12건 |
| RLS·권한 | 정책과 anon SELECT grant 조회 | 통과 | notices SELECT, 성공 crawl_runs SELECT 정상 |
| Production 번들 | 공개 Supabase 설정 포함 여부 읽기 | 실패 원인 확인 | Supabase 프로젝트 URL 미포함 |
| 앱 코드 경로 | `PlaceNoticeList`, `getPublicSupabaseClient` 확인 | 통과 | 공개 URL/key 누락 시 error 상태가 확정됨 |

## 7. 미해결 사항 및 위험

- 남은 문제: Vercel Production 환경변수 설정·재배포가 필요하다.
- 임시 처리 또는 mock: 없음.
- 외부 키·계정·콘텐츠 의존성: Vercel 프로젝트 환경변수 편집 권한.
- 다음 작업에 영향을 줄 위험: `SUPABASE_SECRET_KEY`나 Apify token을 public 변수에 넣으면 안 된다.

## 8. 다음 작업 지침

- 다음 작업 ID와 이름: W14 프로덕션 운영 통합 재검증
- 시작 전에 읽을 파일: `src/lib/env/public.ts`, `src/lib/supabase/public.ts`, 이 일지
- 첫 번째로 할 일: Vercel에서 public Supabase 환경변수 두 개를 설정하고 Production 재배포 후 세 공지 화면을 브라우저로 확인한다.
- 유지해야 할 인터페이스/결정: 공개 URL·publishable key만 브라우저에 노출하고, DB 쓰기 key는 비공개로 유지한다.
- 피해야 할 함정: 데이터를 다시 수집하거나 RLS를 넓히는 것으로 배포 환경변수 누락을 덮는 것.
