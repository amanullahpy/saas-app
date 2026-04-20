import { SignupForm } from "@/modules/auth/forms/SignupForm";
import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ROUTES } from "@/config/routes";
import { authConfig } from "@/config/auth";

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
      <div className="space-y-2">
        <h1 className="text-[1.75rem] font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          {t("signup")}
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {t("signup_description")}
        </p>
      </div>

      {/* Form card */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700/60 bg-white dark:bg-neutral-900 p-6 shadow-sm sm:p-8">
        <SignupForm />
      </div>

      {/* Mock hint */}
      {authConfig.driver === "mock" && (
        <div className="rounded-xl border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-950/20 px-4 py-3">
          <p className="text-center text-xs leading-relaxed text-amber-700 dark:text-amber-400">
            {t("mock_hint")}
          </p>
        </div>
      )}

      {/* Footer */}
      <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
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
