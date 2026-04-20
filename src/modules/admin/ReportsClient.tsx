"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ReportDownloader, type ReportConfig } from "@/components/ReportDownloader";
import { TrendingUp, Users, Building2, CreditCard, BarChart2, FileText, type LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = { TrendingUp, Users, Building2, CreditCard, BarChart2, FileText };

export interface Report {
  name: string; desc: string; iconName: string; color: string;
  generated: string; size: string; module: string;
  columns: string[]; rows: Record<string, string | number>[];
}

const METRICS = [
  { label:"MRR",                  value:"$18,430",  change:"+12.4%", up:true  },
  { label:"ARR",                  value:"$221,160", change:"+12.4%", up:true  },
  { label:"Churn Rate",           value:"2.1%",     change:"-0.3%",  up:false },
  { label:"Avg Revenue / Tenant", value:"$129.79",  change:"+4.2%",  up:true  },
];

export function ReportsClient({ reports }: { reports: Report[] }) {
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Reports</h1>
        <p className="mt-1 text-sm text-muted-foreground">Exports and scheduled analytics across all tenants.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {METRICS.map(m => (
          <Card key={m.label} className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-5">
              <p className="text-xs text-muted-foreground">{m.label}</p>
              <p className="mt-1 text-2xl font-bold text-foreground">{m.value}</p>
              <p className={`mt-0.5 text-xs font-medium ${m.up ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"}`}>{m.change} vs last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/50 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-border/50 pb-4">
          <CardTitle className="text-base">Available Reports</CardTitle>
          <CardDescription>Download module-specific CSV reports with app branding</CardDescription>
        </CardHeader>
        <div className="divide-y divide-border/50">
          {reports.map(r => {
            const Icon = ICON_MAP[r.iconName] ?? FileText;
            const config: ReportConfig = {
              module: r.module,
              title: r.name,
              description: r.desc,
              columns: r.columns,
              rows: r.rows,
            };
            return (
              <div key={r.name} className="flex items-center gap-4 px-6 py-4 hover:bg-muted/30 transition-colors">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${r.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{r.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{r.desc}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Generated {r.generated} · {r.size}</p>
                </div>
                <ReportDownloader config={config} label="Download" variant="outline" size="sm" />
              </div>
            );
          })}
        </div>
      </Card>
    </>
  );
}
