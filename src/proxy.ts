import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

/** Required by Next.js Node middleware: `default` must be the callable adapter. */
export default intlMiddleware;

/** Same handler under the name Next looks up: `middlewareModule.proxy` */
export const proxy = intlMiddleware;

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
