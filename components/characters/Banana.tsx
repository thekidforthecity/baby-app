export default function Banana() {
  return (
    <svg viewBox="0 0 220 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
      <defs>
        <radialGradient id="bananaGrad" cx="38%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#ca8a04" />
        </radialGradient>
      </defs>

      {/* Banana body — curved crescent shape */}
      {/* Main crescent */}
      <path
        d="M 60 200 C 40 160 42 100 80 60 C 100 38 130 32 150 42 C 170 52 175 75 165 95 C 155 115 132 118 118 130 C 100 145 95 175 100 210 C 90 218 68 212 60 200 Z"
        fill="url(#bananaGrad)"
      />

      {/* Banana tip top */}
      <path
        d="M 148 43 C 162 36 175 45 172 58 C 168 50 158 47 148 43 Z"
        fill="#a16207"
      />

      {/* Banana tip bottom */}
      <path
        d="M 62 198 C 58 212 66 222 78 218 C 70 215 65 208 62 198 Z"
        fill="#a16207"
      />

      {/* Face area — flattened oval on the front of the banana */}
      <ellipse cx="110" cy="135" rx="42" ry="50" fill="#fde047" opacity="0.6" />

      {/* Eye whites */}
      <circle cx="96" cy="122" r="17" fill="white" />
      <circle cx="130" cy="118" r="17" fill="white" />

      {/* Irises */}
      <circle cx="99" cy="126" r="10" fill="#713f12" />
      <circle cx="133" cy="122" r="10" fill="#713f12" />

      {/* Pupils */}
      <circle cx="101" cy="128" r="5.5" fill="#0c0a09" />
      <circle cx="135" cy="124" r="5.5" fill="#0c0a09" />

      {/* Eye shine */}
      <circle cx="104" cy="123" r="2.5" fill="white" />
      <circle cx="138" cy="119" r="2.5" fill="white" />

      {/* Eyebrows */}
      <path d="M 84 108 Q 97 100 110 106" stroke="#a16207" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 118 104 Q 131 97 144 104" stroke="#a16207" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Blush */}
      <ellipse cx="80" cy="140" rx="12" ry="7" fill="rgba(251,113,133,0.5)" />
      <ellipse cx="144" cy="135" rx="12" ry="7" fill="rgba(251,113,133,0.5)" />

      {/* Mouth */}
      <path d="M 88 152 Q 108 170 128 150" stroke="#a16207" strokeWidth="4" fill="none" strokeLinecap="round" />

      {/* Arms */}
      <path d="M 52 165 Q 36 148 46 130" stroke="#ca8a04" strokeWidth="13" fill="none" strokeLinecap="round" />
      <path d="M 168 150 Q 186 135 178 118" stroke="#ca8a04" strokeWidth="13" fill="none" strokeLinecap="round" />

      {/* Hands */}
      <circle cx="46" cy="129" r="11" fill="#fbbf24" />
      <circle cx="178" cy="117" r="11" fill="#fbbf24" />

      {/* Legs */}
      <rect x="84" y="222" width="15" height="34" rx="7" fill="#ca8a04" />
      <rect x="106" y="224" width="15" height="34" rx="7" fill="#ca8a04" />

      {/* Shoes */}
      <ellipse cx="92" cy="258" rx="18" ry="10" fill="#a16207" />
      <ellipse cx="114" cy="260" rx="18" ry="10" fill="#a16207" />
      <ellipse cx="86" cy="254" rx="5" ry="3" fill="rgba(255,255,255,0.25)" />
      <ellipse cx="108" cy="256" rx="5" ry="3" fill="rgba(255,255,255,0.25)" />
    </svg>
  );
}
