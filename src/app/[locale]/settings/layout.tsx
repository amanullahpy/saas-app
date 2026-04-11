import { MainShell } from "@/ui/layout/MainShell";
import { SettingsSubnav } from "@/modules/settings/components/SettingsSubnav";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <MainShell>
      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        <SettingsSubnav />
        {children}
      </div>
    </MainShell>
  );
}
