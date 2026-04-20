import { MainShell } from "@/ui/layout/MainShell";
import { setRequestLocale } from "next-intl/server";
import { DocumentsClient, type Doc } from "@/modules/documents/DocumentsClient";

const DOCS: Doc[] = [
  { name:"Q1 2026 Report.pdf",    type:"PDF",         size:"2.4 MB",  modified:"Apr 18, 2026", iconName:"FileText",        color:"text-red-500 bg-red-50 dark:bg-red-950/30"         },
  { name:"Product Roadmap.xlsx",  type:"Spreadsheet", size:"840 KB",  modified:"Apr 15, 2026", iconName:"FileSpreadsheet",  color:"text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30"},
  { name:"Brand Assets.zip",      type:"Archive",     size:"18.2 MB", modified:"Apr 12, 2026", iconName:"FolderOpen",       color:"text-amber-500 bg-amber-50 dark:bg-amber-950/30"   },
  { name:"API Spec v3.yaml",      type:"Code",        size:"124 KB",  modified:"Apr 10, 2026", iconName:"FileCode",         color:"text-blue-500 bg-blue-50 dark:bg-blue-950/30"      },
  { name:"Team Photo.png",        type:"Image",       size:"3.1 MB",  modified:"Apr 8, 2026",  iconName:"Image",            color:"text-purple-500 bg-purple-50 dark:bg-purple-950/30"},
  { name:"Onboarding Guide.pdf",  type:"PDF",         size:"1.7 MB",  modified:"Apr 5, 2026",  iconName:"FileText",         color:"text-red-500 bg-red-50 dark:bg-red-950/30"         },
  { name:"Design System.fig",     type:"Design",      size:"22.5 MB", modified:"Apr 2, 2026",  iconName:"Image",            color:"text-pink-500 bg-pink-50 dark:bg-pink-950/30"      },
  { name:"Infrastructure.tf",     type:"Code",        size:"56 KB",   modified:"Mar 28, 2026", iconName:"FileCode",         color:"text-blue-500 bg-blue-50 dark:bg-blue-950/30"      },
];

export default async function DocumentsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <MainShell><div className="space-y-8"><DocumentsClient initialDocs={DOCS} /></div></MainShell>;
}
