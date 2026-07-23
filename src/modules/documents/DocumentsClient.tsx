"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteModal, DetailsModal, FormModal } from "@/components/modals";
import { ReportDownloader } from "@/components/ReportDownloader";
import { FileText, Upload, Search, FolderOpen, Image, FileCode, FileSpreadsheet, MoreHorizontal, Download, Pencil, Trash2, Eye } from "lucide-react";
import { toast } from "@/lib/toast";
import type { LucideIcon } from "lucide-react";

export interface Doc {
  name: string; type: string; size: string; modified: string;
  iconName: string; color: string;
}

const ICON_MAP: Record<string, LucideIcon> = {
  FileText, FileSpreadsheet, FolderOpen, FileCode, Image,
};

const STORAGE_USED = 4.2;
const STORAGE_TOTAL = 10;

import { useTranslations } from "next-intl";

export function DocumentsClient({ initialDocs }: { initialDocs: Doc[] }) {
  const t = useTranslations();
  const [docs, setDocs]             = useState(initialDocs);
  const [search, setSearch]         = useState("");
  const [addOpen, setAddOpen]       = useState(false);
  const [editOpen, setEditOpen]     = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected]     = useState<Doc | null>(null);
  const [form, setForm]             = useState({ name:"", type:"PDF", size:"" });

  const filtered = docs.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));
  const storagePct = Math.round((STORAGE_USED / STORAGE_TOTAL) * 100);

  function openEdit(d: Doc)   { setSelected(d); setForm({ name:d.name, type:d.type, size:d.size }); setEditOpen(true); }
  function openDelete(d: Doc) { setSelected(d); setDeleteOpen(true); }
  function openDetail(d: Doc) { setSelected(d); setDetailOpen(true); }

  function handleAdd() {
    if (!form.name.trim()) return;
    setDocs(prev => [...prev, { name:form.name, type:form.type, size:form.size||"—", modified:"Today", iconName:"FileText", color:"text-red-500 bg-red-50 dark:bg-red-950/30" }]);
    toast.success(`"${form.name}" added.`);
    setAddOpen(false); setForm({ name:"", type:"PDF", size:"" });
  }
  function handleEdit() {
    if (!selected) return;
    setDocs(prev => prev.map(d => d.name === selected.name ? { ...d, name:form.name, type:form.type, size:form.size } : d));
    toast.success(t("modules.documents.document_renamed"));
    setEditOpen(false);
  }
  function handleDelete() {
    if (!selected) return;
    setDocs(prev => prev.filter(d => d.name !== selected.name));
    toast.success(t("modules.documents.document_deleted"));
  }

  const inputCls = "h-10 w-full rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";
  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="space-y-1.5"><label className="text-sm font-medium text-foreground">{label}</label>{children}</div>
  );

  const reportConfig = {
    module: "documents",
    title: t("modules.documents.title"),
    description: t("modules.documents.description"),
    columns: [t("ui.labels.name"), t("ui.labels.type"), t("ui.labels.size"), t("modules.documents.last_modified")],
    rows: docs.map(d => ({ Name: d.name, Type: d.type, Size: d.size, Modified: d.modified })),
  };

  return (
    <>
      {/* Toolbar & Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
          <input
            type="search"
            placeholder={t("modules.documents.search_placeholder")}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="h-11 w-full rounded-xl border border-border/80 bg-background/50 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
          />
        </div>
        <div className="flex gap-2 shrink-0">
          <ReportDownloader config={reportConfig} label={t("modules.documents.export")} />
          <Button
            variant="gradient"
            size="lg"
            className="gap-2 shadow-accent"
            onClick={() => { setForm({ name:"", type:"PDF", size:"" }); setAddOpen(true); }}
          >
            <Upload className="h-4 w-4 stroke-[2]" /> {t("modules.documents.upload_document")}
          </Button>
        </div>
      </div>

      {/* Storage */}
      <Card variant="featured" className="p-1">
        <CardContent className="flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:gap-6 text-start">
          <div className="flex-1 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-heading font-semibold text-foreground">{t("modules.documents.storage_workspace")}</span>
              <span className="font-mono text-xs text-muted-foreground">{t("modules.documents.storage_used", { used: STORAGE_USED, total: STORAGE_TOTAL })}</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] transition-all duration-500 shadow-accent" style={{ width:`${storagePct}%` }} />
            </div>
          </div>
          <span className="shrink-0 font-mono text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">{t("modules.documents.storage_pct_used", { pct: storagePct })}</span>
        </CardContent>
      </Card>

      {/* File list */}
      <Card className="overflow-hidden border border-border/80 shadow-sm">
        <div className="divide-y divide-border/40">
          {filtered.map(doc => {
            const Icon = ICON_MAP[doc.iconName] ?? FileText;
            return (
              <div key={doc.name} className="flex items-center gap-4 px-5 py-4 hover:bg-muted/30 transition-all duration-200 group text-start">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${doc.color} shadow-xs`}>
                  <Icon className="h-4.5 w-4.5 stroke-[1.75]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-heading font-semibold text-foreground group-hover:text-primary transition-colors">{doc.name}</p>
                  <p className="text-xs font-mono text-muted-foreground">{doc.type} · {doc.size}</p>
                </div>
                <p className="hidden shrink-0 text-xs font-mono text-muted-foreground/80 sm:block">{doc.modified}</p>
                <div className="flex shrink-0 items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary" title={t("modules.documents.view_details")} onClick={() => openDetail(doc)}><Eye className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary" title={t("modules.documents.download")} onClick={() => toast.success(`${t("ui.messages.download_started")}: "${doc.name}"…`)}><Download className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary" title={t("modules.documents.rename")} onClick={() => openEdit(doc)}><Pencil className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive" title={t("modules.documents.delete")} onClick={() => openDelete(doc)}><Trash2 className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <p className="px-5 py-12 text-center text-sm font-mono text-muted-foreground">
              {docs.length === 0 ? t("modules.documents.no_files_yet") : t("modules.documents.no_files_match")}
            </p>
          )}
        </div>
      </Card>

      {/* Add */}
      <FormModal open={addOpen} onOpenChange={setAddOpen} title={t("modules.documents.upload_document")} description={t("modules.documents.upload_file_desc")} submitLabel={t("modules.documents.add_file")} onSubmit={handleAdd}>
        <div className="space-y-4">
          <Field label={t("modules.documents.document_name")}><input className={inputCls} placeholder={t("modules.documents.file_name_placeholder")} value={form.name} onChange={e => setForm(f => ({...f, name:e.target.value}))} /></Field>
          <Field label={t("ui.labels.type")}>
            <select className={inputCls} value={form.type} onChange={e => setForm(f => ({...f, type:e.target.value}))}>
              {["PDF","Spreadsheet","Code","Image","Design","Archive","Other"].map(tItem => <option key={tItem}>{tItem}</option>)}
            </select>
          </Field>
          <Field label={t("modules.documents.file_size")}><input className={inputCls} placeholder={t("modules.documents.file_size_placeholder")} value={form.size} onChange={e => setForm(f => ({...f, size:e.target.value}))} /></Field>
        </div>
      </FormModal>

      {/* Edit */}
      <FormModal open={editOpen} onOpenChange={setEditOpen} title={t("modules.documents.rename_document")} submitLabel={t("ui.actions.save")} onSubmit={handleEdit}>
        <div className="space-y-4">
          <Field label={t("modules.documents.document_name")}><input className={inputCls} value={form.name} onChange={e => setForm(f => ({...f, name:e.target.value}))} /></Field>
          <Field label={t("ui.labels.type")}>
            <select className={inputCls} value={form.type} onChange={e => setForm(f => ({...f, type:e.target.value}))}>
              {["PDF","Spreadsheet","Code","Image","Design","Archive","Other"].map(tItem => <option key={tItem}>{tItem}</option>)}
            </select>
          </Field>
        </div>
      </FormModal>

      {/* Delete */}
      <ConfirmDeleteModal open={deleteOpen} onOpenChange={setDeleteOpen} itemName={selected?.name ?? ""} itemType="file" onConfirm={handleDelete} />

      {/* Details */}
      {selected && (
        <DetailsModal open={detailOpen} onOpenChange={setDetailOpen} title={selected.name} description={t("modules.documents.file_details")}
          fields={[{ label:t("ui.labels.type"), value:selected.type },{ label:t("ui.labels.size"), value:selected.size },{ label:t("modules.documents.last_modified"), value:selected.modified }]}
          actions={<Button size="sm" variant="outline" className="rounded-xl gap-1.5" onClick={() => toast.success(`${t("ui.messages.download_started")}: "${selected.name}"…`)}><Download className="h-3.5 w-3.5" />{t("modules.documents.download")}</Button>}
        />
      )}
    </>
  );
}
