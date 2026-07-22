"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { toast } from "@/lib/toast";
import { profileData } from "@/config/data/profile.data";
import { useTranslations } from "next-intl";
import { LoadingState } from "@/components/ui/loading-state";
import { profileSchema, ProfileFormValues } from "@/lib/schemas/profile.schema";

export interface ProfileData {
  id: string;
  name: string;
  email: string;
  jobTitle?: string;
  bio?: string;
  phone?: string;
  avatarUrl?: string;
  role: string;
}

interface Props {
  profile: ProfileData | null;
}

export function ProfileSettings({ profile }: Props) {
  const t = useTranslations("settings.profile");
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const defaultProfileValues = {
    name: profile?.name || profileData.defaultProfile.name || "",
    email: profile?.email || profileData.defaultProfile.email || "",
    jobTitle: profile?.jobTitle || profileData.defaultProfile.jobTitle || "",
    phone: profile?.phone || "",
    bio: profile?.bio || "",
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: defaultProfileValues,
  });

  // Re-initialize default values when profile finishes loading/changes
  useEffect(() => {
    if (profile) {
      form.reset({
        name: profile.name,
        email: profile.email,
        jobTitle: profile.jobTitle || "",
        phone: profile.phone || "",
        bio: profile.bio || "",
      });
    }
  }, [profile, form]);

  async function onSubmit(values: ProfileFormValues) {
    if (!profile?.id) {
      // Mock mode save feedback
      setSaving(true);
      setTimeout(() => {
        console.log("Mock Save:", values);
        toast.success(t("save_changes") + " (Mock Mode)");
        setSaving(false);
      }, 500);
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/settings/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: profile.id, ...values }),
      });
      if (res.ok) {
        toast.success("Profile updated successfully.");
      } else {
        toast.error("Failed to update profile.");
      }
    } catch {
      toast.error("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  }

  if (isLoading) {
    return (
      <Card className="border-none shadow-sm bg-card">
        <CardHeader>
          <LoadingState variant="default" count={1} />
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center gap-6 pb-6 border-b">
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-muted animate-pulse" />
              </div>
              <div className="space-y-2 flex-1">
                <div className="h-6 w-48 bg-muted rounded animate-pulse" />
                <div className="h-4 w-32 bg-muted rounded animate-pulse" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-11 bg-muted rounded-xl animate-pulse" />
              <div className="h-11 bg-muted rounded-xl animate-pulse" />
              <div className="h-11 bg-muted rounded-xl animate-pulse md:col-span-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const nameToUse = profile?.name || profileData.defaultProfile.name || "";
  const initials = nameToUse
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className="border-none shadow-sm bg-card hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>
          {t("description")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-6 pb-6 border-b">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-background shadow-sm">
              <AvatarImage src={profile?.avatarUrl || profileData.defaultProfile.avatar || undefined} />
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">{initials}</AvatarFallback>
            </Avatar>
            <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 rounded-full h-8 w-8 shadow-sm border border-background">
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-lg">{nameToUse}</h3>
            <p className="text-sm text-muted-foreground capitalize">
              {profile?.role || profileData.defaultProfile.role}
              {profileData.defaultProfile.location ? ` • ${profileData.defaultProfile.location}` : ""}
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("full_name")}</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" className="h-11 px-4 rounded-xl" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("email_address")}</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" className="h-11 px-4 rounded-xl" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("job_title")}</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Product Designer" className="h-11 px-4 rounded-xl" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("phone")}</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 000-0000" className="h-11 px-4 rounded-xl" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>{t("bio")}</FormLabel>
                    <FormControl>
                      <Input placeholder="A short bio about yourself" className="h-11 px-4 rounded-xl" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={saving} className="h-11 px-8 rounded-xl">
                {saving ? "Saving..." : t("save_changes")}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
