"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { resetPasswordSchema, ResetPasswordValues } from "../validation/reset";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { AuthInput } from "../components/AuthInput";
import { Loader2, Eye, EyeOff, Lock, ShieldCheck, CheckCircle2, AlertTriangle } from "lucide-react";
import { Link } from "@/i18n/routing";
import { ROUTES } from "@/config/routes";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

type Props = { token?: string };

export function ResetPasswordForm({ token }: Props) {
  const t = useTranslations("auth");
  const [isLoading, setIsLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  async function onSubmit(values: ResetPasswordValues) {
    if (!token) return;
    setIsLoading(true);
    console.log({ ...values, token });
    await new Promise((r) => setTimeout(r, 1200));
    setIsLoading(false);
    setDone(true);
    toast.success(t("toast_reset_success"));
  }

  // No token
  if (!token) {
    return (
      <div
        role="alert"
        className="flex flex-col items-center gap-5 rounded-2xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20 px-6 py-8 text-center"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
          <AlertTriangle className="h-7 w-7 text-red-500 dark:text-red-400" />
        </div>
        <div className="space-y-1.5">
          <p className="font-semibold text-red-700 dark:text-red-400">{t("reset_invalid_title")}</p>
          <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
            {t("reset_invalid_description")}
          </p>
        </div>
        <Link href={ROUTES.AUTH_FORGOT_PASSWORD}>
          <Button variant="outline" size="sm" className="rounded-xl border-neutral-300 dark:border-neutral-600">
            {t("request_new_link")}
          </Button>
        </Link>
      </div>
    );
  }

  // Success
  if (done) {
    return (
      <div className="flex flex-col items-center gap-5 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50 px-6 py-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
          <CheckCircle2 className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div className="space-y-1.5">
          <p className="font-semibold text-neutral-900 dark:text-neutral-100">{t("reset_success_title")}</p>
          <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
            {t("reset_success_description")}
          </p>
        </div>
        <Link href={ROUTES.AUTH_LOGIN}>
          <Button size="sm" className="rounded-xl">{t("back_to_login")}</Button>
        </Link>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>

        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem className="space-y-1.5">
              <FormLabel className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {t("password")}
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" />
                  <AuthInput
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder={t("placeholder_new_password")}
                    {...field}
                    aria-invalid={!!fieldState.error}
                    className="pl-10 pr-11"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-neutral-400 transition-colors hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <FormItem className="space-y-1.5">
              <FormLabel className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {t("confirm_password")}
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <ShieldCheck className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" />
                  <AuthInput
                    type={showConfirm ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder={t("placeholder_confirm_new_password")}
                    {...field}
                    aria-invalid={!!fieldState.error}
                    className="pl-10 pr-11"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-neutral-400 transition-colors hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className={cn("h-11 w-full rounded-xl text-sm font-semibold tracking-wide", isLoading && "opacity-75")}
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {t("reset_password_submit")}
        </Button>
      </form>
    </Form>
  );
}
