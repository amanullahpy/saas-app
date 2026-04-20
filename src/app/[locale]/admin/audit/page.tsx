import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { setRequestLocale } from "next-intl/server";
import { Download, ShieldCheck, UserPlus, Settings, LogIn, Trash2, Key, Building2 } from "lucide-react";

const EVENTS = [
  { id: 1, action: "Tenant created", actor: "platform@system", tenant: "Pied Piper", ip: "internal", time: "Apr 20, 2026 15:00", icon: Building2, color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400", severity: "info" },
  { id: 2, action: "Tenant suspended", actor: "admin@platform.io", tenant: "Umbrella Co", ip: "10.0.0.1", time: "Apr 19, 2026 11:30", icon: Trash2, color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400", severity: "critical" },
  { id: 3, action: "Platform API key rotated", actor: "admin@platform.io", tenant: "Platform", ip: "10.0.0.1", time: "Apr 18, 2026 09:00", icon: Key, color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400", severity: "warning" },
  { id: 4, action: "Super-admin signed in", actor: "admin@platform.io", tenant: "Platform", ip: "203.0.113.1", time: "Apr 18, 2026 08:55", icon: LogIn, color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400", severity: "info" },
  { id: 5, action: "User role elevated", actor: "admin@platform.io", tenant: "Stark Industries", ip: "10.0.0.1", time: "Apr 17, 2026 14:20", icon: ShieldCheck, color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400", severity: "warning" },
  { id: 6, action: "Tenant plan upgraded", actor: "billing@system", tenant: "Globex Inc", ip: "internal", time: "Apr 16, 2026 12:00", icon: Settings, color: "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400", severity: "info" },
  { id: 7, action: "New tenant admin assigned", actor: "admin@platform.io", tenant: "Wayne Enterprises", ip: "10.0.0.1", time: "Apr 15, 2026 10:45", icon: UserPlus, color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400", severity: "info" },
];

const SEVERITY_BADGE: Record<string, string> = {
  info: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  warning: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  critical: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default async function AdminAuditPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Platform Audit Log</h1>
          <p className="mt-1 text-sm text-muted-foreground">Immutable cross-tenant platform-level events.</p>
        </div>
        <Button variant="outline" className="w-fit gap-2 rounded-xl text-sm">
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Events", value: EVENTS.length, color: "text-foreground" },
          { label: "Warnings", value: EVENTS.filter(e => e.severity === "warning").length, color: "text-amber-500" },
          { label: "Critical", value: EVENTS.filter(e => e.severity === "critical").length, color: "text-red-500" },
        ].map((s) => (
          <Card key={s.label} className="border-border/50 shadow-sm">
            <div className="p-5">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="border-border/50 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-border/50 pb-4">
          <CardTitle className="text-base">Compliance Trail</CardTitle>
          <CardDescription>Cross-tenant events · {EVENTS.length} records</CardDescription>
        </CardHeader>
        <div className="divide-y divide-border/50">
          {EVENTS.map((e) => (
            <div key={e.id} className="flex items-start gap-4 px-6 py-3.5 hover:bg-muted/30 transition-colors">
              <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${e.color}`}>
                <e.icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium text-foreground">{e.action}</p>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${SEVERITY_BADGE[e.severity]}`}>
                    {e.severity}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  <span className="font-medium text-foreground/70">{e.actor}</span> · Tenant: {e.tenant}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-xs text-muted-foreground">{e.time}</p>
                <p className="text-[11px] text-muted-foreground/60 mt-0.5">{e.ip}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
