"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteModal, DetailsModal, FormModal } from "@/components/modals";
import { ReportDownloader } from "@/components/ReportDownloader";
import { Plus, Copy, Trash2, Key, AlertTriangle, Eye } from "lucide-react";
import { toast } from "@/lib/toast";

export interface ApiKey {
  name: string; key: string; created: string;
  lastUsed: string; status: string; scope: string;
}

const STATUS_STYLE: Record<string, string> = {
  Active:   "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Expiring: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Inactive: "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400",
};
const SCOPES = ["Full access","Read only","Webhooks","Write only"];

export function ApiKeysClient({ initialKeys }: { initialKeys: ApiKey[] }) {
  const [keys, setKeys]             = useState(initialKeys);
  const [addOpen, setAddOpen]       = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected]     = useState<ApiKey | null>(null);
  const [form, setForm]             = useState({ name:"", scope:"Read only" });
  const [newKey, setNewKey]         = useState<string | null>(null);

  const inputCls = "h-10 w-full rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";
  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="space-y-1.5"><label className="text-sm font-medium text-foreground">{label}</label>{children}</div>
  );

  function handleCreate() {
    if (!form.name.trim()) return;
    const generated = `sk_live_${"x".repeat(27)}${Math.random().toString(36).slice(2,6)}`;
    const newEntry: ApiKey = { name:form.name, key:generated.slice(0,12)+"***"+generated.slice(-4), created:"Today", lastUsed:"Never", status:"Active", scope:form.scope };
    setKeys(prev => [...prev, newEntry]);
    setNewKey(generated);
    setAddOpen(false);
    setForm({ name:"", scope:"Read only" });
  }
  function handleRevoke() {
    if (!selected) return;
    setKeys(prev => prev.filter(k => k.name !== selected.name));
    toast.success(`"${selected.name}" revoked.`);
  }
  function copyKey(key: string) {
    navigator.clipboard.writeText(key).then(() => toast.success("Key copied to clipboard.")).catch(() => toast.error("Copy failed."));
  }

  const reportConfig = {
    module: "admin-api-keys",
    title: "API Keys Report",
    description: "All platform API keys and their status",
    columns: ["Name","Scope","Status","Created","Last Used"],
    rows: keys.map(k => ({ Name:k.name, Scope:k.scope, Status:k.status, Created:k.created, "Last Used":k.lastUsed })),
  };

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">API Keys</h1>
          <p className="mt-1 text-sm text-muted-foreground">Service accounts and integration keys for the platform API.</p>
        </div>
        <div className="flex gap-2">
          <ReportDownloader config={reportConfig} label="Export" />
          <Button className="w-fit gap-2 rounded-xl" onClick={() => { setForm({ name:"", scope:"Read only" }); setAddOpen(true); }}>
            <Plus className="h-4 w-4" /> Create Key
          </Button>
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-950/20 px-4 py-3">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
        <p className="text-sm text-amber-700 dark:text-amber-400">API keys are shown only once at creation. Store them securely — only hashed values are stored.</p>
      </div>

      {/* New key reveal */}
      {newKey && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-200 dark:border-emerald-800/50 bg-emerald-50 dark:bg-emerald-950/20 px-4 py-3">
          <Key className="h-4 w-4 shrink-0 text-emerald-600" />
          <p className="flex-1 font-mono text-xs text-emerald-800 dark:text-emerald-300 break-all">{newKey}</p>
          <Button size="sm" variant="ghost" className="shrink-0 gap-1.5 rounded-xl text-xs" onClick={() => copyKey(newKey)}><Copy className="h-3.5 w-3.5" />Copy</Button>
          <Button size="sm" variant="ghost" className="shrink-0 text-xs rounded-xl" onClick={() => setNewKey(null)}>Dismiss</Button>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {[{ label:"Total Keys", value:keys.length },{ label:"Active", value:keys.filter(k=>k.status==="Active").length },{ label:"Expiring Soon", value:keys.filter(k=>k.status==="Expiring").length }].map(s => (
          <Card key={s.label} className="border-border/50 shadow-sm">
            <CardContent className="pt-5"><p className="text-2xl font-bold">{s.value}</p><p className="text-xs text-muted-foreground mt-0.5">{s.label}</p></CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/50 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-border/50 pb-4">
          <CardTitle className="text-base">Secrets</CardTitle>
          <CardDescription>Rotate regularly — never expose plaintext after creation</CardDescription>
        </CardHeader>
        <div className="divide-y divide-border/50">
          {keys.length === 0 ? (
            <p className="px-6 py-8 text-center text-sm text-muted-foreground">No API keys yet. Create your first key to get started.</p>
          ) : (
            keys.map(k => (
            <div key={k.name} className="flex items-center gap-4 px-6 py-4 hover:bg-muted/30 transition-colors">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-muted"><Key className="h-4 w-4 text-muted-foreground" /></div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium text-foreground">{k.name}</p>
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${STATUS_STYLE[k.status]}`}>{k.status}</span>
                </div>
                <p className="mt-0.5 font-mono text-xs text-muted-foreground">{k.key}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{k.scope} · Created {k.created} · Last used {k.lastUsed}</p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" title="View details" onClick={() => { setSelected(k); setDetailOpen(true); }}><Eye className="h-3.5 w-3.5" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" title="Copy key" onClick={() => copyKey(k.key)}><Copy className="h-3.5 w-3.5" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive" title="Revoke" onClick={() => { setSelected(k); setDeleteOpen(true); }}><Trash2 className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
          ))
          )}
        </div>
      </Card>

      <FormModal open={addOpen} onOpenChange={setAddOpen} title="Create API Key" description="The key will be shown once — copy it immediately." submitLabel="Generate Key" onSubmit={handleCreate}>
        <div className="space-y-4">
          <Field label="Key Name"><input className={inputCls} placeholder="e.g. Production API" value={form.name} onChange={e => setForm(f => ({...f, name:e.target.value}))} /></Field>
          <Field label="Scope">
            <select className={inputCls} value={form.scope} onChange={e => setForm(f => ({...f, scope:e.target.value}))}>
              {SCOPES.map(s => <option key={s}>{s}</option>)}
            </select>
          </Field>
        </div>
      </FormModal>

      <ConfirmDeleteModal open={deleteOpen} onOpenChange={setDeleteOpen} itemName={selected?.name ?? ""} itemType="API key" onConfirm={handleRevoke} />

      {selected && (
        <DetailsModal open={detailOpen} onOpenChange={setDetailOpen} title={selected.name} description="API key details"
          fields={[{ label:"Key", value:selected.key, mono:true },{ label:"Scope", value:selected.scope },{ label:"Status", value:selected.status },{ label:"Created", value:selected.created },{ label:"Last Used", value:selected.lastUsed }]}
        />
      )}
    </>
  );
}
