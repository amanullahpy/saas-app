import { supabase } from "@/lib/supabase";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  jobTitle?: string;
  bio?: string;
  phone?: string;
  avatarUrl?: string;
  role: string;
}

export interface UserSkills {
  frontendSkills: string[];
  fullstackSkills: string[];
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, name, email, role, bio, phone, avatar_url, preferences")
    .eq("id", userId)
    .single();

  if (error || !data) {
    console.error("Error fetching user profile:", error);
    return null;
  }

  return {
    id: data.id,
    name: data.name || "",
    email: data.email || "",
    jobTitle: data.preferences?.jobTitle || "",
    bio: data.bio || "",
    phone: data.phone || "",
    avatarUrl: data.avatar_url || "",
    role: data.role || "user",
  };
}

export async function updateUserProfile(
  userId: string,
  updates: Partial<{ name: string; email: string; jobTitle: string; bio: string; phone: string }>
): Promise<boolean> {
  const profileUpdates: Record<string, unknown> = {};
  if (updates.name !== undefined) profileUpdates.name = updates.name;
  if (updates.bio !== undefined) profileUpdates.bio = updates.bio;
  if (updates.phone !== undefined) profileUpdates.phone = updates.phone;

  if (updates.jobTitle !== undefined) {
    const { data: existing } = await supabase
      .from("profiles")
      .select("preferences")
      .eq("id", userId)
      .single();
    profileUpdates.preferences = {
      ...(existing?.preferences || {}),
      jobTitle: updates.jobTitle,
    };
  }

  const { error } = await supabase
    .from("profiles")
    .update(profileUpdates)
    .eq("id", userId);

  if (error) {
    console.error("Error updating profile:", error);
    return false;
  }
  return true;
}

export async function getUserSkills(userId: string): Promise<UserSkills> {
  const { data, error } = await supabase
    .from("profiles")
    .select("preferences")
    .eq("id", userId)
    .single();

  if (error || !data) {
    return { frontendSkills: [], fullstackSkills: [] };
  }

  return {
    frontendSkills: data.preferences?.frontendSkills || [],
    fullstackSkills: data.preferences?.fullstackSkills || [],
  };
}

export async function updateUserSkills(
  userId: string,
  skills: UserSkills
): Promise<boolean> {
  const { data: existing } = await supabase
    .from("profiles")
    .select("preferences")
    .eq("id", userId)
    .single();

  const { error } = await supabase
    .from("profiles")
    .update({
      preferences: {
        ...(existing?.preferences || {}),
        frontendSkills: skills.frontendSkills,
        fullstackSkills: skills.fullstackSkills,
      },
    })
    .eq("id", userId);

  if (error) {
    console.error("Error updating skills:", error);
    return false;
  }
  return true;
}
