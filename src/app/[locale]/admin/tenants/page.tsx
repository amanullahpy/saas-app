import { setRequestLocale } from "next-intl/server";
import { TenantsClient, type Tenant } from "@/modules/admin/TenantsClient";
import { getTenants } from "@/services/admin/tenants";
import { authConfig } from "@/config/auth";

export default async function AdminTenantsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  let tenants: Tenant[] = [];

  if (authConfig.driver === "http") {
    tenants = await getTenants();
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-8">
      <TenantsClient initialTenants={tenants} />
    </div>
  );
}
