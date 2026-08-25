# 차차 캠퍼스 — 충남대학교 캠퍼스 탐방 PWA

**에픽 스펙 · 24시간 3인 부트캠프 MVP**

> 이 문서는 2026-08-24에 작성한 상세 구현 참고 자료다. 제품 범위는 `PRD.md`, 전체 구조는 `docs/SYSTEM_ARCHITECTURE.md`, 구현 순서와 현재 상태는 `docs/DEVELOPMENT_PRIORITY.md` 및 최신 개발일지를 우선한다.

> **2026-08-25 운영 방식 변경:** 공지 수집은 Octoparse 작업 3개를 운영자가 필요할 때 수동 실행하고 Supabase에 반영한다. 아래의 자체 크롤러, `/api/cron/notices`, `CRON_SECRET`, 매일 18시 Vercel Cron 설명은 폐기된 과거 설계이며 구현하지 않는다.

| 항목 | 값 |
|---|---|
| 원본 기획서 | `PRD.md` (충남대학교 캠퍼스 탐방 PWA) |
| 작성일 | 2026-08-24 |
| 현재 코드 | Next.js 앱은 아직 없음 · Supabase 스키마와 설계 문서만 존재 |
| 목표 | 24시간 내 배포 + 발표 시연 성공 |
| 팀 | 학부생 3인 (A 통합·배포 / B 화면·PWA / C 콘텐츠·데이터·검증) |
| 스택 | Next.js App Router · TypeScript · 카카오맵 JS API · Supabase · Vercel |

---

## 1. Context — 왜 지금 이걸 만드는가

충남대 캠퍼스는 넓고 시설이 많아 신입생이 주요 건물의 위치와 역할을 익히기 어렵다. 동시에 도서관·국제언어교육센터·산학협력단의 공지가 **서로 다른 세 홈페이지**에 흩어져 있어 새 공지를 확인하려면 사이트 세 곳을 각각 방문해야 한다.

이 제품은 두 문제를 하나의 앱에서 푼다.

- **신입생 관점** — 지도에서 장소를 찾고, 가서 사진을 찍으면 그 장소의 캐릭터가 도감에 쌓인다. 탐방할 이유가 생긴다.
- **제품 관점** — 로그인·GPS·QR·AI 판별을 전부 빼고 "사진 제출 = 방문 인증"으로 단순화해서, 24시간 안에 **확실히 동작하는 흐름 하나**를 완성한다.
- **엔지니어링 관점** — 사용자 데이터는 전부 기기(IndexedDB)에 두고 서버는 공지만 저장한다. 인증·동기화·업로드가 통째로 사라져서 3인 24시간에 들어온다.

**Why now:** 발표에서 시연할 흐름은 하나뿐이다 — 지도 → 장소 선택 → 사진 제출 → 캐릭터 획득 → 도감 저장. 이 흐름이 2분 안에 성공하지 못하면 나머지를 다 만들어도 의미가 없다.

---

## 2. Current State — 검증된 현재 상태

### 2.1 코드베이스

`find . -name package.json -o -name next.config.*` → **결과 없음.** 저장소에 애플리케이션 코드가 존재하지 않는다. 첫 작업은 Next.js 스캐폴딩이다.

> 이 폴더 루트의 `PRD.md`와 `AGENTS.md`가 이 프로젝트의 상위 기준이다. 시스템 책임과 데이터 흐름은 `docs/SYSTEM_ARCHITECTURE.md`를 함께 따른다.

### 2.2 공지 출처 3곳 — 실측 결과 (2026-08-24, 실제 HTTP GET)

세 사이트 모두 **서버 사이드 렌더링**이다. Puppeteer / Playwright 불필요. `fetch` + `cheerio`로 충분하다.

| 출처 ID | 목록 URL | HTTP | 행 컨테이너 | 제목 셀 | 날짜 셀 | 날짜 형식 | href 형태 | 1페이지 행 수 |
|---|---|---|---|---|---|---|---|---|
| `library` | `https://library.cnu.ac.kr/bbs/list/1` | 200 | `table.mobileTable tbody tr` | `td.title a` | `td.reportDate` | `2026-08-24` | 루트 절대 `/bbs/content/1_63363` | 15 |
| `language-center` | `https://dream.cnu.ac.kr/bbs/list.php?wcode=02` | 200 | `table.list-1 tbody tr` | `td:nth-child(2) a` | `td:nth-child(4)` | `2026-05-29` | 문서 상대 `view.php?wnum=190&wcode=02` | 21 |
| `industry-center` | `https://iuc.cnu.ac.kr/iuc/customer/notice.do?mode=list` | 200 | `table.board-table tbody tr` | `td:nth-child(2) a` | `td:nth-child(5)` | **`26.08.18`** | 쿼리 상대 `?mode=view&articleNo=594686` | 12 |

### 2.3 실측에서 나온 함정 4개 — 전부 조용히 깨지는 종류

**함정 1 — `iuc`는 `?mode=list`가 없으면 빈 목록을 준다.**
PRD §6.1에 적힌 URL `https://iuc.cnu.ac.kr/iuc/customer/notice.do`를 그대로 치면 HTTP 200에 75KB가 오지만 `<tbody>`가 비어 있다. `<thead>`(번호/제목/첨부/작성자/등록일/조회수)만 렌더링된다. `?mode=list`를 붙여야 12행이 나온다. **크롤러 URL은 반드시 `?mode=list` 포함.**

**함정 2 — `iuc`만 2자리 연도(`YY.MM.DD`)를 쓴다.**
`26.08.18`을 `new Date("26.08.18")`에 넣으면 브라우저·Node 버전에 따라 `Invalid Date` 또는 서기 26년이 된다. 세 어댑터가 **날짜 파서를 공유하면 안 된다.** 출처별 파서를 분리하고, 파싱 실패한 행은 저장하지 않고 `crawl_runs.error_message`에 기록한다 (PRD §9.4).

**함정 3 — 고정 공지(`공지`)가 목록 상단을 점거한다. 상위 N행만 읽으면 최근 글을 통째로 놓친다.**

