"use client";

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { setUser } from "@/store/slices/user.slice";
import { loadSessionFromStorage } from "@/services/auth/session.storage";

/** Hydrates Redux from persisted session on load (mock or future HTTP session). */
export function AuthSessionSync() {
  const dispatch = useDispatch<AppDispatch>();
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    const profile = loadSessionFromStorage();
    if (profile) {
      dispatch(setUser(profile));
    }
  }, [dispatch]);

  return null;
}
