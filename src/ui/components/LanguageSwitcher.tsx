"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LOCALE_LABELS, supportedLocales } from "@/config/locales";
import { cn } from "@/lib/utils";

type Props = {
  variant?: "navbar" | "default";
  className?: string;
};

export function LanguageSwitcher({ variant = "default", className }: Props) {
  const t = useTranslations("common");
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = (params?.locale as string) ?? "en";

  return (
    <Select value={locale} onValueChange={(next) => router.replace(pathname, { locale: next })}>
      <SelectTrigger
        size={variant === "navbar" ? "sm" : "default"}
        className={cn(
          variant === "navbar" &&
            "h-9 w-[min(132px,38vw)] border-border/60 bg-muted/40 text-xs sm:w-[148px] sm:text-sm",
          variant === "default" && "h-11 w-full rounded-xl",
          className
        )}
        aria-label={t("language")}
      >
        <SelectValue placeholder={t("language")} />
      </SelectTrigger>
      <SelectContent align="end" className="min-w-[var(--radix-select-trigger-width)]">
        {supportedLocales.map((code) => (
          <SelectItem key={code} value={code}>
            {LOCALE_LABELS[code] ?? code}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
