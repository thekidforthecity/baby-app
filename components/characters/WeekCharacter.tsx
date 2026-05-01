import Blueberry from "./Blueberry";
import Avocado from "./Avocado";
import Banana from "./Banana";

// ─── Shared face helper ────────────────────────────────────────────────────
function Face({
  cx, cy, eyeSpread = 24, eyeIrisColor = "#1e3a5f", eyeColor = "#0f172a",
}: {
  cx: number; cy: number; eyeSpread?: number; eyeIrisColor?: string; eyeColor?: string;
}) {
  const lx = cx - eyeSpread, rx = cx + eyeSpread;
  const ey = cy;
  return (
    <g>
      {/* Whites */}
      <circle cx={lx} cy={ey} r={19} fill="white" />
      <circle cx={rx} cy={ey} r={19} fill="white" />
      {/* Irises */}
      <circle cx={lx + 3} cy={ey + 4} r={11} fill={eyeIrisColor} />
      <circle cx={rx + 3} cy={ey + 4} r={11} fill={eyeIrisColor} />
      {/* Pupils */}
      <circle cx={lx + 5} cy={ey + 6} r={6} fill={eyeColor} />
      <circle cx={rx + 5} cy={ey + 6} r={6} fill={eyeColor} />
      {/* Shine */}
      <circle cx={lx + 8} cy={ey + 2} r={3} fill="white" />
      <circle cx={rx + 8} cy={ey + 2} r={3} fill="white" />
      {/* Eyebrows */}
      <path d={`M ${lx - 14} ${ey - 13} Q ${lx} ${ey - 21} ${lx + 14} ${ey - 15}`} stroke={eyeColor} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d={`M ${rx - 14} ${ey - 15} Q ${rx} ${ey - 21} ${rx + 14} ${ey - 13}`} stroke={eyeColor} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      {/* Blush */}
      <ellipse cx={lx - 16} cy={ey + 16} rx={14} ry={8} fill="rgba(251,113,133,0.5)" />
      <ellipse cx={rx + 16} cy={ey + 16} rx={14} ry={8} fill="rgba(251,113,133,0.5)" />
      {/* Mouth */}
      <path d={`M ${cx - 18} ${ey + 28} Q ${cx} ${ey + 46} ${cx + 18} ${ey + 28}`} stroke="#dc2626" strokeWidth="4" fill="none" strokeLinecap="round" />
    </g>
  );
}

// ─── Shared limbs helper ───────────────────────────────────────────────────
function Limbs({
  cx, bodyBottom, armColor, shoeColor, legColor,
}: {
  cx: number; bodyBottom: number; armColor: string; shoeColor: string; legColor?: string;
}) {
  const lc = legColor ?? armColor;
  return (
    <g>
      {/* Left arm */}
      <path d={`M ${cx - 78} ${bodyBottom - 60} Q ${cx - 95} ${bodyBottom - 82} ${cx - 80} ${bodyBottom - 98}`} stroke={armColor} strokeWidth="14" fill="none" strokeLinecap="round" />
      <circle cx={cx - 80} cy={bodyBottom - 99} r={12} fill={armColor} />
      {/* Right arm */}
      <path d={`M ${cx + 78} ${bodyBottom - 60} Q ${cx + 95} ${bodyBottom - 82} ${cx + 80} ${bodyBottom - 98}`} stroke={armColor} strokeWidth="14" fill="none" strokeLinecap="round" />
      <circle cx={cx + 80} cy={bodyBottom - 99} r={12} fill={armColor} />
      {/* Legs */}
      <rect x={cx - 20} y={bodyBottom} width={16} height={36} rx={8} fill={lc} />
      <rect x={cx + 4} y={bodyBottom} width={16} height={36} rx={8} fill={lc} />
      {/* Shoes */}
      <ellipse cx={cx - 12} cy={bodyBottom + 38} rx={20} ry={10} fill={shoeColor} />
      <ellipse cx={cx + 12} cy={bodyBottom + 38} rx={20} ry={10} fill={shoeColor} />
      <ellipse cx={cx - 18} cy={bodyBottom + 34} rx={6} ry={3} fill="rgba(255,255,255,0.25)" />
      <ellipse cx={cx + 6} cy={bodyBottom + 34} rx={6} ry={3} fill="rgba(255,255,255,0.25)" />
    </g>
  );
}

// ─── Round Character ───────────────────────────────────────────────────────
function RoundChar({
  cx = 100, cy = 150, r = 78, fill1, fill2, gradId,
  top, armColor, shoeColor, eyeIrisColor, eyeSpread,
}: {
  cx?: number; cy?: number; r?: number; fill1: string; fill2: string; gradId: string;
  top: React.ReactNode; armColor: string; shoeColor: string;
  eyeIrisColor?: string; eyeSpread?: number;
}) {
  return (
    <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
      <defs>
        <radialGradient id={gradId} cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor={fill1} />
          <stop offset="100%" stopColor={fill2} />
        </radialGradient>
      </defs>
      {top}
      <circle cx={cx} cy={cy} r={r} fill={`url(#${gradId})`} />
      <ellipse cx={cx - 28} cy={cy - 30} rx={20} ry={12} fill="rgba(255,255,255,0.15)" transform={`rotate(-35 ${cx - 28} ${cy - 30})`} />
      <Face cx={cx} cy={cy - 8} eyeIrisColor={eyeIrisColor} eyeSpread={eyeSpread} />
      <Limbs cx={cx} bodyBottom={cy + r} armColor={armColor} shoeColor={shoeColor} />
    </svg>
  );
}

