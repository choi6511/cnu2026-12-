import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { getServerEnvironment } from "@/lib/env/server";
import { publicEnvironment } from "@/lib/env/public";

/**
 * 서버 전용 쓰기 클라이언트. SUPABASE_SECRET_KEY로 공지 upsert와 crawl_runs
 * 기록을 남긴다. "server-only" 임포트가 이 모듈이 Client Component에 번들되면
 * 빌드를 실패시켜 비밀 키 유출을 막는다.
 */
export function createServerSupabaseClient(): SupabaseClient {
  const { supabaseUrl } = publicEnvironment;
  const { supabaseSecretKey } = getServerEnvironment();

  if (!supabaseUrl) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL이 설정되지 않았습니다.");
  }
  if (!supabaseSecretKey) {
    throw new Error("SUPABASE_SECRET_KEY가 설정되지 않았습니다.");
  }

  return createClient(supabaseUrl, supabaseSecretKey, {
    auth: { persistSession: false },
  });
}
