/**
 * App pathnames without locale prefix — use with next-intl `Link` / `useRouter`.
 */
export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  ANALYTICS: "/analytics",
  CHAT: "/chat",
  BILLING: "/billing",
  SETTINGS: "/settings",
  SETTINGS_SECURITY: "/settings/security",
  SETTINGS_SKILLS: "/settings/skills",
  /** Current workspace / tenant context */
  WORKSPACE: "/workspace",
  PROJECTS: "/projects",
  TEAM: "/team",
  DOCUMENTS: "/documents",
  NOTIFICATIONS: "/notifications",
  HELP: "/help",
  /** Tenant (organization) administration */
  TENANT_MEMBERS: "/tenant/members",
  TENANT_AUDIT: "/tenant/audit",
  TENANT_BILLING: "/tenant/billing",
  /** Platform administration */
  ADMIN: "/admin",
  ADMIN_USERS: "/admin/users",
  ADMIN_TENANTS: "/admin/tenants",
  ADMIN_AUDIT: "/admin/audit",
  ADMIN_API_KEYS: "/admin/api-keys",
  ADMIN_REPORTS: "/admin/reports",
  AUTH_LOGIN: "/auth/login",
  AUTH_SIGNUP: "/auth/signup",
  AUTH_FORGOT_PASSWORD: "/auth/forgot-password",
  AUTH_RESET_PASSWORD: "/auth/reset-password",
} as const;

export type AppRoutePath = (typeof ROUTES)[keyof typeof ROUTES];
