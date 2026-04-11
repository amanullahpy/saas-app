"use client";

import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setMode } from "@/store/slices/theme.slice";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Moon, Sun, Smartphone } from "lucide-react";
import { appConfig } from "@/config/app.config";
import { LanguageSwitcher } from "@/ui/components/LanguageSwitcher";

export function PreferencesSettings() {
  const t = useTranslations("common");
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.mode);

  return (
    <div className="space-y-6">
      <Card className="border-none bg-card shadow-sm transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle>{t("appearance")}</CardTitle>
          <CardDescription>
            Customize how {appConfig.name} looks on your device.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>{t("theme_mode")}</Label>
            <RadioGroup
              value={theme}
              onValueChange={(val) => dispatch(setMode(val as "light" | "dark"))}
              className="grid grid-cols-1 gap-3 sm:grid-cols-3"
            >
              <div>
                <RadioGroupItem value="light" id="light" className="sr-only" />
                <Label
                  htmlFor="light"
                  className="flex cursor-pointer flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Sun className="mb-3 h-6 w-6" />
                  {t("theme_light")}
                </Label>
              </div>
              <div>
                <RadioGroupItem value="dark" id="dark" className="sr-only" />
                <Label
                  htmlFor="dark"
                  className="flex cursor-pointer flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Moon className="mb-3 h-6 w-6" />
                  {t("theme_dark")}
                </Label>
              </div>
              <div>
                <RadioGroupItem value="system" id="system" className="sr-only" disabled />
                <Label
                  htmlFor="system"
                  className="flex cursor-not-allowed flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 opacity-50"
                >
                  <Smartphone className="mb-3 h-6 w-6" />
                  {t("theme_system")}
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>{t("language")}</Label>
            <LanguageSwitcher variant="default" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
