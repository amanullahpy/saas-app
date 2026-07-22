"use client";

import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { userAppSidebarSections } from "@/config/navigation";
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
import { LogOut, User, Shield } from "lucide-react";
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

export function AppSidebar() {
  const pathname = usePathname();
  const t = useTranslations("common");
  const ta = useTranslations("auth");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const profile = useSelector((s: RootState) => s.user.profile);
  const isAdmin = profile?.role === "admin";
  const isRtl = useRtl();

  const visibleHrefList = useMemo(() => {
    const flat = userAppSidebarSections.flatMap((s) => s.items);
    const hrefs = flat.map((i) => i.href);
    return isAdmin ? [...hrefs, ROUTES.ADMIN] : hrefs;
  }, [isAdmin]);

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
    <Sidebar
      side={isRtl ? "right" : "left"}
      dir={isRtl ? "rtl" : "ltr"}
      collapsible="icon"
    >
      <SidebarHeader className="flex h-14 shrink-0 items-center justify-center border-b border-border/60 px-3 sm:h-16">
        <div className="flex items-center gap-2.5 group-data-[collapsible=icon]:justify-center">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0052FF] to-[#4D7CFF] text-base font-bold text-white shadow-accent">
            {appConfig.name.charAt(0)}
          </div>
          <span className="truncate text-xl font-heading tracking-tight text-foreground group-data-[collapsible=icon]:hidden">
            {appConfig.name}
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="min-h-0 gap-0">
        <ScrollArea className="flex-1 pe-1">
          <div className="flex flex-col gap-4 pb-4">
            {isAdmin ? (
              <SidebarGroup className="p-2">
                <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden px-2 font-mono text-[10px] font-semibold tracking-[0.15em] text-muted-foreground/80 uppercase">
                  {t("nav_section_administration")}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="gap-0.5">
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={activeHref === ROUTES.ADMIN}
                        tooltip={t("open_admin_console")}
                        className={cn(
                          "h-9 rounded-xl transition-all duration-200 sm:h-10",
                          activeHref === ROUTES.ADMIN && "bg-primary/10 font-semibold text-primary shadow-xs"
                        )}
                      >
                        <Link href={ROUTES.ADMIN} className="flex items-center gap-3">
                          <Shield
                            className={cn(
                              "size-[18px] shrink-0 stroke-[1.75] sm:size-5 transition-transform duration-200",
                              activeHref === ROUTES.ADMIN ? "text-primary scale-110" : "text-muted-foreground"
                            )}
                            aria-hidden
                          />
                          <span className="truncate">{t("open_admin_console")}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ) : null}
            {userAppSidebarSections.map((section) => (
              <SidebarGroup key={section.id} className="p-2">
                <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden px-2 font-mono text-[10px] font-semibold tracking-[0.15em] text-muted-foreground/80 uppercase">
                  {t(section.labelKey)}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="gap-0.5">
                    {section.items.map((item) => {
                      const active = activeHref === item.href;
                      return (
                        <SidebarMenuItem key={item.id}>
                          <SidebarMenuButton
                            asChild
                            isActive={active}
                            tooltip={t(item.id)}
                            className={cn(
                              "h-9 rounded-xl transition-all duration-200 sm:h-10 hover:translate-x-0.5",
                              active && "bg-primary/10 font-semibold text-primary shadow-xs"
                            )}
                          >
                            <Link href={item.href} className="flex items-center gap-3">
                              <item.icon
                                className={cn(
                                  "size-[18px] shrink-0 stroke-[1.75] sm:size-5 transition-all duration-200",
                                  active ? "text-primary scale-110" : "text-muted-foreground"
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
                <LogOut className="mr-2 h-4 w-4 stroke-[1.5]" />
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
