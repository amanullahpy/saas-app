import type { ComponentType } from "react";
import {
  LayoutDashboard,
  BarChart2,
  MessageSquare,
  Settings,
  CreditCard,
  Users,
  Shield,
  Building2,
  FolderKanban,
  FileText,
  Bell,
  LifeBuoy,
  UserCog,
  ScrollText,
  Landmark,
  LayoutGrid,
  Globe2,
  KeyRound,
  LineChart,
} from "lucide-react";
import { ROUTES, type AppRoutePath } from "./routes";

export interface SidebarNavItem {
  id: string;
  href: AppRoutePath;
  icon: ComponentType<{ className?: string }>;
  /** @deprecated Admin-only items live under `adminConsoleSidebarSections` only. */
  adminOnly?: boolean;
}

/** @deprecated Use `SidebarNavItem` */
export type NavItem = SidebarNavItem;

export interface SidebarSection {
  id: string;
  labelKey: string;
  items: SidebarNavItem[];
}

/** End-user workspace: no tenant/platform admin tools (those use the admin console). */
export const userAppSidebarSections: SidebarSection[] = [
  {
    id: "overview",
    labelKey: "nav_section_overview",
    items: [
      { id: "dashboard", href: ROUTES.DASHBOARD, icon: LayoutDashboard },
      { id: "analytics", href: ROUTES.ANALYTICS, icon: BarChart2 },
      { id: "workspace", href: ROUTES.WORKSPACE, icon: Building2 },
    ],
  },
  {
    id: "work",
    labelKey: "nav_section_work",
    items: [
      { id: "projects", href: ROUTES.PROJECTS, icon: FolderKanban },
      { id: "documents", href: ROUTES.DOCUMENTS, icon: FileText },
      { id: "chat", href: ROUTES.CHAT, icon: MessageSquare },
      { id: "notifications", href: ROUTES.NOTIFICATIONS, icon: Bell },
    ],
  },
  {
    id: "organization",
    labelKey: "nav_section_org",
    items: [
      { id: "team", href: ROUTES.TEAM, icon: Users },
      { id: "billing", href: ROUTES.BILLING, icon: CreditCard },
      { id: "help", href: ROUTES.HELP, icon: LifeBuoy },
    ],
  },
  {
    id: "account",
    labelKey: "nav_section_account",
    items: [
      { id: "settings", href: ROUTES.SETTINGS, icon: Settings },
      {
        id: "security",
        href: ROUTES.SETTINGS_SECURITY,
        icon: Shield,
      },
    ],
  },
];

/** Admin console only: tenant + platform control surfaces. */
export const adminConsoleSidebarSections: SidebarSection[] = [
  {
    id: "tenant_admin",
    labelKey: "nav_section_tenant_admin",
    items: [
      { id: "tenant_members", href: ROUTES.TENANT_MEMBERS, icon: UserCog },
      { id: "tenant_audit", href: ROUTES.TENANT_AUDIT, icon: ScrollText },
      { id: "tenant_billing", href: ROUTES.TENANT_BILLING, icon: Landmark },
    ],
  },
  {
    id: "platform_admin",
    labelKey: "nav_section_platform_admin",
    items: [
      { id: "admin", href: ROUTES.ADMIN, icon: LayoutGrid },
      { id: "admin_users", href: ROUTES.ADMIN_USERS, icon: Users },
      { id: "admin_tenants", href: ROUTES.ADMIN_TENANTS, icon: Globe2 },
      { id: "admin_audit", href: ROUTES.ADMIN_AUDIT, icon: ScrollText },
      { id: "admin_api_keys", href: ROUTES.ADMIN_API_KEYS, icon: KeyRound },
      { id: "admin_reports", href: ROUTES.ADMIN_REPORTS, icon: LineChart },
    ],
  },
];

/** Full list (user + admin sections) — for legacy imports and broad nav matching. */
export const sidebarSections: SidebarSection[] = [
  ...userAppSidebarSections,
  ...adminConsoleSidebarSections,
];

/** @deprecated Use sidebarSections — kept for any legacy import */
export const navigationConfig = sidebarSections.flatMap((s) => s.items);
