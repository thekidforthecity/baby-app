"use client";

import { useEffect, useState } from "react";
import WeekCharacter from "./characters/WeekCharacter";

interface DancingCharacterProps {
  week: number;
  size: string;
}

export default function DancingCharacter({ week, size }: DancingCharacterProps) {
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; delay: number }[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 160 - 80,
      y: Math.random() * 160 - 80,
      delay: i * 0.3,
    }));
    setSparkles(generated);
  }, [week]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative flex items-center justify-center w-56 h-56">
        {/* Sparkles */}
        {sparkles.map((s) => (
          <span
            key={s.id}
            className="absolute text-xl animate-ping opacity-60"
            style={{
              transform: `translate(${s.x}px, ${s.y}px)`,
              animationDelay: `${s.delay}s`,
              animationDuration: "1.5s",
            }}
          >
            ✨
          </span>
        ))}

        {/* Dancing character */}
        <div
          className="w-44 h-44 select-none drop-shadow-2xl"
          style={{ animation: "dance 1.4s ease-in-out infinite" }}
        >
          <WeekCharacter week={week} />
        </div>
      </div>

      <p className="text-purple-700 text-sm font-medium tracking-wide uppercase">
        the size of a {size}
      </p>

      <style jsx>{`
        @keyframes dance {
          0%   { transform: translateY(0px)   rotate(-5deg)  scale(1.0); }
          15%  { transform: translateY(-22px) rotate(5deg)   scale(1.1); }
          30%  { transform: translateY(-11px) rotate(-7deg)  scale(1.05); }
          45%  { transform: translateY(-26px) rotate(8deg)   scale(1.12); }
          60%  { transform: translateY(-7px)  rotate(-3deg)  scale(1.02); }
          75%  { transform: translateY(-18px) rotate(6deg)   scale(1.08); }
          90%  { transform: translateY(-4px)  rotate(-2deg)  scale(1.01); }
          100% { transform: translateY(0px)   rotate(-5deg)  scale(1.0); }
        }
      `}</style>
    </div>
  );
}
