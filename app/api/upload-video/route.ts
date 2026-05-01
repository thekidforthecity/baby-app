import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const weekNumber = formData.get("weekNumber") as string;

    if (!file || !weekNumber) {
      return NextResponse.json({ error: "Missing file or weekNumber" }, { status: 400 });
    }

    const supabase = createClient();
    const fileName = `week-${weekNumber}-${Date.now()}.webm`;

    const { error } = await supabase.storage
      .from("videos")
      .upload(fileName, file, { contentType: "video/webm", upsert: true });

    if (error) throw error;

    const { data: urlData } = supabase.storage.from("videos").getPublicUrl(fileName);

    return NextResponse.json({ url: urlData.publicUrl });
  } catch (err) {
    console.error("Error uploading video:", err);
    return NextResponse.json({ error: "Failed to upload video" }, { status: 500 });
  }
}

export const maxDuration = 60;
