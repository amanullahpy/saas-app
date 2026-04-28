import { setRequestLocale } from "next-intl/server";
import { AuditClient } from "@/modules/tenant/AuditClient";
import { getAuditLogs } from "@/services/audit";
import { authConfig } from "@/config/auth";

export default async function TenantAuditPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const events = authConfig.driver === "http" ? await getAuditLogs() : [];

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-8">
      <AuditClient events={events} module="tenant-audit" title="Tenant Audit Log" />
    </div>
  );
}
