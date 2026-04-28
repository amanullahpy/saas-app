import { setRequestLocale } from "next-intl/server";
import { BillingClient, type Invoice } from "@/modules/tenant/BillingClient";

export default async function TenantBillingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const invoices: Invoice[] = [];

  return <div className="mx-auto max-w-5xl space-y-6 pb-8"><BillingClient initialInvoices={invoices} /></div>;
}