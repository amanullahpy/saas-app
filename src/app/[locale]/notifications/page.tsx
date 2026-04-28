import { MainShell } from "@/ui/layout/MainShell";
import { setRequestLocale } from "next-intl/server";
import { NotificationsClient, type Notification } from "@/modules/notifications/NotificationsClient";
import { authConfig } from "@/config/auth";

export default async function NotificationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const notifications: Notification[] = [];

  return <MainShell><div className="space-y-8"><NotificationsClient initialNotifications={notifications} /></div></MainShell>;
}
