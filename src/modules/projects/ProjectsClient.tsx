"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteModal, DetailsModal, FormModal } from "@/components/modals";
import { Plus, Clock, CheckCircle2, AlertCircle, Users, Pencil, Trash2, Eye, FolderKanban } from "lucide-react";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/ui/page-header";

export interface Project {
  name: string; status: string; members: number;
  tasks: number; done: number; due: string; color: string;
}

const STATUS_STYLES: Record<string, string> = {
  "In Progress": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Review":      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  "Completed":   "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "Planning":    "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400",
};
const COLORS = ["bg-blue-500","bg-purple-500","bg-amber-500","bg-emerald-500","bg-rose-500","bg-cyan-500","bg-indigo-500","bg-pink-500"];
const STATUSES = ["Planning","In Progress","Review","Completed"];

export function ProjectsClient({ initialProjects }: { initialProjects: Project[] }) {
  const t = useTranslations();
  const [projects, setProjects] = useState(initialProjects);
  const [addOpen, setAddOpen]       = useState(false);
  const [editOpen, setEditOpen]     = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected]     = useState<Project | null>(null);
  const [form, setForm] = useState({ name:"", status:"Planning", members:"1", tasks:"1", due:"" });

  function openEdit(p: Project) { setSelected(p); setForm({ name:p.name, status:p.status, members:String(p.members), tasks:String(p.tasks), due:p.due }); setEditOpen(true); }
  function openDelete(p: Project) { setSelected(p); setDeleteOpen(true); }
  function openDetail(p: Project) { setSelected(p); setDetailOpen(true); }

  function handleAdd() {
    if (!form.name.trim()) return;
    const color = COLORS[projects.length % COLORS.length];
    setProjects(prev => [...prev, { name:form.name, status:form.status, members:+form.members||1, tasks:+form.tasks||1, done:0, due:form.due||"TBD", color }]);
    toast.success(t("modules.projects.project_created", { name: form.name }));
    setAddOpen(false); setForm({ name:"", status:"Planning", members:"1", tasks:"1", due:"" });
  }
  function handleEdit() {
    if (!selected) return;
    setProjects(prev => prev.map(p => p.name === selected.name ? { ...p, name:form.name, status:form.status, members:+form.members||1, tasks:+form.tasks||1, due:form.due||p.due } : p));
    toast.success(t("modules.projects.project_updated"));
    setEditOpen(false);
  }
  function handleDelete() {
    if (!selected) return;
    setProjects(prev => prev.filter(p => p.name !== selected.name));
    toast.success(t("modules.projects.project_deleted", { name: selected.name }));
  }

  const total = projects.length;
  const inProgress = projects.filter(p => p.status === "In Progress").length;
  const completed  = projects.filter(p => p.status === "Completed").length;
  const planning   = projects.filter(p => p.status === "Planning").length;

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>
      {children}
    </div>
  );
  const inputCls = "h-11 w-full rounded-xl border border-border/80 bg-background/50 px-3.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 transition-all";

  return (
    <>
      <PageHeader
        badge={t("modules.projects.badge")}
        title={t("modules.projects.title")}
        description={t("modules.projects.description")}
      >
        <Button
          variant="gradient"
          size="lg"
          className="gap-2 shadow-accent"
          onClick={() => { setForm({ name:"", status:"Planning", members:"1", tasks:"1", due:"" }); setAddOpen(true); }}
        >
          <Plus className="h-4 w-4 stroke-[2]" /> {t("modules.projects.new_project")}
        </Button>
      </PageHeader>

      {/* Stats */}
      <div className="grid gap-5 grid-cols-2 lg:grid-cols-4">
        {[
          { label: t("modules.projects.stats.total"), value:total, icon:FolderKanban },
          { label: t("modules.projects.stats.in_progress"), value:inProgress, icon:Clock },
          { label: t("modules.projects.stats.completed"), value:completed, icon:CheckCircle2 },
          { label: t("modules.projects.stats.planning"), value:planning, icon:AlertCircle }
        ].map((s, idx) => (
          <Card key={s.label} variant={idx === 0 ? "featured" : "default"} className="p-1">
            <CardContent className="flex items-center gap-4 pt-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0052FF] to-[#4D7CFF] text-white shadow-accent">
                <s.icon className="h-5 w-5 stroke-[2]" />
              </div>
              <div className="text-start">
                <p className="text-3xl font-heading tracking-tight text-foreground">{s.value}</p>
                <p className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cards */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {projects.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 py-16 text-center bg-card/40">
            <FolderKanban className="mb-3 h-10 w-10 text-muted-foreground/40" />
            <p className="text-sm font-semibold text-foreground">{t("modules.projects.no_projects_yet")}</p>
            <p className="mt-1 text-xs text-muted-foreground">{t("modules.projects.create_first_project")}</p>
          </div>
        ) : (
          projects.map(project => {
            const pct = project.tasks > 0 ? Math.round((project.done / project.tasks) * 100) : 0;
            return (
              <Card key={project.name} className="group hover:-translate-y-1 transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`h-3 w-3 shrink-0 rounded-full ${project.color}`} />
                      <CardTitle className="truncate text-base font-heading group-hover:text-primary transition-colors">{project.name}</CardTitle>
                    </div>
                    <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-mono font-medium ${STATUS_STYLES[project.status]}`}>{project.status}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono text-muted-foreground">
                      <span>{project.done} / {project.tasks} tasks</span><span>{pct}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-500 ${project.color}`} style={{ width:`${pct}%` }} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-primary" /> {project.members} {t("ui.labels.members").toLowerCase()}</span>
                    <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-muted-foreground" /> {t("ui.labels.due_date")} {project.due}</span>
                  </div>
                  <div className="flex items-center gap-1 pt-2 border-t border-border/40">
                    <Button variant="ghost" size="sm" className="h-8 gap-1.5 rounded-lg text-xs hover:bg-primary/10 hover:text-primary" onClick={() => openDetail(project)}><Eye className="h-3.5 w-3.5" />{t("ui.actions.view")}</Button>
                    <Button variant="ghost" size="sm" className="h-8 gap-1.5 rounded-lg text-xs hover:bg-primary/10 hover:text-primary" onClick={() => openEdit(project)}><Pencil className="h-3.5 w-3.5" />{t("ui.actions.edit")}</Button>
                    <Button variant="ghost" size="sm" className="h-8 gap-1.5 rounded-lg text-xs text-destructive hover:bg-destructive/10 ms-auto" onClick={() => openDelete(project)}><Trash2 className="h-3.5 w-3.5" />{t("ui.actions.delete")}</Button>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Add Modal */}
      <FormModal open={addOpen} onOpenChange={setAddOpen} title={t("modules.projects.new_project")} description={t("modules.projects.description")} submitLabel={t("modules.projects.create_project")} onSubmit={handleAdd}>
        <div className="space-y-4">
          <Field label={t("modules.projects.project_name")}><input className={inputCls} placeholder="e.g. Website Redesign" value={form.name} onChange={e => setForm(f => ({...f, name:e.target.value}))} /></Field>
          <Field label={t("ui.labels.status")}>
            <select className={inputCls} value={form.status} onChange={e => setForm(f => ({...f, status:e.target.value}))}>
              {STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label={t("ui.labels.members")}><input type="number" min="1" className={inputCls} value={form.members} onChange={e => setForm(f => ({...f, members:e.target.value}))} /></Field>
            <Field label={t("modules.projects.total_tasks")}><input type="number" min="1" className={inputCls} value={form.tasks} onChange={e => setForm(f => ({...f, tasks:e.target.value}))} /></Field>
          </div>
          <Field label={t("ui.labels.due_date")}><input type="text" className={inputCls} placeholder="e.g. May 30, 2026" value={form.due} onChange={e => setForm(f => ({...f, due:e.target.value}))} /></Field>
        </div>
      </FormModal>

      {/* Edit Modal */}
      <FormModal open={editOpen} onOpenChange={setEditOpen} title={t("modules.projects.edit_project")} submitLabel={t("modules.projects.save_changes")} onSubmit={handleEdit}>
        <div className="space-y-4">
          <Field label={t("modules.projects.project_name")}><input className={inputCls} value={form.name} onChange={e => setForm(f => ({...f, name:e.target.value}))} /></Field>
          <Field label={t("ui.labels.status")}>
            <select className={inputCls} value={form.status} onChange={e => setForm(f => ({...f, status:e.target.value}))}>
              {STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label={t("ui.labels.members")}><input type="number" min="1" className={inputCls} value={form.members} onChange={e => setForm(f => ({...f, members:e.target.value}))} /></Field>
            <Field label={t("modules.projects.total_tasks")}><input type="number" min="1" className={inputCls} value={form.tasks} onChange={e => setForm(f => ({...f, tasks:e.target.value}))} /></Field>
          </div>
          <Field label={t("ui.labels.due_date")}><input type="text" className={inputCls} value={form.due} onChange={e => setForm(f => ({...f, due:e.target.value}))} /></Field>
        </div>
      </FormModal>

      {/* Delete Modal */}
      <ConfirmDeleteModal open={deleteOpen} onOpenChange={setDeleteOpen} itemName={selected?.name ?? ""} itemType={t("common.projects").toLowerCase()} onConfirm={handleDelete} />

      {/* Details Modal */}
      {selected && (
        <DetailsModal open={detailOpen} onOpenChange={setDetailOpen} title={selected.name} description={t("modules.projects.project_details")}
          fields={[
            { label: t("ui.labels.status"), value:selected.status },
            { label: t("ui.labels.members"), value:selected.members },
            { label: t("ui.labels.tasks"), value:`${selected.done} / ${selected.tasks} ${t("ui.status.completed").toLowerCase()}` },
            { label: t("ui.labels.progress"), value:`${selected.tasks > 0 ? Math.round((selected.done/selected.tasks)*100) : 0}%` },
            { label: t("ui.labels.due_date"), value:selected.due },
          ]}
        />
      )}
    </>
  );
}
