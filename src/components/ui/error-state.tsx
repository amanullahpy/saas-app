import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

export function ErrorState({ 
  title, 
  description, 
  onRetry, 
  showRetry = true 
}: ErrorStateProps) {
  const t = useTranslations("common");

  return (
    <Card className="border-destructive/50">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle className="h-6 w-6 text-destructive" />
        </div>
        <CardTitle>{title || t("error_title") || "Something went wrong"}</CardTitle>
        <CardDescription>
          {description || t("error_description") || "An error occurred while loading the data. Please try again."}
        </CardDescription>
      </CardHeader>
      {showRetry && (
        <CardContent className="flex justify-center">
          <Button onClick={onRetry} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            {t("retry") || "Try Again"}
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
