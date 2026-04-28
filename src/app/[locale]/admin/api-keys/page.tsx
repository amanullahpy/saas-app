import { setRequestLocale } from "next-intl/server";
import { ApiKeysClient, type ApiKey } from "@/modules/admin/ApiKeysClient";
import { getApiKeys } from "@/services/admin/apiKeys";
import { authConfig } from "@/config/auth";

export default async function AdminApiKeysPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const keys: ApiKey[] = authConfig.driver === "http" ? await getApiKeys() : [];

  return <div className="mx-auto max-w-5xl space-y-6 pb-8"><ApiKeysClient initialKeys={keys} /></div>;
}
