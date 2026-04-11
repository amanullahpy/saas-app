import { routing } from "@/i18n/routing";

/** Display labels for language switcher (add entries when adding `routing.locales`) */
export const LOCALE_LABELS: Record<string, string> = {
  en: "English",
  ur: "اردو",
};

export const supportedLocales = routing.locales;
