import { LoginForm } from "@/modules/auth/forms/LoginForm";
import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ROUTES } from "@/config/routes";
import { authConfig } from "@/config/auth";
import { appConfig } from "@/config/app.config";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("auth");

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo/Brand */}
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-xl font-semibold text-primary-foreground">
            {appConfig.name.charAt(0)}
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {t("login")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("login_description")}
          </p>
        </div>

        {/* Form card */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-lg sm:p-8">
          <LoginForm />
        </div>

        {/* Mock hint */}
        {authConfig.driver === "mock" && (
          <div className="rounded-xl border border-amber-200/50 dark:border-amber-800/30 bg-amber-50/50 dark:bg-amber-950/10 px-4 py-3">
            <p className="text-center text-xs leading-relaxed text-amber-700 dark:text-amber-400">
              {t("mock_hint")}
            </p>
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground">
          {t("no_account")}{" "}
          <Link
            href={ROUTES.AUTH_SIGNUP}
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            {t("signup")}
          </Link>
        </p>
      </div>
    </div>
  );
}
