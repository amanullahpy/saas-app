"use client";

import { Link } from "@/i18n/routing";
import { appConfig } from "@/config/app.config";
import { ROUTES } from "@/config/routes";
import { LanguageSwitcher } from "@/ui/components/LanguageSwitcher";
import { ThemeModeToggle } from "@/ui/components/ThemeModeToggle";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh flex flex-col bg-gradient-to-b from-muted/40 via-background to-muted/20">
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/90 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-background/75">
        <div className="mx-auto flex min-h-14 w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-2 sm:px-6">
          <Link
            href={ROUTES.HOME}
            className="max-w-[min(100%,220px)] truncate text-left text-sm font-semibold tracking-tight text-foreground transition-opacity hover:opacity-90 sm:text-base"
          >
            {appConfig.nameFull}
          </Link>
          <div className="ml-auto flex shrink-0 flex-wrap items-center justify-end gap-2 sm:gap-3">
            <LanguageSwitcher variant="navbar" />
            <ThemeModeToggle className="h-9 w-9 shrink-0 hover:bg-primary/10" />
          </div>
        </div>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
        <div className="w-full max-w-[min(100%,440px)]">{children}</div>
      </main>
    </div>
  );
}
