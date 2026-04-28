import { supabaseServer } from "@/lib/supabase-server";
import type { ApiKey } from "@/modules/admin/ApiKeysClient";

export async function getApiKeys(): Promise<ApiKey[]> {
  const { data, error } = await supabaseServer
    .from("api_keys")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error("Error fetching API keys:", error);
    return [];
  }

  return data.map((k) => ({
    name: k.name,
    key: `${k.key_prefix}***${k.key_hash.slice(-4)}`,
    created: new Date(k.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    lastUsed: k.last_used_at
      ? new Date(k.last_used_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      : "Never",
    status: "Active",
    scope: k.scope === "full" ? "Full access" : k.scope,
  }));
}
