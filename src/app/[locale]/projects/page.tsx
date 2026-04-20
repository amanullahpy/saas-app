import { MainShell } from "@/ui/layout/MainShell";
import { setRequestLocale } from "next-intl/server";
import { ProjectsClient, type Project } from "@/modules/projects/ProjectsClient";

const PROJECTS: Project[] = [
  { name:"Website Redesign",    status:"In Progress", members:4, tasks:24, done:14, due:"Apr 30, 2026", color:"bg-blue-500"   },
  { name:"Mobile App v2",       status:"In Progress", members:6, tasks:38, done:22, due:"May 15, 2026", color:"bg-purple-500" },
  { name:"API Integration",     status:"Review",      members:3, tasks:12, done:11, due:"Apr 22, 2026", color:"bg-amber-500"  },
  { name:"Analytics Dashboard", status:"Completed",   members:2, tasks:18, done:18, due:"Apr 10, 2026", color:"bg-emerald-500"},
  { name:"Auth Overhaul",       status:"Planning",    members:3, tasks:8,  done:0,  due:"Jun 1, 2026",  color:"bg-rose-500"   },
  { name:"Billing Module",      status:"In Progress", members:2, tasks:15, done:7,  due:"May 28, 2026", color:"bg-cyan-500"   },
];

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <MainShell><div className="space-y-8"><ProjectsClient initialProjects={PROJECTS} /></div></MainShell>;
}
