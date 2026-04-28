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

  const COLORS = ["bg-blue-500","bg-purple-500","bg-amber-500","bg-emerald-500","bg-rose-500","bg-cyan-500","bg-indigo-500","bg-pink-500"];

  return (data || []).map((p: any, i: number) => ({
    name: p.name,
    status: p.status || "Planning",
    members: 0,
    tasks: p.tasks?.[0]?.count ?? 0,
    done: 0,
    due: p.due_date
      ? new Date(p.due_date).toLocaleDateString("en-US", {
          month: "short", day: "numeric", year: "numeric",
        })
      : "No date",
    color: COLORS[i % COLORS.length],
  }));
}
