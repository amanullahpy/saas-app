import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/** Server-only Supabase client with service role — bypasses RLS for admin queries.
 *  Uses lazy initialization so `createClient` is never called at build time
 *  when env vars are absent, preventing the "supabaseUrl is required" crash. */
let _supabaseServer: SupabaseClient | null = null;

function getSupabaseServer(): SupabaseClient {
  if (_supabaseServer) return _supabaseServer;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (!url || !key) {
    console.warn("Supabase server credentials missing. Check .env.local");
  }
  _supabaseServer = createClient(url, key, { auth: { persistSession: false } });
  return _supabaseServer;
}

export const supabaseServer: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getSupabaseServer() as unknown as Record<string | symbol, unknown>)[prop];
  },
});
