import { MainShell } from "@/ui/layout/MainShell";
import { setRequestLocale } from "next-intl/server";
import { TeamClient } from "@/modules/team/TeamClient";
import type { Member } from "@/modules/team/TeamClient";

const MEMBERS: Member[] = [
  { name: "Sarah Kim",    email: "sarah@acmecorp.com",  role: "Admin",  dept: "Engineering", status: "Active",  initials: "SK", color: "bg-violet-500" },
  { name: "James Okafor", email: "james@acmecorp.com",  role: "Member", dept: "Product",     status: "Active",  initials: "JO", color: "bg-blue-500"   },
  { name: "Priya Sharma", email: "priya@acmecorp.com",  role: "Member", dept: "Design",      status: "Active",  initials: "PS", color: "bg-pink-500"   },
  { name: "Carlos Ruiz",  email: "carlos@acmecorp.com", role: "Member", dept: "Engineering", status: "Active",  initials: "CR", color: "bg-amber-500"  },
  { name: "Mei Lin",      email: "mei@acmecorp.com",    role: "Member", dept: "Marketing",   status: "Away",    initials: "ML", color: "bg-emerald-500"},
  { name: "Tom Brennan",  email: "tom@acmecorp.com",    role: "Viewer", dept: "Sales",       status: "Active",  initials: "TB", color: "bg-cyan-500"   },
  { name: "Aisha Nwosu",  email: "aisha@acmecorp.com",  role: "Member", dept: "Engineering", status: "Offline", initials: "AN", color: "bg-rose-500"   },
  { name: "David Park",   email: "david@acmecorp.com",  role: "Member", dept: "Product",     status: "Active",  initials: "DP", color: "bg-indigo-500" },
];

export default async function TeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <MainShell>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Team</h2>
          <p className="mt-1 text-sm text-muted-foreground">People in your workspace — {MEMBERS.length} members.</p>
        </div>
        <TeamClient initialMembers={MEMBERS} />
      </div>
    </MainShell>
  );
}
