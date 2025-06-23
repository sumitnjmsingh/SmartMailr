export default function FeatureSection() {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-12">
          What You Can Do
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              title: "✨ AI Email Generation",
              desc: "Describe what you want to say, and get a professional email instantly using Gemini AI.",
            },
            {
              title: "📨 Save & Manage Emails",
              desc: "Every email you generate is saved to your dashboard for future editing or copying.",
            },
            {
              title: "🔒 Auth with Clerk",
              desc: "Secure authentication with Clerk—sign in via Google, GitHub, or email.",
            },
            {
              title: "📊 Smart Suggestions",
              desc: "AI improves your prompt with suggestions and rewrites for tone and clarity.",
            },
            {
              title: "📅 Timely Follow-Ups",
              desc: "Generate polite follow-up emails or reminders based on your past emails.",
            },
            {
              title: "🌐 24/7 Availability",
              desc: "Use it anytime, anywhere—fully web-based and optimized for mobile.",
            },
          ].map((f, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                {f.title}
              </h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