// ─── Oval Character ────────────────────────────────────────────────────────
function OvalChar({
  cx = 100, cy = 155, rx = 72, ry = 85, fill1, fill2, gradId,
  top, armColor, shoeColor, eyeIrisColor,
}: {
  cx?: number; cy?: number; rx?: number; ry?: number;
  fill1: string; fill2: string; gradId: string;
  top: React.ReactNode; armColor: string; shoeColor: string; eyeIrisColor?: string;
}) {
  return (
    <svg viewBox="0 0 200 310" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
      <defs>
        <radialGradient id={gradId} cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor={fill1} />
          <stop offset="100%" stopColor={fill2} />
        </radialGradient>
      </defs>
      {top}
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={`url(#${gradId})`} />
      <ellipse cx={cx - 24} cy={cy - 34} rx={18} ry={11} fill="rgba(255,255,255,0.16)" transform={`rotate(-35 ${cx - 24} ${cy - 34})`} />
      <Face cx={cx} cy={cy - 10} eyeIrisColor={eyeIrisColor} />
      <Limbs cx={cx} bodyBottom={cy + ry} armColor={armColor} shoeColor={shoeColor} />
    </svg>
  );
}

// ─── Seed / tiny characters (weeks 1–5) ───────────────────────────────────
function TinySeed({ fill1, fill2, gradId, topColor }: { fill1: string; fill2: string; gradId: string; topColor: string }) {
  return (
    <RoundChar
      cx={100} cy={148} r={76} fill1={fill1} fill2={fill2} gradId={gradId}
      top={
        <g>
          <ellipse cx={100} cy={52} rx={12} ry={26} fill={topColor} />
          <ellipse cx={82} cy={60} rx={10} ry={20} fill={topColor} transform="rotate(-25 82 60)" />
          <ellipse cx={118} cy={60} rx={10} ry={20} fill={topColor} transform="rotate(25 118 60)" />
        </g>
      }
      armColor={fill2} shoeColor={topColor}
    />
  );
}

// ─── Sweet Pea (week 6) ───────────────────────────────────────────────────
function SweetPea() {
  return (
    <svg viewBox="0 0 220 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
      <defs>
        <radialGradient id="peaGrad" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#86efac" />
          <stop offset="100%" stopColor="#15803d" />
        </radialGradient>
      </defs>
      {/* Pod */}
      <ellipse cx={110} cy={158} rx={90} ry={72} fill="#166534" />
      <ellipse cx={110} cy={155} rx={82} ry={64} fill="url(#peaGrad)" />
      {/* Pea bumps on pod */}
      <circle cx={76} cy={155} r={22} fill="#22c55e" />
      <circle cx={112} cy={152} r={22} fill="#22c55e" />
      <circle cx={148} cy={155} r={22} fill="#22c55e" />
      {/* Stem */}
      <path d="M 110 86 Q 130 70 120 50" stroke="#166534" strokeWidth={6} fill="none" strokeLinecap="round" />
      <ellipse cx={119} cy={48} rx={10} ry={7} fill="#22c55e" transform="rotate(20 119 48)" />
      {/* Face on middle pea */}
      <Face cx={112} cy={144} eyeSpread={15} eyeIrisColor="#14532d" />
      {/* Arms */}
      <path d="M 22 155 Q 8 136 22 120" stroke="#15803d" strokeWidth={13} fill="none" strokeLinecap="round" />
      <circle cx={22} cy={119} r={11} fill="#22c55e" />
      <path d="M 198 155 Q 212 136 198 120" stroke="#15803d" strokeWidth={13} fill="none" strokeLinecap="round" />
      <circle cx={198} cy={119} r={11} fill="#22c55e" />
      {/* Legs */}
      <rect x={90} y={223} width={15} height={34} rx={7} fill="#15803d" />
      <rect x={115} y={223} width={15} height={34} rx={7} fill="#15803d" />
      <ellipse cx={98} cy={259} rx={19} ry={10} fill="#166534" />
      <ellipse cx={123} cy={259} rx={19} ry={10} fill="#166534" />
    </svg>
  );
}

// ─── Raspberry (week 8) ───────────────────────────────────────────────────
function Raspberry() {
  const drupePositions = [
    [82,125],[100,118],[118,125],[72,142],[90,135],[108,133],[126,140],
    [78,158],[96,150],[114,150],[130,156],[84,172],[102,165],[120,170],
  ];
  return (
    <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
      {/* Leaves at top */}
      <ellipse cx={82} cy={58} rx={11} ry={24} fill="#15803d" transform="rotate(-20 82 58)" />
      <ellipse cx={100} cy={52} rx={11} ry={26} fill="#22c55e" />
      <ellipse cx={118} cy={58} rx={11} ry={24} fill="#15803d" transform="rotate(20 118 58)" />
      {/* Body drupes */}
      {drupePositions.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={14} fill="#dc2626" />
      ))}
      {drupePositions.map(([x, y], i) => (
        <circle key={i + 100} cx={x} cy={y} r={14} fill="none" stroke="#991b1b" strokeWidth="1" />
      ))}
      {/* Drupe highlights */}
      {drupePositions.map(([x, y], i) => (
        <circle key={i + 200} cx={x - 4} cy={y - 4} r={3.5} fill="rgba(255,255,255,0.3)" />
      ))}
      {/* Face area */}
      <Face cx={100} cy={132} eyeSpread={22} eyeIrisColor="#7f1d1d" />
      {/* Arms */}
      <path d="M 22 148 Q 8 128 22 112" stroke="#dc2626" strokeWidth={13} fill="none" strokeLinecap="round" />
      <circle cx={22} cy={111} r={11} fill="#ef4444" />
      <path d="M 178 148 Q 192 128 178 112" stroke="#dc2626" strokeWidth={13} fill="none" strokeLinecap="round" />
      <circle cx={178} cy={111} r={11} fill="#ef4444" />
      {/* Legs */}
      <rect x={81} y={228} width={15} height={34} rx={7} fill="#991b1b" />
      <rect x={104} y={228} width={15} height={34} rx={7} fill="#991b1b" />
      <ellipse cx={89} cy={264} rx={18} ry={10} fill="#15803d" />
      <ellipse cx={112} cy={264} rx={18} ry={10} fill="#15803d" />
    </svg>
  );
}

