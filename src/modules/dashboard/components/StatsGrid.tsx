"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";

const stats = [
  {
    id: "revenue",
    icon: DollarSign,
    value: "$45,231.89",
    change: "+20.1% from last month",
  },
  {
    id: "subscriptions",
    icon: Users,
    value: "+2,350",
    change: "+180.1% from last month",
  },
  {
    id: "sales",
    icon: CreditCard,
    value: "+12,234",
    change: "+19% from last month",
  },
  {
    id: "active_now",
    icon: Activity,
    value: "+573",
    change: "+201 since last hour",
  },
];

export function StatsGrid() {
  const t = useTranslations("dashboard.stats");

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.id} className="border-none shadow-sm bg-card hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-start">
              {t(stat.id)}
            </CardTitle>
            <stat.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
          </CardHeader>
          <CardContent className="text-start">
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
