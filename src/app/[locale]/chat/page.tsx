import { MainShell } from "@/ui/layout/MainShell";
import { ChatInterface } from "@/modules/chat/components/ChatInterface";
import { appConfig } from "@/config/app.config";
import { setRequestLocale } from "next-intl/server";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <MainShell>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            AI Assistant
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Powered by {appConfig.name} AI — real-time streaming and code block support.
          </p>
        </div>
        
        <ChatInterface />
      </div>
    </MainShell>
  );
}
