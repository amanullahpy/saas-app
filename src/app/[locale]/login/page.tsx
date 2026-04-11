import { redirect } from "next/navigation";

/** Common mistake: `/en/login` — real route is `/en/auth/login`. */
export default async function LoginAliasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(`/${locale}/auth/login`);
}
