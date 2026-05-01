export default function Avocado() {
  return (
    <svg viewBox="0 0 200 310" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
      <defs>
        <radialGradient id="avoGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#86efac" />
          <stop offset="100%" stopColor="#166534" />
        </radialGradient>
        <radialGradient id="avoBellyGrad" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fef9c3" />
          <stop offset="100%" stopColor="#fde68a" />
        </radialGradient>
      </defs>

      {/* Stem */}
      <rect x="96" y="18" width="8" height="22" rx="4" fill="#92400e" />
      <ellipse cx="100" cy="16" rx="6" ry="4" fill="#15803d" />

      {/* Body — avocado pear shape */}
      <path
        d="M 100 38 C 60 38 22 80 22 145 C 22 205 58 245 100 245 C 142 245 178 205 178 145 C 178 80 140 38 100 38 Z"
        fill="url(#avoGrad)"
      />

      {/* Belly / inner flesh */}
      <path
        d="M 100 78 C 72 78 50 105 50 148 C 50 190 72 220 100 220 C 128 220 150 190 150 148 C 150 105 128 78 100 78 Z"
        fill="url(#avoBellyGrad)"
      />

      {/* Pit */}
      <circle cx="100" cy="162" r="24" fill="#92400e" />
      <circle cx="100" cy="162" r="24" fill="url(#pitGrad)" />
      <radialGradient id="pitGrad" cx="38%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#b45309" />
        <stop offset="100%" stopColor="#78350f" />
      </radialGradient>
      <ellipse cx="93" cy="155" rx="7" ry="5" fill="rgba(255,255,255,0.2)" transform="rotate(-30 93 155)" />

      {/* Eye whites */}
      <circle cx="76" cy="122" r="19" fill="white" />
      <circle cx="124" cy="122" r="19" fill="white" />

      {/* Irises */}
      <circle cx="79" cy="126" r="11" fill="#3b1f0a" />
      <circle cx="127" cy="126" r="11" fill="#3b1f0a" />

      {/* Pupils */}
      <circle cx="81" cy="128" r="6" fill="#0c0a09" />
      <circle cx="129" cy="128" r="6" fill="#0c0a09" />

      {/* Eye shine */}
      <circle cx="84" cy="123" r="3" fill="white" />
      <circle cx="132" cy="123" r="3" fill="white" />

      {/* Eyebrows */}
      <path d="M 62 108 Q 76 100 90 106" stroke="#166534" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M 110 106 Q 124 100 138 108" stroke="#166534" strokeWidth="3.5" fill="none" strokeLinecap="round" />

      {/* Blush */}
      <ellipse cx="56" cy="138" rx="13" ry="8" fill="rgba(251,113,133,0.45)" />
      <ellipse cx="144" cy="138" rx="13" ry="8" fill="rgba(251,113,133,0.45)" />

      {/* Mouth */}
      <path d="M 80 148 Q 100 166 120 148" stroke="#15803d" strokeWidth="4" fill="none" strokeLinecap="round" />

      {/* Arms */}
      <path d="M 24 145 Q 10 124 26 108" stroke="#166534" strokeWidth="14" fill="none" strokeLinecap="round" />
      <path d="M 176 145 Q 190 124 174 108" stroke="#166534" strokeWidth="14" fill="none" strokeLinecap="round" />

      {/* Hands */}
      <circle cx="26" cy="107" r="12" fill="#22c55e" />
      <circle cx="174" cy="107" r="12" fill="#22c55e" />

      {/* Legs */}
      <rect x="80" y="238" width="16" height="36" rx="8" fill="#166534" />
      <rect x="104" y="238" width="16" height="36" rx="8" fill="#166534" />

      {/* Shoes */}
      <ellipse cx="88" cy="276" rx="19" ry="10" fill="#92400e" />
      <ellipse cx="112" cy="276" rx="19" ry="10" fill="#92400e" />
      <ellipse cx="82" cy="272" rx="5" ry="3" fill="rgba(255,255,255,0.25)" />
      <ellipse cx="106" cy="272" rx="5" ry="3" fill="rgba(255,255,255,0.25)" />
    </svg>
  );
}
