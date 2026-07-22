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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {displayStats.map((stat) => (
        <Card key={stat.id} className="border-none shadow-sm bg-card hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-start">
              {t(stat.id)}
            </CardTitle>
            <stat.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
          </CardHeader>
          <CardContent className="text-start">
            <div className="text-2xl font-bold">{stat.value}</div>
            {stat.change && (
              <p className="text-xs text-muted-foreground mt-1">
                {stat.change}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
