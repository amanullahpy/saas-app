import { supabase } from "@/lib/supabase";
import { clearSessionStorage } from "./session.storage";
import type { AuthClient, AuthResult, SignInCredentials, SignUpCredentials, UserProfile } from "./types";

export const httpAuthClient: AuthClient = {
  async signIn({ email, password }: SignInCredentials): Promise<AuthResult> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        ok: false,
        errorCode: error.status === 400 ? "INVALID_CREDENTIALS" : "UNKNOWN",
        message: error.message,
      };
    }

    if (!data.user) {
      return { ok: false, errorCode: "UNKNOWN" };
    }

    // Fetch profile from our public.profiles table
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .single();

    const user: UserProfile = {
      id: data.user.id,
      email: data.user.email || "",
      name: profile?.name || data.user.user_metadata?.name || "User",
      avatar: profile?.avatar_url || data.user.user_metadata?.avatar_url || "",
      role: (profile?.role as any) || "user",
    };

    return { ok: true, user };
  },

  async signUp({ email, password, name }: SignUpCredentials): Promise<AuthResult> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (error) {
      return {
        ok: false,
        errorCode: error.status === 400 ? "EMAIL_EXISTS" : "UNKNOWN",
        message: error.message,
      };
    }

    if (!data.user) {
      return { ok: false, errorCode: "UNKNOWN" };
    }

    const user: UserProfile = {
      id: data.user.id,
      email: data.user.email || "",
      name: name,
      avatar: "",
      role: "user",
    };

    return { ok: true, user };
  },

  async signOut() {
    await supabase.auth.signOut();
    clearSessionStorage();
  },
};
