"use client";

import { useEffect, useState } from "react";

interface DancingCharacterProps {
  emoji: string;
  size: string;
}

export default function DancingCharacter({ emoji, size }: DancingCharacterProps) {
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; delay: number }[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100,
      delay: i * 0.3,
    }));
    setSparkles(generated);
  }, [emoji]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative flex items-center justify-center w-48 h-48">
        {/* Sparkles */}
        {sparkles.map((s) => (
          <span
            key={s.id}
            className="absolute text-2xl animate-ping opacity-70"
            style={{
              transform: `translate(${s.x}px, ${s.y}px)`,
              animationDelay: `${s.delay}s`,
              animationDuration: "1.5s",
            }}
          >
            ✨
          </span>
        ))}

        {/* Dancing emoji */}
        <span
          className="text-9xl select-none drop-shadow-lg"
          style={{ animation: "dance 1.2s ease-in-out infinite" }}
          role="img"
          aria-label={size}
        >
          {emoji}
        </span>
      </div>

      <p className="text-white/80 text-sm font-medium tracking-wide uppercase">
        the size of a {size}
      </p>

      <style jsx>{`
        @keyframes dance {
          0%   { transform: translateY(0px)   rotate(-6deg)  scale(1.0); }
          15%  { transform: translateY(-28px) rotate(6deg)   scale(1.12); }
          30%  { transform: translateY(-14px) rotate(-8deg)  scale(1.06); }
          45%  { transform: translateY(-32px) rotate(10deg)  scale(1.14); }
          60%  { transform: translateY(-8px)  rotate(-4deg)  scale(1.02); }
          75%  { transform: translateY(-22px) rotate(7deg)   scale(1.1); }
          90%  { transform: translateY(-5px)  rotate(-3deg)  scale(1.01); }
          100% { transform: translateY(0px)   rotate(-6deg)  scale(1.0); }
        }
      `}</style>
    </div>
  );
}
