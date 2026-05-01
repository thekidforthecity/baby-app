export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-12 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms and Conditions</h1>
      <p className="text-gray-500 text-sm mb-8">Last updated: April 2026</p>

      <div className="space-y-6 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Program description</h2>
          <p>Preggy Tracker sends weekly SMS messages to one registered recipient containing a link to a personal pregnancy memory app. Messages are sent once per week for up to 40 weeks.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Message frequency</h2>
          <p>You will receive approximately 1 message per week.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Message and data rates</h2>
          <p>Message and data rates may apply depending on your mobile carrier plan.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Opt-out</h2>
          <p>To stop receiving messages, reply <strong>STOP</strong> to any message. You will receive a confirmation and no further messages will be sent.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Support</h2>
          <p>For help, reply <strong>HELP</strong> to any message.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Privacy</h2>
          <p>Your data is never shared with third parties. See our <a href="/privacy" className="text-purple-600 underline">Privacy Policy</a> for full details.</p>
        </section>
      </div>
    </main>
  );
}