// ─── Carrot (week 21) ─────────────────────────────────────────────────────
function Carrot() {
  return (
    <svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
      <defs>
        <radialGradient id="carrotGrad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#c2410c" />
        </radialGradient>
      </defs>
      {/* Green top leaves */}
      <path d="M 88 52 Q 70 20 60 10" stroke="#15803d" strokeWidth={8} fill="none" strokeLinecap="round" />
      <path d="M 96 46 Q 92 14 90 4" stroke="#22c55e" strokeWidth={8} fill="none" strokeLinecap="round" />
      <path d="M 104 46 Q 108 14 110 4" stroke="#22c55e" strokeWidth={8} fill="none" strokeLinecap="round" />
      <path d="M 112 52 Q 130 20 140 10" stroke="#15803d" strokeWidth={8} fill="none" strokeLinecap="round" />
      {/* Carrot body */}
      <path d="M 60 80 Q 54 200 100 270 Q 146 200 140 80 Q 120 62 100 60 Q 80 62 60 80 Z" fill="url(#carrotGrad)" />
      {/* Carrot lines */}
      <path d="M 68 110 Q 100 105 132 110" stroke="rgba(194,65,12,0.4)" strokeWidth={2} fill="none" />
      <path d="M 64 140 Q 100 133 136 140" stroke="rgba(194,65,12,0.4)" strokeWidth={2} fill="none" />
      <path d="M 66 170 Q 100 162 134 170" stroke="rgba(194,65,12,0.4)" strokeWidth={2} fill="none" />
      {/* Shine */}
      <ellipse cx={78} cy={100} rx={14} ry={8} fill="rgba(255,255,255,0.2)" transform="rotate(-30 78 100)" />
      {/* Face */}
      <Face cx={100} cy={126} eyeSpread={20} eyeIrisColor="#7c2d12" />
      {/* Arms */}
      <path d="M 62 130 Q 44 110 54 94" stroke="#ea580c" strokeWidth={13} fill="none" strokeLinecap="round" />
      <circle cx={54} cy={93} r={11} fill="#fb923c" />
      <path d="M 138 130 Q 156 110 146 94" stroke="#ea580c" strokeWidth={13} fill="none" strokeLinecap="round" />
      <circle cx={146} cy={93} r={11} fill="#fb923c" />
      {/* Legs */}
      <rect x={82} y={232} width={14} height={34} rx={7} fill="#c2410c" />
      <rect x={104} y={232} width={14} height={34} rx={7} fill="#c2410c" />
      <ellipse cx={89} cy={268} rx={18} ry={10} fill="#92400e" />
      <ellipse cx={111} cy={268} rx={18} ry={10} fill="#92400e" />
    </svg>
  );
}

// ─── Corn (week 24) ───────────────────────────────────────────────────────
function Corn() {
  const kernelRows = [130,144,158,172,186,200,214];
  const kernelCols = [-24,-12,0,12,24];
  return (
    <svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
      {/* Husk leaves */}
      <path d="M 100 50 Q 60 100 50 180" stroke="#15803d" strokeWidth={20} fill="none" strokeLinecap="round" />
      <path d="M 100 50 Q 140 100 150 180" stroke="#166534" strokeWidth={20} fill="none" strokeLinecap="round" />
      <path d="M 100 46 Q 100 90 100 200" stroke="#22c55e" strokeWidth={16} fill="none" strokeLinecap="round" />
      {/* Silk threads at top */}
      {[-8,-4,0,4,8].map((x, i) => (
        <path key={i} d={`M ${100 + x} 46 Q ${102 + x} 30 ${100 + x} 14`} stroke="#fef08a" strokeWidth={1.5} fill="none" strokeLinecap="round" />
      ))}
      {/* Cob body */}
      <rect x={62} y={80} width={76} height={160} rx={38} fill="#fde047" />
      <rect x={62} y={80} width={76} height={160} rx={38} fill="url(#cornGrad)" />
      <defs>
        <radialGradient id="cornGrad" cx="35%" cy="25%" r="70%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#ca8a04" />
        </radialGradient>
      </defs>
      {/* Kernels */}
      {kernelRows.map((y, ri) =>
        kernelCols.map((dx, ci) => {
          const kx = 100 + dx;
          const dist = Math.sqrt(dx * dx);
          if (dist > 28) return null;
          return (
            <ellipse key={`${ri}-${ci}`} cx={kx} cy={y} rx={5.5} ry={4}
              fill={ri % 2 === 0 ? "#fde047" : "#eab308"}
              stroke="#ca8a04" strokeWidth={0.8} />
          );
        })
      )}
      {/* Face */}
      <Face cx={100} cy={128} eyeSpread={19} eyeIrisColor="#78350f" />
      {/* Arms */}
      <path d="M 63 160 Q 46 140 56 124" stroke="#ca8a04" strokeWidth={13} fill="none" strokeLinecap="round" />
      <circle cx={56} cy={123} r={11} fill="#fde047" />
      <path d="M 137 160 Q 154 140 144 124" stroke="#ca8a04" strokeWidth={13} fill="none" strokeLinecap="round" />
      <circle cx={144} cy={123} r={11} fill="#fde047" />
      {/* Legs */}
      <rect x={82} y={238} width={14} height={32} rx={7} fill="#a16207" />
      <rect x={104} y={238} width={14} height={32} rx={7} fill="#a16207" />
      <ellipse cx={89} cy={272} rx={18} ry={10} fill="#166534" />
      <ellipse cx={111} cy={272} rx={18} ry={10} fill="#166534" />
    </svg>
  );
}

