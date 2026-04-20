"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ConfirmDeleteModal, DetailsModal, FormModal } from "@/components/modals";
import { ReportDownloader } from "@/components/ReportDownloader";
import { UserPlus, MoreHorizontal, ShieldCheck, Eye as EyeIcon, User, Pencil, Trash2 } from "lucide-react";
import { toast } from "@/lib/toast";

export interface TenantMember {
  name: string; email: string; role: string;
  joined: string; initials: string; color: string;
}

const ROLE_ICON: Record<string, React.ElementType> = { Admin: ShieldCheck, Member: User, Viewer: EyeIcon };
const ROLE_STYLE: Record<string, string> = {
  Admin:  "bg-primary/10 text-primary",
  Member: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Viewer: "bg-muted text-muted-foreground",
};
const AVATAR_COLORS = ["bg-violet-500","bg-blue-500","bg-pink-500","bg-amber-500","bg-emerald-500","bg-cyan-500","bg-rose-500","bg-indigo-500"];

export function MembersClient({ initialMembers }: { initialMembers: TenantMember[] }) {
  const [members, setMembers]       = useState(initialMembers);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [editOpen, setEditOpen]     = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected]     = useState<TenantMember | null>(null);
  const [inviteForm, setInviteForm] = useState({ email:"", role:"Member" });
  const [editRole, setEditRole]     = useState("Member");

  const inputCls = "h-10 w-full rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

  function openEdit(m: TenantMember)   { setSelected(m); setEditRole(m.role); setEditOpen(true); }
  function openDelete(m: TenantMember) { setSelected(m); setDeleteOpen(true); }
  function openDetail(m: TenantMember) { setSelected(m); setDetailOpen(true); }

  function handleInvite() {
    if (!inviteForm.email.trim()) return;
    const name = inviteForm.email.split("@")[0].replace(/[._]/g," ").replace(/\b\w/g,c=>c.toUpperCase());
    const initials = name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
    const color = AVATAR_COLORS[members.length % AVATAR_COLORS.length];
    setMembers(prev => [...prev, { name, email:inviteForm.email, role:inviteForm.role, joined:"Today", initials, color }]);
    toast.success(`Invitation sent to ${inviteForm.email}.`);
    setInviteOpen(false); setInviteForm({ email:"", role:"Member" });
  }
  function handleEdit() {
    if (!selected) return;
    setMembers(prev => prev.map(m => m.email === selected.email ? { ...m, role:editRole } : m));
    toast.success(`${selected.name}'s role updated to ${editRole}.`);
    setEditOpen(false);
  }
  function handleDelete() {
    if (!selected) return;
    setMembers(prev => prev.filter(m => m.email !== selected.email));
    toast.success(`${selected.name} removed from tenant.`);
  }

  const reportConfig = {
    module: "tenant-members",
    title: "Members & Roles",
    description: "All members in this tenant",
    columns: ["Name","Email","Role","Joined"],
    rows: members.map(m => ({ Name:m.name, Email:m.email, Role:m.role, Joined:m.joined })),
  };

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Members & Roles</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage who has access to this tenant and what they can do.</p>
        </div>
        <div className="flex gap-2">
          <ReportDownloader config={reportConfig} label="Export" />
          <Button className="w-fit gap-2 rounded-xl" onClick={() => { setInviteForm({ email:"", role:"Member" }); setInviteOpen(true); }}>
            <UserPlus className="h-4 w-4" /> Invite Member
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { role:"Admin",  count:members.filter(m=>m.role==="Admin").length,  icon:ShieldCheck, color:"text-primary" },
          { role:"Member", count:members.filter(m=>m.role==="Member").length, icon:User,        color:"text-blue-500" },
          { role:"Viewer", count:members.filter(m=>m.role==="Viewer").length, icon:EyeIcon,     color:"text-muted-foreground" },
        ].map(r => (
          <Card key={r.role} className="border-border/50 shadow-sm">
            <CardContent className="flex items-center gap-3 pt-5">
              <r.icon className={`h-5 w-5 ${r.color}`} />
              <div><p className="text-xl font-bold">{r.count}</p><p className="text-xs text-muted-foreground">{r.role}s</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/50 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-border/50 pb-4">
          <CardTitle className="text-base">All Members</CardTitle>
          <CardDescription>{members.length} members in this tenant</CardDescription>
        </CardHeader>
        <div className="divide-y divide-border/50">
          {members.map(m => {
            const RoleIcon = ROLE_ICON[m.role];
            return (
              <div key={m.email} className="flex items-center gap-4 px-6 py-3.5 hover:bg-muted/30 transition-colors group">
                <Avatar className="h-9 w-9 shrink-0">
                  <AvatarFallback className={`${m.color} text-white text-xs font-semibold`}>{m.initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.email}</p>
                </div>
                <span className={`hidden sm:flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${ROLE_STYLE[m.role]}`}>
                  <RoleIcon className="h-3 w-3" /> {m.role}
                </span>
                <p className="hidden md:block text-xs text-muted-foreground">Joined {m.joined}</p>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg" onClick={() => openDetail(m)}><EyeIcon className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg" onClick={() => openEdit(m)}><Pencil className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg hover:text-destructive" onClick={() => openDelete(m)}><Trash2 className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <FormModal open={inviteOpen} onOpenChange={setInviteOpen} title="Invite Member" description="Send an invitation to join this tenant." submitLabel="Send Invite" onSubmit={handleInvite}>
        <div className="space-y-4">
          <div className="space-y-1.5"><label className="text-sm font-medium text-foreground">Email Address</label>
            <input type="email" className={inputCls} placeholder="colleague@company.com" value={inviteForm.email} onChange={e => setInviteForm(f => ({...f, email:e.target.value}))} /></div>
          <div className="space-y-1.5"><label className="text-sm font-medium text-foreground">Role</label>
            <select className={inputCls} value={inviteForm.role} onChange={e => setInviteForm(f => ({...f, role:e.target.value}))}>
              {["Admin","Member","Viewer"].map(r => <option key={r}>{r}</option>)}
            </select></div>
        </div>
      </FormModal>

      <FormModal open={editOpen} onOpenChange={setEditOpen} title="Change Role" description={`Update role for ${selected?.name}`} submitLabel="Save" onSubmit={handleEdit}>
        <div className="space-y-1.5"><label className="text-sm font-medium text-foreground">Role</label>
          <select className={inputCls} value={editRole} onChange={e => setEditRole(e.target.value)}>
            {["Admin","Member","Viewer"].map(r => <option key={r}>{r}</option>)}
          </select></div>
      </FormModal>

      <ConfirmDeleteModal open={deleteOpen} onOpenChange={setDeleteOpen} itemName={selected?.name ?? ""} itemType="member" onConfirm={handleDelete} />

      {selected && (
        <DetailsModal open={detailOpen} onOpenChange={setDetailOpen} title={selected.name} description={selected.email}
          fields={[{ label:"Role", value:selected.role },{ label:"Joined", value:selected.joined }]}
          actions={<Button size="sm" variant="outline" className="rounded-xl gap-1.5" onClick={() => { openEdit(selected); setDetailOpen(false); }}><Pencil className="h-3.5 w-3.5" />Change Role</Button>}
        />
      )}
    </>
  );
}
