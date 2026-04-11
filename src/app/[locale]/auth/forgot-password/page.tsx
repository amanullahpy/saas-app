import { ForgotPasswordForm } from "@/modules/auth/forms/ForgotPasswordForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { appConfig } from "@/config/app.config";
import { ROUTES } from "@/config/routes";

export default async function ForgotPasswordPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("auth");

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      <div className="flex flex-col items-center gap-2 px-1 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground shadow-lg shadow-primary/20 sm:h-14 sm:w-14 sm:text-3xl">
          {appConfig.name.charAt(0)}
        </div>
        <h1 className="text-balance text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {t("forgot_title")}
        </h1>
        <p className="max-w-sm text-pretty text-sm text-muted-foreground">{t("forgot_description")}</p>
      </div>

      <Card className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xl shadow-foreground/5 sm:rounded-3xl">
        <CardHeader className="space-y-1 pb-2 sm:pb-4">
          <CardTitle className="text-lg sm:text-xl">{t("forgot_card_title")}</CardTitle>
          <CardDescription className="text-sm">{t("forgot_card_description")}</CardDescription>
        </CardHeader>
        <CardContent className="pb-6 sm:pb-8">
          <ForgotPasswordForm />
        </CardContent>
      </Card>

      <p className="text-center text-sm text-muted-foreground">
        <Link href={ROUTES.AUTH_LOGIN} className="font-medium text-primary hover:underline">
          {t("back_to_login")}
        </Link>
      </p>
    </div>
  );
}
