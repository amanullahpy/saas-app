import { LoginForm } from "@/modules/auth/forms/LoginForm";
import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ROUTES } from "@/config/routes";
import { authConfig } from "@/config/auth";
import { SectionLabel } from "@/components/ui/section-label";
import { Sparkles } from "lucide-react";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("auth");

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="space-y-3 text-start">
        <SectionLabel pulse>Secure Login</SectionLabel>
        <h1 className="text-3xl sm:text-4xl font-heading tracking-tight text-foreground">
          {t("login")}
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t("login_description")}
        </p>
      </div>

      {/* Form Card */}
      <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xl sm:p-8 space-y-6">
        <LoginForm />
      </div>

      {/* Mock hint */}
      {authConfig.driver === "mock" && (
        <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 flex items-start gap-2.5">
          <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <p className="text-xs leading-relaxed text-foreground/80">
            {t("mock_hint")}
          </p>
        </div>
      )}

      {/* Footer link */}
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
  );
}
