import { MainShell } from "@/ui/layout/MainShell";
import { StatsGrid } from "@/modules/dashboard/components/StatsGrid";
import { OverviewChart } from "@/modules/dashboard/components/OverviewChart";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getDashboardStats, getRecentActivity } from "@/services/dashboard";
import { authConfig } from "@/config/auth";
import { recentActivityData } from "@/config/data/dashboard.data";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionLabel } from "@/components/ui/section-label";
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
        <div className="space-y-2 text-start">
          <SectionLabel pulse>Executive Overview</SectionLabel>
          <h1 className="text-3xl sm:text-4xl font-heading tracking-tight text-foreground">
            {t("title")}
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t("description")}
          </p>
        </div>

        <StatsGrid stats={stats} />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <OverviewChart />
          <div className="col-span-3 h-full border border-border/80 rounded-2xl bg-card p-6 shadow-sm hover:shadow-lg transition-all duration-300">
            <h3 className="mb-5 text-start text-base font-heading font-semibold text-foreground flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              {t("recent_activity")}
            </h3>
            {hasActivity ? (
              <div className="space-y-4">
                {activityList.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center gap-4 border-b border-border/40 pb-3 text-start text-sm last:border-0 last:pb-0"
                  >
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0052FF] to-[#4D7CFF] flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-accent/50">
                      {activity.letter}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{activity.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
                    </div>
                    <div className="text-[11px] font-mono text-muted-foreground/70 shrink-0">{activity.time}</div>
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
