import { MainShell } from "@/ui/layout/MainShell";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { TeamClient } from "@/modules/team/TeamClient";
import type { Member } from "@/modules/team/TeamClient";
import { getTeamMembers } from "@/services/team";
import { authConfig } from "@/config/auth";
import { PageHeader } from "@/components/ui/page-header";

export default async function TeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("modules.team");

  let members: Member[] = [];

  if (authConfig.driver === "http") {
    members = await getTeamMembers();
  }

  return (
    <MainShell>
      <div className="space-y-8">
        <PageHeader
          badge={t("badge")}
          title={t("title")}
          description={t("description")}
        />
        <TeamClient initialMembers={members} />
      </div>
    </MainShell>
  );
}