// ─── Pineapple (week 33) ──────────────────────────────────────────────────
function Pineapple() {
  return (
    <svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
      <defs>
        <radialGradient id="pineGrad" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#b45309" />
        </radialGradient>
      </defs>
      {/* Crown leaves */}
      <path d="M 100 52 Q 78 20 70 6" stroke="#15803d" strokeWidth={8} fill="none" strokeLinecap="round" />
      <path d="M 100 46 Q 86 16 84 2" stroke="#22c55e" strokeWidth={9} fill="none" strokeLinecap="round" />
      <path d="M 100 42 Q 100 12 100 0" stroke="#16a34a" strokeWidth={10} fill="none" strokeLinecap="round" />
      <path d="M 100 46 Q 114 16 116 2" stroke="#22c55e" strokeWidth={9} fill="none" strokeLinecap="round" />
      <path d="M 100 52 Q 122 20 130 6" stroke="#15803d" strokeWidth={8} fill="none" strokeLinecap="round" />
      {/* Body */}
      <ellipse cx={100} cy={168} rx={72} ry={96} fill="url(#pineGrad)" />
      {/* Diamond pattern */}
      {[[-30,100],[0,90],[30,100],[-45,124],[-15,114],[15,114],[45,124],
        [-30,148],[0,138],[30,148],[-45,172],[-15,162],[15,162],[45,172],
        [-30,196],[0,186],[30,196]].map(([dx, y], i) => (
        <ellipse key={i} cx={100 + dx} cy={y} rx={13} ry={10}
          fill="rgba(180,83,9,0.25)" stroke="rgba(180,83,9,0.4)" strokeWidth={1} />
      ))}
      {/* Face */}
      <Face cx={100} cy={134} eyeSpread={20} eyeIrisColor="#78350f" />
      {/* Arms */}
      <path d="M 29 168 Q 12 146 26 130" stroke="#b45309" strokeWidth={14} fill="none" strokeLinecap="round" />
      <circle cx={26} cy={129} r={12} fill="#fde68a" />
      <path d="M 171 168 Q 188 146 174 130" stroke="#b45309" strokeWidth={14} fill="none" strokeLinecap="round" />
      <circle cx={174} cy={129} r={12} fill="#fde68a" />
      {/* Legs */}
      <rect x={81} y={258} width={16} height={34} rx={8} fill="#92400e" />
      <rect x={103} y={258} width={16} height={34} rx={8} fill="#92400e" />
      <ellipse cx={89} cy={294} rx={20} ry={10} fill="#166534" />
      <ellipse cx={111} cy={294} rx={20} ry={10} fill="#166534" />
    </svg>
  );
}

// ─── Pumpkin (weeks 29, 38, 40) ───────────────────────────────────────────
function Pumpkin() {
  return (
    <svg viewBox="0 0 220 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
      <defs>
        <radialGradient id="pumpGrad" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#c2410c" />
        </radialGradient>
      </defs>
      {/* Stem */}
      <rect x={96} y={26} width={10} height={24} rx={5} fill="#92400e" />
      <path d="M 106 34 Q 124 26 128 14" stroke="#15803d" strokeWidth={5} fill="none" strokeLinecap="round" />
      {/* Pumpkin ribs */}
      <ellipse cx={78} cy={158} rx={44} ry={68} fill="url(#pumpGrad)" />
      <ellipse cx={100} cy={155} rx={52} ry={74} fill="url(#pumpGrad)" />
      <ellipse cx={122} cy={158} rx={44} ry={68} fill="url(#pumpGrad)" />
      {/* Center rib brighter */}
      <ellipse cx={100} cy={155} rx={44} ry={72} fill="#f97316" opacity={0.5} />
      {/* Rib dividers */}
      <path d="M 56 110 Q 60 158 58 206" stroke="rgba(194,65,12,0.5)" strokeWidth={3} fill="none" />
      <path d="M 78 86 Q 82 155 78 224" stroke="rgba(194,65,12,0.5)" strokeWidth={3} fill="none" />
      <path d="M 122 86 Q 118 155 122 224" stroke="rgba(194,65,12,0.5)" strokeWidth={3} fill="none" />
      <path d="M 144 110 Q 140 158 142 206" stroke="rgba(194,65,12,0.5)" strokeWidth={3} fill="none" />
      {/* Shine */}
      <ellipse cx={78} cy={118} rx={16} ry={10} fill="rgba(255,255,255,0.18)" transform="rotate(-30 78 118)" />
      {/* Face */}
      <Face cx={100} cy={145} eyeSpread={22} eyeIrisColor="#7c2d12" />
      {/* Arms */}
      <path d="M 18 158 Q 2 138 16 122" stroke="#ea580c" strokeWidth={14} fill="none" strokeLinecap="round" />
      <circle cx={16} cy={121} r={12} fill="#fb923c" />
      <path d="M 182 158 Q 198 138 184 122" stroke="#ea580c" strokeWidth={14} fill="none" strokeLinecap="round" />
      <circle cx={184} cy={121} r={12} fill="#fb923c" />
      {/* Legs */}
      <rect x={81} y={226} width={16} height={34} rx={8} fill="#c2410c" />
      <rect x={103} y={226} width={16} height={34} rx={8} fill="#c2410c" />
      <ellipse cx={89} cy={262} rx={20} ry={10} fill="#15803d" />
      <ellipse cx={111} cy={262} rx={20} ry={10} fill="#15803d" />
    </svg>
  );
}

