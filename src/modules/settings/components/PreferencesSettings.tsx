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
      <Card className="border border-border/80 bg-card shadow-sm hover:shadow-lg transition-all duration-300">
        <CardHeader className="border-b border-border/40 pb-4 text-start">
          <CardTitle className="text-xl font-heading text-foreground">{t("appearance")}</CardTitle>
          <CardDescription className="text-sm leading-relaxed">
            Customize how {appConfig.name} looks on your device.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6 text-start">
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">{t("theme_mode")}</Label>
            <RadioGroup
              value={theme}
              onValueChange={(val) => dispatch(setMode(val as "light" | "dark"))}
              className="grid grid-cols-1 gap-4 sm:grid-cols-3"
            >
              <div>
                <RadioGroupItem value="light" id="light" className="sr-only" />
                <Label
                  htmlFor="light"
                  className="flex cursor-pointer flex-col items-center justify-between rounded-xl border-2 border-border/60 bg-card p-5 hover:border-primary/40 hover:bg-primary/5 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all"
                >
                  <Sun className="mb-3 h-6 w-6 text-primary" />
                  <span className="font-heading font-semibold text-sm">{t("theme_light")}</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="dark" id="dark" className="sr-only" />
                <Label
                  htmlFor="dark"
                  className="flex cursor-pointer flex-col items-center justify-between rounded-xl border-2 border-border/60 bg-card p-5 hover:border-primary/40 hover:bg-primary/5 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all"
                >
                  <Moon className="mb-3 h-6 w-6 text-primary" />
                  <span className="font-heading font-semibold text-sm">{t("theme_dark")}</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="system" id="system" className="sr-only" disabled />
                <Label
                  htmlFor="system"
                  className="flex cursor-not-allowed flex-col items-center justify-between rounded-xl border-2 border-border/40 bg-muted/40 p-5 opacity-50"
                >
                  <Smartphone className="mb-3 h-6 w-6 text-muted-foreground" />
                  <span className="font-heading font-semibold text-sm">{t("theme_system")}</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">{t("language")}</Label>
            <LanguageSwitcher variant="default" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
