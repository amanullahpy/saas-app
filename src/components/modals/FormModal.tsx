"use client";

import { Loader2 } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  submitLabel?: string;
  loading?: boolean;
  onSubmit?: () => void;
  /** Hides the default footer — use when the form has its own submit */
  hideFooter?: boolean;
}

export function FormModal({
  open, onOpenChange, title, description, children,
  submitLabel = "Save", loading = false, onSubmit, hideFooter = false,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="px-6 pb-2">{children}</div>

        {!hideFooter && (
          <DialogFooter>
            <Button variant="outline" className="rounded-xl" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button className="rounded-xl gap-2" onClick={onSubmit} disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {submitLabel}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
