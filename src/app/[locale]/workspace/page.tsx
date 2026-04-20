import { MainShell } from "@/ui/layout/MainShell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { setRequestLocale } from "next-intl/server";
import { Building2, Users, CreditCard, ShieldCheck, Zap, Globe, ArrowRight, CheckCircle2 } from "lucide-react";

export default async function WorkspacePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <MainShell>
      <div className="space-y-8">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Workspace</h2>
            <p className="mt-1 text-sm text-muted-foreground">Your active tenant context, usage, and quick links.</p>
          </div>
          <Badge variant="secondary" className="w-fit gap-1.5 px-3 py-1 text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Active
          </Badge>
        </div>

        {/* Workspace overview */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Plan", value: "Pro", icon: Zap, color: "text-amber-500" },
            { label: "Members", value: "12 / 20", icon: Users, color: "text-blue-500" },
            { label: "Storage Used", value: "4.2 GB / 10 GB", icon: Globe, color: "text-purple-500" },
            { label: "SSO", value: "Enabled", icon: ShieldCheck, color: "text-emerald-500" },
          ].map((item) => (
            <Card key={item.label} className="border-none shadow-sm bg-card hover:shadow-md transition-shadow">
              <CardContent className="flex items-center gap-4 pt-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-semibold text-foreground">{item.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Tenant info */}
          <Card className="lg:col-span-2 border-none shadow-sm bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                Current Workspace
              </CardTitle>
              <CardDescription>Tenant-scoped data and permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Workspace Name", value: "Acme Corp" },
                { label: "Tenant ID", value: "ten_01hx9k2m3n4p5q6r7s8t" },
                { label: "Region", value: "US East (N. Virginia)" },
                { label: "Created", value: "January 12, 2024" },
                { label: "Owner", value: "john@acmecorp.com" },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between border-b border-border/50 pb-3 last:border-0 last:pb-0">
                  <span className="text-sm text-muted-foreground">{row.label}</span>
                  <span className="text-sm font-medium text-foreground">{row.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick actions */}
          <Card className="border-none shadow-sm bg-card">
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { label: "Invite a member", icon: Users },
                { label: "Manage billing", icon: CreditCard },
                { label: "Security settings", icon: ShieldCheck },
                { label: "View audit log", icon: CheckCircle2 },
              ].map((action) => (
                <Button key={action.label} variant="ghost" className="w-full justify-between h-10 px-3 rounded-xl text-sm">
                  <span className="flex items-center gap-2">
                    <action.icon className="h-4 w-4 text-muted-foreground" />
                    {action.label}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainShell>
  );
}