// ─── Watermelon (week 39) ─────────────────────────────────────────────────
function Watermelon() {
  return (
    <svg viewBox="0 0 220 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
      <defs>
        <radialGradient id="wmelonGrad" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#15803d" />
        </radialGradient>
      </defs>
      {/* Outer rind */}
      <ellipse cx={110} cy={162} rx={96} ry={86} fill="url(#wmelonGrad)" />
      {/* Stripes */}
      {[-3,-1,1,3].map((i) => (
        <ellipse key={i} cx={110 + i * 22} cy={162} rx={8} ry={84} fill="rgba(21,128,61,0.4)" />
      ))}
      {/* Pink flesh inner */}
      <ellipse cx={110} cy={168} rx={82} ry={72} fill="#f43f5e" />
      <ellipse cx={110} cy={168} rx={82} ry={72} fill="url(#fleshGrad)" />
      <defs>
        <radialGradient id="fleshGrad" cx="38%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="100%" stopColor="#e11d48" />
        </radialGradient>
      </defs>
      {/* Seeds */}
      {[[88,164],[106,156],[124,164],[80,182],[98,176],[116,174],[134,180]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx={5} ry={3} fill="#1e1b4b" transform={`rotate(${(i % 3 - 1) * 15} ${x} ${y})`} />
      ))}
      {/* Shine */}
      <ellipse cx={84} cy={128} rx={18} ry={11} fill="rgba(255,255,255,0.18)" transform="rotate(-35 84 128)" />
      {/* Face */}
      <Face cx={110} cy={152} eyeSpread={22} eyeIrisColor="#881337" />
      {/* Arms */}
      <path d="M 16 162 Q 0 142 14 126" stroke="#15803d" strokeWidth={14} fill="none" strokeLinecap="round" />
      <circle cx={14} cy={125} r={12} fill="#4ade80" />
      <path d="M 204 162 Q 220 142 206 126" stroke="#15803d" strokeWidth={14} fill="none" strokeLinecap="round" />
      <circle cx={206} cy={125} r={12} fill="#4ade80" />
      {/* Legs */}
      <rect x={91} y={244} width={16} height={32} rx={8} fill="#15803d" />
      <rect x={113} y={244} width={16} height={32} rx={8} fill="#15803d" />
      <ellipse cx={99} cy={278} rx={20} ry={10} fill="#166534" />
      <ellipse cx={121} cy={278} rx={20} ry={10} fill="#166534" />
    </svg>
  );
}

// ─── Eggplant (week 28) ───────────────────────────────────────────────────
function Eggplant() {
  return (
    <OvalChar
      cx={100} cy={162} rx={68} ry={90} fill1="#a855f7" fill2="#581c87" gradId="eggGrad"
      top={
        <g>
          <rect x={95} y={22} width={10} height={22} rx={5} fill="#4d7c0f" />
          <ellipse cx={82} cy={38} rx={18} ry={9} fill="#65a30d" transform="rotate(-20 82 38)" />
          <ellipse cx={118} cy={38} rx={18} ry={9} fill="#65a30d" transform="rotate(20 118 38)" />
          <ellipse cx={100} cy={34} rx={12} ry={8} fill="#84cc16" />
        </g>
      }
      armColor="#7e22ce" shoeColor="#4d7c0f" eyeIrisColor="#3b0764"
    />
  );
}

// ─── Bell Pepper (week 18) ────────────────────────────────────────────────
function BellPepper() {
  return (
    <svg viewBox="0 0 200 310" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
      <defs>
        <radialGradient id="pepperGrad" cx="38%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#86efac" />
          <stop offset="100%" stopColor="#15803d" />
        </radialGradient>
      </defs>
      {/* Stem */}
      <rect x={95} y={22} width={10} height={22} rx={5} fill="#92400e" />
      <ellipse cx={88} cy={34} rx={14} ry={7} fill="#15803d" transform="rotate(-20 88 34)" />
      <ellipse cx={112} cy={34} rx={14} ry={7} fill="#16a34a" transform="rotate(20 112 34)" />
      {/* Bell pepper body - 4 lobes */}
      <ellipse cx={76} cy={168} rx={42} ry={68} fill="url(#pepperGrad)" />
      <ellipse cx={100} cy={162} rx={48} ry={74} fill="url(#pepperGrad)" />
      <ellipse cx={124} cy={168} rx={42} ry={68} fill="url(#pepperGrad)" />
      {/* Center seam highlights */}
      <path d="M 58 110 Q 60 165 60 220" stroke="rgba(21,128,61,0.4)" strokeWidth={2.5} fill="none" />
      <path d="M 142 110 Q 140 165 140 220" stroke="rgba(21,128,61,0.4)" strokeWidth={2.5} fill="none" />
      <path d="M 100 88 Q 100 162 100 230" stroke="rgba(21,128,61,0.3)" strokeWidth={2} fill="none" />
      {/* Shine */}
      <ellipse cx={76} cy={118} rx={16} ry={10} fill="rgba(255,255,255,0.2)" transform="rotate(-30 76 118)" />
      {/* Face */}
      <Face cx={100} cy={148} eyeSpread={22} eyeIrisColor="#14532d" />
      {/* Arms */}
      <path d="M 20 168 Q 4 148 18 132" stroke="#15803d" strokeWidth={13} fill="none" strokeLinecap="round" />
      <circle cx={18} cy={131} r={11} fill="#22c55e" />
      <path d="M 180 168 Q 196 148 182 132" stroke="#15803d" strokeWidth={13} fill="none" strokeLinecap="round" />
      <circle cx={182} cy={131} r={11} fill="#22c55e" />
      {/* Legs */}
      <rect x={82} y={232} width={15} height={34} rx={7} fill="#15803d" />
      <rect x={103} y={232} width={15} height={34} rx={7} fill="#15803d" />
      <ellipse cx={90} cy={268} rx={19} ry={10} fill="#166534" />
      <ellipse cx={111} cy={268} rx={19} ry={10} fill="#166534" />
    </svg>
  );
}

