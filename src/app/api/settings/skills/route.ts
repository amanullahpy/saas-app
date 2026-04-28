import { NextRequest, NextResponse } from "next/server";
import { updateUserSkills } from "@/services/settings";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, frontendSkills, fullstackSkills } = body;

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const ok = await updateUserSkills(userId, { frontendSkills, fullstackSkills });

    if (!ok) {
      return NextResponse.json({ error: "Failed to update skills" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Skills update error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
