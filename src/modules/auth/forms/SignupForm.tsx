"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { signupSchema, SignupFormValues } from "../validation/signup";
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
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { ContinueWithGoogleButton } from "../components/ContinueWithGoogleButton";
import { AuthSocialDivider } from "../components/AuthSocialDivider";
import { getAuthClient } from "@/services/auth/client";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { setUser } from "@/store/slices/user.slice";
import { useRouter } from "@/i18n/routing";
import { ROUTES } from "@/config/routes";
import { toast } from "@/lib/toast";

export function SignupForm() {
  const t = useTranslations("auth");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: SignupFormValues) {
    setIsLoading(true);
    const client = getAuthClient();
    const result = await client.signUp({
      name: values.name,
      email: values.email,
      password: values.password,
    });
    setIsLoading(false);

    if (!result.ok || !result.user) {
      if (result.errorCode === "EMAIL_EXISTS") {
        toast.error(t("error_email_exists"));
      } else if (result.errorCode === "NOT_IMPLEMENTED") {
        toast.error(result.message ?? t("error_not_implemented"));
      } else {
        toast.error(t("error_generic"));
      }
      return;
    }

    dispatch(setUser(result.user));
    toast.success(t("toast_signup_success"));
    router.push(ROUTES.DASHBOARD);
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("name")}</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="name" className="h-11 min-h-11" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("email")}</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="email" className="h-11 min-h-11" />
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
                <FormLabel>{t("password")}</FormLabel>
                <FormControl>
                  <Input type="password" {...field} autoComplete="new-password" className="h-11 min-h-11" />
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
                  <Input type="password" {...field} autoComplete="new-password" className="h-11 min-h-11" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="h-11 w-full min-h-11" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {t("signup_submit")}
          </Button>
        </form>
      </Form>

      <AuthSocialDivider />
      <ContinueWithGoogleButton />
    </div>
  );
}