// ─── Cauliflower (week 25) ────────────────────────────────────────────────
function Cauliflower() {
  const florets = [
    [100,82,32],[72,100,26],[128,100,26],[58,126,22],[100,114,30],[142,126,22],
    [72,140,24],[128,140,24],[96,148,26],[104,148,26],
  ];
  return (
    <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
      {/* Leaves base */}
      <ellipse cx={62} cy={194} rx={32} ry={16} fill="#16a34a" transform="rotate(-20 62 194)" />
      <ellipse cx={138} cy={194} rx={32} ry={16} fill="#15803d" transform="rotate(20 138 194)" />
      <ellipse cx={100} cy={200} rx={50} ry={14} fill="#22c55e" />
      {/* Florets */}
      {florets.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={i % 3 === 0 ? "#f8fafc" : i % 3 === 1 ? "#f1f5f9" : "#e2e8f0"} />
      ))}
      {florets.map(([x, y, r], i) => (
        <circle key={i + 20} cx={x} cy={y} r={r} fill="none" stroke="rgba(148,163,184,0.4)" strokeWidth={1.5} />
      ))}
      {/* Face on front floret */}
      <Face cx={100} cy={130} eyeSpread={20} eyeIrisColor="#475569" />
      {/* Arms */}
      <path d="M 26 170 Q 10 150 24 134" stroke="#94a3b8" strokeWidth={13} fill="none" strokeLinecap="round" />
      <circle cx={24} cy={133} r={11} fill="#e2e8f0" />
      <path d="M 174 170 Q 190 150 176 134" stroke="#94a3b8" strokeWidth={13} fill="none" strokeLinecap="round" />
      <circle cx={176} cy={133} r={11} fill="#e2e8f0" />
      {/* Legs */}
      <rect x={82} y={212} width={15} height={32} rx={7} fill="#16a34a" />
      <rect x={103} y={212} width={15} height={32} rx={7} fill="#16a34a" />
      <ellipse cx={90} cy={246} rx={19} ry={10} fill="#15803d" />
      <ellipse cx={111} cy={246} rx={19} ry={10} fill="#15803d" />
    </svg>
  );
}

// ─── Leafy Green (weeks 26, 30, 36, 37) ──────────────────────────────────
function LeafyGreen({ shade1 = "#22c55e", shade2 = "#15803d", shade3 = "#166534" }: { shade1?: string; shade2?: string; shade3?: string }) {
  return (
    <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
      {/* Outer leaves */}
      <ellipse cx={60} cy={154} rx={48} ry={70} fill={shade3} transform="rotate(-18 60 154)" />
      <ellipse cx={140} cy={154} rx={48} ry={70} fill={shade2} transform="rotate(18 140 154)" />
      <ellipse cx={100} cy={145} rx={55} ry={78} fill={shade1} />
      {/* Inner leaves */}
      <ellipse cx={78} cy={150} rx={36} ry={60} fill={shade2} transform="rotate(-10 78 150)" />
      <ellipse cx={122} cy={150} rx={36} ry={60} fill={shade3} transform="rotate(10 122 150)" />
      <ellipse cx={100} cy={146} rx={38} ry={64} fill={shade1} opacity={0.8} />
      {/* Leaf veins */}
      <path d="M 100 88 Q 100 145 100 210" stroke={shade3} strokeWidth={2} fill="none" opacity={0.5} />
      <path d="M 100 120 Q 80 130 62 140" stroke={shade3} strokeWidth={1.5} fill="none" opacity={0.4} />
      <path d="M 100 120 Q 120 130 138 140" stroke={shade3} strokeWidth={1.5} fill="none" opacity={0.4} />
      {/* Face */}
      <Face cx={100} cy={138} eyeSpread={20} eyeIrisColor={shade3} />
      {/* Arms */}
      <path d="M 18 158 Q 2 138 16 122" stroke={shade2} strokeWidth={13} fill="none" strokeLinecap="round" />
      <circle cx={16} cy={121} r={11} fill={shade1} />
      <path d="M 182 158 Q 198 138 184 122" stroke={shade2} strokeWidth={13} fill="none" strokeLinecap="round" />
      <circle cx={184} cy={121} r={11} fill={shade1} />
      {/* Legs */}
      <rect x={82} y={222} width={15} height={34} rx={7} fill={shade2} />
      <rect x={103} y={222} width={15} height={34} rx={7} fill={shade2} />
      <ellipse cx={90} cy={258} rx={19} ry={10} fill={shade3} />
      <ellipse cx={111} cy={258} rx={19} ry={10} fill={shade3} />
    </svg>
  );
}

// ─── Melon (weeks 34, 35) ─────────────────────────────────────────────────
function Melon({ fill1, fill2, gradId, lineColor, shoeColor }: {
  fill1: string; fill2: string; gradId: string; lineColor: string; shoeColor: string;
}) {
  return (
    <OvalChar
      cx={100} cy={155} rx={88} ry={80} fill1={fill1} fill2={fill2} gradId={gradId}
      top={
        <g>
          <rect x={95} y={18} width={10} height={22} rx={5} fill="#92400e" />
          {/* melon lines */}
          {[-30, -10, 10, 30].map((dx, i) => (
            <path key={i} d={`M ${100 + dx} 38 Q ${100 + dx * 1.2} 155 ${100 + dx} 272`}
              stroke={lineColor} strokeWidth={1.5} fill="none" opacity={0.35} />
          ))}
        </g>
      }
      armColor={fill2} shoeColor={shoeColor} eyeIrisColor="#78350f"
    />
  );
}

