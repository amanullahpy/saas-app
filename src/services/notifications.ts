import { supabase } from "@/lib/supabase";
import type { Notification } from "@/modules/notifications/NotificationsClient";

const ICON_MAP: Record<string, string> = {
  billing: "CreditCard",
  team: "UserPlus",
  security: "ShieldCheck",
  system: "Zap",
  alert: "AlertTriangle",
  chat: "MessageSquare",
};
const COLOR_MAP: Record<string, string> = {
  billing: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  team: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  security: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  system: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  alert: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  chat: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400",
};

export async function getNotifications(profileId: string): Promise<Notification[]> {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("profile_id", profileId)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }

  return (data || []).map((n, i) => {
    const type = n.type || "system";
    return {
      id: i + 1,
      type,
      iconName: ICON_MAP[type] || "Zap",
      color: COLOR_MAP[type] || COLOR_MAP.system,
      title: n.title,
      body: n.message,
      time: new Date(n.created_at).toLocaleDateString("en-US", {
        month: "short", day: "numeric",
      }),
      read: n.read,
    };
  });
}
