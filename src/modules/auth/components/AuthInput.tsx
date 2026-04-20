import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Auth-specific input — uses explicit border/bg values so it's always
 * clearly visible regardless of theme variable strength.
 */
export const AuthInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      className={cn(
        // Base
        "w-full min-w-0 rounded-xl text-sm outline-none transition-all",
        // Sizing
        "h-11 px-3 py-2",
        // Border — explicit so it's always visible
        "border border-neutral-300 dark:border-neutral-600",
        // Background
        "bg-white dark:bg-neutral-800/60",
        // Text
        "text-neutral-900 dark:text-neutral-100",
        // Placeholder
        "placeholder:text-neutral-400 dark:placeholder:text-neutral-500",
        // Focus — strong ring
        "focus:border-primary focus:ring-2 focus:ring-primary/20 dark:focus:border-primary dark:focus:ring-primary/25",
        // Disabled
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-50 dark:disabled:bg-neutral-800",
        // Invalid
        "aria-invalid:border-red-400 aria-invalid:ring-2 aria-invalid:ring-red-400/20",
        className
      )}
      {...props}
    />
  );
});

AuthInput.displayName = "AuthInput";
