"use client";

import { useSelector } from "react-redux";
import { Toaster as Sonner } from "sonner";
import { CheckCircle2, AlertCircle, AlertTriangle, Info } from "lucide-react";
import type { RootState } from "@/store/store";
import { cn } from "@/lib/utils";

export function Toaster() {
  const mode = useSelector((s: RootState) => s.theme.mode);

  return (
    <Sonner
      theme={mode === "dark" ? "dark" : "light"}
      position="top-center"
      closeButton
      expand={false}
      richColors={false}
      className="toaster group"
      toastOptions={{
        duration: 4800,
        classNames: {
          toast: cn(
            "group/toast w-full max-w-[min(100vw-2rem,420px)] border shadow-lg backdrop-blur-xl",
            "bg-background/75 text-foreground border-border/50",
            "dark:bg-background/70 dark:border-border/40"
          ),
          title: "text-sm font-semibold leading-snug",
          description: "text-xs opacity-90",
          closeButton:
            "border-border/50 bg-background/80 text-foreground opacity-70 hover:opacity-100",
          success: cn(
            "!border-emerald-500/35 !bg-emerald-500/[0.12] dark:!bg-emerald-500/[0.15]",
            "!text-emerald-950 dark:!text-emerald-50"
          ),
          error: cn(
            "!border-red-500/40 !bg-red-500/[0.12] dark:!bg-red-500/[0.14]",
            "!text-red-950 dark:!text-red-50"
          ),
          warning: cn(
            "!border-amber-500/45 !bg-amber-500/[0.14] dark:!bg-amber-400/[0.12]",
            "!text-amber-950 dark:!text-amber-50"
          ),
          info: cn(
            "!border-sky-500/35 !bg-sky-500/[0.12] dark:!bg-sky-500/[0.14]",
            "!text-sky-950 dark:!text-sky-50"
          ),
        },
      }}
      icons={{
        success: <CheckCircle2 className="size-4 shrink-0 stroke-[1.75] text-emerald-600 dark:text-emerald-400" />,
        error: <AlertCircle className="size-4 shrink-0 stroke-[1.75] text-red-600 dark:text-red-400" />,
        warning: (
          <AlertTriangle className="size-4 shrink-0 stroke-[1.75] text-amber-600 dark:text-amber-400" />
        ),
        info: <Info className="size-4 shrink-0 stroke-[1.75] text-sky-600 dark:text-sky-400" />,
      }}
    />
  );
}
