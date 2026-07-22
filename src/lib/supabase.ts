import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/** Client-side Supabase client using the anon key.
 *  Uses lazy initialization so `createClient` is never called at build time
 *  when env vars are absent, preventing the "supabaseUrl is required" crash. */
let _supabase: SupabaseClient | null = null;

function getSupabase(): SupabaseClient {
  if (_supabase) return _supabase;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  if (!url || !key) {
    console.warn("Supabase credentials missing. Check .env.local");
  }
  _supabase = createClient(url, key);
  return _supabase;
}

export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getSupabase() as unknown as Record<string | symbol, unknown>)[prop];
  },
});
