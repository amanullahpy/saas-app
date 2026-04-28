"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ConfirmDeleteModal, DetailsModal, FormModal } from "@/components/modals";
import { ReportDownloader } from "@/components/ReportDownloader";
import { Search, MoreHorizontal, ShieldAlert, Eye, Pencil, Trash2, UserX, UserCheck } from "lucide-react";
import { toast } from "@/lib/toast";

export interface AdminUser {
  name: string; email: string; tenant: string; role: string;
  lastSeen: string; status: string; initials: string; color: string;
}

export function UsersClient({ initialUsers }: { initialUsers: AdminUser[] }) {
  const [users, setUsers]           = useState(initialUsers);
  const [search, setSearch]         = useState("");
  const [editOpen, setEditOpen]     = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected]     = useState<AdminUser | null>(null);
  const [form, setForm]             = useState({ role:"Member" });

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.tenant.toLowerCase().includes(search.toLowerCase())
  );

  const inputCls = "h-10 w-full rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

  function openEdit(u: AdminUser)   { setSelected(u); setForm({ role:u.role }); setEditOpen(true); }
  function openDelete(u: AdminUser) { setSelected(u); setDeleteOpen(true); }
  function openDetail(u: AdminUser) { setSelected(u); setDetailOpen(true); }

  function handleEdit() {
    if (!selected) return;
    setUsers(prev => prev.map(u => u.email === selected.email ? { ...u, role:form.role } : u));
    toast.success(`${selected.name}'s role updated to ${form.role}.`);
    setEditOpen(false);
  }
  function handleDelete() {
    if (!selected) return;
    setUsers(prev => prev.filter(u => u.email !== selected.email));
    toast.success(`${selected.name} removed.`);
  }
  function toggleSuspend(u: AdminUser) {
    const next = u.status === "Active" ? "Suspended" : "Active";
    setUsers(prev => prev.map(x => x.email === u.email ? { ...x, status:next } : x));
    toast.success(`${u.name} ${next === "Suspended" ? "suspended" : "reactivated"}.`);
  }

  const reportConfig = {
    module: "admin-users",
    title: "All Users Report",
    description: "All users across all tenants",
    columns: ["Name","Email","Tenant","Role","Status","Last Seen"],
    rows: users.map(u => ({ Name:u.name, Email:u.email, Tenant:u.tenant, Role:u.role, Status:u.status, "Last Seen":u.lastSeen })),
  };

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">All Users</h1>
          <p className="mt-1 text-sm text-muted-foreground">Every user across all tenants — {users.length} total.</p>
        </div>
        <div className="flex gap-2">
          <ReportDownloader config={reportConfig} label="Export" />
          <Button variant="outline" className="w-fit gap-2 rounded-xl text-sm border-destructive/50 text-destructive hover:bg-destructive/5">
            <ShieldAlert className="h-4 w-4" /> Suspended ({users.filter(u=>u.status==="Suspended").length})
          </Button>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input type="search" placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)}
          className="h-10 w-full rounded-xl border border-border bg-background pl-9 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
      </div>

      <Card className="border-border/50 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-border/50 pb-4">
          <CardTitle className="text-base">User Directory</CardTitle>
          <CardDescription>Search and manage users across all tenants</CardDescription>
        </CardHeader>
        <div className="divide-y divide-border/50">
          {filtered.map(u => (
            <div key={u.email} className="flex items-center gap-4 px-6 py-3.5 hover:bg-muted/30 transition-colors group">
              <Avatar className="h-9 w-9 shrink-0">
                <AvatarFallback className={`${u.color} text-white text-xs font-semibold`}>{u.initials}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{u.name}</p>
                <p className="text-xs text-muted-foreground truncate">{u.email}</p>
              </div>
              <div className="hidden sm:block text-xs text-muted-foreground">{u.tenant}</div>
              <div className="hidden md:block text-xs text-muted-foreground">{u.lastSeen}</div>
              <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${u.status === "Active" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}>
                {u.status}
              </span>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg" onClick={() => openDetail(u)}><Eye className="h-3.5 w-3.5" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg" onClick={() => openEdit(u)}><Pencil className="h-3.5 w-3.5" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg" title={u.status==="Active"?"Suspend":"Reactivate"} onClick={() => toggleSuspend(u)}>
                  {u.status === "Active" ? <UserX className="h-3.5 w-3.5 text-amber-500" /> : <UserCheck className="h-3.5 w-3.5 text-emerald-500" />}
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg hover:text-destructive" onClick={() => openDelete(u)}><Trash2 className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="px-6 py-8 text-center text-sm text-muted-foreground">
              {users.length === 0 ? "No users found." : "No users match your search."}
            </p>
          )}
        </div>
      </Card>

      <FormModal open={editOpen} onOpenChange={setEditOpen} title="Edit User Role" description={`Change role for ${selected?.name}`} submitLabel="Save" onSubmit={handleEdit}>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Role</label>
          <select className={inputCls} value={form.role} onChange={e => setForm({ role:e.target.value })}>
            {["Admin","Member","Viewer"].map(r => <option key={r}>{r}</option>)}
          </select>
        </div>
      </FormModal>

      <ConfirmDeleteModal open={deleteOpen} onOpenChange={setDeleteOpen} itemName={selected?.name ?? ""} itemType="user" onConfirm={handleDelete} />

      {selected && (
        <DetailsModal open={detailOpen} onOpenChange={setDetailOpen} title={selected.name} description={selected.email}
          fields={[{ label:"Tenant", value:selected.tenant },{ label:"Role", value:selected.role },{ label:"Status", value:selected.status },{ label:"Last Seen", value:selected.lastSeen }]}
          actions={
            <Button size="sm" variant="outline" className="rounded-xl gap-1.5 text-amber-600 border-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/20"
              onClick={() => { toggleSuspend(selected); setDetailOpen(false); }}>
              {selected.status === "Active" ? <><UserX className="h-3.5 w-3.5" />Suspend</> : <><UserCheck className="h-3.5 w-3.5" />Reactivate</>}
            </Button>
          }
        />
      )}
    </>
  );
}
