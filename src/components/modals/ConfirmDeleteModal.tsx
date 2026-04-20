"use client";

import { useState } from "react";
import { Loader2, Trash2, AlertTriangle } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  /** What is being deleted — shown in the message */
  itemName: string;
  /** Category label e.g. "project", "API key", "member" */
  itemType?: string;
  onConfirm: () => void | Promise<void>;
}

export function ConfirmDeleteModal({ open, onOpenChange, itemName, itemType = "item", onConfirm }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    setLoading(true);
    await onConfirm();
    setLoading(false);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md" showClose={false}>
        <DialogHeader>
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <DialogTitle>Delete {itemType}?</DialogTitle>
          <DialogDescription>
            You are about to permanently delete{" "}
            <span className="font-semibold text-foreground">"{itemName}"</span>.
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" className="rounded-xl" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button variant="destructive" className="rounded-xl gap-2" onClick={handleConfirm} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
            Delete {itemType}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
