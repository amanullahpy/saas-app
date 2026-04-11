"use client";

import { useLocale } from "next-intl";

const RTL_LOCALES = new Set(["ur"]);

export function useRtl() {
  const locale = useLocale();
  return RTL_LOCALES.has(locale);
}
