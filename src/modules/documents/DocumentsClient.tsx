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

export function DocumentsClient({ initialDocs }: { initialDocs: Doc[] }) {
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
    toast.success("File updated.");
    setEditOpen(false);
  }
  function handleDelete() {
    if (!selected) return;
    setDocs(prev => prev.filter(d => d.name !== selected.name));
    toast.success(`"${selected.name}" deleted.`);
  }

  const inputCls = "h-10 w-full rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";
  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="space-y-1.5"><label className="text-sm font-medium text-foreground">{label}</label>{children}</div>
  );

  const reportConfig = {
    module: "documents",
    title: "Documents Library",
    description: "All files in the workspace document library",
    columns: ["Name", "Type", "Size", "Modified"],
    rows: docs.map(d => ({ Name: d.name, Type: d.type, Size: d.size, Modified: d.modified })),
  };

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Documents</h2>
          <p className="mt-1 text-sm text-muted-foreground">Files shared within your workspace.</p>
        </div>
        <div className="flex gap-2">
          <ReportDownloader config={reportConfig} label="Export" />
          <Button className="w-fit gap-2 rounded-xl" onClick={() => { setForm({ name:"", type:"PDF", size:"" }); setAddOpen(true); }}>
            <Upload className="h-4 w-4" /> Upload File
          </Button>
        </div>
      </div>

      {/* Storage */}
      <Card className="border-none shadow-sm bg-card">
        <CardContent className="flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:gap-6">
          <div className="flex-1 space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-foreground">Storage</span>
              <span className="text-muted-foreground">{STORAGE_USED} GB / {STORAGE_TOTAL} GB used</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width:`${storagePct}%` }} />
            </div>
          </div>
          <p className="shrink-0 text-sm text-muted-foreground">{storagePct}% used</p>
        </CardContent>
      </Card>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input type="search" placeholder="Search files..." value={search} onChange={e => setSearch(e.target.value)}
          className="h-10 w-full rounded-xl border border-border bg-background pl-9 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
      </div>

      {/* File list */}
      <Card className="border-none shadow-sm bg-card overflow-hidden">
        <div className="divide-y divide-border/50">
          {filtered.map(doc => {
            const Icon = ICON_MAP[doc.iconName] ?? FileText;
            return (
              <div key={doc.name} className="flex items-center gap-4 px-5 py-3.5 hover:bg-muted/40 transition-colors group">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${doc.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">{doc.type} · {doc.size}</p>
                </div>
                <p className="hidden shrink-0 text-xs text-muted-foreground sm:block">{doc.modified}</p>
                <div className="flex shrink-0 items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg" title="View details" onClick={() => openDetail(doc)}><Eye className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg" title="Download" onClick={() => toast.success(`Downloading "${doc.name}"…`)}><Download className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg" title="Rename" onClick={() => openEdit(doc)}><Pencil className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg text-muted-foreground hover:text-destructive" title="Delete" onClick={() => openDelete(doc)}><Trash2 className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <p className="px-5 py-8 text-center text-sm text-muted-foreground">
              {docs.length === 0 ? "No files yet. Upload your first file to get started." : "No files match your search."}
            </p>
          )}
        </div>
      </Card>

      {/* Add */}
      <FormModal open={addOpen} onOpenChange={setAddOpen} title="Upload File" description="Add a new file to the document library." submitLabel="Add File" onSubmit={handleAdd}>
        <div className="space-y-4">
          <Field label="File Name"><input className={inputCls} placeholder="e.g. Q2 Report.pdf" value={form.name} onChange={e => setForm(f => ({...f, name:e.target.value}))} /></Field>
          <Field label="Type">
            <select className={inputCls} value={form.type} onChange={e => setForm(f => ({...f, type:e.target.value}))}>
              {["PDF","Spreadsheet","Code","Image","Design","Archive","Other"].map(t => <option key={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Size (optional)"><input className={inputCls} placeholder="e.g. 2.4 MB" value={form.size} onChange={e => setForm(f => ({...f, size:e.target.value}))} /></Field>
        </div>
      </FormModal>

      {/* Edit */}
      <FormModal open={editOpen} onOpenChange={setEditOpen} title="Rename File" submitLabel="Save" onSubmit={handleEdit}>
        <div className="space-y-4">
          <Field label="File Name"><input className={inputCls} value={form.name} onChange={e => setForm(f => ({...f, name:e.target.value}))} /></Field>
          <Field label="Type">
            <select className={inputCls} value={form.type} onChange={e => setForm(f => ({...f, type:e.target.value}))}>
              {["PDF","Spreadsheet","Code","Image","Design","Archive","Other"].map(t => <option key={t}>{t}</option>)}
            </select>
          </Field>
        </div>
      </FormModal>

      {/* Delete */}
      <ConfirmDeleteModal open={deleteOpen} onOpenChange={setDeleteOpen} itemName={selected?.name ?? ""} itemType="file" onConfirm={handleDelete} />

      {/* Details */}
      {selected && (
        <DetailsModal open={detailOpen} onOpenChange={setDetailOpen} title={selected.name} description="File details"
          fields={[{ label:"Type", value:selected.type },{ label:"Size", value:selected.size },{ label:"Last Modified", value:selected.modified }]}
          actions={<Button size="sm" variant="outline" className="rounded-xl gap-1.5" onClick={() => toast.success(`Downloading "${selected.name}"…`)}><Download className="h-3.5 w-3.5" />Download</Button>}
        />
      )}
    </>
  );
}
