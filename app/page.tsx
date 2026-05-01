import Link from "next/link";
import { getWeek } from "@/data/weeks";

function getCurrentWeek(): number {
  const start = process.env.PREGNANCY_START_DATE;
  if (!start) return 1;
  const msPerWeek = 1000 * 60 * 60 * 24 * 7;
  const week = Math.floor((Date.now() - new Date(start).getTime()) / msPerWeek) + 1;
  return Math.max(1, Math.min(40, week));
}

const TRIMESTER_LABELS = [
  { label: "1st trimester", weeks: "Weeks 1–13", end: 13 },
  { label: "2nd trimester", weeks: "Weeks 14–27", end: 27 },
  { label: "3rd trimester", weeks: "Weeks 28–40", end: 40 },
];

export default function HomePage() {
  const currentWeek = getCurrentWeek();
  const weekData = getWeek(currentWeek);
  const progressPct = Math.round((currentWeek / 40) * 100);

  const trimesterIndex =
    currentWeek <= 13 ? 0 : currentWeek <= 27 ? 1 : 2;

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 flex flex-col items-center justify-center px-6 text-center py-12">
      <p className="text-6xl mb-4">🤰</p>
      <h1 className="text-4xl font-bold text-purple-900 mb-2">Hello, Mama.</h1>
      <p className="text-purple-600 text-base max-w-xs mb-8 leading-relaxed">
        Your little one has been waiting to talk to you.
      </p>

      {/* Progress card */}
      <div className="w-full max-w-sm bg-white/55 backdrop-blur-sm border border-purple-200 rounded-3xl px-6 py-6 mb-6 shadow-sm">

        {/* Week + size */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-purple-900 font-bold text-xl">Week {currentWeek}</span>
          <span className="text-purple-400 text-sm font-medium">of 40</span>
        </div>
        <p className="text-purple-600 text-sm mb-4 text-left">
          Your baby is the size of a <span className="font-semibold text-purple-800">{weekData?.size}</span> {weekData?.emoji}
        </p>

        {/* Progress bar */}
        <div className="w-full bg-purple-100 rounded-full h-3 mb-2 overflow-hidden">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 transition-all"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-purple-400 mb-5">
          <span>Week 1</span>
          <span className="text-purple-600 font-semibold">{progressPct}% complete</span>
          <span>Week 40</span>
        </div>

        {/* Trimester tabs */}
        <div className="grid grid-cols-3 gap-2">
          {TRIMESTER_LABELS.map((t, i) => (
            <div
              key={t.label}
              className={`rounded-2xl px-2 py-3 text-center border transition-all ${
                i === trimesterIndex
                  ? "bg-purple-500 border-purple-500 text-white"
                  : "bg-white/50 border-purple-200 text-purple-500"
              }`}
            >
              <p className={`text-xs font-bold ${i === trimesterIndex ? "text-white" : "text-purple-700"}`}>
                {t.label}
              </p>
              <p className={`text-xs mt-0.5 ${i === trimesterIndex ? "text-purple-100" : "text-purple-400"}`}>
                {t.weeks}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA buttons */}
      <div className="flex flex-col gap-3 w-full max-w-sm">
        <Link
          href={`/week/${currentWeek}`}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-2xl text-lg transition-all active:scale-95 shadow-lg"
        >
          Open Week {currentWeek} 💌
        </Link>
        <Link
          href="/wrapped"
          className="bg-white/50 border border-purple-200 text-purple-800 font-semibold py-4 rounded-2xl text-base transition-all active:scale-95"
        >
          View pregnancy wrapped 🎁
        </Link>
      </div>

      <p className="mt-8 text-purple-400 text-xs">made with love, for the three of us</p>
    </main>
  );
}
