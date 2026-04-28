import { supabase } from "@/lib/supabase";
import type { Member } from "@/modules/team/TeamClient";

const AVATAR_COLORS = [
  "bg-violet-500","bg-blue-500","bg-pink-500","bg-amber-500",
  "bg-emerald-500","bg-cyan-500","bg-rose-500","bg-indigo-500",
];

export async function getTeamMembers(): Promise<Member[]> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, name, email, role")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching team members:", error);
    return [];
  }

  return (data || []).map((p, i) => {
    const initials = p.name
      ? p.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase()
      : p.email.slice(0, 2).toUpperCase();
    return {
      name: p.name || p.email,
      email: p.email,
      role: p.role === "admin" ? "Admin" : "Member",
      dept: "—",
      status: "Active",
      initials,
      color: AVATAR_COLORS[i % AVATAR_COLORS.length],
    };
  });
}
