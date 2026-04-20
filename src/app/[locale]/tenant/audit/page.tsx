import { setRequestLocale } from "next-intl/server";
import { AuditClient, type AuditEvent } from "@/modules/tenant/AuditClient";

const EVENTS: AuditEvent[] = [
  { id:1, action:"Member invited",  actor:"sarah@acmecorp.com", target:"priya@acmecorp.com",          ip:"192.168.1.1",  time:"Apr 20, 2026 14:32", iconName:"UserPlus",   color:"bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",     severity:"info"     },
  { id:2, action:"Role changed",    actor:"sarah@acmecorp.com", target:"james@acmecorp.com → Member",  ip:"192.168.1.1",  time:"Apr 20, 2026 13:15", iconName:"ShieldCheck",color:"bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400", severity:"warning"  },
  { id:3, action:"User signed in",  actor:"carlos@acmecorp.com",target:"Chrome / macOS",              ip:"203.0.113.42", time:"Apr 20, 2026 11:04", iconName:"LogIn",      color:"bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",severity:"info"},
  { id:4, action:"API key created", actor:"sarah@acmecorp.com", target:"key_prod_***abc",             ip:"192.168.1.1",  time:"Apr 19, 2026 16:50", iconName:"Key",        color:"bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",severity:"info"},
  { id:5, action:"Settings updated",actor:"sarah@acmecorp.com", target:"SSO configuration",          ip:"192.168.1.1",  time:"Apr 19, 2026 10:22", iconName:"Settings",   color:"bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400",severity:"info"},
  { id:6, action:"Member removed",  actor:"sarah@acmecorp.com", target:"ex-user@acmecorp.com",        ip:"192.168.1.1",  time:"Apr 18, 2026 09:11", iconName:"Trash2",     color:"bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",           severity:"critical" },
  { id:7, action:"User signed in",  actor:"mei@acmecorp.com",   target:"Safari / iPhone",            ip:"198.51.100.7", time:"Apr 17, 2026 20:45", iconName:"LogIn",      color:"bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",severity:"info"},
  { id:8, action:"Role changed",    actor:"sarah@acmecorp.com", target:"tom@acmecorp.com → Viewer",   ip:"192.168.1.1",  time:"Apr 16, 2026 14:00", iconName:"ShieldCheck",color:"bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400", severity:"warning"  },
];

export default async function TenantAuditPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-8">
      <AuditClient events={EVENTS} module="tenant-audit" title="Tenant Audit Log" />
    </div>
  );
}
