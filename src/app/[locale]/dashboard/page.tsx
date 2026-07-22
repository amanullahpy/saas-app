import { MainShell } from "@/ui/layout/MainShell";
import { StatsGrid } from "@/modules/dashboard/components/StatsGrid";
import { OverviewChart } from "@/modules/dashboard/components/OverviewChart";
import { PageHeader } from "@/components/ui/page-header";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getDashboardStats, getRecentActivity } from "@/services/dashboard";
import { authConfig } from "@/config/auth";
import { recentActivityData } from "@/config/data/dashboard.data";
import { EmptyState } from "@/components/ui/empty-state";
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
  const dbActivity = authConfig.driver === "http" ? await getRecentActivity() : [];

  // Transform activity list to follow the same format
  const activityList = authConfig.driver === "http" && dbActivity.length > 0
    ? dbActivity.map((e) => ({
        id: String(e.id),
        title: e.action,
        description: e.actor,
        time: e.time,
        letter: e.actor ? e.actor.split("@")[0].slice(0, 2).toUpperCase() : "??"
      }))
    : recentActivityData.map((e) => ({
        id: String(e.id),
        title: e.title,
        description: e.description,
        time: e.time,
        letter: e.letter
      }));

  const hasActivity = activityList.length > 0;

  return (
    <MainShell>
      <div className="space-y-8">
        <PageHeader title={t("title")} description={t("description")} />

        <StatsGrid stats={stats} />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <OverviewChart />
          <div className="col-span-3 h-full border rounded-xl bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="mb-4 text-start text-sm font-medium">{t("recent_activity")}</h3>
            {hasActivity ? (
              <div className="space-y-4">
                {activityList.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center gap-4 border-b pb-3 text-start text-sm last:border-0 last:pb-0"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                      {activity.letter}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{activity.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
                    </div>
                    <div className="text-[10px] text-muted-foreground italic shrink-0">{activity.time}</div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Activity}
                title="No recent activity"
                description="Your recent activity will appear here."
              />
            )}
          </div>
        </div>
      </div>
    </MainShell>
  );
}
