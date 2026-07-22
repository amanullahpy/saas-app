import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Calistoga } from "next/font/google";
import { appConfig } from "@/config/app.config";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const calistoga = Calistoga({
  weight: "400",
  variable: "--font-calistoga",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: appConfig.nameFull,
    template: `%s | ${appConfig.name}`,
  },
  description: appConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL(appConfig.siteUrl),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${inter.variable} ${mono.variable} ${calistoga.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
