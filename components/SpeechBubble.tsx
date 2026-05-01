interface SpeechBubbleProps {
  message: string;
}

export default function SpeechBubble({ message }: SpeechBubbleProps) {
  return (
    <div className="relative max-w-md mx-auto">
      <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-3xl px-6 py-5 shadow-xl">
        <p className="text-white text-base leading-relaxed text-center font-medium">
          {message}
        </p>
      </div>
      {/* bubble tail pointing up */}
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0"
        style={{
          borderLeft: "12px solid transparent",
          borderRight: "12px solid transparent",
          borderBottom: "14px solid rgba(255,255,255,0.2)",
        }}
      />
    </div>
  );
}
