export default function HowItWorksSection() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6">
          How It Works
        </h2>
        <ol className="space-y-6 text-left max-w-2xl mx-auto text-gray-700 list-decimal list-inside">
          <li>
            📝 Describe your email’s purpose (e.g., job inquiry, sales pitch,
            follow-up).
          </li>
          <li>
            ⚙️ Our AI (powered by Google Gemini) generates a well-crafted draft.
          </li>
          <li>
            📋 Copy, save, or modify the email in your personal dashboard.
          </li>
          <li>✅ Done! Use it directly or refine it further.</li>
        </ol>
      </div>
    </section>
  );
}
