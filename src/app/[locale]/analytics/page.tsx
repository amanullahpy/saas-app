import { MainShell } from "@/ui/layout/MainShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { setRequestLocale } from "next-intl/server";
import { OverviewChart } from "@/modules/dashboard/components/OverviewChart";
import { getDashboardStats } from "@/services/dashboard";
import { authConfig } from "@/config/auth";

export default async function AnalyticsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const stats = authConfig.driver === "http" ? await getDashboardStats() : null;

  const metrics = [
    { label: "Total Projects",   value: stats ? stats.totalProjects   : null },
    { label: "Total Members",    value: stats ? stats.totalMembers    : null },
    { label: "Total Documents",  value: stats ? stats.totalDocuments  : null },
  ];

  return (
    <MainShell>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Analytics & Insights
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Deep dive into your data with advanced charting and filters.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          <OverviewChart />
          <Card className="border-none shadow-sm bg-card hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Platform Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
              {metrics.map((m) => (
                <div key={m.label} className="flex items-center justify-between border-b border-border/50 pb-3 last:border-0 last:pb-0">
                  <span className="text-sm text-muted-foreground">{m.label}</span>
                  <span className="text-sm font-bold text-foreground">
                    {m.value === null ? "—" : m.value}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {metrics.map((m) => (
            <Card key={m.label} className="border-none shadow-sm bg-card hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{m.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {m.value === null ? "—" : m.value}
                </div>
                <div className="w-full bg-muted/50 h-2 rounded-full mt-3 overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-700"
                    style={{ width: m.value ? "60%" : "0%" }}
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
