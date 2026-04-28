import { NextRequest, NextResponse } from "next/server";
import { updateUserProfile } from "@/services/settings";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, name, email, jobTitle, bio, phone } = body;

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const ok = await updateUserProfile(userId, { name, email, jobTitle, bio, phone });

    if (!ok) {
      return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Profile update error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
