"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DetailsModal } from "@/components/modals";
import { CheckCheck, Trash2, type LucideIcon } from "lucide-react";
import { toast } from "@/lib/toast";

export interface Notification {
  id: number; type: string; iconName: string; color: string;
  title: string; body: string; time: string; read: boolean;
}

const ICON_REGISTRY: Record<string, LucideIcon> = {};

// We pass pre-resolved icons from the server component via a separate map
import { CreditCard, UserPlus, AlertTriangle, ShieldCheck, Zap, MessageSquare } from "lucide-react";
const ICONS: Record<string, LucideIcon> = { CreditCard, UserPlus, AlertTriangle, ShieldCheck, Zap, MessageSquare };

export function NotificationsClient({ initialNotifications }: { initialNotifications: Notification[] }) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [detailOpen, setDetailOpen]       = useState(false);
  const [selected, setSelected]           = useState<Notification | null>(null);

  const unread = notifications.filter(n => !n.read).length;

  function markAllRead() {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast.success("All notifications marked as read.");
  }
  function dismiss(id: number) {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast.success("Notification dismissed.");
  }
  function markRead(id: number) {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }
  function openDetail(n: Notification) {
    markRead(n.id);
    setSelected(n);
    setDetailOpen(true);
  }

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Notifications</h2>
            <p className="mt-1 text-sm text-muted-foreground">Alerts across your apps and workspace.</p>
          </div>
          {unread > 0 && <Badge className="h-6 rounded-full px-2 text-xs">{unread} new</Badge>}
        </div>
        <Button variant="outline" className="w-fit gap-2 rounded-xl text-sm" onClick={markAllRead} disabled={unread === 0}>
          <CheckCheck className="h-4 w-4" /> Mark all as read
        </Button>
      </div>

      <Card className="border-none shadow-sm bg-card overflow-hidden">
        {notifications.length === 0 && (
          <p className="px-5 py-12 text-center text-sm text-muted-foreground">You're all caught up!</p>
        )}
        <div className="divide-y divide-border/50">
          {notifications.map(n => {
            const Icon = ICONS[n.iconName];
            return (
              <div key={n.id} className={`flex items-start gap-4 px-5 py-4 transition-colors hover:bg-muted/30 cursor-pointer ${!n.read ? "bg-primary/[0.03]" : ""}`}
                onClick={() => openDetail(n)}>
                <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${n.color}`}>
                  {Icon && <Icon className="h-4 w-4" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-medium ${!n.read ? "text-foreground" : "text-foreground/80"}`}>{n.title}</p>
                    <span className="shrink-0 text-xs text-muted-foreground">{n.time}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground leading-relaxed line-clamp-1">{n.body}</p>
                </div>
                <div className="flex shrink-0 items-center gap-1 ml-2">
                  {!n.read && <div className="h-2 w-2 rounded-full bg-primary" />}
                  <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg opacity-0 group-hover:opacity-100 hover:text-destructive"
                    onClick={e => { e.stopPropagation(); dismiss(n.id); }}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {selected && (
        <DetailsModal open={detailOpen} onOpenChange={setDetailOpen} title={selected.title} description={selected.body}
          fields={[{ label:"Type", value:selected.type },{ label:"Time", value:selected.time },{ label:"Status", value:selected.read ? "Read" : "Unread" }]}
          actions={<Button size="sm" variant="outline" className="rounded-xl gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/5"
            onClick={() => { dismiss(selected.id); setDetailOpen(false); }}><Trash2 className="h-3.5 w-3.5" />Dismiss</Button>}
        />
      )}
    </>
  );
}