실측 상위 5행 날짜:

| 출처 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| `library` | 2026-08-24 (고정) | 2026-08-11 (고정) | 2026-08-03 (고정) | 2026-07-27 (고정) | 2026-07-21 (고정) |
| `language-center` | 2026-05-29 (고정) | 2024-12-19 (고정) | 2024-02-01 (고정) | 2023-09-19 (고정) | 2023-07-06 (고정) |
| `industry-center` | 2025-09-17 (고정) | 2025-04-18 (고정) | **2026-08-18 (일반)** | 2026-08-07 (일반) | 2026-08-04 (일반) |

`language-center`는 상위 5행이 전부 2023~2026년 5월 고정 글이다. 상위 10행만 읽는 크롤러는 이 출처에서 **최근 글을 0건** 가져온다. → **1페이지 전체 행을 읽는다.** 페이지네이션은 MVP에서 하지 않는다 (1페이지에 12~21행이면 7일 창을 덮고도 남는다).

**함정 4 — href 상대 경로 규칙이 셋 다 다르다.**
루트 절대(`/bbs/...`), 문서 상대(`view.php?...`), 쿼리 상대(`?mode=view...`). 세 경우 모두 `new URL(href, LIST_URL).toString()` **한 줄로 정확히 해결된다.** 단 두 번째 인자는 origin이 아니라 **목록 URL 전체**여야 한다. `new URL("?mode=view&articleNo=1", "https://iuc.cnu.ac.kr/iuc/customer/notice.do?mode=list")` → `https://iuc.cnu.ac.kr/iuc/customer/notice.do?mode=view&articleNo=1` ✅

### 2.4 최근 7일 창의 실제 밀도 — 제품 결정이 필요했던 지점

2026-08-24 기준 최근 7일(08-18 ~ 08-24) 공지 수:

| 출처 | 최신 글 | 최근 7일 |
|---|---|---|
| `library` | 2026-08-24 | **1건** |
| `language-center` | 2026-08-20 | **1건** |
| `industry-center` | 2026-08-18 | **1건** |

**장소당 1건.** 발표 당일 0건이 될 수도 있다. 그러면 공지 화면이 빈 상태 문구 한 줄만 남고, 크롤러·Supabase·크론까지 다 만든 P1 기능이 화면상 죽은 것처럼 보인다.

**결정 (D1):** PRD §9.4의 7일 규칙을 그대로 유지한다. 최근 7일 결과가 0건이면 PRD의 빈 상태 문구만 표시한다. `지난 공지` 노출은 제품 범위 확장이므로 PRD가 변경되기 전에는 구현하지 않는다.

### 2.5 아직 존재하지 않는 자산 — C 역할의 블로커

| 자산 | 상태 | 없으면 막히는 것 |
|---|---|---|
| 장소 3곳의 카카오맵 좌표 (위도/경도) | ❌ 미확보 | S2 지도 마커 |
| 장소 소개 문구 3개 (1~2문단) | ❌ 미작성 | S2 장소 소개 화면 |
| 장소 대표 이미지 3장 | ❌ 미확보 | S2 장소 소개 화면 |
| 장소 캐릭터 이미지 3종 (차차 파생) | ❌ 미제작 | S3 획득 연출·도감 |
| 카카오맵 JS 키 + 도메인 등록 | ❌ 미설정 | S1 |
| Supabase 프로젝트 | ✅ 생성 및 공지 스키마 적용 · 앱 연결은 미완료 | W09 나머지 범위 |

**전부 임시본으로 먼저 개발하고 파일만 교체한다** (PRD §8). 캐릭터는 동일 파일명·동일 캔버스의 플레이스홀더로 시작한다. 최종 캐릭터를 생성할 때는 `CHA-CHA)Design System/`의 `readme.md`, `assets/brand-sheet.png`, 5방향 `assets/mascot-*.png`, 표정·포즈 자산과 금지 규칙을 기준으로 삼는다.

---

## 3. 하위 스펙 — 에픽 분해

| # | 스펙 | 시간대 | 담당 | 우선순위 | 선행 |
|---|---|---|---|---|---|
| S1 | 프로젝트 골격과 배포 파이프라인 | 0–3h | A | P0 | — |
| S2 | 지도 화면과 장소 소개 | 3–8h | A+B | P0 | S1 |
| S3 | 방문 인증 · 캐릭터 획득 · 도감 | 8–13h | B | P0 | S1 |
| S4 | 공지 수집 파이프라인 | 13–18h | A | P1 | S1 |
| S5 | PWA와 오프라인 정책 | 18–21h | B | P1 | S2, S3 |
| S6 | 검증과 발표 대비 | 21–24h | C | P0 | 전체 |

### 3.1 의존성 그래프

```
S1 골격·배포 ─┬─> S2 지도·장소소개 ─┬─> S5 PWA·오프라인 ──> S6 검증·발표
              ├─> S3 인증·도감 ─────┘                        ▲
              └─> S4 공지 파이프라인 ───────────────────────┘

C 역할(좌표·문구·이미지·캐릭터)은 S1과 병렬로 0h부터 시작 — S2의 블로커다.
```

### 3.2 시퀀싱 근거

- **S1이 먼저인 이유:** 배포가 마지막에 오면 24시간째에 빌드 오류로 죽는다. 0–3h에 "빈 페이지 하나가 Vercel HTTPS로 열림"까지 끝내고, 이후는 계속 배포되는 상태를 유지한다.
- **S2와 S3가 S4보다 먼저인 이유:** 둘이 P0(시연 흐름)이고 S4는 P1이다. 13시간째에 P0가 안 끝났으면 S4를 통째로 버리고 "마지막 성공 데이터" 화면만 남긴다.
- **S3가 S2에 의존하지 않는 이유:** 인증 화면은 `/places/[slug]/verify`로 직접 접근 가능하다. B는 지도가 없어도 인증·도감을 병렬로 만들 수 있다.
- **S5가 S2·S3 뒤인 이유:** 서비스 워커가 캐시할 대상(화면·정적 소개·도감)이 존재해야 오프라인 정책을 검증할 수 있다.

