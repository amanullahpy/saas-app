import { authConfig } from "@/config/auth";
import { httpAuthClient } from "./http.provider";
import { mockAuthClient } from "./mock.provider";
import type { AuthClient } from "./types";

export function getAuthClient(): AuthClient {
  return authConfig.driver === "http" ? httpAuthClient : mockAuthClient;
}

export type { AuthClient, AuthResult, UserProfile, SignInCredentials, SignUpCredentials } from "./types";
