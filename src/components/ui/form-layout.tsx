import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface FormLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function FormLayout({ title, description, children, footer, className }: FormLayoutProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="space-y-6">{children}</div>
      </CardContent>
      {footer && <CardContent className="border-t pt-6">{footer}</CardContent>}
    </Card>
  );
}

interface FormSectionProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function FormSection({ title, description, children, className }: FormSectionProps) {
  return (
    <div className={className}>
      {title && <h3 className="text-base font-medium mb-2">{title}</h3>}
      {description && <p className="text-sm text-muted-foreground mb-4">{description}</p>}
      <div className="space-y-4">{children}</div>
    </div>
  );
}

interface FormRowProps {
  children: ReactNode;
  className?: string;
}

export function FormRow({ children, className }: FormRowProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className || ""}`}>
      {children}
    </div>
  );
}

interface FormActionsProps {
  children: ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}

export function FormActions({ children, align = "right", className }: FormActionsProps) {
  const alignClass = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  }[align];

  return (
    <div className={`flex gap-3 ${alignClass} ${className || ""}`}>
      {children}
    </div>
  );
}
