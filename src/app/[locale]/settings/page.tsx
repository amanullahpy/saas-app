import { MainShell } from "@/ui/layout/MainShell";
import { ProfileSettings } from "@/modules/settings/components/ProfileSettings";
import { PreferencesSettings } from "@/modules/settings/components/PreferencesSettings";
import { setRequestLocale } from "next-intl/server";

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <MainShell>
      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Settings
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage your account settings and preferences.
          </p>
        </div>
        
        <div className="grid gap-6">
          <ProfileSettings />
          <PreferencesSettings />
        </div>
      </div>
    </MainShell>
  );
}