---

## 4. S1 — 프로젝트 골격과 배포 파이프라인 (0–3h, A)

### 구현 내용

```bash
npx create-next-app@latest cnu-campus --typescript --app --no-tailwind --eslint
```

정적 장소 데이터를 타입 지정 로컬 파일로 만든다. **좌표는 C가 확인해 채운다 — 추측 금지.**

```ts
// src/data/places.ts
export type PlaceId = 'library' | 'language-center' | 'industry-center';

export type Place = {
  id: PlaceId;
  name: string;            // 표시 이름
  lat: number;             // 카카오맵에서 확인한 실제 좌표
  lng: number;
  summary: string;         // 1~2문단 소개
  locationHint: string;    // 주소 또는 캠퍼스 내 위치 설명
  heroImage: string;       // /places/library.webp
  characterImage: string;  // /characters/library.webp
  characterName: string;   // 도감·획득 모달 표시명
  noticeListUrl: string;   // 크롤러가 사용하는 목록 URL
};

export const PLACES: readonly Place[] = [ /* 3개 */ ] as const;
export const getPlace = (id: string): Place | undefined =>
  PLACES.find((p) => p.id === id);
```

### 라우팅

| 경로 | 화면 |
|---|---|
| `/` | 지도 |
| `/places/[slug]` | 장소 소개 |
| `/places/[slug]/notices` | 최근 공지 |
| `/places/[slug]/verify` | 방문 인증 |
| `/collection` | 캐릭터 도감 |
| `/api/cron/notices` | 크론 엔드포인트 (Node.js 런타임) |

`[slug]`가 `PLACES`에 없으면 `notFound()`.

### 환경변수

| 이름 | 공개 | 용도 |
|---|---|---|
| `NEXT_PUBLIC_KAKAO_MAP_KEY` | 공개 | 카카오맵 JS 키 |
| `NEXT_PUBLIC_SUPABASE_URL` | 공개 | Supabase URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | 공개 | 공지 읽기 |
| `SUPABASE_SECRET_KEY` | **비공개** | 크롤러 DB 쓰기 |
| `CRON_SECRET` | **비공개** | 크론 호출 검증 |

`.env.example`에는 **변수명만** 기록한다. 비밀값은 `.env.local`과 Vercel 환경변수에만 둔다.

카카오맵 허용 도메인에 **셋 다** 사전 등록: `http://localhost:3000`, Vercel preview 도메인, production 도메인. (PRD §20 위험 항목)

### 완료 조건

1. `npm run build`가 경고 없이 통과한다.
2. Vercel production URL이 HTTPS로 열리고 하단 내비게이션 2개(지도/캐릭터 도감)가 보인다.
3. 6개 경로가 모두 404 없이 응답한다.
4. `PLACES` 배열이 3개 원소를 가지며 타입 오류가 없다.
5. `git grep SUPABASE_SECRET_KEY` 결과가 `.env.example`과 서버 코드에만 나온다.

**공수:** 프로젝트 생성 30분 + 라우팅/데이터 40분 + 계정 3종(Supabase/Vercel/카카오) 60분 + 배포 검증 30분 = **약 2.7h**

---

## 5. S2 — 지도 화면과 장소 소개 (3–8h, A+B)

### 5.1 지도 `/`

카카오맵 JS API는 **Client Component에서만** 초기화한다 (`'use client'`). SDK는 `next/script`의 `strategy="afterInteractive"`로 로드하고 `autoload=false` + `kakao.maps.load()` 콜백 안에서 지도를 만든다.

- 중심: 충남대 캠퍼스 (세 장소의 좌표 평균), `level: 4` 부터 시작해 세 마커가 다 보이게 조정
- 마커 3개 + 장소 이름이 보이는 `CustomOverlay` 또는 `InfoWindow`
- 마커 클릭 → `router.push('/places/' + place.id)`
- **GPS 권한 요청 금지** — `navigator.geolocation` 호출 자체를 넣지 않는다
- 오프라인(`navigator.onLine === false`)이면 지도 대신 안내: `인터넷 연결 후 지도를 확인할 수 있어요`

### 5.2 장소 소개 `/places/[slug]`

정적 데이터만 쓰는 **서버 컴포넌트**로 만든다 (오프라인 캐시 대상). 필수 요소:

대표 이미지 · 장소명 · 1~2문단 소개 · 위치 설명 · `최근 공지 보기` 버튼 · `방문 인증하기` 버튼 · 이미 획득했다면 `캐릭터 획득 완료` 배지.

획득 여부는 IndexedDB를 읽어야 하므로 배지만 작은 Client Component로 분리한다.

두 버튼은 **시각적으로 명확히 구분**한다 (PRD §14): `방문 인증하기`는 navy 채움(주 행동), `최근 공지 보기`는 아웃라인. 둘 다 한 손으로 닿는 하단 영역.

### 5.3 완료 조건

1. 온라인 Chrome에서 카카오맵이 충남대 캠퍼스를 중심으로 뜨고 마커 3개가 **동시에 화면 안에** 보인다.
2. 마커 3개를 각각 눌렀을 때 각각 다른 올바른 장소 소개로 이동한다 (3/3).
3. 세 장소의 이름·이미지·소개·위치 설명이 서로 뒤바뀌지 않았다.
4. `최근 공지 보기` → `/places/[slug]/notices`, `방문 인증하기` → `/places/[slug]/verify`로 이동한다 (6/6).
5. DevTools Offline 체크 시 지도 자리에 안내 문구가 뜨고, 장소 소개는 정상 표시된다.
6. 앱 전체에서 위치 권한 팝업이 한 번도 뜨지 않는다.

**공수:** 카카오맵 연동 90분 + 마커/이동 45분 + 장소 소개 UI 90분 + 오프라인 분기 30분 = **약 4.3h**

---

## 6. S3 — 방문 인증 · 캐릭터 획득 · 도감 (8–13h, B)

