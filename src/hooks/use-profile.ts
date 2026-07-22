import { useState, useEffect } from "react";
import { profileService, Profile } from "@/services/profile.service";

export function useProfile() {
  const [data, setData] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const profile = await profileService.getProfile();
        setData(profile);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch profile");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const updateProfile = async (profileData: Partial<Profile>) => {
    try {
      setIsLoading(true);
      const updated = await profileService.updateProfile(profileData);
      setData(updated);
      setError(null);
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const uploadAvatar = async (file: File) => {
    try {
      const result = await profileService.uploadAvatar(file);
      if (data) {
        setData({ ...data, avatar: result.avatarUrl });
      }
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload avatar");
      throw err;
    }
  };

  return { data, isLoading, error, updateProfile, uploadAvatar };
}
