import { MainShell } from "@/ui/layout/MainShell";
import { StatsGrid } from "@/modules/dashboard/components/StatsGrid";
import { OverviewChart } from "@/modules/dashboard/components/OverviewChart";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("dashboard");

  return (
    <MainShell>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="text-start">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              {t("title")}
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">
              {t("description")}
            </p>
          </div>
        </div>
        
        <StatsGrid />
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <OverviewChart />
          <div className="col-span-3 h-full border rounded-3xl bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="mb-4 text-start text-sm font-medium">Recent Activity</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 border-b pb-3 text-start text-sm last:border-0 last:pb-0"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {String.fromCharCode(65 + i)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">New subscription</p>
                    <p className="text-xs text-muted-foreground text-[10px]">User {i} just upgraded to Pro</p>
                  </div>
                  <div className="text-[10px] text-muted-foreground italic">2m ago</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainShell>
  );
}
