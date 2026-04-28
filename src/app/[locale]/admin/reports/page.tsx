import { setRequestLocale } from "next-intl/server";
import { ReportsClient, type Report } from "@/modules/admin/ReportsClient";
import { getAdminStats } from "@/services/admin/stats";
import { authConfig } from "@/config/auth";

export default async function AdminReportsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const stats = authConfig.driver === "http" ? await getAdminStats() : null;

  const REPORTS: Report[] = [
    {
      name: "Monthly Revenue Report",
      desc: "MRR, ARR, churn, and expansion revenue breakdown.",
      iconName: "TrendingUp",
      color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30",
      generated: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      size: "—",
      module: "admin-revenue",
      columns: ["Metric", "Value"],
      rows: [
        { Metric: "MRR", Value: stats?.mrr ?? "—" },
        { Metric: "Total Tenants", Value: String(stats?.totalTenants ?? "—") },
        { Metric: "Total Users", Value: String(stats?.totalUsers ?? "—") },
      ],
    },
    {
      name: "User Growth Report",
      desc: "New signups, activation rates, and retention cohorts.",
      iconName: "Users",
      color: "text-blue-600 bg-blue-50 dark:bg-blue-950/30",
      generated: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      size: "—",
      module: "admin-users-growth",
      columns: ["Metric", "Value"],
      rows: [{ Metric: "Total Users", Value: String(stats?.totalUsers ?? "—") }],
    },
    {
      name: "Tenant Activity Report",
      desc: "Per-tenant usage, seat utilization, and feature adoption.",
      iconName: "Building2",
      color: "text-purple-600 bg-purple-50 dark:bg-purple-950/30",
      generated: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      size: "—",
      module: "admin-tenants-activity",
      columns: ["Metric", "Value"],
      rows: [{ Metric: "Total Tenants", Value: String(stats?.totalTenants ?? "—") }],
    },
    {
      name: "Compliance & Audit Export",
      desc: "Full audit trail export for compliance and SIEM.",
      iconName: "FileText",
      color: "text-rose-600 bg-rose-50 dark:bg-rose-950/30",
      generated: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      size: "—",
      module: "admin-audit-export",
      columns: ["Note"],
      rows: [{ Note: "Run from Audit Log page for full export." }],
    },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-8">
      <ReportsClient reports={REPORTS} stats={stats} />
    </div>
  );
}
