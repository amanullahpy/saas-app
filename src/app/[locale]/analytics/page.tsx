import { MainShell } from "@/ui/layout/MainShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { OverviewChart } from "@/modules/dashboard/components/OverviewChart";
import { getDashboardStats } from "@/services/dashboard";
import { authConfig } from "@/config/auth";
import { PageHeader } from "@/components/ui/page-header";

export default async function AnalyticsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("modules.analytics");

  const stats = authConfig.driver === "http" ? await getDashboardStats() : null;

  const metrics = [
    { label: t("total_projects"),   value: stats ? stats.totalProjects   : null },
    { label: t("total_members"),    value: stats ? stats.totalMembers    : null },
    { label: t("total_documents"),  value: stats ? stats.totalDocuments  : null },
  ];

  return (
    <MainShell>
      <div className="space-y-8">
        <PageHeader
          badge={t("badge")}
          title={t("title")}
          description={t("description")}
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          <OverviewChart />
          <Card className="border border-border/80 shadow-sm hover:shadow-lg transition-all duration-300">
            <CardHeader className="border-b border-border/40 pb-4">
              <CardTitle className="text-base font-heading font-semibold text-foreground flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                {t("platform_summary")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4 text-start">
              {metrics.map((m) => (
                <div key={m.label} className="flex items-center justify-between border-b border-border/40 pb-3.5 last:border-0 last:pb-0">
                  <span className="text-sm font-mono text-muted-foreground">{m.label}</span>
                  <span className="text-base font-heading font-bold text-foreground">
                    {m.value === null ? "—" : m.value}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {metrics.map((m, idx) => (
            <Card key={m.label} variant={idx === 0 ? "featured" : "default"} className="p-1">
              <CardHeader className="pb-2 text-start">
                <CardTitle className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">{m.label}</CardTitle>
              </CardHeader>
              <CardContent className="text-start space-y-3">
                <div className="text-3xl font-heading text-foreground">
                  {m.value === null ? "—" : m.value}
                </div>
                <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] h-full rounded-full transition-all duration-700 shadow-accent"
                    style={{ width: m.value ? "65%" : "0%" }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainShell>
  );
}
