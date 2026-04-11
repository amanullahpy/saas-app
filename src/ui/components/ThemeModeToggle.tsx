"use client";

import { useDispatch, useSelector } from "react-redux";
import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { RootState } from "@/store/store";
import { toggleMode } from "@/store/slices/theme.slice";
import { cn } from "@/lib/utils";

export function ThemeModeToggle({ className }: { className?: string }) {
  const t = useTranslations("common");
  const dispatch = useDispatch();
  const mode = useSelector((s: RootState) => s.theme.mode);

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn("rounded-full", className)}
      onClick={() => dispatch(toggleMode())}
      aria-label={mode === "light" ? t("toggle_dark") : t("toggle_light")}
    >
      {mode === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </Button>
  );
}
