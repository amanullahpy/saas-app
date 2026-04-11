import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

const handleRequest = createMiddleware(routing);

export default function middleware(request: any) {
  return handleRequest(request);
}

export const config = {
  matcher: ["/", "/(en|ur)/:path*"],
};
