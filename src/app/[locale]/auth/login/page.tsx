import { LoginForm } from "@/modules/auth/forms/LoginForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { appConfig } from "@/config/app.config";
import { ROUTES } from "@/config/routes";
import { authConfig } from "@/config/auth";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("auth");
  const tc = await getTranslations("common");

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      <div className="flex flex-col items-center gap-2 px-1 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground shadow-lg shadow-primary/20 sm:h-14 sm:w-14 sm:text-3xl">
          {appConfig.name.charAt(0)}
        </div>
        <h1 className="text-balance text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {tc("product_title")}
        </h1>
        <p className="max-w-sm text-pretty text-sm text-muted-foreground">{t("login_tagline")}</p>
      </div>

      <Card className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xl shadow-foreground/5 sm:rounded-3xl">
        <CardHeader className="space-y-1 pb-2 sm:pb-4">
          <CardTitle className="text-lg sm:text-xl">{t("login")}</CardTitle>
          <CardDescription className="text-sm">{t("login_description")}</CardDescription>
        </CardHeader>
        <CardContent className="pb-6 sm:pb-8">
          <LoginForm />
        </CardContent>
      </Card>

      {authConfig.driver === "mock" ? (
        <p className="text-center text-xs leading-relaxed text-muted-foreground">{t("mock_hint")}</p>
      ) : null}

      <p className="text-center text-sm text-muted-foreground">
        {t("no_account")}{" "}
        <Link href={ROUTES.AUTH_SIGNUP} className="font-medium text-primary hover:underline">
          {t("signup")}
        </Link>
      </p>
    </div>
  );
}
