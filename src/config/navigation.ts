import { LayoutDashboard, BarChart2, MessageSquare, Settings, CreditCard, Users, Shield } from "lucide-react";

export interface NavItem {
  id: string;
  title: string;
  href: string;
  icon: any;
  items?: NavItem[];
}

export const navigationConfig: NavItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "analytics",
    title: "Analytics",
    href: "/analytics",
    icon: BarChart2,
  },
  {
    id: "chat",
    title: "AI Chat",
    href: "/chat",
    icon: MessageSquare,
  },
  {
    id: "billing",
    title: "Billing",
    href: "/billing",
    icon: CreditCard,
  },
  {
    id: "settings",
    title: "Settings",
    href: "/settings",
    icon: Settings,
    items: [
      { id: "profile", title: "Profile", href: "/settings", icon: Users },
      { id: "security", title: "Security", href: "/settings/security", icon: Shield },
    ],
  },
];
