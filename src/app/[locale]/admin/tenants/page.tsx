import { setRequestLocale } from "next-intl/server";
import { TenantsClient, type Tenant } from "@/modules/admin/TenantsClient";

const TENANTS: Tenant[] = [
  { name:"Acme Corp",        id:"ten_01hx9k2m", plan:"Pro",        members:12, created:"Jan 12, 2024", status:"Active",    region:"US East" },
  { name:"Globex Inc",       id:"ten_02hy0l3n", plan:"Enterprise", members:48, created:"Feb 3, 2024",  status:"Active",    region:"EU West" },
  { name:"Initech LLC",      id:"ten_03iz1m4o", plan:"Starter",    members:3,  created:"Mar 5, 2024",  status:"Active",    region:"US West" },
  { name:"Umbrella Co",      id:"ten_04ja2n5p", plan:"Pro",        members:19, created:"Mar 18, 2024", status:"Suspended", region:"US East" },
  { name:"Stark Industries", id:"ten_05kb3o6q", plan:"Enterprise", members:87, created:"Apr 1, 2024",  status:"Active",    region:"US East" },
  { name:"Wayne Enterprises",id:"ten_06lc4p7r", plan:"Enterprise", members:64, created:"Apr 8, 2024",  status:"Active",    region:"EU West" },
  { name:"Pied Piper",       id:"ten_07md5q8s", plan:"Starter",    members:5,  created:"Apr 12, 2024", status:"Active",    region:"US West" },
];

export default async function AdminTenantsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <div className="mx-auto max-w-5xl space-y-6 pb-8"><TenantsClient initialTenants={TENANTS} /></div>;
}
