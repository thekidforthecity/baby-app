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
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-rose-200 py-12 px-4">
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-12">
        <p className="text-6xl mb-4">👶</p>
        <h1 className="text-4xl font-bold text-purple-900 mb-2">
          Your Pregnancy, Wrapped
        </h1>
        <p className="text-purple-700 text-lg">
          {totalResponses} weeks of love, saved forever.
        </p>

        {/* Stats */}
        <div className="flex justify-center gap-6 mt-6">
          <div className="bg-white/40 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/50">
            <p className="text-3xl font-bold text-purple-800">{totalResponses}</p>
            <p className="text-purple-600 text-xs uppercase tracking-wide">Weeks answered</p>
          </div>
          <div className="bg-white/40 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/50">
            <p className="text-3xl font-bold text-purple-800">{videoCount}</p>
            <p className="text-purple-600 text-xs uppercase tracking-wide">Videos recorded</p>
          </div>
          <div className="bg-white/40 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/50">
            <p className="text-3xl font-bold text-purple-800">{textCount}</p>
            <p className="text-purple-600 text-xs uppercase tracking-wide">Messages written</p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      {responses.length === 0 ? (
        <div className="max-w-md mx-auto text-center bg-white/30 rounded-3xl p-8 border border-white/40">
          <p className="text-5xl mb-3">🌱</p>
          <p className="text-purple-800 font-semibold text-lg">The journey is just beginning.</p>
          <p className="text-purple-600 text-sm mt-2">
            Responses will appear here as the weeks go on.
          </p>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto space-y-6">
          {responses.map((response) => {
            const weekData = getWeek(response.week_number);
            if (!weekData) return null;

            return (
              <div
                key={response.id}
                className={`bg-gradient-to-br ${weekData.bgFrom} ${weekData.bgTo} rounded-3xl p-6 border border-white/40 shadow-sm`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{weekData.emoji}</span>
                  <div>
                    <p className="text-white font-bold text-lg">Week {response.week_number}</p>
                    <p className="text-white/70 text-sm">The size of a {weekData.size}</p>
                  </div>
                  <Link
                    href={`/week/${response.week_number}`}
                    className="ml-auto text-white/60 text-xs underline"
                  >
                    revisit
                  </Link>
                </div>

                <div className="bg-white/20 rounded-2xl px-4 py-3 mb-3">
                  <p className="text-white/80 text-xs font-medium uppercase tracking-wide mb-1">
                    Question
                  </p>
                  <p className="text-white text-sm leading-relaxed">{weekData.question}</p>
                </div>

                {response.text_response && (
                  <div className="bg-white/30 rounded-2xl px-4 py-3">
                    <p className="text-white/80 text-xs font-medium uppercase tracking-wide mb-1">
                      ✍️ Response
                    </p>
                    <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">
                      {response.text_response}
                    </p>
                  </div>
                )}

                {response.video_url && (
                  <div className="rounded-2xl overflow-hidden bg-black aspect-video mt-3">
                    <video
                      src={response.video_url}
                      controls
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <p className="text-center text-purple-400 text-xs mt-12">
        made with love 🤍
      </p>
    </main>
  );
}
