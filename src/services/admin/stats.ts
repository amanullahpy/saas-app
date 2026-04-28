import { supabaseServer } from "@/lib/supabase-server";

export interface AdminStats {
  totalTenants: number;
  totalUsers: number;
  activeNow: number;
  securityAlerts: number;
  mrr: string;
  regions: number;
}

export interface RecentTenant {
  name: string;
  plan: string;
  members: number;
  created: string;
  status: string;
}

export async function getAdminStats(): Promise<AdminStats> {
  const [tenants, users] = await Promise.all([
    supabaseServer.from("tenants").select("id", { count: "exact", head: true }),
    supabaseServer.from("profiles").select("id", { count: "exact", head: true }),
  ]);

  return {
    totalTenants: tenants.count ?? 0,
    totalUsers: users.count ?? 0,
    activeNow: 0,
    securityAlerts: 0,
    mrr: "$0",
    regions: 0,
  };
}

export async function getRecentTenants(): Promise<RecentTenant[]> {
  const { data, error } = await supabaseServer
    .from("tenants")
    .select("name, plan, status, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  if (error || !data) return [];

  return data.map((t) => ({
    name: t.name,
    plan: t.plan,
    members: 0,
    created: new Date(t.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    status: t.status,
  }));
}
