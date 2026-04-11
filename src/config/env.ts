/**
 * Single place for public environment defaults and reads.
 * Server-only secrets should live in a separate module with "server-only".
 */

const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "AmanNex";

export const publicEnv = {
  NEXT_PUBLIC_APP_NAME: appName,
  NEXT_PUBLIC_APP_NAME_FULL:
    process.env.NEXT_PUBLIC_APP_NAME_FULL ?? `${appName} SaaS App`,
  NEXT_PUBLIC_APP_DESCRIPTION:
    process.env.NEXT_PUBLIC_APP_DESCRIPTION ??
    "Multi-tenant SaaS workspace with billing, teams, projects, and admin tooling.",
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Path after locale (e.g. /auth/login, /dashboard) */
  NEXT_PUBLIC_LANDING_PATH: process.env.NEXT_PUBLIC_LANDING_PATH ?? "/auth/login",
  /** `mock` = local seed + registry; `http` = implement `services/auth/http.provider.ts` */
  NEXT_PUBLIC_AUTH_DRIVER: (process.env.NEXT_PUBLIC_AUTH_DRIVER as "mock" | "http" | undefined) ?? "mock",
} as const;
