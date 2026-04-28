import { MainShell } from "@/ui/layout/MainShell";
import { setRequestLocale } from "next-intl/server";
import { TeamClient } from "@/modules/team/TeamClient";
import type { Member } from "@/modules/team/TeamClient";
import { getTeamMembers } from "@/services/team";
import { authConfig } from "@/config/auth";

export default async function TeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  let members: Member[] = [];

  if (authConfig.driver === "http") {
    members = await getTeamMembers();
  }

  return (
    <MainShell>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Team</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            People in your workspace{members.length > 0 ? ` — ${members.length} members` : ""}.
          </p>
        </div>
        <TeamClient initialMembers={members} />
      </div>
    </MainShell>
  );
}
