"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";

const tabs = [
  { href: ROUTES.SETTINGS, labelKey: "profile" as const },
  { href: ROUTES.SETTINGS_SECURITY, labelKey: "security" as const },
];

export function SettingsSubnav() {
  const pathname = usePathname();
  const t = useTranslations("common");

  return (
    <nav className="flex flex-wrap gap-2 border-b border-border pb-4" aria-label="Settings sections">
      {tabs.map(({ href, labelKey }) => {
        const active =
          href === ROUTES.SETTINGS_SECURITY
            ? pathname === ROUTES.SETTINGS_SECURITY
            : pathname === ROUTES.SETTINGS;
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "rounded-md px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {t(labelKey)}
          </Link>
        );
      })}
    </nav>
  );
}
