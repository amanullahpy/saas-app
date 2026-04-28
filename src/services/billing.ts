import { supabaseServer } from "@/lib/supabase-server";
import type { Invoice } from "@/modules/tenant/BillingClient";

export async function getBillingInvoices(tenantId?: string): Promise<Invoice[]> {
  let query = supabaseServer
    .from("billing_invoices")
    .select("*")
    .order("invoice_date", { ascending: false });

  if (tenantId) {
    query = query.eq("tenant_id", tenantId);
  }

  const { data, error } = await query;

  if (error || !data) {
    console.error("Error fetching invoices:", error);
    return [];
  }

  return data.map((inv, i) => ({
    id: `INV-${new Date(inv.invoice_date).getFullYear()}-${String(i + 1).padStart(2, "0")}`,
    date: new Date(inv.invoice_date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    amount: `$${Number(inv.amount).toFixed(2)}`,
    status: inv.status,
    plan: "Pro",
  }));
}
