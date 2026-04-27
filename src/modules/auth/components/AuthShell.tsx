"use client";

import { Link } from "@/i18n/routing";
import { ROUTES } from "@/config/routes";
import { LanguageSwitcher } from "@/ui/components/LanguageSwitcher";
import { ThemeModeToggle } from "@/ui/components/ThemeModeToggle";
import { useTranslations } from "next-intl";
import { appConfig } from "@/config/app.config";

// ─── Brand panel ───────────────────────────────────────────────────────────────
function BrandPanel() {
  const tc = useTranslations("common");
  const t = useTranslations("shell");

  return (
    <aside
      aria-hidden="true"
      className="relative hidden md:flex md:w-[44%] lg:w-[42%] xl:w-[40%] shrink-0 flex-col justify-between overflow-hidden bg-primary p-8 lg:p-12 xl:p-14"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 select-none overflow-hidden">
        {/* Large circles */}
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-white/[0.04]" />
        <div className="absolute -bottom-32 -right-32 h-[420px] w-[420px] rounded-full bg-white/[0.04]" />
        {/* Dot grid */}
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="auth-dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="white" fillOpacity="0.07" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#auth-dots)" />
        </svg>
        {/* Gradient overlay bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-primary/80 to-transparent" />
      </div>

      {/* Logo */}
      <div className="relative z-10">
        <Link href={ROUTES.HOME} className="group inline-flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 text-sm font-bold text-white ring-1 ring-white/20 transition-colors group-hover:bg-white/25">
            {appConfig.name.charAt(0)}
          </div>
          <span className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors">
            {tc("product_title")}
          </span>
        </Link>
      </div>

      {/* Center content */}
      <div className="relative z-10 space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs font-medium text-white/80">{t("trusted_by")}</span>
          </div>
          <h2 className="text-3xl font-bold leading-snug tracking-tight text-white lg:text-4xl">
            {t("hero_title")}<br />
            <span className="text-white/50">{t("hero_subtitle")}</span>
          </h2>
          <p className="max-w-[280px] text-sm leading-relaxed text-white/55">
            {t("hero_description")}
          </p>
        </div>

        {/* Feature bullets */}
        <ul className="space-y-3.5">
          {[
            "multi_tenant",
            "rbac",
            "realtime",
            "security",
          ].map((key) => (
            <li key={key} className="flex items-center gap-3 text-sm text-white/65">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/10">
                <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 10 10" aria-hidden>
                  <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {t(`features.${key}`)}
            </li>
          ))}
        </ul>

        {/* Testimonial */}
        <div className="rounded-2xl bg-white/[0.07] p-4 ring-1 ring-white/10">
          <p className="text-sm italic leading-relaxed text-white/60">
            {t("testimonial.quote")}
          </p>
          <div className="mt-3 flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-xs font-semibold text-white">
              {t("testimonial.author").charAt(0)}
            </div>
            <div>
              <p className="text-xs font-medium text-white/80">{t("testimonial.author")}</p>
              <p className="text-[11px] text-white/45">{t("testimonial.role")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <p className="text-xs text-white/30">
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
        <header className="flex items-center justify-between border-b border-border/60 bg-background px-4 py-3 sm:px-6 md:border-b-0 md:px-8 md:py-4">
          {/* Mobile-only logo */}
          <Link
            href={ROUTES.HOME}
            className="flex items-center gap-2 md:invisible"
            tabIndex={0}
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
              {appConfig.name.charAt(0)}
            </div>
            <span className="text-sm font-semibold text-foreground">{t("product_title")}</span>
          </Link>

          <div className="ml-auto flex items-center gap-2">
            <LanguageSwitcher variant="navbar" />
            <ThemeModeToggle className="h-8 w-8 shrink-0" />
          </div>
        </header>

        {/* Centered form */}
        <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-8 sm:py-12 md:px-10 lg:px-16">
          <div className="w-full max-w-[420px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