// ─── Week → Character map ─────────────────────────────────────────────────
export default function WeekCharacter({ week }: { week: number }) {
  switch (week) {
    // Weeks 1–5: tiny seed characters
    case 1:
      return <TinySeed fill1="#fda4af" fill2="#e11d48" gradId="seed1" topColor="#15803d" />;
    case 2:
      return <TinySeed fill1="#fef9c3" fill2="#ca8a04" gradId="seed2" topColor="#92400e" />;
    case 3:
      return <TinySeed fill1="#bbf7d0" fill2="#15803d" gradId="seed3" topColor="#16a34a" />;
    case 4:
      return <TinySeed fill1="#bbf7d0" fill2="#166534" gradId="seed4" topColor="#65a30d" />;
    case 5:
      return <TinySeed fill1="#d1fae5" fill2="#0d9488" gradId="seed5" topColor="#15803d" />;

    case 6:  return <SweetPea />;
    case 7:  return <Blueberry />;
    case 8:  return <Raspberry />;

    // Grape (week 9) — purple circle
    case 9:
      return (
        <RoundChar cx={100} cy={150} r={78} fill1="#c084fc" fill2="#581c87" gradId="grape"
          top={
            <g>
              <rect x={95} y={22} width={10} height={24} rx={5} fill="#92400e" />
              <path d="M 105 34 Q 122 24 126 14" stroke="#15803d" strokeWidth={5} fill="none" strokeLinecap="round" />
            </g>
          }
          armColor="#7e22ce" shoeColor="#15803d" eyeIrisColor="#3b0764"
        />
      );

    // Kumquat (week 10) — small orange oval
    case 10:
      return (
        <OvalChar cx={100} cy={155} rx={64} ry={80} fill1="#fed7aa" fill2="#c2410c" gradId="kumquat"
          top={
            <g>
              <rect x={95} y={26} width={10} height={20} rx={5} fill="#92400e" />
              <ellipse cx={86} cy={40} rx={14} ry={7} fill="#15803d" transform="rotate(-25 86 40)" />
              <ellipse cx={114} cy={40} rx={14} ry={7} fill="#15803d" transform="rotate(25 114 40)" />
            </g>
          }
          armColor="#ea580c" shoeColor="#15803d" eyeIrisColor="#7c2d12"
        />
      );

    // Fig (week 11) — dark purple teardrop
    case 11:
      return (
        <OvalChar cx={100} cy={158} rx={66} ry={88} fill1="#d8b4fe" fill2="#581c87" gradId="fig"
          top={
            <g>
              <rect x={95} y={22} width={10} height={20} rx={5} fill="#92400e" />
              <circle cx={100} cy={20} r={6} fill="#92400e" />
            </g>
          }
          armColor="#7e22ce" shoeColor="#92400e" eyeIrisColor="#3b0764"
        />
      );

    // Lime (week 12) — green oval
    case 12:
      return (
        <OvalChar cx={100} cy={155} rx={70} ry={84} fill1="#bbf7d0" fill2="#15803d" gradId="lime"
          top={
            <g>
              <rect x={95} y={22} width={10} height={22} rx={5} fill="#92400e" />
              <ellipse cx={100} cy={20} r={7} fill="#15803d" />
            </g>
          }
          armColor="#15803d" shoeColor="#166534" eyeIrisColor="#14532d"
        />
      );

    // Lemon (week 13) — yellow pointed oval
    case 13:
      return (
        <OvalChar cx={100} cy={155} rx={72} ry={84} fill1="#fef08a" fill2="#ca8a04" gradId="lemon"
          top={
            <g>
              <ellipse cx={100} cy={36} rx={10} ry={20} fill="#fde047" />
              <ellipse cx={100} cy={16} rx={6} ry={8} fill="#ca8a04" />
            </g>
          }
          armColor="#ca8a04" shoeColor="#166534" eyeIrisColor="#78350f"
        />
      );

    // Peach (week 14) — pink/orange round
    case 14:
      return (
        <RoundChar cx={100} cy={150} r={78} fill1="#fda4af" fill2="#f97316" gradId="peach"
          top={
            <g>
              <rect x={95} y={22} width={10} height={22} rx={5} fill="#92400e" />
              <ellipse cx={88} cy={36} rx={14} ry={7} fill="#15803d" transform="rotate(-25 88 36)" />
              {/* Peach crease */}
              <path d="M 100 72 Q 98 110 100 150" stroke="rgba(234,88,12,0.35)" strokeWidth={4} fill="none" />
            </g>
          }
          armColor="#ea580c" shoeColor="#92400e" eyeIrisColor="#7c2d12"
        />
      );

    // Apple (week 15) — red round with indent
    case 15:
      return (
        <RoundChar cx={100} cy={152} r={80} fill1="#fca5a5" fill2="#b91c1c" gradId="apple"
          top={
            <g>
              <path d="M 100 68 Q 100 52 100 40" stroke="#92400e" strokeWidth={7} strokeLinecap="round" fill="none" />
              <ellipse cx={112} cy={46} rx={14} ry={7} fill="#15803d" transform="rotate(20 112 46)" />
              {/* Apple indent */}
              <path d="M 94 72 Q 100 66 106 72" stroke="rgba(185,28,28,0.5)" strokeWidth={3} fill="none" strokeLinecap="round" />
            </g>
          }
          armColor="#b91c1c" shoeColor="#15803d" eyeIrisColor="#7f1d1d"
        />
      );

    case 16: return <Avocado />;

    // Turnip (week 17) — white/purple bulb
    case 17:
      return (
        <RoundChar cx={100} cy={152} r={78} fill1="#f3e8ff" fill2="#9333ea" gradId="turnip"
          top={
            <g>
              <ellipse cx={80} cy={58} rx={12} ry={24} fill="#15803d" transform="rotate(-20 80 58)" />
              <ellipse cx={100} cy={52} rx={12} ry={26} fill="#22c55e" />
              <ellipse cx={120} cy={58} rx={12} ry={24} fill="#15803d" transform="rotate(20 120 58)" />
              {/* Purple top */}
              <ellipse cx={100} cy={100} rx={78} ry={30} fill="#9333ea" />
            </g>
          }
          armColor="#7e22ce" shoeColor="#15803d" eyeIrisColor="#581c87"
        />
      );

    case 18: return <BellPepper />;

    // Tomato (week 19) — red circle with leaves
    case 19:
      return (
        <RoundChar cx={100} cy={150} r={78} fill1="#fca5a5" fill2="#dc2626" gradId="tomato"
          top={
            <g>
              <rect x={95} y={28} width={10} height={18} rx={5} fill="#92400e" />
              <ellipse cx={80} cy={48} rx={18} ry={8} fill="#15803d" transform="rotate(-25 80 48)" />
              <ellipse cx={100} cy={42} rx={14} ry={8} fill="#22c55e" />
              <ellipse cx={120} cy={48} rx={18} ry={8} fill="#15803d" transform="rotate(25 120 48)" />
            </g>
          }
          armColor="#b91c1c" shoeColor="#15803d" eyeIrisColor="#7f1d1d"
        />
      );

    case 20: return <Banana />;
    case 21: return <Carrot />;

    // Coconut (weeks 22, 31) — brown circle with texture
    case 22:
    case 31:
      return (
        <RoundChar cx={100} cy={150} r={78} fill1="#d6d3d1" fill2="#78350f" gradId="coconut"
          top={
            <g>
              <ellipse cx={76} cy={52} rx={14} ry={28} fill="#15803d" transform="rotate(-25 76 52)" />
              <ellipse cx={100} cy={44} rx={14} ry={30} fill="#22c55e" />
              <ellipse cx={124} cy={52} rx={14} ry={28} fill="#15803d" transform="rotate(25 124 52)" />
              {/* Coconut eyes (the natural 3 spots) */}
              <circle cx={88} cy={100} r={5} fill="#292524" />
              <circle cx={100} cy={98} r={5} fill="#292524" />
              <circle cx={112} cy={100} r={5} fill="#292524" />
            </g>
          }
          armColor="#92400e" shoeColor="#15803d" eyeIrisColor="#292524"
        />
      );

    // Grapefruit (week 23) — large orange circle
    case 23:
      return (
        <RoundChar cx={100} cy={150} r={80} fill1="#fed7aa" fill2="#ea580c" gradId="grapefruit"
          top={
            <g>
              <rect x={95} y={22} width={10} height={20} rx={5} fill="#92400e" />
              <ellipse cx={84} cy={36} rx={16} ry={8} fill="#15803d" transform="rotate(-20 84 36)" />
              <ellipse cx={116} cy={36} rx={16} ry={8} fill="#15803d" transform="rotate(20 116 36)" />
              {/* Grapefruit segments */}
              {[0,45,90,135,180,225,270,315].map((a, i) => (
                <line key={i} x1={100} y1={150} x2={100 + 60 * Math.cos(a * Math.PI / 180)} y2={150 + 60 * Math.sin(a * Math.PI / 180)} stroke="rgba(234,88,12,0.2)" strokeWidth={1.5} />
              ))}
            </g>
          }
          armColor="#c2410c" shoeColor="#15803d" eyeIrisColor="#7c2d12"
        />
      );

    case 24: return <Corn />;
    case 25: return <Cauliflower />;
    case 26: return <LeafyGreen shade1="#4ade80" shade2="#15803d" shade3="#166534" />;

    // Rutabaga (week 27) — cream/purple
    case 27:
      return (
        <RoundChar cx={100} cy={152} r={78} fill1="#faf5ff" fill2="#a855f7" gradId="rutabaga"
          top={
            <g>
              <ellipse cx={82} cy={56} rx={11} ry={24} fill="#16a34a" transform="rotate(-20 82 56)" />
              <ellipse cx={100} cy={50} rx={11} ry={26} fill="#22c55e" />
              <ellipse cx={118} cy={56} rx={11} ry={24} fill="#16a34a" transform="rotate(20 118 56)" />
              <ellipse cx={100} cy={96} rx={78} ry={26} fill="#c084fc" />
            </g>
          }
          armColor="#9333ea" shoeColor="#16a34a" eyeIrisColor="#581c87"
        />
      );

    case 28: return <Eggplant />;

    // Butternut squash (week 29) — tan pear
    case 29:
      return (
        <OvalChar cx={100} cy={162} rx={66} ry={92} fill1="#fed7aa" fill2="#92400e" gradId="bsquash"
          top={
            <g>
              <rect x={95} y={22} width={10} height={22} rx={5} fill="#92400e" />
              <ellipse cx={87} cy={36} rx={15} ry={7} fill="#15803d" transform="rotate(-22 87 36)" />
              <ellipse cx={113} cy={36} rx={15} ry={7} fill="#16a34a" transform="rotate(22 113 36)" />
            </g>
          }
          armColor="#b45309" shoeColor="#15803d" eyeIrisColor="#78350f"
        />
      );

    case 30: return <LeafyGreen shade1="#86efac" shade2="#166534" shade3="#14532d" />;

    // Jicama (week 32) — brown/cream round
    case 32:
      return (
        <RoundChar cx={100} cy={150} r={78} fill1="#fef3c7" fill2="#92400e" gradId="jicama"
          top={
            <g>
              <rect x={95} y={24} width={10} height={20} rx={5} fill="#78350f" />
              <ellipse cx={86} cy={38} rx={14} ry={7} fill="#15803d" transform="rotate(-22 86 38)" />
              <ellipse cx={114} cy={38} rx={14} ry={7} fill="#166534" transform="rotate(22 114 38)" />
            </g>
          }
          armColor="#92400e" shoeColor="#166534" eyeIrisColor="#78350f"
        />
      );

    case 33: return <Pineapple />;

    // Cantaloupe (week 34) — orange melon
    case 34:
      return (
        <Melon fill1="#fed7aa" fill2="#c2410c" gradId="cantaloupe"
          lineColor="#b45309" shoeColor="#166534"
        />
      );

    // Honeydew (week 35) — pale green melon
    case 35:
      return (
        <Melon fill1="#d1fae5" fill2="#15803d" gradId="honeydew"
          lineColor="#166534" shoeColor="#92400e"
        />
      );

    case 36: return <LeafyGreen shade1="#4ade80" shade2="#16a34a" shade3="#15803d" />;
    case 37: return <LeafyGreen shade1="#86efac" shade2="#15803d" shade3="#14532d" />;

    case 38:
    case 40:
      return <Pumpkin />;

    case 39: return <Watermelon />;

    default:
      return <Blueberry />;
  }
}
