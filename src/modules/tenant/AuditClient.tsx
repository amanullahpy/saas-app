"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DetailsModal } from "@/components/modals";
import { ReportDownloader } from "@/components/ReportDownloader";
import { type LucideIcon } from "lucide-react";
import { ShieldCheck, UserPlus, Settings, LogIn, Trash2, Key } from "lucide-react";

export interface AuditEvent {
  id: number; action: string; actor: string; target: string;
  ip: string; time: string; iconName: string; color: string; severity: string;
}

const ICON_MAP: Record<string, LucideIcon> = { ShieldCheck, UserPlus, Settings, LogIn, Trash2, Key };
const SEVERITY_BADGE: Record<string, string> = {
  info:     "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  warning:  "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  critical: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

interface Props { events: AuditEvent[]; module: string; title: string; }

export function AuditClient({ events, module, title }: Props) {
  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected]     = useState<AuditEvent | null>(null);

  const reportConfig = {
    module,
    title,
    description: `Security and activity events — ${events.length} records`,
    columns: ["Action","Actor","Target","IP","Time","Severity"],
    rows: events.map(e => ({ Action:e.action, Actor:e.actor, Target:e.target, IP:e.ip, Time:e.time, Severity:e.severity })),
  };

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">Security-relevant events — click any row for details.</p>
        </div>
        <ReportDownloader config={reportConfig} label="Export CSV" variant="outline" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label:"Total Events", value:events.length,                                    color:"text-foreground" },
          { label:"Warnings",     value:events.filter(e=>e.severity==="warning").length,  color:"text-amber-500"  },
          { label:"Critical",     value:events.filter(e=>e.severity==="critical").length, color:"text-red-500"    },
        ].map(s => (
          <Card key={s.label} className="border-border/50 shadow-sm">
            <CardContent className="pt-5">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/50 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-border/50 pb-4">
          <CardTitle className="text-base">Event Log</CardTitle>
          <CardDescription>Last 30 days · {events.length} events</CardDescription>
        </CardHeader>
        <div className="divide-y divide-border/50">
          {events.length === 0 ? (
            <p className="px-6 py-8 text-center text-sm text-muted-foreground">No audit events yet.</p>
          ) : (
            events.map(e => {
            const Icon = ICON_MAP[e.iconName] ?? ShieldCheck;
            return (
              <button key={e.id} className="flex w-full items-start gap-4 px-6 py-3.5 text-left hover:bg-muted/30 transition-colors"
                onClick={() => { setSelected(e); setDetailOpen(true); }}>
                <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${e.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{e.action}</p>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${SEVERITY_BADGE[e.severity]}`}>{e.severity}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    <span className="font-medium text-foreground/70">{e.actor}</span> · {e.target}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-xs text-muted-foreground">{e.time}</p>
                  <p className="text-[11px] text-muted-foreground/60 mt-0.5">{e.ip}</p>
                </div>
              </button>
            );
          })
          )}
        </div>
      </Card>

      {selected && (
        <DetailsModal open={detailOpen} onOpenChange={setDetailOpen} title={selected.action} description="Audit event details"
          fields={[
            { label:"Actor",    value:selected.actor    },
            { label:"Target",   value:selected.target   },
            { label:"IP",       value:selected.ip, mono:true },
            { label:"Time",     value:selected.time     },
            { label:"Severity", value:selected.severity },
          ]}
        />
      )}
    </>
  );
}
