import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { publicEnvironment } from "@/lib/env/public";

let cachedClient: SupabaseClient | null = null;

/**
 * 공지 읽기 전용 클라이언트. publishable key만 사용하며 anon 역할의 RLS로
 * SELECT만 허용된다. Client Component에서만 호출한다.
 */
export function getPublicSupabaseClient(): SupabaseClient | null {
  const { supabaseUrl, supabasePublishableKey } = publicEnvironment;

  if (!supabaseUrl || !supabasePublishableKey) {
    return null;
  }

  if (!cachedClient) {
    cachedClient = createClient(supabaseUrl, supabasePublishableKey, {
      auth: { persistSession: false },
    });
  }

  return cachedClient;
}
