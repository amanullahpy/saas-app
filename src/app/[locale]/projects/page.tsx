import { MainShell } from "@/ui/layout/MainShell";
import { setRequestLocale } from "next-intl/server";
import { ProjectsClient, type Project } from "@/modules/projects/ProjectsClient";
import { getProjects } from "@/services/projects";
import { authConfig } from "@/config/auth";

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  let projects: Project[] = [];

  if (authConfig.driver === "http") {
    projects = await getProjects();
  }

  return (
    <MainShell>
      <div className="space-y-8">
        <ProjectsClient initialProjects={projects} />
      </div>
    </MainShell>
  );
}
