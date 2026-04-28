import { supabaseServer } from "@/lib/supabase-server";

export interface DashboardStats {
  totalProjects: number;
  totalMembers: number;
  totalDocuments: number;
  unreadNotifications: number;
}

export interface RecentActivity {
  id: string;
  action: string;
  actor: string;
  time: string;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const [projects, profiles, documents] = await Promise.all([
    supabaseServer.from("projects").select("id", { count: "exact", head: true }),
    supabaseServer.from("profiles").select("id", { count: "exact", head: true }),
    supabaseServer.from("documents").select("id", { count: "exact", head: true }),
  ]);

  return {
    totalProjects: projects.count ?? 0,
    totalMembers: profiles.count ?? 0,
    totalDocuments: documents.count ?? 0,
    unreadNotifications: 0,
  };
}

export async function getRecentActivity(): Promise<RecentActivity[]> {
  const { data, error } = await supabaseServer
    .from("audit_logs")
    .select("id, action, actor, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  if (error || !data) return [];

  return data.map((e) => ({
    id: e.id,
    action: e.action,
    actor: e.actor,
    time: new Date(e.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));
}
