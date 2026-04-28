import { supabaseServer } from "@/lib/supabase-server";
import type { AdminUser } from "@/modules/admin/UsersClient";

const AVATAR_COLORS = [
  "bg-violet-500","bg-blue-500","bg-pink-500","bg-amber-500",
  "bg-emerald-500","bg-cyan-500","bg-rose-500","bg-indigo-500",
];

export async function getAdminUsers(): Promise<AdminUser[]> {
  const { data, error } = await supabaseServer
    .from("profiles")
    .select("id, name, email, role, last_login_at")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching admin users:", error);
    return [];
  }

  return (data || []).map((u, i) => {
    const initials = u.name
      ? u.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase()
      : u.email.slice(0, 2).toUpperCase();
    return {
      name: u.name || u.email,
      email: u.email,
      tenant: "—",
      role: u.role === "admin" ? "Admin" : "Member",
      lastSeen: u.last_login_at
        ? new Date(u.last_login_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })
        : "Never",
      status: "Active",
      initials,
      color: AVATAR_COLORS[i % AVATAR_COLORS.length],
    };
  });
}
