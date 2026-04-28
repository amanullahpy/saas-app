import { MainShell } from "@/ui/layout/MainShell";
import { PricingPlans } from "@/modules/billing/components/PricingPlans";
import { PaymentHistory } from "@/modules/billing/components/PaymentHistory";
import { setRequestLocale } from "next-intl/server";
import { getBillingInvoices } from "@/services/billing";
import { authConfig } from "@/config/auth";

export default async function BillingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const invoices = authConfig.driver === "http" ? await getBillingInvoices() : [];

  return (
    <MainShell>
      <div className="space-y-12 pb-12">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Plans & Billing
          </h2>
          <p className="text-muted-foreground text-sm">
            Manage your subscription plans and view payment history.
          </p>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Available Plans</h3>
          <PricingPlans />
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Invoices</h3>
          <PaymentHistory invoices={invoices} />
        </div>
      </div>
    </MainShell>
  );
}
