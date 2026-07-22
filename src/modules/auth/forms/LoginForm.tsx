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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Loader2, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Link, useRouter } from "@/i18n/routing";
import { ROUTES } from "@/config/routes";
import { ContinueWithGoogleButton } from "../components/ContinueWithGoogleButton";
import { AuthSocialDivider } from "../components/AuthSocialDivider";
import { AuthInput } from "../components/AuthInput";
import { getAuthClient } from "@/services/auth/client";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { setUser } from "@/store/slices/user.slice";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

export function LoginForm() {
  const t = useTranslations("auth");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
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
    <div className="space-y-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-sm font-medium text-foreground">
                  {t("email")}
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <AuthInput
                      placeholder={t("placeholder_email")}
                      {...field}
                      autoComplete="email"
                      inputMode="email"
                      aria-invalid={!!fieldState.error}
                      className="pl-10"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs text-destructive" />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <FormLabel className="text-sm font-medium text-foreground">
                    {t("password")}
                  </FormLabel>
                  <Link
                    href={ROUTES.AUTH_FORGOT_PASSWORD}
                    className="text-xs font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {t("forgot_password")}
                  </Link>
                </div>
                <FormControl>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <AuthInput
                      type={showPassword ? "text" : "password"}
                      placeholder={t("placeholder_password")}
                      {...field}
                      autoComplete="current-password"
                      aria-invalid={!!fieldState.error}
                      className="pl-10 pr-11"
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-xs text-destructive" />
              </FormItem>
            )}
          />

          {/* Remember me */}
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2.5 space-y-0 pt-0.5">
                <FormControl>
                  <Checkbox
                    id="rememberMe"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel
                  htmlFor="rememberMe"
                  className="cursor-pointer text-sm font-normal text-muted-foreground"
                >
                  {t("remember_me")}
                </FormLabel>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className={cn(
              "h-11 w-full rounded-xl text-sm font-semibold tracking-wide",
              isLoading && "opacity-75"
            )}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t("submit")}
          </Button>
        </form>
      </Form>

      <AuthSocialDivider />
      <ContinueWithGoogleButton />
    </div>
  );
}
