import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 flex flex-col items-center justify-center px-6 text-center">
      <p className="text-7xl mb-6">🤰</p>
      <h1 className="text-4xl font-bold text-purple-900 mb-3">Hello, Mama.</h1>
      <p className="text-purple-700 text-lg max-w-sm mb-10 leading-relaxed">
        Your little one has been waiting to talk to you. Check your weekly link to hear from them.
      </p>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Link
          href="/week/1"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-2xl text-lg transition-all active:scale-95 shadow-lg"
        >
          Open Week 1 💌
        </Link>
        <Link
          href="/wrapped"
          className="bg-white/40 border border-white/60 text-purple-800 font-semibold py-4 rounded-2xl text-base transition-all active:scale-95"
        >
          View pregnancy wrapped 🎁
        </Link>
      </div>

      <p className="mt-10 text-purple-400 text-xs">made with love, for the three of us</p>
    </main>
  );
}
