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
    <div className="mx-auto max-w-5xl space-y-6 pb-8">
      <PageHeader 
        title={t("title")} 
        description={t("description")} 
      />

      {/* Stats */}
      {hasStats ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {adminStatsData.map((s) => (
            <Card key={s.label} className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="flex items-start gap-3 pt-5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-muted">
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">{s.value}</p>
                  <p className="text-xs font-medium text-foreground/70">{t(s.label.toLowerCase().replace(/ /g, "_"))}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{s.change}</p>
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
        <Card className="border-border/50 shadow-sm overflow-hidden">
          <CardHeader className="border-b border-border/50 pb-4">
            <CardTitle className="text-base">{t("recently_created_tenants")}</CardTitle>
          </CardHeader>
          <div className="divide-y divide-border/50">
            {recentTenantsData.map((tenant) => (
              <div key={tenant.name} className="flex items-center gap-4 px-6 py-3.5 hover:bg-muted/30 transition-colors">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                  {tenant.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{tenant.name}</p>
                  <p className="text-xs text-muted-foreground">{tenant.members} {t("members")} · {t("created")} {tenant.created}</p>
                </div>
                <span className="hidden sm:block text-xs font-medium text-muted-foreground">{tenant.plan}</span>
                <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${tenant.status === "Active" ? "bg-success/10 text-success dark:bg-success/20 dark:text-success" : "bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive"}`}>
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
