"use client";

import { useTranslations } from "next-intl";
import { Separator } from "@/components/ui/separator";

export function AuthSocialDivider() {
  const t = useTranslations("auth");

  return (
    <div className="relative py-1">
      <div className="absolute inset-0 flex items-center">
        <Separator />
      </div>
      <div className="relative flex justify-center text-[10px] font-semibold uppercase tracking-[0.2em]">
        <span className="bg-card px-3 text-muted-foreground">{t("divider_or")}</span>
      </div>
    </div>
  );
}
