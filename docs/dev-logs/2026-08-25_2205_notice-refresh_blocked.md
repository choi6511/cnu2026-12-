# 개발일지 — 공지 수동 갱신 차단

## 메타데이터

- 상태: `막힘`
- 작업: 운영자 공지 갱신 요청
- 일시: `2026-08-25 22:05 KST`

## 결과

Apify MCP의 OAuth refresh token이 `invalid_grant`로 거부되어 세 출처 Actor 실행을 시작하지 못했다. 따라서 이번 실행에서 Supabase `notices`와 `crawl_runs`는 변경하지 않았고, 기존 공지 데이터를 보존했다.

## 필요한 조치

Apify MCP 연결을 다시 인증한 뒤 동일한 요청을 재실행한다. 재인증 전에는 실행 접수나 저장 성공으로 보고하지 않는다.

## 다음 실행 절차

Apify 인증 확인 → library·language-center·industry-center 독립 실행 → dataset 완료 확인 → 결과 정규화 → 성공 출처만 Supabase upsert → `crawl_runs`와 저장 표본 재검증.
