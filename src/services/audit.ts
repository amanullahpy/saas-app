import { supabaseServer } from "@/lib/supabase-server";
import type { AuditEvent } from "@/modules/tenant/AuditClient";

const SEVERITY_COLOR: Record<string, string> = {
  info:     "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  warning:  "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  critical: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  Low:      "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  Medium:   "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  High:     "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
};

function severityNormalize(s: string): "info" | "warning" | "critical" {
  if (s === "High" || s === "critical") return "critical";
  if (s === "Medium" || s === "warning") return "warning";
  return "info";
}

export async function getAuditLogs(tenantId?: string): Promise<AuditEvent[]> {
  let query = supabaseServer
    .from("audit_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  if (tenantId) {
    query = query.eq("tenant_id", tenantId);
  }

  const { data, error } = await query;

  if (error || !data) {
    console.error("Error fetching audit logs:", error);
    return [];
  }

  return data.map((e, i) => {
    const sev = severityNormalize(e.severity);
    return {
      id: i + 1,
      action: e.action,
      actor: e.actor,
      target: e.target || "—",
      ip: e.ip_address || "—",
      time: new Date(e.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      iconName: "ShieldCheck",
      color: SEVERITY_COLOR[sev],
      severity: sev,
    };
  });
}
