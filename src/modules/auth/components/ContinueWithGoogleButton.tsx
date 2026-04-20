"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { GoogleGlyph } from "./GoogleGlyph";
import { cn } from "@/lib/utils";

type Props = { className?: string };

/** Placeholder OAuth control — disabled until backend wiring. */
export function ContinueWithGoogleButton({ className }: Props) {
  const t = useTranslations("auth");

  return (
    <Button
      type="button"
      variant="outline"
      disabled
      aria-disabled
      className={cn(
        "h-11 w-full gap-3 rounded-xl border-border/60 bg-background font-medium text-foreground/70 shadow-none",
        "hover:bg-muted/50 disabled:opacity-60 disabled:cursor-not-allowed",
        className
      )}
    >
      <GoogleGlyph className="size-[18px] shrink-0" />
      <span className="text-sm">{t("continue_google")}</span>
    </Button>
  );
}
