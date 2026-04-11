import { clearSessionStorage } from "./session.storage";
import type { AuthClient, AuthResult, SignInCredentials, SignUpCredentials } from "./types";

/**
 * Replace this implementation with Supabase, REST, or tRPC calls.
 * `getAuthClient()` returns this when `NEXT_PUBLIC_AUTH_DRIVER=http`.
 */
export const httpAuthClient: AuthClient = {
  async signIn(_creds: SignInCredentials): Promise<AuthResult> {
    return {
      ok: false,
      errorCode: "NOT_IMPLEMENTED",
      message: "Wire your API in src/services/auth/http.provider.ts (signIn).",
    };
  },

  async signUp(_creds: SignUpCredentials): Promise<AuthResult> {
    return {
      ok: false,
      errorCode: "NOT_IMPLEMENTED",
      message: "Wire your API in src/services/auth/http.provider.ts (signUp).",
    };
  },

  signOut() {
    clearSessionStorage();
    /* revoke refresh tokens / Supabase signOut here */
  },
};
