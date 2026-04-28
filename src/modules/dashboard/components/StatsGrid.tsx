"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import type { DashboardStats } from "@/services/dashboard";

const statDefs = [
  { id: "revenue",       icon: DollarSign },
  { id: "subscriptions", icon: Users },
  { id: "sales",         icon: CreditCard },
  { id: "active_now",    icon: Activity },
];

interface Props {
  stats: DashboardStats | null;
}

export function StatsGrid({ stats }: Props) {
  const t = useTranslations("dashboard.stats");

  const values = stats
    ? [
        { id: "revenue",       value: String(stats.totalProjects),  change: "total projects" },
        { id: "subscriptions", value: String(stats.totalMembers),   change: "total members" },
        { id: "sales",         value: String(stats.totalDocuments), change: "total documents" },
        { id: "active_now",    value: String(stats.unreadNotifications), change: "unread notifications" },
      ]
    : [
        { id: "revenue",       value: "—", change: "" },
        { id: "subscriptions", value: "—", change: "" },
        { id: "sales",         value: "—", change: "" },
        { id: "active_now",    value: "—", change: "" },
      ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statDefs.map((def, i) => {
        const v = values[i];
        return (
          <Card key={def.id} className="border-none shadow-sm bg-card hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-start">
                {t(def.id)}
              </CardTitle>
              <def.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
            </CardHeader>
            <CardContent className="text-start">
              <div className="text-2xl font-bold">{v.value}</div>
              {v.change && (
                <p className="text-xs text-muted-foreground mt-1">{v.change}</p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
