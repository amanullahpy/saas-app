import type { UserProfile } from "@/services/auth/types";
import { publicEnv } from "./env";

/**
 * Auth integration mode. Set `NEXT_PUBLIC_AUTH_DRIVER=http` when your Supabase/API layer is ready,
 * then implement `src/services/auth/http.provider.ts` only — pages keep calling `getAuthClient()`.
 */
export type AuthDriver = "mock" | "http";

const driver = publicEnv.NEXT_PUBLIC_AUTH_DRIVER;

/** Dev-only seed users for the mock driver (passwords are plain for local UI testing only). */
export const mockSeedUsers: Array<{
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserProfile["role"];
  avatar: string;
}> = [
  {
    id: "m.amanullah0830@gmail.com",
    email: "m.amanullah0830@gmail.com",
    password: "Am@n0849",
    name: "Amanullah",
    role: "admin",
    avatar: "",
  },
  {
    id: "user@gmail.com",
    email: "user@gmail.com",
    password: "Am@n0849",
    name: "Aman User",
    role: "user",
    avatar: "",
  },
];

export const authConfig = {
  driver: (driver === "http" ? "http" : "mock") satisfies AuthDriver,
  /** Artificial latency for realistic UI feedback */
  mockDelayMs: Number(process.env.NEXT_PUBLIC_AUTH_MOCK_DELAY_MS) || 450,
} as const;
