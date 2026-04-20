import { setRequestLocale } from "next-intl/server";
import { MembersClient, type TenantMember } from "@/modules/tenant/MembersClient";

const MEMBERS: TenantMember[] = [
  { name:"Sarah Kim",    email:"sarah@acmecorp.com",  role:"Admin",  joined:"Jan 12, 2024", initials:"SK", color:"bg-violet-500" },
  { name:"James Okafor", email:"james@acmecorp.com",  role:"Member", joined:"Feb 3, 2024",  initials:"JO", color:"bg-blue-500"   },
  { name:"Priya Sharma", email:"priya@acmecorp.com",  role:"Member", joined:"Feb 20, 2024", initials:"PS", color:"bg-pink-500"   },
  { name:"Carlos Ruiz",  email:"carlos@acmecorp.com", role:"Member", joined:"Mar 5, 2024",  initials:"CR", color:"bg-amber-500"  },
  { name:"Mei Lin",      email:"mei@acmecorp.com",    role:"Viewer", joined:"Mar 18, 2024", initials:"ML", color:"bg-emerald-500"},
  { name:"Tom Brennan",  email:"tom@acmecorp.com",    role:"Viewer", joined:"Apr 1, 2024",  initials:"TB", color:"bg-cyan-500"   },
];

export default async function TenantMembersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <div className="mx-auto max-w-5xl space-y-6 pb-8"><MembersClient initialMembers={MEMBERS} /></div>;
}
