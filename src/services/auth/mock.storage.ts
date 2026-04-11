/**
 * Persists mock sign-ups in localStorage so new accounts survive refresh (dev only).
 */
const KEY = "saas-app-mock-user-registry";

export type MockRegistryEntry = {
  password: string;
  profile: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: "admin" | "user" | "guest";
  };
};

function readRegistry(): Record<string, MockRegistryEntry> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, MockRegistryEntry>;
  } catch {
    return {};
  }
}

function writeRegistry(data: Record<string, MockRegistryEntry>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

export function getMockRegistry(): Record<string, MockRegistryEntry> {
  return readRegistry();
}

export function upsertMockUser(email: string, entry: MockRegistryEntry) {
  const next = { ...readRegistry(), [email.toLowerCase()]: entry };
  writeRegistry(next);
}
