import { apiClient } from "./api-client";

export interface Profile {
  name: string;
  email: string;
  jobTitle?: string;
  location?: string;
  role?: string;
  avatar?: string;
}

export const profileService = {
  async getProfile(): Promise<Profile> {
    return apiClient.get<Profile>("/profile");
  },

  async updateProfile(data: Partial<Profile>): Promise<Profile> {
    return apiClient.patch<Profile>("/profile", data);
  },

  async uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await fetch("/api/profile/avatar", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload avatar");
    }

    return response.json();
  },
};
