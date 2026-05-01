import { createClient } from "@/lib/supabase-server";
import { getWeek } from "@/data/weeks";
import Link from "next/link";

interface Response {
  id: string;
  week_number: number;
  text_response: string | null;
  video_url: string | null;
  created_at: string;
}

export default async function WrappedPage() {
  let responses: Response[] = [];

  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("responses")
      .select("*")
      .order("week_number", { ascending: true });
    responses = data ?? [];
  } catch {
    // Supabase not configured yet
  }

  const totalResponses = responses.length;
  const videoCount = responses.filter((r) => r.video_url).length;
  const textCount = responses.filter((r) => r.text_response).length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 py-10 px-4">

      {/* Header */}
      <div className="max-w-lg mx-auto text-center mb-8">
        <p className="text-5xl mb-3">👶</p>
        <h1 className="text-3xl font-bold text-purple-900 mb-1">Your Pregnancy, Wrapped</h1>
        <p className="text-purple-600 text-base">{totalResponses} weeks of love, saved forever.</p>

        {/* Stats */}
        <div className="flex justify-center gap-3 mt-5">
          {[
            { value: totalResponses, label: "Weeks answered" },
            { value: videoCount, label: "Videos" },
            { value: textCount, label: "Messages" },
          ].map((s) => (
            <div key={s.label} className="flex-1 bg-white/55 border border-purple-200 rounded-2xl py-3 px-2">
              <p className="text-2xl font-bold text-purple-800">{s.value}</p>
              <p className="text-purple-500 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Empty state */}
      {responses.length === 0 ? (
        <div className="max-w-sm mx-auto text-center bg-white/55 border border-purple-200 rounded-3xl p-8">
          <p className="text-5xl mb-3">🌱</p>
          <p className="text-purple-800 font-semibold text-lg">The journey is just beginning.</p>
          <p className="text-purple-600 text-sm mt-2">
            Responses will appear here as the weeks go on.
          </p>
        </div>
      ) : (
        <div className="max-w-lg mx-auto space-y-5">
          {responses.map((response) => {
            const weekData = getWeek(response.week_number);
            if (!weekData) return null;

            return (
              <div
                key={response.id}
                className="bg-white/55 backdrop-blur-sm border border-purple-200 rounded-3xl overflow-hidden shadow-sm"
              >
                {/* Week header */}
                <div className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-purple-100">
                  <span className="text-3xl">{weekData.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-purple-900 font-bold text-base">Week {response.week_number}</p>
                    <p className="text-purple-500 text-xs">Size of a {weekData.size}</p>
                  </div>
                  <Link
                    href={`/week/${response.week_number}`}
                    className="text-purple-400 text-xs underline underline-offset-2 shrink-0"
                  >
                    revisit
                  </Link>
                </div>

                <div className="px-5 py-4 space-y-3">
                  {/* Question */}
                  <div className="bg-purple-50 border border-purple-100 rounded-2xl px-4 py-3">
                    <p className="text-purple-400 text-xs font-semibold uppercase tracking-widest mb-1">
                      Baby asked
                    </p>
                    <p className="text-purple-800 text-sm leading-relaxed">{weekData.question}</p>
                  </div>

                  {/* Text answer */}
                  {response.text_response && (
                    <div className="bg-white border border-purple-100 rounded-2xl px-4 py-3">
                      <p className="text-purple-400 text-xs font-semibold uppercase tracking-widest mb-1">
                        ✍️ Mama wrote
                      </p>
                      <p className="text-purple-900 text-sm leading-relaxed whitespace-pre-wrap">
                        {response.text_response}
                      </p>
                    </div>
                  )}

                  {/* Video answer */}
                  {response.video_url && (
                    <div>
                      <p className="text-purple-400 text-xs font-semibold uppercase tracking-widest mb-2">
                        🎥 Mama recorded
                      </p>
                      <div className="rounded-2xl overflow-hidden bg-black aspect-video">
                        <video
                          src={response.video_url}
                          controls
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p className="text-center text-purple-400 text-xs mt-10">made with love 🤍</p>
    </main>
  );
}
