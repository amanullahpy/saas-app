import { setRequestLocale } from "next-intl/server";
import { TenantsClient, type Tenant } from "@/modules/admin/TenantsClient";
import { getTenants } from "@/services/admin/tenants";
import { authConfig } from "@/config/auth";

const MOCK_TENANTS: Tenant[] = [
  { name:"Acme Corp",        id:"ten_01hx9k2m", plan:"Pro",        members:12, created:"Jan 12, 2024", status:"Active",    region:"US East" },
  { name:"Globex Inc",       id:"ten_02hy0l3n", plan:"Enterprise", members:48, created:"Feb 3, 2024",  status:"Active",    region:"EU West" },
  { name:"Initech LLC",      id:"ten_03iz1m4o", plan:"Starter",    members:3,  created:"Mar 5, 2024",  status:"Active",    region:"US West" },
  { name:"Umbrella Co",      id:"ten_04ja2n5p", plan:"Pro",        members:19, created:"Mar 18, 2024", status:"Suspended", region:"US East" },
];

export default async function AdminTenantsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  let tenants = MOCK_TENANTS;
  
  if (authConfig.driver === "http") {
    const realTenants = await getTenants();
    if (realTenants.length > 0) {
      tenants = realTenants;
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-8">
      <TenantsClient initialTenants={tenants} />
    </div>
  );
}
