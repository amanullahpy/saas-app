"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bell, Search, Shield } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageSwitcher } from "@/ui/components/LanguageSwitcher";
import { ThemeModeToggle } from "@/ui/components/ThemeModeToggle";

export function AppNavbar({ variant = "app" }: { variant?: "app" | "admin" }) {
  const t = useTranslations("common");

  return (
    <header className="sticky top-0 z-40 flex min-h-14 w-full max-w-full flex-wrap items-center gap-2 border-b border-border/60 bg-background/80 px-3 py-2 backdrop-blur-md supports-[backdrop-filter]:bg-background/70 sm:h-16 sm:flex-nowrap sm:gap-4 sm:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-4">
        <SidebarTrigger className="shrink-0 rounded-xl hover:bg-primary/10 transition-all duration-200" />
        {variant === "admin" ? (
          <Badge
            variant="outline"
            className="hidden shrink-0 gap-1.5 border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-primary rounded-full sm:inline-flex shadow-xs"
          >
            <Shield className="size-3.5 stroke-[2]" aria-hidden />
            {t("admin_console_badge")}
          </Badge>
        ) : null}
        <div className="relative hidden min-w-0 max-w-md flex-1 md:block">
          <Search className="absolute top-1/2 start-3.5 h-4 w-4 -translate-y-1/2 stroke-[1.75] text-muted-foreground/70" />
          <Input
            placeholder={t("search")}
            className="h-10 border-border/50 bg-muted/40 ps-10 shadow-none rounded-xl focus-visible:ring-2 focus-visible:ring-primary/30 transition-all"
          />
        </div>
      </div>

      <div className="ms-auto flex shrink-0 flex-wrap items-center justify-end gap-2 sm:gap-3">
        <LanguageSwitcher variant="navbar" className="sm:min-w-[148px]" />
        <ThemeModeToggle className="h-9 w-9 shrink-0 rounded-xl hover:bg-primary/10 transition-all" />
        <Button variant="ghost" size="icon" className="relative h-9 w-9 shrink-0 rounded-xl hover:bg-primary/10 transition-all">
          <Bell className="h-4.5 w-4.5 stroke-[1.75] text-muted-foreground" />
          <span className="absolute top-2.5 end-2.5 h-2 w-2 rounded-full bg-primary animate-pulse" />
        </Button>
      </div>
    </header>
  );
}
