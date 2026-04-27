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
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2, Eye, EyeOff, User, Mail, Lock, ShieldCheck } from "lucide-react";
import { ContinueWithGoogleButton } from "../components/ContinueWithGoogleButton";
import { AuthSocialDivider } from "../components/AuthSocialDivider";
import { AuthInput } from "../components/AuthInput";
import { getAuthClient } from "@/services/auth/client";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { setUser } from "@/store/slices/user.slice";
import { useRouter } from "@/i18n/routing";
import { ROUTES } from "@/config/routes";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

// ─── Password strength ─────────────────────────────────────────────────────────
type StrengthLevel = 0 | 1 | 2 | 3 | 4;

function getStrength(pw: string): StrengthLevel {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 8) s++;
  if (pw.length >= 12) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return Math.min(4, s) as StrengthLevel;
}

const STRENGTH_META: Record<
  StrengthLevel,
  { label: string; barColor: string; textColor: string }
> = {
  0: { label: "", barColor: "bg-neutral-200 dark:bg-neutral-700", textColor: "" },
  1: { label: "Weak", barColor: "bg-red-400", textColor: "text-red-500" },
  2: { label: "Fair", barColor: "bg-orange-400", textColor: "text-orange-500" },
  3: { label: "Good", barColor: "bg-yellow-400", textColor: "text-yellow-600 dark:text-yellow-400" },
  4: { label: "Strong", barColor: "bg-emerald-500", textColor: "text-emerald-600 dark:text-emerald-400" },
};

function PasswordStrength({ password }: { password: string }) {
  const t = useTranslations("auth");
  const score = getStrength(password);
  if (!password) return null;

  const labels = {
    1: t("password_strength.weak"),
    2: t("password_strength.fair"),
    3: t("password_strength.good"),
    4: t("password_strength.strong"),
  };

  const colors = {
    1: { bar: "bg-red-400", text: "text-red-500" },
    2: { bar: "bg-orange-400", text: "text-orange-500" },
    3: { bar: "bg-yellow-400", text: "text-yellow-600 dark:text-yellow-400" },
    4: { bar: "bg-emerald-500", text: "text-emerald-600 dark:text-emerald-400" },
  };

  const label = labels[score as keyof typeof labels] || "";
  const color = colors[score as keyof typeof colors] || { bar: "bg-neutral-200", text: "" };

  return (
    <div className="space-y-1.5 pt-1.5">
      <div className="flex gap-1">
        {([1, 2, 3, 4] as StrengthLevel[]).map((i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-all duration-300",
              i <= score ? color.bar : "bg-neutral-200 dark:bg-neutral-700"
            )}
          />
        ))}
      </div>
      {label && (
        <p className={cn("text-xs font-medium", color.text)}>
          {label} {t("password_strength.suffix")}
        </p>
      )}
    </div>
  );
}

// ─── Form ──────────────────────────────────────────────────────────────────────
export function SignupForm() {
  const t = useTranslations("auth");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const passwordValue = form.watch("password");

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
    <div className="space-y-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>

          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {t("name")}
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" />
                    <AuthInput
                      placeholder={t("placeholder_name")}
                      {...field}
                      autoComplete="name"
                      aria-invalid={!!fieldState.error}
                      className="pl-10"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          {/* Email */}
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
                      placeholder={t("placeholder_email")}
                      {...field}
                      autoComplete="email"
                      inputMode="email"
                      aria-invalid={!!fieldState.error}
                      className="pl-10"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          {/* Password */}
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
                      placeholder={t("placeholder_password_min")}
                      {...field}
                      autoComplete="new-password"
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
                <PasswordStrength password={passwordValue} />
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          {/* Confirm password */}
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
                      placeholder={t("placeholder_confirm_password")}
                      {...field}
                      autoComplete="new-password"
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
            className={cn(
              "h-11 w-full rounded-xl text-sm font-semibold tracking-wide",
              isLoading && "opacity-75"
            )}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t("signup_submit")}
          </Button>
        </form>
      </Form>

      <AuthSocialDivider />
      <ContinueWithGoogleButton />
    </div>
  );
}
