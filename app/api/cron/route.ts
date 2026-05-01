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

  // Calculate current week
  const start = new Date(pregnancyStartDate);
  const now = new Date();
  const msPerWeek = 1000 * 60 * 60 * 24 * 7;
  const weekNumber = Math.floor((now.getTime() - start.getTime()) / msPerWeek) + 1;

  if (weekNumber < 1 || weekNumber > 40) {
    return NextResponse.json({ message: "Pregnancy week out of range — no SMS sent." });
  }

  const weekData = weeks.find((w) => w.week === weekNumber);
  if (!weekData) {
    return NextResponse.json({ error: "Week data not found" }, { status: 500 });
  }

  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  const message = await client.messages.create({
    body: `💌 Week ${weekNumber}!\n\nYour little one is ${weekData.sizeDescription} ${weekData.emoji}\n\nThey have something to say to you:\n${appUrl}/week/${weekNumber}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: momPhoneNumber,
  });

  return NextResponse.json({ success: true, messageSid: message.sid, week: weekNumber });
}