**시연의 심장.** 여기가 P0 중의 P0다.

### 6.1 인증 화면 `/places/[slug]/verify`

두 입력 경로를 **각각** 둔다.

```html
<!-- 카메라 촬영 -->
<input type="file" accept="image/*" capture="environment" />
<!-- 사진첩 선택 -->
<input type="file" accept="image/*" />
```

`capture="environment"`가 후면 카메라를 유도한다. 미지원 기기는 자동으로 파일 선택으로 폴백하므로 별도 분기 불필요.

### 6.2 동작 순서 (PRD §7.4)

1. 사진 선택 전 `인증 완료` **비활성화** (`disabled`, `cursor: not-allowed`)
2. 선택 파일이 이미지인지 확인 — `file.type.startsWith('image/')`. 아니면 `지원하지 않는 파일이에요` 표시 후 중단
3. 미리보기 렌더 + `다시 선택` 버튼
4. `인증 완료` 클릭 → 압축 → IndexedDB 저장 → 최초 획득이면 연출
5. 이미 획득한 장소면 **새 캐릭터를 주지 않고** 기존 기록도 교체하지 않는다

### 6.3 이미지 압축

```ts
// 최대 변 1280px, JPEG/WebP quality 0.75
async function compress(file: File): Promise<{ blob: Blob; mimeType: string }> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1280 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise<Blob | null>((res) =>
    canvas.toBlob(res, 'image/jpeg', 0.75)
  );
  if (!blob) throw new Error('IMAGE_ENCODE_FAILED');
  return { blob, mimeType: 'image/jpeg' };
}
```

`createImageBitmap` 실패(HEIC 등 미지원 코덱)는 `이미지를 처리할 수 없어요. 다른 사진을 선택해주세요`로 안내하고 재시도시킨다.

### 6.4 IndexedDB

```ts
type CollectionRecord = {
  placeId: PlaceId;        // 고유 키 (keyPath)
  acquiredAt: string;      // ISO 8601
  photoBlob: Blob;
  photoMimeType: string;
};
```

- DB `cnu-campus`, 스토어 `collection`, `keyPath: 'placeId'`
- `add()`를 쓴다 (`put()` 아님) — 중복 획득 시 `ConstraintError`로 자연히 막힌다
- **서버로 전송하지 않는다**
- 저장 공간 부족(`QuotaExceededError`)이면 획득 처리 **전에** 오류를 보여주고 재시도하게 한다

### 6.5 획득 연출

전체 화면 또는 큰 모달로: 캐릭터 이미지 · `새 캐릭터를 획득했어요!` · 캐릭터/장소 이름 · `도감에서 확인하기` · `지도로 돌아가기`.

애니메이션은 **CSS 확대 + 페이드 인**으로 제한한다 (PRD §7.5). 차차 디자인 시스템 기준: `420ms cubic-bezier(0.34, 1.56, 0.64, 1)`, `opacity 0→1` + `translateY(12px)→0` + `scale(0.94)→1`. `prefers-reduced-motion`이면 transform을 빼고 opacity만 남긴다.

### 6.6 도감 `/collection`

**고정 3슬롯**을 항상 표시한다. 획득 여부와 무관하게 슬롯 수는 3으로 고정.

| 상태 | 표시 |
|---|---|
| 미획득 | 어두운 실루엣 + 장소 이름 + `아직 발견하지 못했어요` |
| 획득 | 캐릭터 이미지 + 장소 이름 + 획득 날짜 |
| 획득 카드 선택 | 해당 인증사진 표시 (`URL.createObjectURL(photoBlob)`) |

상단에 `3개 중 N개 획득` 진행 상태. 하단에 한 줄 안내: `기록은 이 기기에만 저장돼요. 브라우저 데이터를 지우면 사라질 수 있어요.`

⚠️ `createObjectURL`로 만든 URL은 언마운트 시 `revokeObjectURL`로 반드시 해제한다. 3장뿐이라 실사용 문제는 없지만 새로고침을 반복하는 시연에서 누수가 쌓인다.

### 6.7 완료 조건

1. 카메라 경로와 사진첩 경로가 **둘 다** 존재하고 각각 파일을 받는다.
2. 사진 선택 전에는 `인증 완료`를 누를 수 없다 (disabled).
3. 선택한 사진이 제출 전에 미리보기로 보인다.
4. 이미지가 아닌 파일(`.txt` 등) 선택 시 안내가 뜨고 진행이 막힌다.
5. 사진 제출 시 해당 장소 캐릭터가 **최초 1회만** 지급된다.
6. 같은 장소에서 다시 인증해도 `3개 중 N개 획득`의 N이 증가하지 않는다.
7. 세 장소가 각각 **다른** 캐릭터를 지급한다 (3/3).
8. 페이지 새로고침 후에도 획득 기록과 인증사진이 남아 있다.
9. 저장된 사진의 최대 변이 1280px 이하다.
10. 첫 실행 시 도감의 세 슬롯이 모두 잠금 상태다.

**공수:** 입력·미리보기 60분 + 압축 60분 + IndexedDB 70분 + 획득 모달 60분 + 도감 90분 = **약 5.7h**

---

## 7. S4 — 공지 수집 파이프라인 (13–18h, A)

### 7.1 Supabase 스키마

```sql
create table notices (
  id            uuid primary key default gen_random_uuid(),
  source_id     text        not null,
  title         text        not null,
  published_at  timestamptz not null,
  original_url  text        not null,
  scraped_at    timestamptz not null default now(),
  unique (source_id, original_url)
);
create index notices_source_published_idx
  on notices (source_id, published_at desc);

create table crawl_runs (
  id            uuid primary key default gen_random_uuid(),
  source_id     text        not null,
  status        text        not null check (status in ('success','failed')),
  item_count    integer     not null default 0,
  error_message text,
  started_at    timestamptz not null,
  finished_at   timestamptz not null
);
create index crawl_runs_source_finished_idx
  on crawl_runs (source_id, finished_at desc);
```

### 7.2 RLS — 읽기만 공개

