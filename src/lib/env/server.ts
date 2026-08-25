import "server-only";

export type ServerEnvironment = Readonly<{
  supabaseSecretKey: string | undefined;
  apifyApiToken: string | undefined;
}>;

/**
 * 비밀값은 server-only 경계 안에서만 읽습니다. 이 모듈을 Client Component에서
 * 가져오면 Next.js 빌드가 실패하므로 비밀 키의 브라우저 유출을 방지합니다.
 */
export function getServerEnvironment(): ServerEnvironment {
  return {
    supabaseSecretKey: process.env.SUPABASE_SECRET_KEY,
    apifyApiToken: process.env.APIFY_API_TOKEN,
  };
}
