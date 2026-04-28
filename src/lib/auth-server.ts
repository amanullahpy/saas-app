import { supabase } from "@/lib/supabase";

/**
 * Returns the current authenticated user's ID from the Supabase session.
 * Works in Server Components when the client has an active session.
 * Returns null if not authenticated or in mock mode.
 */
export async function getCurrentUserId(): Promise<string | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user?.id ?? null;
  } catch {
    return null;
  }
}
