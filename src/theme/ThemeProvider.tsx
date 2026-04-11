"use client";

import { useEffect, ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { semanticColors } from "./semantic/colors";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { mode, palette } = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    const colors = semanticColors[mode];

    // Apply basic semantic colors to CSS variables
    root.style.setProperty("--background", colors.background);
    root.style.setProperty("--foreground", colors.foreground);
    root.style.setProperty("--primary", colors.primary.default);
    root.style.setProperty("--primary-foreground", colors.primary.foreground);
    root.style.setProperty("--secondary", colors.secondary.default);
    root.style.setProperty("--secondary-foreground", colors.secondary.foreground);
    root.style.setProperty("--muted", colors.muted.default);
    root.style.setProperty("--muted-foreground", colors.muted.foreground);
    root.style.setProperty("--accent", colors.accent.default);
    root.style.setProperty("--accent-foreground", colors.accent.foreground);
    root.style.setProperty("--destructive", colors.destructive.default);
    root.style.setProperty("--destructive-foreground", colors.destructive.foreground);
    root.style.setProperty("--border", colors.border);
    root.style.setProperty("--input", colors.input);
    root.style.setProperty("--ring", colors.ring);

    // Apply mode class
    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [mode, palette]);

  return <>{children}</>;
}
