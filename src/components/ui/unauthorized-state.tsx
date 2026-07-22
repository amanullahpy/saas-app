import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

interface UnauthorizedStateProps {
  title?: string;
  description?: string;
  onLogin?: () => void;
  showLoginButton?: boolean;
}

export function UnauthorizedState({
  title,
  description,
  onLogin,
  showLoginButton = true,
}: UnauthorizedStateProps) {
  const t = useTranslations("common");

  return (
    <div className="flex min-h-[400px] items-center justify-center p-4">
      <Card className="max-w-md w-full border-destructive/50">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <Lock className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle>{title || t("unauthorized_title") || "Access Denied"}</CardTitle>
          <CardDescription>
            {description || t("unauthorized_description") || "You don't have permission to access this resource."}
          </CardDescription>
        </CardHeader>
        {showLoginButton && (
          <CardContent className="flex justify-center">
            <Button onClick={onLogin} variant="default">
              {t("login") || "Login"}
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
