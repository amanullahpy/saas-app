import { ProfileSettings } from "@/modules/settings/components/ProfileSettings";
import { PreferencesSettings } from "@/modules/settings/components/PreferencesSettings";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

export default async function SettingsPage({
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
        <h2 className="text-3xl font-bold tracking-tight text-foreground">{t("title")}</h2>
        <p className="text-muted-foreground mt-1 text-sm">{t("description")}</p>
      </div>

      <div className="grid gap-6">
        <ProfileSettings />
        <PreferencesSettings />
      </div>
    </>
  );
}
