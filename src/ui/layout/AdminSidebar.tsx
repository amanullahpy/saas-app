"use client";

import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { adminConsoleSidebarSections, type SidebarNavItem } from "@/config/navigation";
import { appConfig } from "@/config/app.config";
import { ROUTES } from "@/config/routes";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { getAuthClient } from "@/services/auth/client";
import type { AppDispatch, RootState } from "@/store/store";
import { logout } from "@/store/slices/user.slice";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { LogOut, User, ArrowLeft, Shield } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { findBestNavMatch } from "@/lib/nav-active";
import { useRtl } from "@/hooks/use-rtl";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function AdminSidebar() {
  const pathname = usePathname();
  const t = useTranslations("common");
  const ta = useTranslations("auth");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const profile = useSelector((s: RootState) => s.user.profile);
  const isRtl = useRtl();

  const visibleHrefList = useMemo(
    () => adminConsoleSidebarSections.flatMap((s) => s.items).map((i) => i.href),
    []
  );

  const activeHref = useMemo(
    () => findBestNavMatch(pathname, visibleHrefList),
    [pathname, visibleHrefList]
  );

  function handleSignOut() {
    getAuthClient().signOut();
    dispatch(logout());
    router.push(ROUTES.AUTH_LOGIN);
  }

  return (
    <Sidebar side={isRtl ? "right" : "left"} dir={isRtl ? "rtl" : "ltr"} collapsible="icon" className="bg-sidebar/95">
      <SidebarHeader className="flex shrink-0 flex-col gap-2 border-b border-border/60 px-2 py-2 min-h-14 sm:min-h-16 sm:py-3">
        <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/90 text-sm font-semibold text-primary-foreground">
            <Shield className="size-4 stroke-[1.75]" aria-hidden />
          </div>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <span className="block truncate text-[10px] font-medium tracking-wide text-muted-foreground uppercase sm:text-xs">
              {t("admin_console_badge")}
            </span>
            <span className="truncate text-lg font-semibold tracking-tight sm:text-xl">{appConfig.name}</span>
          </div>
        </div>
        <SidebarMenu className="group-data-[collapsible=icon]:hidden">
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="h-9 text-muted-foreground hover:text-foreground">
              <Link href={ROUTES.DASHBOARD} className="flex items-center gap-2">
                <ArrowLeft className="size-4 shrink-0 stroke-[1.5]" aria-hidden />
                <span className="truncate text-sm">{t("back_to_member_app")}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="min-h-0 gap-0">
        <ScrollArea className="flex-1 pe-1">
          <div className="flex flex-col gap-4 pb-4">
            {adminConsoleSidebarSections.map((section) => (
              <SidebarGroup key={section.id} className="p-2">
                <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden px-2 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                  {t(section.labelKey)}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="gap-0.5">
                    {section.items.map((item: SidebarNavItem) => {
                      const active = activeHref === item.href;
                      return (
                        <SidebarMenuItem key={item.id}>
                          <SidebarMenuButton
                            asChild
                            isActive={active}
                            tooltip={t(item.id)}
                            className={cn(
                              "h-9 transition-colors sm:h-10",
                              active && "bg-primary/10 font-medium text-primary"
                            )}
                          >
                            <Link href={item.href} className="flex items-center gap-3">
                              <item.icon
                                className={cn(
                                  "size-[18px] shrink-0 stroke-[1.5] sm:size-5",
                                  active ? "text-primary" : "text-muted-foreground"
                                )}
                                aria-hidden
                              />
                              <span className="truncate">{t(item.id)}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </div>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="shrink-0 border-t border-border/60 p-3 sm:p-4">
        {profile ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton size="lg" className="h-11 min-h-11 sm:h-12">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={profile.avatar || undefined} alt="" />
                  <AvatarFallback className="rounded-lg bg-muted text-muted-foreground text-xs">
                    {initials(profile.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="ms-3 grid min-w-0 flex-1 text-start text-sm leading-tight group-data-[collapsible=icon]:hidden">
                  <span className="truncate font-medium text-foreground">{profile.name}</span>
                  <span className="truncate text-xs text-muted-foreground">{profile.email}</span>
                  <span className="truncate text-[10px] font-medium tracking-wide text-muted-foreground/90 uppercase">
                    {profile.role}
                  </span>
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" side={isRtl ? "left" : "right"}>
              <DropdownMenuItem asChild>
                <Link href={ROUTES.SETTINGS} className="cursor-pointer">
                  <User className="me-2 h-4 w-4 stroke-[1.5] opacity-70" />
                  <span>{t("profile")}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-destructive focus:text-destructive"
                onClick={handleSignOut}
              >
                <LogOut className="me-2 h-4 w-4 stroke-[1.5]" />
                <span>{t("logout")}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant="outline" size="sm" className="h-10 w-full justify-center text-sm" asChild>
            <Link href={ROUTES.AUTH_LOGIN}>{ta("login")}</Link>
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
