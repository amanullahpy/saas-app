import { MainShell } from "@/ui/layout/MainShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";

export type CreateAppPageOptions = {
  /** Use inside `AdminShell` layouts (admin / tenant) instead of wrapping again. */
  shell?: "main" | "none";
};

async function renderPageBody(locale: string, pageKey: string): Promise<ReactNode> {
  setRequestLocale(locale);
  const t = await getTranslations(`pages.${pageKey}`);

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-8">
      <header className="space-y-2">
        <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {t("title")}
        </h1>
        <p className="max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
          {t("description")}
        </p>
      </header>
      <Card className="border-border/50 bg-card/90 shadow-sm backdrop-blur-sm dark:bg-card/80">
        <CardHeader className="space-y-1">
          <CardTitle className="text-lg font-semibold">{t("card_title")}</CardTitle>
          <CardDescription className="text-sm">{t("card_description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">{t("card_body")}</p>
        </CardContent>
      </Card>
    </div>
  );
}

export function createAppPage(pageKey: string, options?: CreateAppPageOptions) {
  const shell = options?.shell ?? "main";

  return async function AppPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const body = await renderPageBody(locale, pageKey);

    if (shell === "none") {
      return body;
    }

    return <MainShell>{body}</MainShell>;
  };
}
