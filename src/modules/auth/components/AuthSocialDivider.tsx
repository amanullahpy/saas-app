"use client";

import { useTranslations } from "next-intl";

export function AuthSocialDivider() {
  const t = useTranslations("auth");

  return (
    <div className="relative flex items-center gap-3">
      <div className="h-px flex-1 bg-border/60" />
      <span className="shrink-0 text-[11px] font-medium uppercase tracking-widest text-muted-foreground/70">
        {t("divider_or")}
      </span>
      <div className="h-px flex-1 bg-border/60" />
    </div>
  );
}
