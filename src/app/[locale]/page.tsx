import { redirect } from "next/navigation";
import { appConfig } from "@/config/app.config";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function LocaleHomePage({ params }: PageProps) {
  const { locale } = await params;
  redirect(`/${locale}${appConfig.landingPath}`);
}
