import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  try {
    const { weekNumber, textResponse, videoUrl } = await req.json();

    if (!weekNumber) {
      return NextResponse.json({ error: "weekNumber is required" }, { status: 400 });
    }

    const supabase = createClient();

    const { error } = await supabase.from("responses").upsert(
      {
        week_number: weekNumber,
        text_response: textResponse ?? null,
        video_url: videoUrl ?? null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "week_number" }
    );

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error saving response:", err);
    return NextResponse.json({ error: "Failed to save response" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const weekNumber = searchParams.get("week");

    const supabase = createClient();

    const query = supabase.from("responses").select("*").order("week_number");
    if (weekNumber) {
      query.eq("week_number", parseInt(weekNumber));
    }

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ data });
  } catch (err) {
    console.error("Error fetching responses:", err);
    return NextResponse.json({ error: "Failed to fetch responses" }, { status: 500 });
  }
}
