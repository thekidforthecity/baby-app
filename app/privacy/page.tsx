export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-12 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-gray-500 text-sm mb-8">Last updated: April 2026</p>

      <div className="space-y-6 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">About this app</h2>
          <p>Preggy Tracker is a private, personal application built for one family to document a pregnancy journey. It is not a public service.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Data we collect</h2>
          <p>This app collects text responses and video recordings submitted voluntarily by the user. Data is stored securely in Supabase and is not shared with any third parties.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">SMS messaging</h2>
          <p>Weekly SMS messages are sent to a single pre-registered phone number. Message and data rates may apply. Messages are sent once per week. To opt out, reply STOP to any message.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Data sharing</h2>
          <p>We do not sell, share, or distribute any personal data to third parties for marketing or any other purposes.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Contact</h2>
          <p>For any questions, reply HELP to any message.</p>
        </section>
      </div>
    </main>
  );
}
