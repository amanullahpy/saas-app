"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { ROUTES } from "@/config/routes";
import type { RootState } from "@/store/store";
import { loadSessionFromStorage } from "@/services/auth/session.storage";
import { toast } from "@/lib/toast";
import { Loader2 } from "lucide-react";

function effectiveProfile(state: RootState["user"]["profile"]) {
  return state ?? loadSessionFromStorage();
}

/** Allows only `role === "admin"` on wrapped routes; guests go to login, users to dashboard. */
export function AdminRouteGuard({ children }: { children: ReactNode }) {
  const profile = useSelector((s: RootState) => s.user.profile);
  const router = useRouter();
  const t = useTranslations("auth");
  const warned = useRef(false);

  useEffect(() => {
    const p = effectiveProfile(profile);
    if (!p) {
      router.replace(ROUTES.AUTH_LOGIN);
      return;
    }
    if (p.role !== "admin") {
      if (!warned.current) {
        warned.current = true;
        toast.error(t("toast_admin_only"));
      }
      router.replace(ROUTES.DASHBOARD);
    }
  }, [profile, router, t]);

  const p = effectiveProfile(profile);
  if (!p || p.role !== "admin") {
    return (
      <div className="flex min-h-[50vh] w-full items-center justify-center" aria-busy="true">
        <Loader2 className="size-8 animate-spin text-muted-foreground" aria-hidden />
      </div>
    );
  }

  return <>{children}</>;
}
