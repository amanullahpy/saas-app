import { MainShell } from "@/ui/layout/MainShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { setRequestLocale } from "next-intl/server";
import { BookOpen, MessageSquare, Video, ArrowRight, Search, Zap, Shield, CreditCard, Users, Settings } from "lucide-react";

const ARTICLES = [
  { title: "Getting started with your workspace", category: "Onboarding", views: "12.4k", icon: Zap },
  { title: "How to invite and manage team members", category: "Team", views: "8.1k", icon: Users },
  { title: "Setting up SSO and two-factor authentication", category: "Security", views: "6.7k", icon: Shield },
  { title: "Understanding your billing and invoices", category: "Billing", views: "5.9k", icon: CreditCard },
  { title: "Configuring role-based access control", category: "Admin", views: "4.3k", icon: Settings },
  { title: "Exporting data and audit logs", category: "Admin", views: "3.8k", icon: BookOpen },
];

const CATEGORIES = [
  { name: "Getting Started", count: 12, icon: Zap, color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" },
  { name: "Security", count: 8, icon: Shield, color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" },
  { name: "Billing", count: 6, icon: CreditCard, color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" },
  { name: "Team & Roles", count: 10, icon: Users, color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" },
];

export default async function HelpPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <MainShell>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Help Center</h2>
          <p className="mt-1 text-sm text-muted-foreground">Guides, docs, and support for your workspace.</p>
        </div>

        {/* Search */}
        <Card className="border-none shadow-sm bg-card">
          <CardContent className="pt-6 pb-6">
            <div className="relative max-w-xl mx-auto">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search documentation..."
                className="h-12 w-full rounded-2xl border border-border bg-background pl-11 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </CardContent>
        </Card>

        {/* Support channels */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: BookOpen, title: "Documentation", desc: "Browse full API and feature docs.", action: "Read docs", color: "text-blue-500 bg-blue-50 dark:bg-blue-950/30" },
            { icon: MessageSquare, title: "Live Chat", desc: "Chat with our support team in real time.", action: "Start chat", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30" },
            { icon: Video, title: "Video Guides", desc: "Step-by-step walkthroughs for every feature.", action: "Watch now", color: "text-purple-500 bg-purple-50 dark:bg-purple-950/30" },
          ].map((c) => (
            <Card key={c.title} className="border-none shadow-sm bg-card hover:shadow-md transition-shadow">
              <CardContent className="flex flex-col gap-3 pt-5">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${c.color}`}>
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{c.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{c.desc}</p>
                </div>
                <Button variant="outline" size="sm" className="w-fit rounded-xl gap-1.5 text-xs mt-1">
                  {c.action} <ArrowRight className="h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Popular articles */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Popular Articles</h3>
            <Card className="border-none shadow-sm bg-card overflow-hidden">
              <div className="divide-y divide-border/50">
                {ARTICLES.map((a) => (
                  <button key={a.title} className="flex w-full items-center gap-4 px-5 py-3.5 text-left hover:bg-muted/40 transition-colors group">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <a.icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground group-hover:text-primary transition-colors">{a.title}</p>
                      <p className="text-xs text-muted-foreground">{a.category} · {a.views} views</p>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Browse by Category</h3>
            <div className="space-y-2">
              {CATEGORIES.map((cat) => (
                <Card key={cat.name} className="border-none shadow-sm bg-card hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="flex items-center gap-3 py-3 px-4">
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${cat.color}`}>
                      <cat.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{cat.name}</p>
                      <p className="text-xs text-muted-foreground">{cat.count} articles</p>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainShell>
  );
}
