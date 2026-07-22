import { MainShell } from "@/ui/layout/MainShell";
import { ProfileSettings } from "@/modules/settings/components/ProfileSettings";
import { PreferencesSettings } from "@/modules/settings/components/PreferencesSettings";
import { PageHeader } from "@/components/ui/page-header";
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
    <MainShell>
      <div className="space-y-8">
        <PageHeader title={t("title")} description={t("description")} />

        <div className="grid gap-6">
          <ProfileSettings profile={profile} />
          <PreferencesSettings />
        </div>
      </div>
    </MainShell>
  );
}
