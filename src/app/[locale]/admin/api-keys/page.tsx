import { setRequestLocale } from "next-intl/server";
import { ApiKeysClient, type ApiKey } from "@/modules/admin/ApiKeysClient";

const API_KEYS: ApiKey[] = [
  { name:"Production API",     key:"sk_live_***************************a1b2", created:"Jan 12, 2024", lastUsed:"2 min ago",  status:"Active",   scope:"Full access" },
  { name:"Analytics Service",  key:"sk_live_***************************c3d4", created:"Feb 20, 2024", lastUsed:"1 hr ago",   status:"Active",   scope:"Read only"   },
  { name:"Webhook Processor",  key:"sk_live_***************************e5f6", created:"Mar 5, 2024",  lastUsed:"3 days ago", status:"Active",   scope:"Webhooks"    },
  { name:"Legacy Integration", key:"sk_live_***************************g7h8", created:"Jun 1, 2023",  lastUsed:"45 days ago",status:"Expiring", scope:"Full access" },
  { name:"Staging Key",        key:"sk_test_***************************i9j0", created:"Apr 1, 2024",  lastUsed:"Never",      status:"Inactive", scope:"Read only"   },
];

export default async function AdminApiKeysPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <div className="mx-auto max-w-5xl space-y-6 pb-8"><ApiKeysClient initialKeys={API_KEYS} /></div>;
}
