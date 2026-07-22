import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  pulse?: boolean;
  variant?: "default" | "subtle" | "dark";
}

export function SectionLabel({
  children,
  pulse = true,
  variant = "default",
  className,
  ...props
}: SectionLabelProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 transition-all duration-200",
        variant === "default" &&
          "border-primary/25 bg-primary/5 text-primary shadow-xs hover:border-primary/40",
        variant === "subtle" &&
          "border-border/60 bg-muted/60 text-muted-foreground",
        variant === "dark" &&
          "border-white/20 bg-white/10 text-white backdrop-blur-xs",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "h-2 w-2 rounded-full shrink-0",
          variant === "default" && "bg-primary",
          variant === "subtle" && "bg-muted-foreground",
          variant === "dark" && "bg-white",
          pulse && "animate-pulse"
        )}
      />
      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] leading-none">
        {children}
      </span>
    </div>
  );
}
