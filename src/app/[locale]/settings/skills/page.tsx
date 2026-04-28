import { SkillsSettings } from "@/modules/settings/components/SkillsSettings";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { getUserSkills } from "@/services/settings";
import { getCurrentUserId } from "@/lib/auth-server";
import { authConfig } from "@/config/auth";

export default async function SkillsSettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("settings.skills");

  let frontendSkills: string[] = [];
  let fullstackSkills: string[] = [];
  let userId: string | null = null;

  if (authConfig.driver === "http") {
    userId = await getCurrentUserId();
    if (userId) {
      const skills = await getUserSkills(userId);
      frontendSkills = skills.frontendSkills;
      fullstackSkills = skills.fullstackSkills;
    }
  }

  return (
    <>
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">{t("title")}</h2>
        <p className="text-muted-foreground mt-1 text-sm">{t("description")}</p>
      </div>

      <SkillsSettings
        initialFrontend={frontendSkills}
        initialFullstack={fullstackSkills}
        userId={userId}
      />
    </>
  );
}
