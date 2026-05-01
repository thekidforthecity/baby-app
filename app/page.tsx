import Link from "next/link";
import { getWeek } from "@/data/weeks";

function getCurrentWeek(): number {
  const start = process.env.PREGNANCY_START_DATE;
  if (!start) return 1;
  const msPerWeek = 1000 * 60 * 60 * 24 * 7;
  const week = Math.floor((Date.now() - new Date(start).getTime()) / msPerWeek) + 1;
  return Math.max(1, Math.min(40, week));
}

const TRIMESTERS = [
  { label: "1st", full: "Weeks 1–13", end: 13 },
  { label: "2nd", full: "Weeks 14–27", end: 27 },
  { label: "3rd", full: "Weeks 28–40", end: 40 },
];

export default function HomePage() {
  const currentWeek = getCurrentWeek();
  const weekData = getWeek(currentWeek);
  const progressPct = Math.round((currentWeek / 40) * 100);
  const trimesterIndex = currentWeek <= 13 ? 0 : currentWeek <= 27 ? 1 : 2;

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 flex flex-col items-center justify-center px-5 text-center py-10">
      <p className="text-5xl mb-3">🤰</p>
      <h1 className="text-3xl font-bold text-purple-900 mb-1">Hello, Mama.</h1>
      <p className="text-purple-600 text-sm max-w-xs mb-6 leading-relaxed">
        Your little one has been waiting to talk to you.
      </p>

      {/* Progress card */}
      <div className="w-full max-w-sm bg-white/55 backdrop-blur-sm border border-purple-200 rounded-3xl px-5 py-5 mb-5 shadow-sm">

        {/* Week + size */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-purple-900 font-bold text-xl">Week {currentWeek}</span>
          <span className="text-purple-400 text-sm">of 40</span>
        </div>
        <p className="text-purple-600 text-sm mb-4 text-left">
          Your baby is the size of a{" "}
          <span className="font-semibold text-purple-800">{weekData?.size}</span>{" "}
          {weekData?.emoji}
        </p>

        {/* Progress bar */}
        <div className="w-full bg-purple-100 rounded-full h-3 mb-2 overflow-hidden">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-pink-400 to-purple-500"
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
          {TRIMESTERS.map((t, i) => (
            <div
              key={t.label}
              className={`rounded-xl py-2.5 px-1 text-center border ${
                i === trimesterIndex
                  ? "bg-purple-500 border-purple-500"
                  : "bg-white/50 border-purple-200"
              }`}
            >
              <p className={`text-xs font-bold leading-tight ${i === trimesterIndex ? "text-white" : "text-purple-700"}`}>
                {t.label} trimester
              </p>
              <p className={`text-xs mt-0.5 ${i === trimesterIndex ? "text-purple-100" : "text-purple-400"}`}>
                {t.full}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA buttons */}
      <div className="flex flex-col gap-3 w-full max-w-sm">
        <Link
          href={`/week/${currentWeek}`}
          className="bg-purple-600 active:bg-purple-700 text-white font-bold py-4 rounded-2xl text-lg transition-all active:scale-95 shadow-lg"
        >
          Open Week {currentWeek} 💌
        </Link>
        <Link
          href="/wrapped"
          className="bg-white/50 border border-purple-200 text-purple-800 font-semibold py-4 rounded-2xl text-base active:scale-95"
        >
          View pregnancy wrapped 🎁
        </Link>
      </div>

      <p className="mt-6 text-purple-400 text-xs">made with love, for the three of us</p>
    </main>
  );
}
