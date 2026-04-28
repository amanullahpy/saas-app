import { MainShell } from "@/ui/layout/MainShell";
import { StatsGrid } from "@/modules/dashboard/components/StatsGrid";
import { OverviewChart } from "@/modules/dashboard/components/OverviewChart";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getDashboardStats, getRecentActivity } from "@/services/dashboard";
import { authConfig } from "@/config/auth";
import { Activity } from "lucide-react";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("dashboard");

  const stats = authConfig.driver === "http" ? await getDashboardStats() : null;
  const activity = authConfig.driver === "http" ? await getRecentActivity() : [];

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

        <StatsGrid stats={stats} />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <OverviewChart />
          <div className="col-span-3 h-full border rounded-3xl bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="mb-4 text-start text-sm font-medium">Recent Activity</h3>
            {activity.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Activity className="mb-2 h-8 w-8 text-muted-foreground/30" />
                <p className="text-sm text-muted-foreground">No recent activity</p>
              </div>
            ) : (
              <div className="space-y-4">
                {activity.map((item) => {
                  const initials = item.actor
                    ? item.actor.split("@")[0].slice(0, 2).toUpperCase()
                    : "??";
                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 border-b pb-3 text-start text-sm last:border-0 last:pb-0"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                        {initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{item.action}</p>
                        <p className="text-xs text-muted-foreground truncate">{item.actor}</p>
                      </div>
                      <div className="text-[10px] text-muted-foreground italic shrink-0">{item.time}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainShell>
  );
}
