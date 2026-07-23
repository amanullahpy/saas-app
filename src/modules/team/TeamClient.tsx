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
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
        {[
          { label: t("modules.team.stats.total_members"), value: members.length },
          { label: t("modules.team.stats.active_now"), value: members.filter((m) => m.status === "Active").length },
          { label: t("modules.team.stats.departments"), value: [...new Set(members.map((m) => m.dept))].length },
          { label: t("modules.team.stats.admins"), value: members.filter((m) => m.role === "Admin").length },
        ].map((s, idx) => (
          <Card key={s.label} variant={idx === 0 ? "featured" : "default"} className="p-1">
            <CardContent className="pt-5 text-start">
              <p className="text-3xl font-heading tracking-tight text-foreground">{s.value}</p>
              <p className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("modules.team.search_placeholder")}
            className="h-11 w-full rounded-xl border border-border/80 bg-background/50 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
          />
        </div>
        <Button variant="gradient" size="lg" className="w-fit gap-2 shadow-accent" onClick={() => setInviteOpen(true)}>
          <UserPlus className="h-4 w-4 stroke-[2]" /> {t("modules.team.invite_member")}
        </Button>
      </div>

      {/* Member grid */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {filtered.map((member) => (
          <Card key={member.email} className="group hover:-translate-y-1 transition-all duration-300">
            <CardContent className="pt-5 text-start">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-11 w-11 rounded-xl shadow-xs">
                      <AvatarFallback className={`${member.color} text-white text-xs font-bold rounded-xl`}>
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full ring-2 ring-card ${STATUS_DOT[member.status]}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-heading font-semibold text-foreground group-hover:text-primary transition-colors">{member.name}</p>
                    <p className="truncate text-xs font-mono text-muted-foreground">{member.dept}</p>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 rounded-lg hover:bg-primary/10">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44 rounded-xl">
                    <DropdownMenuItem onClick={() => setDetailsMember(member)}>
                      <Eye className="mr-2 h-3.5 w-3.5" /> {t("modules.team.view_details")}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => { setEditMember(member); setEditRole(member.role); }}>
                      <Pencil className="mr-2 h-3.5 w-3.5" /> {t("modules.team.edit_role")}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => setDeleteMember(member)}
                    >
                      <Trash2 className="mr-2 h-3.5 w-3.5" /> {t("modules.team.remove")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-5 flex items-center justify-between pt-3 border-t border-border/40">
                <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-mono font-medium ${ROLE_STYLES[member.role]}`}>
                  {member.role}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10"
                  onClick={() => { navigator.clipboard.writeText(member.email); toast.success(t("modules.team.email_copied")); }}
                  title={`Email ${member.name}`}
                >
                  <Mail className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-12 text-center text-sm font-mono text-muted-foreground">
            {members.length === 0 ? t("modules.team.no_members_yet") : t("modules.team.no_members_match")}
          </p>
        )}
      </div>

      {/* ── Invite Modal ── */}
      <FormModal
        open={inviteOpen}
        onOpenChange={setInviteOpen}
        title={t("modules.team.invite_title")}
        description={t("modules.team.invite_desc")}
        submitLabel={t("modules.team.send_invitation")}
        loading={inviteLoading}
        onSubmit={handleInvite}
      >
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">{t("modules.team.email_address")}</label>
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder={t("modules.team.email_placeholder")}
              className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">{t("modules.team.role")}</label>
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
          description={t("modules.team.member_profile_details")}
          fields={[
            { label: t("modules.team.member_email"), value: detailsMember.email, mono: true },
            { label: t("modules.team.member_department"), value: detailsMember.dept },
            { label: t("modules.team.member_role"), value: detailsMember.role },
            { label: t("modules.team.member_status"), value: detailsMember.status },
          ]}
        />
      )}

      {/* ── Edit Role Modal ── */}
      {editMember && (
        <FormModal
          open={!!editMember}
          onOpenChange={(v) => !v && setEditMember(null)}
          title={t("modules.team.edit_role_title", { name: editMember.name })}
          description={t("modules.team.edit_role_desc")}
          submitLabel={t("modules.team.save_changes")}
          loading={editLoading}
          onSubmit={handleEditSave}
        >
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">{t("modules.team.role")}</label>
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
