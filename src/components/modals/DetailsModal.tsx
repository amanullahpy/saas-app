"use client";

import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface DetailField {
  label: string;
  value: React.ReactNode;
  /** Optional badge variant for status-like values */
  badge?: "default" | "secondary" | "outline" | "destructive";
  mono?: boolean;
}

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  description?: string;
  fields: DetailField[];
  /** Optional extra actions in the footer */
  actions?: React.ReactNode;
}

export function DetailsModal({ open, onOpenChange, title, description, fields, actions }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="px-6 pb-2">
          <dl className="divide-y divide-border/50">
            {fields.map((f) => (
              <div key={f.label} className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
                <dt className="shrink-0 text-sm text-muted-foreground">{f.label}</dt>
                <dd className={cn("text-right text-sm font-medium text-foreground", f.mono && "font-mono text-xs")}>
                  {f.badge ? (
                    <Badge variant={f.badge}>{f.value}</Badge>
                  ) : (
                    f.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <DialogFooter>
          {actions}
          <Button variant="outline" className="rounded-xl" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
