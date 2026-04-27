"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { forgotPasswordSchema, ForgotPasswordValues } from "../validation/forgot";
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
import { Loader2, Mail, CheckCircle2 } from "lucide-react";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

export function ForgotPasswordForm() {
  const t = useTranslations("auth");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: ForgotPasswordValues) {
    setIsLoading(true);
    console.log(values);
    await new Promise((r) => setTimeout(r, 1200));
    setIsLoading(false);
    setSent(true);
    toast.success(t("toast_forgot_success"));
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-5 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50 px-6 py-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
          <CheckCircle2 className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div className="space-y-1.5">
          <p className="font-semibold text-neutral-900 dark:text-neutral-100">{t("forgot_success_title")}</p>
          <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
            {t("forgot_success_description")}
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-xl border-neutral-300 dark:border-neutral-600"
          onClick={() => { setSent(false); form.reset(); }}
        >
          {t("try_different_email")}
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem className="space-y-1.5">
              <FormLabel className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {t("email")}
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" />
                  <AuthInput
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder={t("placeholder_email")}
                    {...field}
                    aria-invalid={!!fieldState.error}
                    className="pl-10"
                  />
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
          {t("send_reset_link")}
        </Button>
      </form>
    </Form>
  );
}
