"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/lib/toast";

export interface ReportRow {
  [key: string]: string | number;
}

export interface ReportConfig {
  /** Module name used in the filename e.g. "admin-reports", "tenant-audit" */
  module: string;
  /** Human-readable report title */
  title: string;
  /** Short description shown in the report header */
  description?: string;
  /** Column headers */
  columns: string[];
  /** Row data — each object key maps to a column */
  rows: ReportRow[];
  /** App branding name */
  appName?: string;
}

function buildCsvContent(config: ReportConfig): string {
  const appName = config.appName ?? "AmanNex";
  const now = new Date().toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" });

  const lines: string[] = [
    // Branding header
    `"${appName} — ${config.title}"`,
    `"Generated: ${now}"`,
    config.description ? `"${config.description}"` : "",
    "",
    // Column headers
    config.columns.map((c) => `"${c}"`).join(","),
    // Data rows
    ...config.rows.map((row) =>
      config.columns.map((col) => {
        const val = row[col] ?? "";
        return `"${String(val).replace(/"/g, '""')}"`;
      }).join(",")
    ),
    "",
    `"— End of report —"`,
  ];

  return lines.filter((l) => l !== undefined).join("\n");
}

interface Props {
  config: ReportConfig;
  label?: string;
  variant?: "outline" | "ghost" | "default";
  size?: "sm" | "default";
  className?: string;
}

export function ReportDownloader({ config, label = "Download", variant = "outline", size = "sm", className }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    setLoading(true);
    // Simulate async data fetch delay
    await new Promise((r) => setTimeout(r, 600));

    try {
      const csv = buildCsvContent(config);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const filename = `${config.appName ?? "AmanNex"}_${config.module}_${new Date().toISOString().slice(0, 10)}.csv`;
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success(`"${config.title}" downloaded.`);
    } catch {
      toast.error("Download failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={`gap-1.5 rounded-xl ${className ?? ""}`}
      onClick={handleDownload}
      disabled={loading}
    >
      {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
      {label}
    </Button>
  );
}
