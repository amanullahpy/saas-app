import { supabase } from "@/lib/supabase";
import type { Doc } from "@/modules/documents/DocumentsClient";

const ICON_MAP: Record<string, string> = {
  PDF: "FileText",
  Spreadsheet: "FileSpreadsheet",
  Archive: "FolderOpen",
  Code: "FileCode",
  Image: "Image",
  Design: "Image",
  Doc: "FileText",
};
const COLOR_MAP: Record<string, string> = {
  PDF: "text-red-500 bg-red-50 dark:bg-red-950/30",
  Spreadsheet: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30",
  Archive: "text-amber-500 bg-amber-50 dark:bg-amber-950/30",
  Code: "text-blue-500 bg-blue-50 dark:bg-blue-950/30",
  Image: "text-purple-500 bg-purple-50 dark:bg-purple-950/30",
  Design: "text-pink-500 bg-pink-50 dark:bg-pink-950/30",
  Doc: "text-blue-500 bg-blue-50 dark:bg-blue-950/30",
};

export async function getDocuments(): Promise<Doc[]> {
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .order("uploaded_at", { ascending: false });

  if (error) {
    console.error("Error fetching documents:", error);
    return [];
  }

  return (data || []).map((d) => ({
    name: d.name,
    type: d.type,
    size: d.size || "—",
    modified: new Date(d.uploaded_at).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric",
    }),
    iconName: ICON_MAP[d.type] || "FileText",
    color: COLOR_MAP[d.type] || COLOR_MAP.Doc,
  }));
}
