export default function Blueberry() {
  return (
    <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
      {/* Leaves */}
      <g>
        <ellipse cx="82" cy="52" rx="11" ry="26" fill="#15803d" transform="rotate(-25 82 52)" />
        <ellipse cx="100" cy="44" rx="11" ry="28" fill="#22c55e" />
        <ellipse cx="118" cy="52" rx="11" ry="26" fill="#15803d" transform="rotate(25 118 52)" />
        {/* Leaf veins */}
        <line x1="100" y1="44" x2="100" y2="20" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* Body */}
      <circle cx="100" cy="155" r="82" fill="#3730a3" />
      <circle cx="100" cy="155" r="82" fill="url(#blueGrad)" />
      <defs>
        <radialGradient id="blueGrad" cx="38%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#312e81" />
        </radialGradient>
      </defs>

      {/* Shine */}
      <ellipse cx="70" cy="115" rx="22" ry="13" fill="rgba(255,255,255,0.18)" transform="rotate(-35 70 115)" />

      {/* Eye whites */}
      <circle cx="74" cy="148" r="22" fill="white" />
      <circle cx="126" cy="148" r="22" fill="white" />

      {/* Irises */}
      <circle cx="78" cy="153" r="13" fill="#064e3b" />
      <circle cx="130" cy="153" r="13" fill="#064e3b" />

      {/* Pupils */}
      <circle cx="80" cy="155" r="7" fill="#0f172a" />
      <circle cx="132" cy="155" r="7" fill="#0f172a" />

      {/* Eye shine */}
      <circle cx="84" cy="149" r="3.5" fill="white" />
      <circle cx="136" cy="149" r="3.5" fill="white" />

      {/* Eyebrows */}
      <path d="M 59 132 Q 74 124 89 130" stroke="#1e1b4b" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M 111 130 Q 126 124 141 132" stroke="#1e1b4b" strokeWidth="3.5" fill="none" strokeLinecap="round" />

      {/* Blush */}
      <ellipse cx="54" cy="168" rx="15" ry="9" fill="rgba(251,113,133,0.55)" />
      <ellipse cx="146" cy="168" rx="15" ry="9" fill="rgba(251,113,133,0.55)" />

      {/* Mouth */}
      <path d="M 78 180 Q 100 200 122 180" stroke="#dc2626" strokeWidth="4" fill="rgba(220,38,38,0.15)" strokeLinecap="round" />

      {/* Arms */}
      <path d="M 20 148 Q 6 126 22 110" stroke="#4338ca" strokeWidth="15" fill="none" strokeLinecap="round" />
      <path d="M 180 148 Q 194 126 178 110" stroke="#4338ca" strokeWidth="15" fill="none" strokeLinecap="round" />

      {/* Hands */}
      <circle cx="22" cy="109" r="13" fill="#6366f1" />
      <circle cx="178" cy="109" r="13" fill="#6366f1" />
      {/* Hand fingers hint */}
      <path d="M 14 103 Q 22 96 30 103" stroke="#818cf8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 170 103 Q 178 96 186 103" stroke="#818cf8" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Legs */}
      <rect x="78" y="230" width="18" height="38" rx="9" fill="#3730a3" />
      <rect x="104" y="230" width="18" height="38" rx="9" fill="#3730a3" />

      {/* Shoes */}
      <ellipse cx="87" cy="271" rx="20" ry="11" fill="#166534" />
      <ellipse cx="113" cy="271" rx="20" ry="11" fill="#166534" />
      {/* Shoe shine */}
      <ellipse cx="81" cy="267" rx="6" ry="3" fill="rgba(255,255,255,0.3)" />
      <ellipse cx="107" cy="267" rx="6" ry="3" fill="rgba(255,255,255,0.3)" />
    </svg>
  );
}
