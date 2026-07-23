import { MainShell } from "@/ui/layout/MainShell";
import { setRequestLocale } from "next-intl/server";
import { DocumentsClient, type Doc } from "@/modules/documents/DocumentsClient";
import { getDocuments } from "@/services/documents";
import { authConfig } from "@/config/auth";
import { PageHeader } from "@/components/ui/page-header";

export default async function DocumentsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  let docs: Doc[] = [];

  if (authConfig.driver === "http") {
    docs = await getDocuments();
  }

  return (
    <MainShell>
      <div className="space-y-8">
        <PageHeader
          badge="Storage & Assets"
          title="Documents Library"
          description="Access and manage shared files, assets, and reports across your workspace."
        />
        <DocumentsClient initialDocs={docs} />
      </div>
    </MainShell>
  );
}
