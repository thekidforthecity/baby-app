"use client";

import Blueberry from "@/components/characters/Blueberry";
import Avocado from "@/components/characters/Avocado";
import Banana from "@/components/characters/Banana";

const characters = [
  { name: "Blueberry", week: 7, Component: Blueberry, bg: "from-blue-400 to-indigo-600" },
  { name: "Avocado", week: 16, Component: Avocado, bg: "from-green-400 to-emerald-600" },
  { name: "Banana", week: 20, Component: Banana, bg: "from-yellow-300 to-amber-500" },
];

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-gray-950 flex flex-col items-center py-12 px-4">
      <h1 className="text-white text-3xl font-bold mb-2">Character Preview</h1>
      <p className="text-white/50 text-sm mb-10">3 example characters — style check before building all 40</p>

      <div className="flex flex-wrap gap-8 justify-center">
        {characters.map(({ name, week, Component, bg }) => (
          <div key={week} className="flex flex-col items-center gap-3">
            <div className={`w-52 h-72 bg-gradient-to-br ${bg} rounded-3xl flex items-center justify-center p-4 shadow-2xl`}>
              <div
                className="w-40 h-56"
                style={{ animation: "dance 1.4s ease-in-out infinite" }}
              >
                <Component />
              </div>
            </div>
            <p className="text-white font-semibold">{name}</p>
            <p className="text-white/40 text-xs">Week {week}</p>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes dance {
          0%   { transform: translateY(0px)   rotate(-5deg)  scale(1.0); }
          15%  { transform: translateY(-20px) rotate(5deg)   scale(1.08); }
          30%  { transform: translateY(-10px) rotate(-6deg)  scale(1.04); }
          45%  { transform: translateY(-24px) rotate(8deg)   scale(1.1); }
          60%  { transform: translateY(-6px)  rotate(-3deg)  scale(1.02); }
          75%  { transform: translateY(-18px) rotate(6deg)   scale(1.07); }
          100% { transform: translateY(0px)   rotate(-5deg)  scale(1.0); }
        }
      `}</style>
    </main>
  );
}
