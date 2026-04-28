"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DetailsModal, FormModal } from "@/components/modals";
import { ReportDownloader } from "@/components/ReportDownloader";
import { CreditCard, CheckCircle2, Zap, Pencil } from "lucide-react";
import { toast } from "@/lib/toast";

export interface Invoice {
  id: string; date: string; amount: string; status: string; plan: string;
}

const PLANS = ["Starter","Pro","Enterprise"];

export function BillingClient({ initialInvoices }: { initialInvoices: Invoice[] }) {
  const [invoices]                  = useState(initialInvoices);
  const [planOpen, setPlanOpen]     = useState(false);
  const [payOpen, setPayOpen]       = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected]     = useState<Invoice | null>(null);
  const [plan, setPlan]             = useState("Pro");
  const [payForm, setPayForm]       = useState({ card:"", expiry:"", cvc:"" });

  const inputCls = "h-10 w-full rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

  const reportConfig = {
    module: "tenant-billing",
    title: "Invoice History",
    description: "All invoices for this tenant",
    columns: ["Invoice ID","Date","Plan","Amount","Status"],
    rows: invoices.map(i => ({ "Invoice ID":i.id, Date:i.date, Plan:i.plan, Amount:i.amount, Status:i.status })),
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Tenant Billing</h1>
        <p className="mt-1 text-sm text-muted-foreground">Plans, invoices, and payment methods for this tenant.</p>
      </div>

      {/* Plan card */}
      <Card className="border-border/50 shadow-sm bg-primary text-primary-foreground overflow-hidden relative">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/5" />
          <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/5" />
        </div>
        <CardContent className="relative z-10 flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2"><Zap className="h-4 w-4" /><span className="text-sm font-semibold">Pro Plan</span></div>
            <p className="text-3xl font-bold">$29<span className="text-lg font-normal opacity-70">/mo</span></p>
            <p className="text-sm opacity-70">Renews May 1, 2026 · 12 / 20 seats used</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" size="sm" className="rounded-xl bg-white/15 hover:bg-white/25 border-0 text-white" onClick={() => setPlanOpen(true)}>
              <Pencil className="mr-1.5 h-3.5 w-3.5" /> Manage Plan
            </Button>
            <Button variant="secondary" size="sm" className="rounded-xl bg-white/15 hover:bg-white/25 border-0 text-white" onClick={() => setPayOpen(true)}>
              <CreditCard className="mr-1.5 h-3.5 w-3.5" /> Update Payment
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-3"><CardTitle className="text-base">Included in Pro</CardTitle></CardHeader>
        <CardContent>
          <div className="grid gap-2 sm:grid-cols-2">
            {["Up to 20 team members","Advanced analytics","Priority support","10 GB storage","Custom domain","SSO & SAML","Audit logs (90 days)","API access"].map(f => (
              <div key={f} className="flex items-center gap-2 text-sm text-foreground/80">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />{f}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Invoices */}
      <Card className="border-border/50 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-border/50 pb-4 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">Invoice History</CardTitle>
            <CardDescription>All invoices for this tenant</CardDescription>
          </div>
          <ReportDownloader config={reportConfig} label="Export" />
        </CardHeader>
        <div className="divide-y divide-border/50">
          {invoices.length === 0 ? (
            <p className="px-6 py-8 text-center text-sm text-muted-foreground">No invoices yet.</p>
          ) : (
            invoices.map(inv => (
            <div key={inv.id} className="flex items-center gap-4 px-6 py-3.5 hover:bg-muted/30 transition-colors group">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{inv.id}</p>
                <p className="text-xs text-muted-foreground">{inv.date} · {inv.plan}</p>
              </div>
              <p className="text-sm font-semibold text-foreground">{inv.amount}</p>
              <span className="hidden sm:flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                <CheckCircle2 className="h-3 w-3" /> {inv.status}
              </span>
              <Button variant="ghost" size="sm" className="h-7 gap-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => { setSelected(inv); setDetailOpen(true); }}>
                View
              </Button>
            </div>
          ))
          )}
        </div>
      </Card>

      {/* Manage Plan Modal */}
      <FormModal open={planOpen} onOpenChange={setPlanOpen} title="Manage Plan" description="Change your subscription plan." submitLabel="Update Plan"
        onSubmit={() => { toast.success(`Plan updated to ${plan}.`); setPlanOpen(false); }}>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Select Plan</label>
          <select className={inputCls} value={plan} onChange={e => setPlan(e.target.value)}>
            {PLANS.map(p => <option key={p}>{p}</option>)}
          </select>
        </div>
      </FormModal>

      {/* Update Payment Modal */}
      <FormModal open={payOpen} onOpenChange={setPayOpen} title="Update Payment Method" description="Enter your new card details." submitLabel="Save Card"
        onSubmit={() => { toast.success("Payment method updated."); setPayOpen(false); }}>
        <div className="space-y-4">
          <div className="space-y-1.5"><label className="text-sm font-medium text-foreground">Card Number</label>
            <input className={inputCls} placeholder="1234 5678 9012 3456" value={payForm.card} onChange={e => setPayForm(f => ({...f, card:e.target.value}))} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5"><label className="text-sm font-medium text-foreground">Expiry</label>
              <input className={inputCls} placeholder="MM / YY" value={payForm.expiry} onChange={e => setPayForm(f => ({...f, expiry:e.target.value}))} /></div>
            <div className="space-y-1.5"><label className="text-sm font-medium text-foreground">CVC</label>
              <input className={inputCls} placeholder="123" value={payForm.cvc} onChange={e => setPayForm(f => ({...f, cvc:e.target.value}))} /></div>
          </div>
        </div>
      </FormModal>

      {/* Invoice Detail */}
      {selected && (
        <DetailsModal open={detailOpen} onOpenChange={setDetailOpen} title={selected.id} description="Invoice details"
          fields={[{ label:"Date", value:selected.date },{ label:"Plan", value:selected.plan },{ label:"Amount", value:selected.amount },{ label:"Status", value:selected.status }]}
          actions={<ReportDownloader config={{ module:`invoice-${selected.id}`, title:`Invoice ${selected.id}`, columns:["Invoice ID","Date","Plan","Amount","Status"], rows:[{ "Invoice ID":selected.id, Date:selected.date, Plan:selected.plan, Amount:selected.amount, Status:selected.status }] }} label="Download Invoice" />}
        />
      )}
    </>
  );
}
