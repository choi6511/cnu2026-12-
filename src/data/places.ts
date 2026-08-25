export const PLACE_IDS = [
  "library",
  "language-center",
  "industry-center",
] as const;

export type PlaceId = (typeof PLACE_IDS)[number];

export type Place<Id extends PlaceId = PlaceId> = Readonly<{
  id: Id;
  name: string;
  shortName: string;
  coordinates: Readonly<{
    latitude: number;
    longitude: number;
  }>;
  introduction: readonly [string, ...string[]];
  locationDescription: string;
  placeImageAlt: string;
  placeImageStatus: "placeholder" | "provided";
  noticeSourceUrl: `https://${string}`;
  placeImagePath: `/places/${Id}.jpg`;
  characterImagePath: `/characters/${Id}.webp`;
}>;

export const PLACE_IMAGE_SIZE = Object.freeze({ width: 1200, height: 800 });
export const CHARACTER_IMAGE_SIZE = Object.freeze({ width: 1024, height: 1024 });

function definePlace<const Id extends PlaceId>(place: Place<Id>): Place<Id> {
  return place;
}

export const PLACES = [
  definePlace({
    id: "library",
    name: "충남대학교 중앙도서관",
    shortName: "중앙도서관",
    coordinates: { latitude: 36.37014, longitude: 127.346035 },
    introduction: [
      "충남대학교의 학문 연구와 학습을 지원하는 중앙도서관입니다. 국내외 도서와 연속간행물, 시청각 자료를 수집·정리·보존하며 캠퍼스 구성원에게 학술정보를 제공합니다.",
      "자료실과 개인 학습 공간뿐 아니라 세미나실, 교육실, 그룹 학습 공간 등 다양한 이용 목적을 위한 시설을 운영합니다.",
    ],
    locationDescription:
      "대덕캠퍼스 중앙에 있는 N1 건물입니다. 대학본부와 농업생명과학대학 사이의 도서관 인근 정류장을 기준으로 찾을 수 있습니다.",
    placeImageAlt: "충남대학교 중앙도서관 전경",
    placeImageStatus: "provided",
    noticeSourceUrl: "https://library.cnu.ac.kr/bbs/list/1",
    placeImagePath: "/places/library.jpg",
    characterImagePath: "/characters/library.webp",
  }),
  definePlace({
    id: "language-center",
    name: "충남대학교 국제언어교육센터",
    shortName: "국제언어교육센터",
    coordinates: { latitude: 36.362356, longitude: 127.345809 },
    introduction: [
      "외국어와 한국어 교육을 통해 충남대학교 구성원과 지역사회의 국제 역량을 지원하는 교육기관입니다.",
      "외국어 교육과 한국어 교육, 공인·모의 어학시험, 기관 맞춤형 위탁교육 등 다양한 언어 학습 프로그램을 운영합니다.",
    ],
    locationDescription:
      "대덕캠퍼스 E1-1 건물입니다. 정심화국제문화회관과 가까운 국제교류본부·국제언어교육센터 건물에서 찾을 수 있습니다.",
    placeImageAlt: "충남대학교 국제언어교육센터 전경",
    placeImageStatus: "provided",
    noticeSourceUrl: "https://dream.cnu.ac.kr/bbs/list.php?wcode=02",
    placeImagePath: "/places/language-center.jpg",
    characterImagePath: "/characters/language-center.webp",
  }),
  definePlace({
    id: "industry-center",
    name: "충남대학교 산학연교육연구관",
    shortName: "산학연교육연구관",
    coordinates: { latitude: 36.365326, longitude: 127.344491 },
    introduction: [
      "교육과 연구, 산학협력 활동이 함께 이루어지는 충남대학교의 산학연 연계 공간입니다.",
      "교육·연구 조직과 산학협력 지원 조직, 창업 관련 기관 등이 입주해 대학과 산업 현장의 협력 활동을 뒷받침합니다.",
    ],
    locationDescription:
      "대덕캠퍼스 서쪽의 W1 건물입니다. 교내 순환버스 산학연교육연구관 앞 정류장과 가까운 곳에서 찾을 수 있습니다.",
    placeImageAlt: "충남대학교 산학연교육연구관 전경",
    placeImageStatus: "provided",
    noticeSourceUrl: "https://iuc.cnu.ac.kr/iuc/customer/notice.do",
    placeImagePath: "/places/industry-center.jpg",
    characterImagePath: "/characters/industry-center.webp",
  }),
] as const satisfies readonly Place[];

const PLACES_BY_ID = new Map<PlaceId, Place>(
  PLACES.map((place) => [place.id, place]),
);

export function isPlaceId(value: string): value is PlaceId {
  return PLACE_IDS.some((placeId) => placeId === value);
}

export function getPlaceById(value: string): Place | undefined {
  return isPlaceId(value) ? PLACES_BY_ID.get(value) : undefined;
}

export function getPlaceStaticParams(): Array<{ slug: PlaceId }> {
  return PLACES.map((place) => ({ slug: place.id }));
}
