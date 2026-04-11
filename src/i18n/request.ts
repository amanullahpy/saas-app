import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  // Load module translations and merge them
  // For now, let's just load the main locales
  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default,
  };
});
