import { cn } from "@/lib/utils";
import { SectionLabel } from "./section-label";

interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: string;
  pulse?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  badge,
  pulse = true,
  children,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-start", className)}>
      <div className="space-y-2 min-w-0">
        {badge && <SectionLabel pulse={pulse}>{badge}</SectionLabel>}
        <h1 className="text-3xl sm:text-4xl font-heading tracking-tight text-foreground truncate">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
            {description}
          </p>
        )}
      </div>
      {children && <div className="flex items-center gap-3 shrink-0">{children}</div>}
    </div>
  );
}
