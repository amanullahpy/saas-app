"use client";

import { useEffect, useRef, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { semanticColors } from "./semantic/colors";
import { colors } from "./tokens/colors";
import { setMode } from "../store/slices/theme.slice";

const STORAGE_KEY = "saas-app-theme-mode";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const { mode, palette } = useSelector((state: RootState) => state.theme);
  const hydrated = useRef(false);

  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "dark" || stored === "light") {
        dispatch(setMode(stored));
      }
    } catch {
      /* ignore */
    }
  }, [dispatch]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* ignore */
    }
  }, [mode]);

  useEffect(() => {
    const root = window.document.documentElement;
    const c = semanticColors[mode];

    const cardBg = mode === "light" ? colors.neutral[0] : c.surface;
    const popoverBg = cardBg;

    root.style.setProperty("--background", c.background);
    root.style.setProperty("--foreground", c.foreground);
    root.style.setProperty("--primary", c.primary.default);
    root.style.setProperty("--primary-foreground", c.primary.foreground);
    root.style.setProperty("--secondary", c.secondary.default);
    root.style.setProperty("--secondary-foreground", c.secondary.foreground);
    root.style.setProperty("--muted", c.muted.default);
    root.style.setProperty("--muted-foreground", c.muted.foreground);
    root.style.setProperty("--accent", c.accent.default);
    root.style.setProperty("--accent-foreground", c.accent.foreground);
    root.style.setProperty("--destructive", c.destructive.default);
    root.style.setProperty("--destructive-foreground", c.destructive.foreground);
    root.style.setProperty("--border", c.border);
    root.style.setProperty("--input", c.input);
    root.style.setProperty("--ring", c.ring);

    root.style.setProperty("--card", cardBg);
    root.style.setProperty("--card-foreground", c.foreground);
    root.style.setProperty("--popover", popoverBg);
    root.style.setProperty("--popover-foreground", c.foreground);

    const sidebarBg = mode === "light" ? colors.neutral[50] : c.surface;
    root.style.setProperty("--sidebar", sidebarBg);
    root.style.setProperty("--sidebar-foreground", c.foreground);
    root.style.setProperty("--sidebar-primary", c.primary.default);
    root.style.setProperty("--sidebar-primary-foreground", c.primary.foreground);
    root.style.setProperty("--sidebar-accent", c.accent.default);
    root.style.setProperty("--sidebar-accent-foreground", c.accent.foreground);
    root.style.setProperty("--sidebar-border", c.border);
    root.style.setProperty("--sidebar-ring", c.ring);

    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [mode, palette]);

  return <>{children}</>;
}
