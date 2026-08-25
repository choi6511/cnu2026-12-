export type PublicEnvironment = Readonly<{
  kakaoMapKey: string | undefined;
  supabaseUrl: string | undefined;
  supabasePublishableKey: string | undefined;
}>;

/**
 * Next.js가 브라우저 번들에 포함해도 되는 공개 환경변수만 이 모듈에서 읽습니다.
 * 각 기능은 실제로 키가 필요한 시점에 누락 상태를 사용자 친화적으로 처리합니다.
 */
export const publicEnvironment: PublicEnvironment = {
  kakaoMapKey: process.env.NEXT_PUBLIC_KAKAO_MAP_KEY,
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabasePublishableKey:
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
};
