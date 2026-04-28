import { ProfileSettings } from "@/modules/settings/components/ProfileSettings";
import { PreferencesSettings } from "@/modules/settings/components/PreferencesSettings";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { getUserProfile } from "@/services/settings";
import { getCurrentUserId } from "@/lib/auth-server";
import { authConfig } from "@/config/auth";

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("settings");

  let profile = null;
  if (authConfig.driver === "http") {
    const userId = await getCurrentUserId();
    if (userId) {
      profile = await getUserProfile(userId);
    }
  }

  return (
    <>
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">{t("title")}</h2>
        <p className="text-muted-foreground mt-1 text-sm">{t("description")}</p>
      </div>

      <div className="grid gap-6">
        <ProfileSettings profile={profile} />
        <PreferencesSettings />
      </div>
    </>
  );
}
