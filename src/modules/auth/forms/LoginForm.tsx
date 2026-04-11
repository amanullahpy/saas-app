"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { loginSchema, LoginFormValues } from "../validation/login";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Link, useRouter } from "@/i18n/routing";
import { ROUTES } from "@/config/routes";
import { ContinueWithGoogleButton } from "../components/ContinueWithGoogleButton";
import { AuthSocialDivider } from "../components/AuthSocialDivider";
import { getAuthClient } from "@/services/auth/client";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { setUser } from "@/store/slices/user.slice";
import { toast } from "@/lib/toast";

export function LoginForm() {
  const t = useTranslations("auth");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true);
    const client = getAuthClient();
    const result = await client.signIn({ email: values.email, password: values.password });
    setIsLoading(false);

    if (!result.ok || !result.user) {
      if (result.errorCode === "NOT_IMPLEMENTED") {
        toast.error(result.message ?? t("error_not_implemented"));
      } else {
        toast.error(t("error_invalid_credentials"));
      }
      return;
    }

    dispatch(setUser(result.user));
    toast.success(t("toast_login_success"));
    router.push(result.user.role === "admin" ? ROUTES.ADMIN : ROUTES.DASHBOARD);
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("email")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name@example.com"
                    {...field}
                    autoComplete="email"
                    className="h-11 min-h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <FormLabel className="mb-0">{t("password")}</FormLabel>
                  <Link
                    href={ROUTES.AUTH_FORGOT_PASSWORD}
                    className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {t("forgot_password")}
                  </Link>
                </div>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    {...field}
                    autoComplete="current-password"
                    className="h-11 min-h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start gap-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-normal">{t("remember_me")}</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" className="h-11 w-full min-h-11" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {t("submit")}
          </Button>
        </form>
      </Form>

      <AuthSocialDivider />
      <ContinueWithGoogleButton />
    </div>
  );
}
