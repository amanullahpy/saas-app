import { authConfig, mockSeedUsers } from "@/config/auth";
import { upsertMockUser, getMockRegistry } from "./mock.storage";
import { clearSessionStorage, saveSessionToStorage } from "./session.storage";
import type { AuthClient, AuthResult, SignInCredentials, SignUpCredentials, UserProfile } from "./types";

function toProfile(seed: (typeof mockSeedUsers)[number]): UserProfile {
  return {
    id: seed.id,
    name: seed.name,
    email: seed.email,
    avatar: seed.avatar,
    role: seed.role,
  };
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function findUser(email: string, password: string): UserProfile | null {
  const e = email.toLowerCase().trim();
  const seed = mockSeedUsers.find((u) => u.email.toLowerCase() === e && u.password === password);
  if (seed) return toProfile(seed);
  const reg = getMockRegistry()[e];
  if (reg && reg.password === password) return reg.profile;
  return null;
}

function emailTaken(email: string): boolean {
  const e = email.toLowerCase().trim();
  if (mockSeedUsers.some((u) => u.email.toLowerCase() === e)) return true;
  return !!getMockRegistry()[e];
}

export const mockAuthClient: AuthClient = {
  async signIn(creds: SignInCredentials): Promise<AuthResult> {
    await delay(authConfig.mockDelayMs);
    const user = findUser(creds.email, creds.password);
    if (!user) return { ok: false, errorCode: "INVALID_CREDENTIALS" };
    saveSessionToStorage(user);
    return { ok: true, user };
  },

  async signUp(creds: SignUpCredentials): Promise<AuthResult> {
    await delay(authConfig.mockDelayMs);
    if (emailTaken(creds.email)) return { ok: false, errorCode: "EMAIL_EXISTS" };
    const profile: UserProfile = {
      id: `u-${Date.now()}`,
      name: creds.name.trim(),
      email: creds.email.toLowerCase().trim(),
      avatar: "",
      role: "user",
    };
    upsertMockUser(profile.email, { password: creds.password, profile });
    saveSessionToStorage(profile);
    return { ok: true, user: profile };
  },

  signOut() {
    clearSessionStorage();
  },
};
