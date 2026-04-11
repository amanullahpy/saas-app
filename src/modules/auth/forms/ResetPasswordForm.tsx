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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ContinueWithGoogleButton } from "../components/ContinueWithGoogleButton";
import { AuthSocialDivider } from "../components/AuthSocialDivider";
import { toast } from "@/lib/toast";

type Props = {
  token?: string;
};

export function ResetPasswordForm({ token }: Props) {
  const t = useTranslations("auth");
  const [isLoading, setIsLoading] = useState(false);

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
    toast.success(t("toast_reset_success"));
  }

  if (!token) {
    return (
      <div
        role="alert"
        className="rounded-xl border border-destructive/35 bg-destructive/5 p-4 text-sm shadow-sm"
      >
        <p className="font-semibold text-destructive">{t("reset_invalid_title")}</p>
        <p className="mt-1.5 leading-relaxed text-muted-foreground">{t("reset_invalid_description")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("password")}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    autoComplete="new-password"
                    className="h-11 min-h-11"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("confirm_password")}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    autoComplete="new-password"
                    className="h-11 min-h-11"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="h-11 w-full min-h-11" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {t("reset_password_submit")}
          </Button>
        </form>
      </Form>

      <AuthSocialDivider />
      <ContinueWithGoogleButton />
    </div>
  );
}
