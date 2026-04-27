import { MainShell } from "@/ui/layout/MainShell";
import { setRequestLocale } from "next-intl/server";
import { ProjectsClient, type Project } from "@/modules/projects/ProjectsClient";
import { getProjects } from "@/services/projects";
import { authConfig } from "@/config/auth";

const MOCK_PROJECTS: Project[] = [
  { name:"Website Redesign",    status:"In Progress", members:4, tasks:24, done:14, due:"Apr 30, 2026", color:"bg-blue-500"   },
  { name:"Mobile App v2",       status:"In Progress", members:6, tasks:38, done:22, due:"May 15, 2026", color:"bg-purple-500" },
  { name:"API Integration",     status:"Review",      members:3, tasks:12, done:11, due:"Apr 22, 2026", color:"bg-amber-500"  },
  { name:"Analytics Dashboard", status:"Completed",   members:2, tasks:18, done:18, due:"Apr 10, 2026", color:"bg-emerald-500"},
];

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  let projects = MOCK_PROJECTS;

  if (authConfig.driver === "http") {
    const realProjects = await getProjects();
    if (realProjects.length > 0) {
      projects = realProjects;
    }
  }

  return (
    <MainShell>
      <div className="space-y-8">
        <ProjectsClient initialProjects={projects} />
      </div>
    </MainShell>
  );
}
