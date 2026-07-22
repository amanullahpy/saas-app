"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { DollarSign, Users, CreditCard, Activity, BarChart3 } from "lucide-react";
import type { DashboardStats } from "@/services/dashboard";
import { statsData } from "@/config/data/dashboard.data";
import { LoadingState } from "@/components/ui/loading-state";
import { EmptyState } from "@/components/ui/empty-state";
import { useState, useEffect } from "react";

interface Props {
  stats: DashboardStats | null;
}

export function StatsGrid({ stats }: Props) {
  const t = useTranslations("dashboard.stats");
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingState variant="card" count={4} />;
  }

  if (isEmpty || statsData.length === 0) {
    return (
      <EmptyState
        icon={BarChart3}
        title="No stats available"
        description="Stats data will appear here once available."
      />
    );
  }

  const displayStats = stats
    ? [
        { id: "revenue",       icon: DollarSign, value: String(stats.totalProjects),  change: "total projects" },
        { id: "subscriptions", icon: Users,      value: String(stats.totalMembers),   change: "total members" },
        { id: "sales",         icon: CreditCard, value: String(stats.totalDocuments), change: "total documents" },
        { id: "active_now",    icon: Activity,   value: String(stats.unreadNotifications), change: "unread notifications" },
      ]
    : statsData;

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {displayStats.map((stat, idx) => (
        <Card
          key={stat.id}
          variant={idx === 0 ? "featured" : "default"}
          className="p-1"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground text-start">
              {t(stat.id)}
            </CardTitle>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#0052FF] to-[#4D7CFF] text-white shadow-accent">
              <stat.icon className="h-4 w-4 stroke-[2]" />
            </div>
          </CardHeader>
          <CardContent className="text-start space-y-1">
            <div className="text-3xl font-heading tracking-tight text-foreground">{stat.value}</div>
            {stat.change && (
              <p className="text-xs font-mono text-muted-foreground/80">
                {stat.change}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
