import { setRequestLocale } from "next-intl/server";
import { UsersClient, type AdminUser } from "@/modules/admin/UsersClient";
import { getAdminUsers } from "@/services/admin/users";
import { authConfig } from "@/config/auth";

export default async function AdminUsersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  let users: AdminUser[] = [];

  if (authConfig.driver === "http") {
    users = await getAdminUsers();
  }

  return <div className="mx-auto max-w-5xl space-y-6 pb-8"><UsersClient initialUsers={users} /></div>;
}
