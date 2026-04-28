import { supabaseServer } from "@/lib/supabase-server";

export interface WorkspaceInfo {
  name: string;
  tenantId: string;
  plan: string;
  region: string;
  createdAt: string;
  memberCount: number;
  ownerEmail: string;
}

export async function getWorkspaceInfo(): Promise<WorkspaceInfo | null> {
  const { data, error } = await supabaseServer
    .from("tenants")
    .select("id, name, plan, region, created_at")
    .order("created_at", { ascending: true })
    .limit(1)
    .single();

  if (error || !data) {
    console.error("Error fetching workspace:", error);
    return null;
  }

  const { count } = await supabaseServer
    .from("tenant_members")
    .select("*", { count: "exact", head: true })
    .eq("tenant_id", data.id);

  return {
    name: data.name,
    tenantId: data.id,
    plan: data.plan,
    region: data.region,
    createdAt: new Date(data.created_at).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    memberCount: count ?? 0,
    ownerEmail: "—",
  };
}
