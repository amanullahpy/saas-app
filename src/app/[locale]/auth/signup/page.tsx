import { SignupForm } from "@/modules/auth/forms/SignupForm";
import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ROUTES } from "@/config/routes";
import { authConfig } from "@/config/auth";
import { SectionLabel } from "@/components/ui/section-label";
import { Sparkles } from "lucide-react";

export default async function SignupPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("auth");

  return (
    <div className="w-full space-y-8">
      {/* Heading */}
      <div className="space-y-3">
        <SectionLabel pulse>Create Account</SectionLabel>
        <h1 className="text-3xl sm:text-4xl font-heading tracking-tight text-foreground">
          {t("signup")}
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t("signup_description")}
        </p>
      </div>

      {/* Form card */}
      <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xl sm:p-8 space-y-6">
        <SignupForm />
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

      {/* Footer */}
      <p className="text-center text-sm text-muted-foreground">
        {t("have_account")}{" "}
        <Link
          href={ROUTES.AUTH_LOGIN}
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          {t("login")}
        </Link>
      </p>
    </div>
  );
}
