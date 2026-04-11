"use client";

import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toggleMode } from "@/store/slices/theme.slice";
import { toggleSidebar } from "@/store/slices/app.slice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Bell,
  Menu,
  Moon,
  Search,
  Sun,
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function AppNavbar() {
  const t = useTranslations("common");
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.mode);

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b bg-background/95 backdrop-blur-sm sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1">
        <SidebarTrigger className="hover:bg-primary/10 transition-colors" />
        <div className="relative max-w-md w-full ml-4 hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder={t("search")} 
            className="pl-10 h-10 bg-muted/50 border-none shadow-none focus-visible:ring-1 focus-visible:ring-primary/20" 
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => dispatch(toggleMode())}
          className="rounded-full hover:bg-primary/10"
        >
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-primary/10 relative"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
        </Button>
      </div>
    </header>
  );
}
