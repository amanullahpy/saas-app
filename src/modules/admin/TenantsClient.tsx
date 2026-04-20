"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteModal, DetailsModal, FormModal } from "@/components/modals";
import { ReportDownloader } from "@/components/ReportDownloader";
import { Plus, Search, MoreHorizontal, Building2, Eye, Pencil, Trash2, PauseCircle, PlayCircle } from "lucide-react";
import { toast } from "@/lib/toast";

export interface Tenant {
  name: string; id: string; plan: string;
  members: number; created: string; status: string; region: string;
}

const PLAN_STYLE: Record<string, string> = {
  Starter:    "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400",
  Pro:        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Enterprise: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
};
const PLANS   = ["Starter","Pro","Enterprise"];
const REGIONS = ["US East","US West","EU West","APAC"];

export function TenantsClient({ initialTenants }: { initialTenants: Tenant[] }) {
  const [tenants, setTenants]       = useState(initialTenants);
  const [search, setSearch]         = useState("");
  const [addOpen, setAddOpen]       = useState(false);
  const [editOpen, setEditOpen]     = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected]     = useState<Tenant | null>(null);
  const [form, setForm]             = useState({ name:"", plan:"Starter", region:"US East" });

  const filtered = tenants.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.id.toLowerCase().includes(search.toLowerCase())
  );

  const inputCls = "h-10 w-full rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";
  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="space-y-1.5"><label className="text-sm font-medium text-foreground">{label}</label>{children}</div>
  );

  function openEdit(t: Tenant)   { setSelected(t); setForm({ name:t.name, plan:t.plan, region:t.region }); setEditOpen(true); }
  function openDelete(t: Tenant) { setSelected(t); setDeleteOpen(true); }
  function openDetail(t: Tenant) { setSelected(t); setDetailOpen(true); }

  function handleAdd() {
    if (!form.name.trim()) return;
    const id = `ten_${Math.random().toString(36).slice(2,10)}`;
    setTenants(prev => [...prev, { name:form.name, id, plan:form.plan, members:0, created:"Today", status:"Active", region:form.region }]);
    toast.success(`Tenant "${form.name}" created.`);
    setAddOpen(false); setForm({ name:"", plan:"Starter", region:"US East" });
  }
  function handleEdit() {
    if (!selected) return;
    setTenants(prev => prev.map(t => t.id === selected.id ? { ...t, name:form.name, plan:form.plan, region:form.region } : t));
    toast.success("Tenant updated.");
    setEditOpen(false);
  }
  function handleDelete() {
    if (!selected) return;
    setTenants(prev => prev.filter(t => t.id !== selected.id));
    toast.success(`"${selected.name}" deleted.`);
  }
  function toggleSuspend(t: Tenant) {
    const next = t.status === "Active" ? "Suspended" : "Active";
    setTenants(prev => prev.map(x => x.id === t.id ? { ...x, status:next } : x));
    toast.success(`${t.name} ${next === "Suspended" ? "suspended" : "reactivated"}.`);
  }

  const reportConfig = {
    module: "admin-tenants",
    title: "Tenants Report",
    description: "All registered tenants and their configuration",
    columns: ["Name","ID","Plan","Members","Region","Status","Created"],
    rows: tenants.map(t => ({ Name:t.name, ID:t.id, Plan:t.plan, Members:t.members, Region:t.region, Status:t.status, Created:t.created })),
  };

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Tenants</h1>
          <p className="mt-1 text-sm text-muted-foreground">Create, suspend, or configure organizations — {tenants.length} total.</p>
        </div>
        <div className="flex gap-2">
          <ReportDownloader config={reportConfig} label="Export" />
          <Button className="w-fit gap-2 rounded-xl" onClick={() => { setForm({ name:"", plan:"Starter", region:"US East" }); setAddOpen(true); }}>
            <Plus className="h-4 w-4" /> New Tenant
          </Button>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input type="search" placeholder="Search tenants..." value={search} onChange={e => setSearch(e.target.value)}
          className="h-10 w-full rounded-xl border border-border bg-background pl-9 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
      </div>

      <Card className="border-border/50 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-border/50 pb-4">
          <CardTitle className="text-base">Tenant Registry</CardTitle>
          <CardDescription>Each tenant maps to isolated data and permissions</CardDescription>
        </CardHeader>
        <div className="divide-y divide-border/50">
          {filtered.map(t => (
            <div key={t.id} className="flex items-center gap-4 px-6 py-3.5 hover:bg-muted/30 transition-colors group">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">{t.name.charAt(0)}</div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground font-mono">{t.id}</p>
              </div>
              <span className={`hidden sm:block shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${PLAN_STYLE[t.plan]}`}>{t.plan}</span>
              <div className="hidden md:flex items-center gap-1 text-xs text-muted-foreground"><Building2 className="h-3.5 w-3.5" /> {t.members}</div>
              <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${t.status === "Active" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}>{t.status}</span>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg" onClick={() => openDetail(t)}><Eye className="h-3.5 w-3.5" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg" onClick={() => openEdit(t)}><Pencil className="h-3.5 w-3.5" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg" onClick={() => toggleSuspend(t)}>
                  {t.status === "Active" ? <PauseCircle className="h-3.5 w-3.5 text-amber-500" /> : <PlayCircle className="h-3.5 w-3.5 text-emerald-500" />}
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg hover:text-destructive" onClick={() => openDelete(t)}><Trash2 className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p className="px-6 py-8 text-center text-sm text-muted-foreground">No tenants match your search.</p>}
        </div>
      </Card>

      <FormModal open={addOpen} onOpenChange={setAddOpen} title="New Tenant" description="Create a new organization workspace." submitLabel="Create Tenant" onSubmit={handleAdd}>
        <div className="space-y-4">
          <Field label="Organization Name"><input className={inputCls} placeholder="e.g. Acme Corp" value={form.name} onChange={e => setForm(f => ({...f, name:e.target.value}))} /></Field>
          <Field label="Plan"><select className={inputCls} value={form.plan} onChange={e => setForm(f => ({...f, plan:e.target.value}))}>{PLANS.map(p => <option key={p}>{p}</option>)}</select></Field>
          <Field label="Region"><select className={inputCls} value={form.region} onChange={e => setForm(f => ({...f, region:e.target.value}))}>{REGIONS.map(r => <option key={r}>{r}</option>)}</select></Field>
        </div>
      </FormModal>

      <FormModal open={editOpen} onOpenChange={setEditOpen} title="Edit Tenant" submitLabel="Save Changes" onSubmit={handleEdit}>
        <div className="space-y-4">
          <Field label="Organization Name"><input className={inputCls} value={form.name} onChange={e => setForm(f => ({...f, name:e.target.value}))} /></Field>
          <Field label="Plan"><select className={inputCls} value={form.plan} onChange={e => setForm(f => ({...f, plan:e.target.value}))}>{PLANS.map(p => <option key={p}>{p}</option>)}</select></Field>
          <Field label="Region"><select className={inputCls} value={form.region} onChange={e => setForm(f => ({...f, region:e.target.value}))}>{REGIONS.map(r => <option key={r}>{r}</option>)}</select></Field>
        </div>
      </FormModal>

      <ConfirmDeleteModal open={deleteOpen} onOpenChange={setDeleteOpen} itemName={selected?.name ?? ""} itemType="tenant" onConfirm={handleDelete} />

      {selected && (
        <DetailsModal open={detailOpen} onOpenChange={setDetailOpen} title={selected.name} description={`Tenant ID: ${selected.id}`}
          fields={[{ label:"ID", value:selected.id, mono:true },{ label:"Plan", value:selected.plan },{ label:"Members", value:selected.members },{ label:"Region", value:selected.region },{ label:"Status", value:selected.status },{ label:"Created", value:selected.created }]}
          actions={<Button size="sm" variant="outline" className="rounded-xl gap-1.5 text-amber-600 border-amber-300 hover:bg-amber-50" onClick={() => { toggleSuspend(selected); setDetailOpen(false); }}>
            {selected.status === "Active" ? <><PauseCircle className="h-3.5 w-3.5" />Suspend</> : <><PlayCircle className="h-3.5 w-3.5" />Reactivate</>}
          </Button>}
        />
      )}
    </>
  );
}
