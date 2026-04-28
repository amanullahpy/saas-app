import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { setRequestLocale } from "next-intl/server";
import { Users, Building2, Activity, ShieldAlert, TrendingUp, Globe } from "lucide-react";
import { getAdminStats, getRecentTenants } from "@/services/admin/stats";
import { authConfig } from "@/config/auth";

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const stats = authConfig.driver === "http" ? await getAdminStats() : null;
  const recentTenants = authConfig.driver === "http" ? await getRecentTenants() : [];

  const STAT_DEFS = [
    { label: "Total Tenants",   value: stats ? String(stats.totalTenants) : "—", change: "registered organizations",  icon: Building2, color: "text-blue-500" },
    { label: "Total Users",     value: stats ? String(stats.totalUsers)   : "—", change: "across all tenants",         icon: Users,     color: "text-purple-500" },
    { label: "Active Now",      value: stats ? String(stats.activeNow)    : "—", change: "across all tenants",         icon: Activity,  color: "text-emerald-500" },
    { label: "Security Alerts", value: stats ? String(stats.securityAlerts): "—", change: "require attention",         icon: ShieldAlert,color: "text-red-500" },
    { label: "MRR",             value: stats ? stats.mrr                  : "—", change: "monthly recurring revenue",  icon: TrendingUp,color: "text-amber-500" },
    { label: "Regions",         value: stats ? String(stats.regions)      : "—", change: "deployment regions",         icon: Globe,     color: "text-cyan-500" },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Platform Administration</h1>
        <p className="mt-1 text-sm text-muted-foreground">Cross-tenant operations — super-admin access only.</p>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
        {STAT_DEFS.map((s) => (
          <Card key={s.label} className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="flex items-start gap-3 pt-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-muted">
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs font-medium text-foreground/70">{s.label}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{s.change}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/50 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-border/50 pb-4">
          <CardTitle className="text-base">Recently Created Tenants</CardTitle>
        </CardHeader>
        <div className="divide-y divide-border/50">
          {recentTenants.length === 0 ? (
            <p className="px-6 py-8 text-center text-sm text-muted-foreground">No tenants yet.</p>
          ) : (
            recentTenants.map((t) => (
              <div key={t.name} className="flex items-center gap-4 px-6 py-3.5 hover:bg-muted/30 transition-colors">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                  {t.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.members} members · Created {t.created}</p>
                </div>
                <span className="hidden sm:block text-xs font-medium text-muted-foreground">{t.plan}</span>
                <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${t.status === "Active" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}>
                  {t.status}
                </span>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
