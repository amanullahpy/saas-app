"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { X, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// ─── Default skill sets ────────────────────────────────────────────────────────

const DEFAULT_FRONTEND_SKILLS = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Redux Toolkit",
  "HTML5",
  "CSS3",
  "Radix UI",
  "shadcn/ui",
];

const DEFAULT_FULLSTACK_SKILLS = [
  "Node.js",
  "Express",
  "REST APIs",
  "GraphQL",
  "PostgreSQL",
  "MongoDB",
  "Prisma",
  "Docker",
  "Git",
  "CI/CD",
];

// ─── Skill group sub-component ─────────────────────────────────────────────────

function SkillGroup({
  title,
  description,
  skills,
  onAdd,
  onRemove,
}: {
  title: string;
  description: string;
  skills: string[];
  onAdd: (skill: string) => void;
  onRemove: (skill: string) => void;
}) {
  const [input, setInput] = useState("");

  function handleAdd() {
    const trimmed = input.trim();
    if (!trimmed || skills.includes(trimmed)) return;
    onAdd(trimmed);
    setInput("");
  }

  return (
    <Card className="border-none shadow-sm bg-card hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Skill badges */}
        <div className="flex flex-wrap gap-2 min-h-[2.5rem]">
          {skills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="h-7 gap-1.5 px-3 text-sm cursor-default"
            >
              {skill}
              <button
                type="button"
                aria-label={`Remove ${skill}`}
                onClick={() => onRemove(skill)}
                className="ml-0.5 rounded-full opacity-60 hover:opacity-100 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {skills.length === 0 && (
            <p className="text-sm text-muted-foreground">No skills added yet.</p>
          )}
        </div>

        {/* Add skill input */}
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Add a skill..."
            className="h-9 rounded-xl"
          />
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleAdd}
            className="h-9 rounded-xl px-3"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export function SkillsSettings() {
  const t = useTranslations("settings.skills");

  const [frontendSkills, setFrontendSkills] = useState<string[]>(DEFAULT_FRONTEND_SKILLS);
  const [fullstackSkills, setFullstackSkills] = useState<string[]>(DEFAULT_FULLSTACK_SKILLS);

  return (
    <div className="space-y-6">
      <SkillGroup
        title={t("frontend_title")}
        description={t("frontend_description")}
        skills={frontendSkills}
        onAdd={(s) => setFrontendSkills((prev) => [...prev, s])}
        onRemove={(s) => setFrontendSkills((prev) => prev.filter((x) => x !== s))}
      />
      <SkillGroup
        title={t("fullstack_title")}
        description={t("fullstack_description")}
        skills={fullstackSkills}
        onAdd={(s) => setFullstackSkills((prev) => [...prev, s])}
        onRemove={(s) => setFullstackSkills((prev) => prev.filter((x) => x !== s))}
      />

      <div className="flex justify-end">
        <Button
          type="button"
          className="h-11 px-8 rounded-xl"
          onClick={() => {
            // Wire to your API / Redux when backend is ready
            console.log({ frontendSkills, fullstackSkills });
          }}
        >
          {t("save")}
        </Button>
      </div>
    </div>
  );
}
