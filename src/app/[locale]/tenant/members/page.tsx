import { setRequestLocale } from "next-intl/server";
import { MembersClient, type TenantMember } from "@/modules/tenant/MembersClient";
import { authConfig } from "@/config/auth";

export default async function TenantMembersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const members: TenantMember[] = [];

  return <div className="mx-auto max-w-5xl space-y-6 pb-8"><MembersClient initialMembers={members} /></div>;
}
