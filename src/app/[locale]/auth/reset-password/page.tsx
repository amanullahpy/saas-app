import { ResetPasswordForm } from "@/modules/auth/forms/ResetPasswordForm";
import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ROUTES } from "@/config/routes";
import { ArrowLeft } from "lucide-react";

export default async function ResetPasswordPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { token } = await searchParams;
  const t = await getTranslations("auth");

  return (
    <div className="w-full space-y-8">
      {/* Back */}
      <Link
        href={ROUTES.AUTH_LOGIN}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {t("back_to_login")}
      </Link>

      {/* Heading */}
      <div className="space-y-2">
        <h1 className="text-[1.75rem] font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          {t("reset_title")}
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {t("reset_description")}
        </p>
      </div>

      {/* Form card */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700/60 bg-white dark:bg-neutral-900 p-6 shadow-sm sm:p-8">
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}