```sql
alter table notices    enable row level security;
alter table crawl_runs enable row level security;

create policy "public read notices"
  on notices for select to anon using (true);
create policy "public read crawl_runs"
  on crawl_runs for select to anon using (true);

-- INSERT / UPDATE / DELETE 정책은 만들지 않는다.
-- RLS가 켜진 상태에서 정책이 없으면 anon 쓰기는 전부 거부된다.
-- 쓰기는 SUPABASE_SECRET_KEY(service role)로만 수행한다.

revoke insert, update, delete on notices, crawl_runs from anon, authenticated;
```

신규 프로젝트의 Data API 자동 노출 설정에 따라 `GRANT SELECT`가 필요할 수 있다. **`anon` 키로 실제 SELECT/INSERT를 직접 쳐서 확인한다** (§7.7 완료조건 5·6).

### 7.3 어댑터 인터페이스

```ts
export type NoticeInput = {
  sourceId: PlaceId;
  title: string;
  publishedAt: Date;    // KST 자정 기준으로 정규화된 UTC 시각
  originalUrl: string;  // 절대 URL
};

export type CrawlAdapter = {
  sourceId: PlaceId;
  listUrl: string;
  crawl: () => Promise<NoticeInput[]>;
};
```

세 함수: `crawlLibraryNotices()` / `crawlLanguageCenterNotices()` / `crawlIndustryCenterNotices()`.

### 7.4 어댑터별 확정 선택자 — §2.2 실측값 그대로

```ts
// library — https://library.cnu.ac.kr/bbs/list/1
$('table.mobileTable tbody tr').each(...)
//   title : $tr.find('td.title a').text().trim()
//   href  : $tr.find('td.title a').attr('href')      // "/bbs/content/1_63363"
//   date  : $tr.find('td.reportDate').text().trim()  // "2026-08-24"  → YYYY-MM-DD

// language-center — https://dream.cnu.ac.kr/bbs/list.php?wcode=02
$('table.list-1 tbody tr').each(...)
//   title : $tr.find('td').eq(1).find('a').text().trim()
//   href  : $tr.find('td').eq(1).find('a').attr('href')  // "view.php?wnum=190&wcode=02"
//   date  : $tr.find('td').eq(3).text().trim()           // "2026-05-29" → YYYY-MM-DD

// industry-center — https://iuc.cnu.ac.kr/iuc/customer/notice.do?mode=list
//   ⚠️ ?mode=list 없으면 tbody 가 빈다
$('table.board-table tbody tr').each(...)
//   title : $tr.find('td').eq(1).find('a').text().trim()
//   href  : $tr.find('td').eq(1).find('a').attr('href')  // "?mode=view&articleNo=594686"
//   date  : $tr.find('td').eq(4).text().trim()           // "26.08.18" → ⚠️ YY.MM.DD
```

**URL 절대화 — 세 경우 모두 이 한 줄로 해결된다:**

```ts
const absolute = new URL(href, adapter.listUrl).toString();
```

두 번째 인자는 origin이 아니라 **목록 URL 전체**여야 한다.

**날짜 파싱 — 출처별로 분리한다:**

```ts
// library / language-center
function parseYmd(s: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s.trim());
  return m ? kstMidnightToUtc(+m[1], +m[2], +m[3]) : null;
}

// industry-center  ⚠️ 2자리 연도
function parseYyMmDd(s: string): Date | null {
  const m = /^(\d{2})\.(\d{2})\.(\d{2})$/.exec(s.trim());
  return m ? kstMidnightToUtc(2000 + +m[1], +m[2], +m[3]) : null;
}

// KST 자정 → UTC 시각. KST = UTC+9 이므로 전날 15:00Z.
function kstMidnightToUtc(y: number, mo: number, d: number): Date {
  return new Date(Date.UTC(y, mo - 1, d, 0, 0, 0) - 9 * 60 * 60 * 1000);
}
```

`null`이 나온 행은 **저장하지 않고** 파싱 실패 건수를 `error_message`에 남긴다.

### 7.5 크롤링 규칙

- 외부 요청은 **서버에서만** — 브라우저 CORS 회피 (Node.js 런타임 Route Handler)
- 기관 서버 요청은 **하루 1회**, 출처당 목록 페이지 **1회**
- **1페이지 전체 행**을 읽는다. 상위 N행 자르기 금지 (§2.3 함정 3)
- `Promise.allSettled`로 세 출처 독립 실행
- 한 출처 실패가 다른 출처 갱신을 막지 않는다
- HTTP 오류 / HTML 파싱 오류 / DB 오류를 구분해 기록
- 요청 타임아웃 15초, `User-Agent` 명시

### 7.6 실패 처리 (PRD §9.5)

- 실패한 출처의 **기존 공지를 삭제하거나 덮어쓰지 않는다**
- 성공한 출처만 `upsert(onConflict: 'source_id,original_url')`
- 화면에는 그 출처의 마지막 성공 갱신 시각을 계속 표시

```sql
-- 마지막 성공 갱신 시각
select source_id, max(finished_at) as last_success
from crawl_runs where status = 'success' group by source_id;
```

### 7.7 크론과 인증

```json
// vercel.json
{ "crons": [{ "path": "/api/cron/notices", "schedule": "0 9 * * *" }] }
```

`0 9 * * *` UTC = **18:00 Asia/Seoul**.

```ts
export const runtime = 'nodejs';

export async function GET(req: Request) {
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }
  // ...
}
```

### 7.8 화면 `/places/[slug]/notices`

기관 이름 · 마지막 성공 갱신 시각 · 최근 7일 목록(제목 + 작성일) · `원문 보기` 링크(`target="_blank" rel="noopener noreferrer"`) · 빈 상태 · 오프라인 안내.

**7일 기준:** `published_at >= (오늘 00:00 KST) - 6일` — 오늘 포함 7개 달력 날짜. 정렬은 게시일 최신순.

**빈 상태 (D1 결정):** 최근 7일 결과가 0건이면 `최근 7일 안에 올라온 공지가 없어요`를 표시한다. 과거 공지는 덧붙이지 않는다.

