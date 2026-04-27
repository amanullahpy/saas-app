import { supabase } from "@/lib/supabase";
import type { Project } from "@/modules/projects/ProjectsClient";

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*, tasks:tasks(count)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  return (data || []).map((p: any) => ({
    name: p.name,
    status: p.status,
    members: 0,
    tasks: p.tasks?.[0]?.count || 0,
    done: 0,
    due: p.due_date ? new Date(p.due_date).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric"
    }) : "No date",
    color: "bg-blue-500", // Default color
  }));
}
