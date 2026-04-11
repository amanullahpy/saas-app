"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { GoogleGlyph } from "./GoogleGlyph";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

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
        "h-11 w-full gap-3 border-border/50 bg-muted/30 text-muted-foreground shadow-none",
        "hover:bg-muted/30",
        className
      )}
    >
      <GoogleGlyph className="size-[18px] shrink-0 opacity-80" />
      <span className="text-sm font-medium">{t("continue_google")}</span>
    </Button>
  );
}
