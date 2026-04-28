"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserPlus, Mail, MoreHorizontal, Search, Eye, Pencil, Trash2 } from "lucide-react";
import { ConfirmDeleteModal, DetailsModal, FormModal } from "@/components/modals";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Member {
  name: string;
  email: string;
  role: string;
  dept: string;
  status: string;
  initials: string;
  color: string;
}

const ROLE_STYLES: Record<string, string> = {
  Admin: "bg-primary/10 text-primary",
  Member: "bg-secondary text-secondary-foreground",
  Viewer: "bg-muted text-muted-foreground",
};
const STATUS_DOT: Record<string, string> = {
  Active: "bg-emerald-500",
  Away: "bg-amber-400",
  Offline: "bg-neutral-300 dark:bg-neutral-600",
};

export function TeamClient({ initialMembers }: { initialMembers: Member[] }) {
  const t = useTranslations();
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [query, setQuery] = useState("");

  // Modal state
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteLoading, setInviteLoading] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Member");

  const [detailsMember, setDetailsMember] = useState<Member | null>(null);
  const [editMember, setEditMember] = useState<Member | null>(null);
  const [editRole, setEditRole] = useState("");
  const [editLoading, setEditLoading] = useState(false);

  const [deleteMember, setDeleteMember] = useState<Member | null>(null);

  const filtered = members.filter(
    (m) =>
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.email.toLowerCase().includes(query.toLowerCase()) ||
      m.dept.toLowerCase().includes(query.toLowerCase())
  );

  async function handleInvite() {
    if (!inviteEmail.trim()) return;
    setInviteLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setInviteLoading(false);
    setInviteOpen(false);
    setInviteEmail("");
    toast.success(t("modules.team.invite_sent", { email: inviteEmail }));
  }

  async function handleEditSave() {
    if (!editMember) return;
    setEditLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setMembers((prev) =>
      prev.map((m) => (m.email === editMember.email ? { ...m, role: editRole } : m))
    );
    setEditLoading(false);
    setEditMember(null);
    toast.success(t("modules.team.member_updated"));
  }

  async function handleDelete() {
    if (!deleteMember) return;
    await new Promise((r) => setTimeout(r, 600));
    setMembers((prev) => prev.filter((m) => m.email !== deleteMember.email));
    toast.success(t("modules.team.member_removed", { name: deleteMember.name }));
  }

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total Members", value: members.length },
          { label: "Active Now", value: members.filter((m) => m.status === "Active").length },
          { label: "Departments", value: [...new Set(members.map((m) => m.dept))].length },
          { label: "Admins", value: members.filter((m) => m.role === "Admin").length },
        ].map((s) => (
          <Card key={s.label} className="border-none shadow-sm bg-card">
            <CardContent className="pt-5">
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search members..."
            className="h-10 w-full rounded-xl border border-border bg-background pl-9 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <Button className="w-fit gap-2 rounded-xl" onClick={() => setInviteOpen(true)}>
          <UserPlus className="h-4 w-4" /> Invite Member
        </Button>
      </div>

      {/* Member grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {filtered.map((member) => (
          <Card key={member.email} className="border-none shadow-sm bg-card hover:shadow-md transition-shadow">
            <CardContent className="pt-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className={`${member.color} text-white text-xs font-semibold`}>
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ring-2 ring-card ${STATUS_DOT[member.status]}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">{member.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{member.dept}</p>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0 rounded-lg">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuItem onClick={() => setDetailsMember(member)}>
                      <Eye className="mr-2 h-3.5 w-3.5" /> View details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => { setEditMember(member); setEditRole(member.role); }}>
                      <Pencil className="mr-2 h-3.5 w-3.5" /> Edit role
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => setDeleteMember(member)}
                    >
                      <Trash2 className="mr-2 h-3.5 w-3.5" /> Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${ROLE_STYLES[member.role]}`}>
                  {member.role}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-lg text-muted-foreground hover:text-foreground"
                  onClick={() => { navigator.clipboard.writeText(member.email); toast.success("Email copied"); }}
                  title={`Email ${member.name}`}
                >
                  <Mail className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-8 text-center text-sm text-muted-foreground">
            {members.length === 0 ? "No team members yet. Invite someone to get started." : "No members match your search."}
          </p>
        )}
      </div>

      {/* ── Invite Modal ── */}
      <FormModal
        open={inviteOpen}
        onOpenChange={setInviteOpen}
        title="Invite a Member"
        description="Send an invitation email to add someone to your workspace."
        submitLabel="Send Invitation"
        loading={inviteLoading}
        onSubmit={handleInvite}
      >
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Email address</label>
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="colleague@company.com"
              className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Role</label>
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value)}
              className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option>Admin</option>
              <option>Member</option>
              <option>Viewer</option>
            </select>
          </div>
        </div>
      </FormModal>

      {/* ── Details Modal ── */}
      {detailsMember && (
        <DetailsModal
          open={!!detailsMember}
          onOpenChange={(v) => !v && setDetailsMember(null)}
          title={detailsMember.name}
          description="Member profile details"
          fields={[
            { label: "Email", value: detailsMember.email, mono: true },
            { label: "Department", value: detailsMember.dept },
            { label: "Role", value: detailsMember.role },
            { label: "Status", value: detailsMember.status },
          ]}
        />
      )}

      {/* ── Edit Role Modal ── */}
      {editMember && (
        <FormModal
          open={!!editMember}
          onOpenChange={(v) => !v && setEditMember(null)}
          title={`Edit Role — ${editMember.name}`}
          description="Change this member's access level in the workspace."
          submitLabel="Save Changes"
          loading={editLoading}
          onSubmit={handleEditSave}
        >
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Role</label>
            <select
              value={editRole}
              onChange={(e) => setEditRole(e.target.value)}
              className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option>Admin</option>
              <option>Member</option>
              <option>Viewer</option>
            </select>
          </div>
        </FormModal>
      )}

      {/* ── Delete Modal ── */}
      <ConfirmDeleteModal
        open={!!deleteMember}
        onOpenChange={(v) => !v && setDeleteMember(null)}
        itemName={deleteMember?.name ?? ""}
        itemType="member"
        onConfirm={handleDelete}
      />
    </>
  );
}
