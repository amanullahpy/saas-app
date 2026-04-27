"use client";

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { setUser } from "@/store/slices/user.slice";
import { loadSessionFromStorage } from "@/services/auth/session.storage";
import { supabase } from "@/lib/supabase";

/** Hydrates Redux from persisted session on load (mock or future HTTP session). */
export function AuthSessionSync() {
  const dispatch = useDispatch<AppDispatch>();
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    // 1. Initial sync from storage (fast)
    const stored = loadSessionFromStorage();
    if (stored) dispatch(setUser(stored));

    // 2. Listen to real Supabase auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        // Fetch fresh profile
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        dispatch(setUser({
          id: session.user.id,
          email: session.user.email || "",
          name: profile?.name || session.user.user_metadata?.name || "User",
          avatar: profile?.avatar_url || session.user.user_metadata?.avatar_url || "",
          role: (profile?.role as any) || "user",
        }));
      } else if (event === "SIGNED_OUT") {
        dispatch(setUser(null));
      }
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  return null;
}
