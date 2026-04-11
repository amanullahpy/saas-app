import type { UserProfile } from "./types";

const SESSION_KEY = "saas-app-auth-session";

export type StoredSession = {
  profile: UserProfile;
  savedAt: number;
};

export function saveSessionToStorage(profile: UserProfile): void {
  if (typeof window === "undefined") return;
  try {
    const payload: StoredSession = { profile, savedAt: Date.now() };
    localStorage.setItem(SESSION_KEY, JSON.stringify(payload));
  } catch {
    /* ignore */
  }
}

export function loadSessionFromStorage(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredSession;
    return parsed.profile ?? null;
  } catch {
    return null;
  }
}

export function clearSessionStorage(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}
