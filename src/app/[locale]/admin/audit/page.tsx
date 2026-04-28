import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { setRequestLocale } from "next-intl/server";
import { Download } from "lucide-react";
import { getAuditLogs } from "@/services/audit";
import { authConfig } from "@/config/auth";

export default async function AdminAuditPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const events = authConfig.driver === "http" ? await getAuditLogs() : [];

  const SEVERITY_BADGE: Record<string, string> = {
    info: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    warning: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    critical: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

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

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Events", value: events.length, color: "text-foreground" },
          { label: "Warnings", value: events.filter(e => e.severity === "warning").length, color: "text-amber-500" },
          { label: "Critical", value: events.filter(e => e.severity === "critical").length, color: "text-red-500" },
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
          <CardDescription>Cross-tenant events · {events.length} records</CardDescription>
        </CardHeader>
        <div className="divide-y divide-border/50">
          {events.length === 0 ? (
            <p className="px-6 py-8 text-center text-sm text-muted-foreground">No audit events yet.</p>
          ) : (
            events.map((e) => (
              <div key={e.id} className="flex items-start gap-4 px-6 py-3.5 hover:bg-muted/30 transition-colors">
                <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${e.color}`}>
                  <span className="text-xs font-bold">{e.id}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{e.action}</p>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${SEVERITY_BADGE[e.severity]}`}>
                      {e.severity}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    <span className="font-medium text-foreground/70">{e.actor}</span> · Target: {e.target}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-xs text-muted-foreground">{e.time}</p>
                  <p className="text-[11px] text-muted-foreground/60 mt-0.5">{e.ip}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
