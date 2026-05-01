import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";
import { weeks } from "@/data/weeks";

// This route is called automatically every week by Vercel Cron.
// It figures out the current pregnancy week, then sends an SMS to mom.

export async function GET(req: NextRequest) {
  // Protect this endpoint so only Vercel Cron (or you) can call it
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const pregnancyStartDate = process.env.PREGNANCY_START_DATE; // e.g. "2026-01-01"
  const momPhoneNumber = process.env.MOM_PHONE_NUMBER;         // e.g. "+15551234567"
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;              // e.g. "https://your-app.vercel.app"

  if (!pregnancyStartDate || !momPhoneNumber || !appUrl) {
    return NextResponse.json({ error: "Missing environment variables" }, { status: 500 });
  }

  // Calculate current week (allow ?week=N override for manual sends)
  const overrideWeek = req.nextUrl.searchParams.get("week");
  const start = new Date(pregnancyStartDate);
  const now = new Date();
  const msPerWeek = 1000 * 60 * 60 * 24 * 7;
  const calculated = Math.floor((now.getTime() - start.getTime()) / msPerWeek) + 1;
  const weekNumber = overrideWeek ? parseInt(overrideWeek, 10) : calculated;

  if (weekNumber < 1 || weekNumber > 40) {
    return NextResponse.json({ message: "Pregnancy week out of range — no SMS sent." });
  }

  const weekData = weeks.find((w) => w.week === weekNumber);
  if (!weekData) {
    return NextResponse.json({ error: "Week data not found" }, { status: 500 });
  }

  try {
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    const message = await client.messages.create({
      body: `${weekData.smsMessage}\n\n${appUrl}/week/${weekNumber}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: momPhoneNumber,
    });

    return NextResponse.json({ success: true, messageSid: message.sid, week: weekNumber });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Twilio error:", message);
    return NextResponse.json({ error: "Twilio failed", detail: message }, { status: 500 });
  }
}
