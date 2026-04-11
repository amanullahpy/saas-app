import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

export default async function SecuritySettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("settings");

  return (
    <>
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">{t("security.title")}</h2>
        <p className="text-muted-foreground mt-1 text-sm">{t("security.description")}</p>
      </div>

      <Card className="border-border/50 shadow-sm">
        <CardHeader>
          <CardTitle>{t("security.two_factor_title")}</CardTitle>
          <CardDescription>{t("security.two_factor_description")}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">{t("security.two_factor_hint")}</p>
          <Button type="button" variant="secondary" disabled>
            {t("security.two_factor_enable")}
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
