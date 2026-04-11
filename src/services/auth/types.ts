/** Shared auth types — same shape as Redux `user.profile` so UI stays unchanged when swapping drivers. */

export type UserRole = "admin" | "user" | "guest";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
}

export type AuthErrorCode =
  | "INVALID_CREDENTIALS"
  | "EMAIL_EXISTS"
  | "NETWORK"
  | "NOT_IMPLEMENTED"
  | "UNKNOWN";

export interface AuthResult {
  ok: boolean;
  user?: UserProfile;
  errorCode?: AuthErrorCode;
  message?: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthClient {
  signIn(credentials: SignInCredentials): Promise<AuthResult>;
  signUp(credentials: SignUpCredentials): Promise<AuthResult>;
  signOut(): void;
}
