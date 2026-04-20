import { SkillsSettings } from "@/modules/settings/components/SkillsSettings";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

export default async function SkillsSettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("settings.skills");

  return (
    <>
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">{t("title")}</h2>
        <p className="text-muted-foreground mt-1 text-sm">{t("description")}</p>
      </div>

      <SkillsSettings />
    </>
  );
}
