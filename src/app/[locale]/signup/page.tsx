import { redirect } from "next/navigation";

/** Alias: `/en/signup` → `/en/auth/signup`. */
export default async function SignupAliasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(`/${locale}/auth/signup`);
}
