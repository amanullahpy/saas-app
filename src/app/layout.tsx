/** Root pass-through layout; `<html>` / `<body>` live in `[locale]/layout.tsx`. */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
