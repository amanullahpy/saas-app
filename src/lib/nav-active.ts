/** Pick the most specific matching route so `/admin/users` does not also highlight `/admin`. */
export function findBestNavMatch(pathname: string, hrefs: string[]): string | null {
  const sorted = [...new Set(hrefs)].sort((a, b) => b.length - a.length);
  for (const h of sorted) {
    if (pathname === h || pathname.startsWith(`${h}/`)) return h;
  }
  return null;
}
