import { setRequestLocale } from "next-intl/server";
import { BillingClient, type Invoice } from "@/modules/tenant/BillingClient";

const INVOICES: Invoice[] = [
  { id:"INV-2026-04", date:"Apr 1, 2026",  amount:"$29.00", status:"Paid", plan:"Pro"     },
  { id:"INV-2026-03", date:"Mar 1, 2026",  amount:"$29.00", status:"Paid", plan:"Pro"     },
  { id:"INV-2026-02", date:"Feb 1, 2026",  amount:"$29.00", status:"Paid", plan:"Pro"     },
  { id:"INV-2026-01", date:"Jan 1, 2026",  amount:"$29.00", status:"Paid", plan:"Pro"     },
  { id:"INV-2025-12", date:"Dec 1, 2025",  amount:"$0.00",  status:"Paid", plan:"Starter" },
];

export default async function TenantBillingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <div className="mx-auto max-w-5xl space-y-6 pb-8"><BillingClient initialInvoices={INVOICES} /></div>;
}