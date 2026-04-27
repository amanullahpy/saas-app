import { supabase } from "@/lib/supabase";
import type { Tenant } from "@/modules/admin/TenantsClient";

export async function getTenants(): Promise<Tenant[]> {
  const { data, error } = await supabase
    .from("tenants")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching tenants:", error);
    return [];
  }

  return (data || []).map((t) => ({
    id: t.id,
    name: t.name,
    plan: t.plan,
    status: t.status,
    region: t.region,
    members: 0, // In a real app, you'd join with tenant_members or use a count
    created: new Date(t.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  }));
}