**공지 본문은 앱에 저장하거나 복제하지 않는다.**

### 7.9 완료 조건

1. 세 출처에서 제목·작성일·원문 URL을 수집한다 (3/3, 각 5건 이상).
2. `industry-center`의 `26.08.18` 형식이 2026-08-18로 올바르게 파싱된다.
3. `language-center`에서 고정 공지만이 아니라 최신 일반 공지도 수집된다.
4. 원문 링크 3종이 각각 올바른 상세 페이지를 새 탭에서 연다.
5. `anon` 키로 `select * from notices` → **성공**.
6. `anon` 키로 `insert into notices` → **거부**.
7. 잘못된 `CRON_SECRET`으로 호출 시 HTTP 401.
8. 어댑터 하나를 의도적으로 throw 시켜도 나머지 둘은 정상 upsert되고, 실패 출처의 기존 데이터가 그대로 남는다.
9. 화면에 출처별 마지막 성공 갱신 시각이 표시된다.
10. 7일 창 밖의 공지가 목록에 보이지 않는다.
11. 7일 결과 0건일 때 빈 상태 문구가 표시되고 오래된 공지는 목록에 보이지 않는다.
12. 브라우저 번들과 Git 저장소에 `SUPABASE_SECRET_KEY`가 포함되지 않는다.

**공수:** 스키마·RLS 50분 + 어댑터 3종 110분 + 7일 필터/화면 70분 + 실패 처리 40분 + 크론·인증 40분 = **약 5.2h**

---

## 8. S5 — PWA와 오프라인 정책 (18–21h, B)

### 8.1 Manifest

