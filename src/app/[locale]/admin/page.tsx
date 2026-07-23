import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { adminStatsData, recentTenantsData } from "@/config/data/admin.data";
import { LoadingState } from "@/components/ui/loading-state";
import { EmptyState } from "@/components/ui/empty-state";
import { Building2, Users } from "lucide-react";

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");

  const hasStats = adminStatsData.length > 0;
  const hasTenants = recentTenantsData.length > 0;

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-8">
      <PageHeader 
        badge={t("badge")}
        title={t("title")} 
        description={t("description")} 
      />

      {/* Stats */}
      {hasStats ? (
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {adminStatsData.map((s, idx) => (
            <Card key={s.label} variant={idx === 0 ? "featured" : "default"} className="p-1">
              <CardContent className="flex items-start gap-4 pt-5 text-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0052FF] to-[#4D7CFF] text-white shadow-accent">
                  <s.icon className="h-5 w-5 stroke-[2]" />
                </div>
                <div>
                  <p className="text-3xl font-heading tracking-tight text-foreground">{s.value}</p>
                  <p className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">{t(s.label.toLowerCase().replace(/ /g, "_"))}</p>
                  <p className="text-xs font-mono text-muted-foreground/80 mt-1">{s.change}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Building2}
          title="No stats available"
          description="Platform statistics will appear here once data is available."
        />
      )}

      {/* Recent tenants */}
      {hasTenants ? (
        <Card className="border border-border/80 shadow-sm overflow-hidden">
          <CardHeader className="border-b border-border/40 pb-4">
            <CardTitle className="text-base font-heading font-semibold text-foreground flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              {t("recently_created_tenants")}
            </CardTitle>
          </CardHeader>
          <div className="divide-y divide-border/40">
            {recentTenantsData.map((tenant) => (
              <div key={tenant.name} className="flex items-center gap-4 px-6 py-4 hover:bg-muted/30 transition-all duration-200 text-start">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0052FF] to-[#4D7CFF] text-xs font-bold text-white shadow-accent/50">
                  {tenant.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-heading font-semibold text-foreground">{tenant.name}</p>
                  <p className="text-xs font-mono text-muted-foreground">{tenant.members} {t("members")} · {t("created")} {tenant.created}</p>
                </div>
                <span className="hidden sm:block text-xs font-mono text-muted-foreground">{tenant.plan}</span>
                <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-mono font-medium ${tenant.status === "Active" ? "bg-success/15 text-success border border-success/20" : "bg-destructive/15 text-destructive border border-destructive/20"}`}>
                  {tenant.status === "Active" ? t("status_active") : t("status_suspended")}
                </span>
              </div>
            ))}
          </div>
        </Card>
      ) : (
        <EmptyState
          icon={Users}
          title="No tenants yet"
          description="Recently created tenants will appear here."
        />
      )}
    </div>
  );
}
