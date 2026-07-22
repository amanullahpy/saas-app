"use client";

import { Link } from "@/i18n/routing";
import { ROUTES } from "@/config/routes";
import { LanguageSwitcher } from "@/ui/components/LanguageSwitcher";
import { ThemeModeToggle } from "@/ui/components/ThemeModeToggle";
import { useTranslations } from "next-intl";
import { appConfig } from "@/config/app.config";
import { SectionLabel } from "@/components/ui/section-label";
import { ShieldCheck, Zap } from "lucide-react";

// ─── Brand panel ───────────────────────────────────────────────────────────────
function BrandPanel() {
  const tc = useTranslations("common");
  const t = useTranslations("shell");

  return (
    <aside
      aria-hidden="true"
      className="relative hidden md:flex md:w-[44%] lg:w-[42%] xl:w-[45%] shrink-0 flex-col justify-between overflow-hidden bg-foreground p-8 lg:p-12 xl:p-14 text-background"
    >
      {/* Background dot pattern & ambient glow */}
      <div className="pointer-events-none absolute inset-0 select-none overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-10 text-white" />
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-brand-secondary/20 blur-[120px]" />
      </div>

      {/* Logo */}
      <div className="relative z-10">
        <Link href={ROUTES.HOME} className="group inline-flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0052FF] to-[#4D7CFF] text-base font-bold text-white shadow-accent">
            {appConfig.name.charAt(0)}
          </div>
          <span className="text-xl font-heading tracking-tight text-white group-hover:text-white/90 transition-colors">
            {appConfig.name}
          </span>
        </Link>
      </div>

      {/* Center content */}
      <div className="relative z-10 space-y-8 max-w-md my-auto">
        <div className="relative w-20 h-20 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-dashed border-white/30 animate-[spin_60s_linear_infinite]" />
          <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-[#0052FF] to-[#4D7CFF] flex items-center justify-center shadow-accent text-white">
            <Zap className="h-6 w-6 stroke-[2]" />
          </div>
        </div>

        <div className="space-y-4">
          <SectionLabel variant="dark">{t("trusted_by")}</SectionLabel>
          <h2 className="text-3xl font-heading leading-[1.15] text-white lg:text-4xl">
            {t("hero_title")} <span className="gradient-text">{t("hero_subtitle")}</span>
          </h2>
          <p className="text-sm leading-relaxed text-white/70">
            {t("hero_description")}
          </p>
        </div>

        {/* Feature bullets */}
        <ul className="space-y-3">
          {[
            "multi_tenant",
            "rbac",
            "realtime",
            "security",
          ].map((key) => (
            <li key={key} className="flex items-center gap-3 text-sm text-white/80">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/25 border border-primary/40 text-primary">
                <ShieldCheck className="h-3.5 w-3.5" />
              </span>
              {t(`features.${key}`)}
            </li>
          ))}
        </ul>

        {/* Testimonial */}
        <div className="rounded-2xl bg-white/[0.06] p-5 border border-white/10 backdrop-blur-xs">
          <p className="text-sm italic leading-relaxed text-white/80">
            "{t("testimonial.quote")}"
          </p>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#0052FF] to-[#4D7CFF] text-xs font-bold text-white shadow-xs">
              {t("testimonial.author").charAt(0)}
            </div>
            <div>
              <p className="text-xs font-semibold text-white">{t("testimonial.author")}</p>
              <p className="text-[11px] text-white/60">{t("testimonial.role")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 pt-6 border-t border-white/10">
        <p className="text-xs font-mono text-white/40">
          © {new Date().getFullYear()} {appConfig.name}. {t("copyright")}
        </p>
      </div>
    </aside>
  );
}

// ─── Shell ─────────────────────────────────────────────────────────────────────
export function AuthShell({ children }: { children: React.ReactNode }) {
  const t = useTranslations("common");

  return (
    <div className="flex min-h-svh bg-background">
      <BrandPanel />

      {/* Form side */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-border/50 bg-background/80 backdrop-blur-md px-4 py-3 sm:px-6 md:border-b-0 md:px-8 md:py-4">
          {/* Mobile-only logo */}
          <Link
            href={ROUTES.HOME}
            className="flex items-center gap-2.5 md:hidden"
            tabIndex={0}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#0052FF] to-[#4D7CFF] text-xs font-bold text-white shadow-accent">
              {appConfig.name.charAt(0)}
            </div>
            <span className="text-base font-heading text-foreground">{appConfig.name}</span>
          </Link>

          <div className="ms-auto flex items-center gap-2">
            <LanguageSwitcher variant="navbar" />
            <ThemeModeToggle className="h-9 w-9 shrink-0 rounded-xl" />
          </div>
        </header>

        {/* Centered form */}
        <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-8 sm:py-12 md:px-10 lg:px-16">
          <div className="w-full max-w-[440px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