```json
{
  "name": "차차 캠퍼스 — 충남대학교 캠퍼스 탐방",
  "short_name": "차차 캠퍼스",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#002D72",
  "background_color": "#F5F5F5",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

### 8.2 Service Worker 캐시 정책

| 대상 | 전략 | 이유 |
|---|---|---|
| 앱 셸(HTML/CSS/JS) | precache | 오프라인 기본 구조 |
| 장소 소개 3개 + 대표 이미지 | precache | 오프라인 제공 대상 |
| 캐릭터 이미지 3개 | precache | 도감 오프라인 표시 |
| 카카오맵 타일·SDK | **캐시 금지** | 오프라인 미지원 명시 |
| `/api/**`, Supabase | **network-only** | 공지는 항상 최신 |

### 8.3 오프라인 UX

| 화면 | 오프라인 동작 |
|---|---|
| 지도 `/` | `인터넷 연결 후 지도를 확인할 수 있어요` |
| 장소 소개 | **정상 표시** (정적) |
| 최근 공지 | `최신 공지는 인터넷 연결이 필요해요` |
| 방문 인증 | **정상 동작** (로컬 처리) |
| 도감 | **정상 표시** (IndexedDB) |

빈 화면 대신 항상 안내 문구를 보여준다. 로딩 / 빈 결과 / 오프라인 / 오류를 **각각 다른 상태**로 구분한다.

### 8.4 완료 조건

1. Vercel production URL이 HTTPS로 열린다.
2. 최신 Chrome이 설치 가능한 앱으로 인식한다 (주소창 설치 아이콘 노출).
3. Lighthouse PWA 항목에 installability 오류가 없다.
4. 홈 화면에서 실행하면 브라우저 UI 없이 standalone으로 열린다.
5. 네트워크를 끊고 앱을 실행하면 장소 소개와 도감이 열린다.
6. 네트워크를 끊고 지도·공지에 들어가면 각각 다른 안내 문구가 뜬다.
7. 오프라인에서 방문 인증이 끝까지 동작한다.

**공수:** Manifest·아이콘 45분 + SW·캐시 90분 + 오프라인 분기 45분 = **약 3h**

---

## 9. S6 — 검증과 발표 대비 (21–24h, C)

### 9.1 필수 테스트 시나리오 (PRD §16 전량)

| # | 시나리오 | 통과 |
|---|---|---|
| 1 | 첫 실행에서 도감 3캐릭터가 모두 잠김 | ☐ |
| 2 | 지도에서 중앙도서관 마커 → 올바른 소개 | ☐ |
| 3 | 중앙도서관 공지에 최근 7일 항목만, 원문 링크 열림 | ☐ |
| 4 | 사진첩에서 이미지 선택 → 중앙도서관 캐릭터 획득 | ☐ |
| 5 | 새로고침 후에도 캐릭터와 인증사진 유지 | ☐ |
| 6 | 같은 장소 재인증 시 캐릭터 수 미증가 | ☐ |
| 7 | 나머지 두 장소도 각각 다른 캐릭터 지급 | ☐ |
| 8 | 네트워크 끊고 장소 소개·도감 열림 | ☐ |
| 9 | 네트워크 끊고 지도·공지에 안내 화면 | ☐ |
| 10 | 크롤러 하나 실패시켜도 나머지 둘 갱신 | ☐ |
| 11 | 잘못된 `CRON_SECRET` → 401 | ☐ |
| 12 | secret key가 브라우저 번들·Git에 없음 | ☐ |

**테스트 환경:** 최신 Android Chrome(실기기) 우선, 데스크톱 Chrome 보조. 다른 브라우저는 최선 지원.

### 9.2 테스트 피라미드

| 레이어 | 대상 | 개수 |
|---|---|---|
| 단위 | `parseYmd` / `parseYyMmDd` / `kstMidnightToUtc` / 7일 경계 | +8 |
| 단위 | `new URL(href, listUrl)` 절대화 3종 | +3 |
| 통합 | 어댑터 3종을 **저장된 HTML 픽스처**로 파싱 | +3 |
| 통합 | upsert 중복 방지 · 실패 격리 | +2 |
| E2E(수동) | 지도 → 인증 → 획득 → 도감 (장소 3곳) | +3 |

> HTML 픽스처를 저장해 두면 발표 당일 기관 사이트가 죽어도 파서 테스트가 돌아간다. `curl > tests/fixtures/{source}.html`로 지금 받아둘 것.

### 9.3 발표 대비 자산

- 시연용 인증사진 3장을 발표 기기 사진첩에 **미리 넣어둔다** (현장에서 찍을 시간 없음)
- 크롤러를 발표 전 수동 실행해 세 출처 데이터를 채워둔다
- 기관 사이트 장애 대비: Supabase의 마지막 성공 결과가 화면에 남는지 확인
- 발표 기기의 브라우저 데이터를 **지우지 않는다** (도감이 날아간다)
- 시연 직전 도감을 초기화하려면 DevTools → Application → IndexedDB → `cnu-campus` 삭제

### 9.4 시연 리허설 기준

지도 → 장소 선택 → 사진 선택 → 인증 완료 → 캐릭터 등장 → 도감 확인이 **설명 제외 2분 이내**. 3회 연속 성공할 때까지 반복.

**공수:** 12개 시나리오 3회 반복 100분 + 단위/통합 테스트 60분 + 발표 자산 40분 = **약 3.3h**

---

## 10. 잘 되고 있는 것 / 건드리지 말 것

- **로그인 없음.** 인증·세션·동기화를 다시 넣자는 제안은 24시간 예산을 깬다. 거절한다.
- **사진 내용 판별 안 함.** 사진 제출 자체가 방문 인증이다. "진짜 그 장소인지 확인"은 P2도 아니라 명시적 제외다.
- **서버에 사진 업로드 안 함.** 개인정보 처리 이슈가 통째로 사라진다. 이게 이 설계의 최대 장점이다.
- **장소 3곳 고정.** 4번째 장소는 추가하지 않는다. 자연사박물관도 제외 확정.
- **공지 본문 미복제.** 제목·날짜·링크만. 저작권 리스크를 피하는 설계다.

---

## 11. 명시적 제외 (PRD §6.3)

GPS 방문 확인 · QR 방문 확인 · AI 이미지 분석 · 회원가입/로그인 · 사용자별 서버 저장 · 기기 간 동기화 · 인증사진 서버 업로드 · 캐릭터 레벨/중복/뽑기 · 전체 공지 통합 탭 · 푸시 알림 · 공지 본문 복제 · 관리자 페이지 · 세 장소 외 추가 장소.

---

## 12. 롤백 계획

| 실패 지점 | 롤백 |
|---|---|
| 배포가 깨짐 | Vercel 대시보드에서 직전 성공 배포로 Instant Rollback |
| 크롤러가 잘못된 데이터를 씀 | `delete from notices where scraped_at > '<시각>'` 후 직전 성공분 유지. 삭제 전 `select`로 건수 확인 |
| 크론이 폭주 | `vercel.json`에서 `crons` 제거 후 재배포 (즉시 중단) |
| RLS 설정 실패로 쓰기 노출 | `revoke all on notices from anon;` 즉시 실행 후 정책 재작성 |
| S4가 24시간 내 미완성 | 공지 화면을 "준비 중" 정적 화면으로 대체. **P0 흐름은 무손상** |
| 캐릭터 이미지 미도착 | 임시 이미지 그대로 발표. 파일명·규격 동일하므로 교체만 하면 됨 |

**전제:** 사용자 데이터(IndexedDB)는 롤백 대상이 아니다. 서버에 없으므로 배포 롤백이 사용자 기록에 영향을 주지 않는다.

---

## 13. 공수 요약

| 스펙 | 공수 | 담당 |
|---|---|---|
| S1 골격·배포 | 2.7h | A |
| S2 지도·장소 소개 | 4.3h | A+B |
| S3 인증·획득·도감 | 5.7h | B |
| S4 공지 파이프라인 | 5.2h | A |
| S5 PWA·오프라인 | 3.0h | B |
| S6 검증·발표 | 3.3h | C |
| **합계** | **24.2h** | 3인 병렬 |

3인 병렬이므로 벽시계 시간은 약 10~12시간. 나머지는 통합·디버깅·버퍼다. C의 콘텐츠 작업(좌표·문구·이미지·캐릭터)은 0h부터 병렬로 시작해야 S2를 막지 않는다.

---

## 14. 우선순위

**P0 — 발표 전 반드시:** 카카오맵과 세 마커 · 장소 소개 · 사진 선택 · 캐릭터 최초 1회 획득 · IndexedDB 저장 · 캐릭터 도감 · Vercel 배포

**P1 — 제품 약속:** 두 사진 입력 방식 · 세 홈페이지 실제 크롤링 · 최근 7일 필터 · Supabase 저장 · 매일 18시 자동 실행 · 마지막 성공 갱신 시각 · PWA 설치와 제한적 오프라인

**P2 — 시간 남으면:** 획득 모달 추가 애니메이션 · 지도 마커 커스텀 이미지 · 세밀한 반응형 · 접근성 문구와 키보드 탐색

시간이 부족하면 **디자인 장식과 애니메이션을 먼저 줄인다.** 지도 → 사진 제출 → 캐릭터 획득 → 도감 저장은 끝까지 지킨다.

---

## 15. 위험과 대응

| 위험 | 근거 | 대응 |
|---|---|---|
| `iuc` 크롤러가 0건 반환 | `?mode=list` 없으면 tbody가 빔 (실측) | URL에 `?mode=list` 고정. 통합 테스트로 행 수 > 0 단언 |
| `iuc` 날짜가 서기 26년으로 파싱 | 2자리 연도 `26.08.18` (실측) | 출처별 파서 분리 + 단위 테스트 |
| `language-center` 최근 글 누락 | 상위 5행이 2023~2026.05 고정 글 (실측) | 1페이지 전체 행 파싱. 상위 N 자르기 금지 |
| 발표 당일 공지 0건 | 세 출처 모두 7일 내 1건뿐 (실측) | 빈 상태도 정상 동작으로 설명하고 마지막 성공 갱신 시각을 함께 시연 |
| 발표 당일 기관 사이트 장애 | — | Supabase의 마지막 성공 결과 유지 + 갱신 시각 표시 |
| 카카오맵 도메인 설정 오류 | — | localhost / preview / production 3종 사전 등록 |
| 휴대폰 사진 용량 초과 | — | 클라이언트 압축(1280px, q0.75) 후 저장 |
| 브라우저 데이터 삭제로 도감 소실 | — | 로컬 전용임을 도감에 안내. 발표 기기는 데이터 삭제 금지 |
| HEIC 등 미지원 코덱 | iOS 기본 포맷 | `createImageBitmap` 실패를 잡아 안내 후 재시도 |
| 24시간 내 전 기능 미완성 | — | P0 완성 후 P1 순차 추가. S4는 통째로 버릴 수 있게 격리 |

---

## 16. Definition of Done — 에픽 완료 기준

1. 사용자가 실제 지도에서 세 장소를 발견할 수 있다.
2. 장소를 선택해 소개와 최근 공지로 이동할 수 있다.
3. 사진 촬영 또는 선택 후 장소별 고유 캐릭터를 획득할 수 있다.
4. 획득 기록과 인증사진이 같은 기기의 도감에 유지된다.
5. 세 기관의 최근 7일 공지를 매일 18시에 자동 수집한다.
6. 수집 실패 시 마지막 성공 결과와 갱신 시각을 보여준다.
7. Vercel에 배포되고 Chrome에서 PWA로 설치된다.
8. §9.1의 12개 시나리오가 전부 통과한다.
9. 시연 흐름이 3회 연속 2분 이내로 성공한다.

---

## 17. 파일 레퍼런스

| 파일 | 내용 |
|---|---|
| `src/data/places.ts` | 장소 3곳 정적 데이터 (좌표·문구·이미지·URL) |
| `src/app/page.tsx` | 지도 화면 |
| `src/app/places/[slug]/page.tsx` | 장소 소개 |
| `src/app/places/[slug]/notices/page.tsx` | 최근 공지 |
| `src/app/places/[slug]/verify/page.tsx` | 방문 인증 |
| `src/app/collection/page.tsx` | 캐릭터 도감 |
| `src/app/api/cron/notices/route.ts` | 크론 엔드포인트 (`runtime = 'nodejs'`) |
| `src/components/KakaoMap.tsx` | 카카오맵 Client Component |
| `src/components/AcquireModal.tsx` | 캐릭터 획득 연출 |
| `src/lib/idb.ts` | IndexedDB 래퍼 (`CollectionRecord`) |
| `src/lib/compress.ts` | 이미지 압축 (1280px / q0.75) |
| `src/lib/date-kst.ts` | `parseYmd` / `parseYyMmDd` / `kstMidnightToUtc` |
| `src/lib/crawlers/library.ts` | `crawlLibraryNotices()` |
| `src/lib/crawlers/language-center.ts` | `crawlLanguageCenterNotices()` |
| `src/lib/crawlers/industry-center.ts` | `crawlIndustryCenterNotices()` |
| `src/lib/supabase-server.ts` | service role 클라이언트 (서버 전용) |
| `src/lib/supabase-public.ts` | publishable key 클라이언트 (읽기 전용) |
| `public/characters/{library,language-center,industry-center}.webp` | 캐릭터 3종 |
| `public/icons/icon-{192,512}.png` | PWA 아이콘 |
| `public/manifest.webmanifest` | Web App Manifest |
| `vercel.json` | 크론 `0 9 * * *` |
| `tests/fixtures/{source}.html` | 파서 회귀용 저장 HTML |
| `.env.example` | 변수명만 (값 없음) |

---

## 18. 이 스펙에서 확정한 결정

| ID | 결정 | 근거 |
|---|---|---|
| D1 | 7일 규칙 유지 + 0건일 때 빈 상태만 표시 | PRD의 최근 7일 범위와 빈 상태 요구를 그대로 준수 |
| D2 | 산출물은 Markdown + HTML 두 벌 | 개발 도구용과 공유용 용도가 다름 |
| D3 | 에픽 1 + 하위 스펙 6 | 3인 병렬 작업과 진척 가시성 |
| D4 | 크롤러 URL에 `?mode=list` 고정 (`iuc`) | 실측: 없으면 tbody가 빔 |
| D5 | 날짜 파서를 출처별로 분리 | 실측: `iuc`만 `YY.MM.DD` |
| D6 | 1페이지 전체 행 파싱, 상위 N 자르기 금지 | 실측: `dream` 상위 5행이 전부 오래된 고정 글 |
| D7 | URL 절대화는 `new URL(href, listUrl)` 한 규칙 | 실측: 세 가지 상대경로 형태를 모두 처리 |
| D8 | IndexedDB는 `add()` 사용 (`put()` 아님) | 중복 획득이 `ConstraintError`로 자연 차단 |
| D9 | 서비스명 `차차 캠퍼스` (임시) | PRD §22가 팀 교체를 전제. 발표 덱과 통일 |

---

## 19. 남은 미해결 항목

아래는 스펙으로 정할 수 없고 **팀이 채워야** 하는 값이다. 전부 C 역할이며 0h부터 착수해야 S2를 막지 않는다.

1. 장소 3곳의 카카오맵 좌표 (위도/경도) — 카카오맵에서 직접 확인해 `places.ts`에 하드코딩
2. 장소 소개 문구 3개 (각 1~2문단) + 위치 설명
3. 장소 대표 이미지 3장
4. 캐릭터 이미지 3종 — 차차 360° 시트 기반, 얼굴·체형·색상·비율 동일, 의상과 소품만 변경, 투명 배경, 캔버스 규격 통일
5. 충남대 마스코트 차차의 사용 및 2차 제작 권리·허가 확인
6. 발표 일시와 실제 남은 시간 (타임라인 재조정 필요 여부)
7. 팀원 3명의 A/B/C 역할 배정

---

*본 스펙의 §2 실측 데이터는 2026-08-24 기준이다. 기관 홈페이지 HTML 구조는 예고 없이 바뀔 수 있으므로, 구현 착수 시 `tests/fixtures/`에 HTML을 다시 받아 선택자를 재확인할 것.*
