import { MainShell } from "@/ui/layout/MainShell";
import { PricingPlans } from "@/modules/billing/components/PricingPlans";
import { PaymentHistory } from "@/modules/billing/components/PaymentHistory";
import { PageHeader } from "@/components/ui/page-header";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getBillingInvoices } from "@/services/billing";
import { authConfig } from "@/config/auth";

export default async function BillingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("modules.billing");

  const invoices = authConfig.driver === "http" ? await getBillingInvoices() : [];

  return (
    <MainShell>
      <div className="space-y-12 pb-12">
        <PageHeader
          badge={t("badge")}
          title={t("title")}
          description={t("description")}
        />

        <div className="space-y-6">
          <h3 className="text-xl font-heading text-foreground flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            {t("available_plans")}
          </h3>
          <PricingPlans />
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-heading text-foreground flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            {t("invoices_history")}
          </h3>
          <PaymentHistory invoices={invoices} />
        </div>
      </div>
    </MainShell>
  );
}
