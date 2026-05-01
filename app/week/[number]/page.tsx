import { notFound } from "next/navigation";
import { getWeek } from "@/data/weeks";
import { createClient } from "@/lib/supabase-server";
import DancingCharacter from "@/components/DancingCharacter";
import SpeechBubble from "@/components/SpeechBubble";
import ResponseForm from "@/components/ResponseForm";

interface PageProps {
  params: Promise<{ number: string }>;
}

export default async function WeekPage({ params }: PageProps) {
  const { number } = await params;
  const weekNumber = parseInt(number, 10);

  if (isNaN(weekNumber) || weekNumber < 1 || weekNumber > 40) {
    notFound();
  }

  const weekData = getWeek(weekNumber);
  if (!weekData) notFound();

  // Load any existing response so she can see/edit what she wrote
  let existingResponse = null;
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("responses")
      .select("*")
      .eq("week_number", weekNumber)
      .maybeSingle();
    existingResponse = data;
  } catch {
    // Supabase not configured yet — skip gracefully
  }

  return (
    <main
      className={`min-h-screen bg-gradient-to-br ${weekData.bgFrom} ${weekData.bgTo} flex flex-col items-center justify-start py-10 px-4`}
    >
      {/* Week badge */}
      <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-5 py-2 mb-8">
        <p className="text-white font-bold text-sm tracking-widest uppercase">
          Week {weekNumber}
        </p>
      </div>

      {/* Dancing character */}
      <DancingCharacter emoji={weekData.emoji} size={weekData.size} />

      {/* Baby's message */}
      <div className="mt-8 mb-6 w-full max-w-md">
        <SpeechBubble message={weekData.babyMessage} />
      </div>

      {/* Response form with question */}
      <ResponseForm
        weekNumber={weekNumber}
        question={weekData.question}
        existingTextResponse={existingResponse?.text_response ?? null}
        existingVideoUrl={existingResponse?.video_url ?? null}
      />

      {/* Footer */}
      <p className="mt-10 text-white/40 text-xs text-center">
        made with love, for you and our little {weekData.size} 🤍
      </p>
    </main>
  );
}
