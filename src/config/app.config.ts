import { publicEnv } from "./env";
import { ROUTES } from "./routes";

export const appConfig = {
  name: publicEnv.NEXT_PUBLIC_APP_NAME,
  nameFull: publicEnv.NEXT_PUBLIC_APP_NAME_FULL,
  description: publicEnv.NEXT_PUBLIC_APP_DESCRIPTION,
  siteUrl: publicEnv.NEXT_PUBLIC_SITE_URL,
  landingPath: publicEnv.NEXT_PUBLIC_LANDING_PATH,
  /** Default route segment after locale for authenticated home */
  defaultHomePath: ROUTES.DASHBOARD,
} as const;
