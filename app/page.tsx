"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function LandingPage() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-4">
            AI-Powered Email Writing Assistant
          </h1>
          <p className="text-xl mb-6">
            Write smarter, faster, and more professional emails using the power
            of Generative AI.
          </p>
          <SignedOut>
            <SignInButton>
              <button  className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition hover:cursor-pointer">
                Get Started Free
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link
              href="/dashboard"
              className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
            >
              Go to Dashboard
            </Link>
          </SignedIn>
        </div>
      </section>

      {/* Features */}
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

      {/* How It Works */}
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
              ⚙️ Our AI (powered by Google Gemini) generates a well-crafted
              draft.
            </li>
            <li>
              📋 Copy, save, or modify the email in your personal dashboard.
            </li>
            <li>✅ Done! Use it directly or refine it further.</li>
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-700 text-white text-center py-16 px-6">
        <h2 className="text-3xl font-bold mb-4">
          Start Writing Smarter Emails Today
        </h2>
        <p className="mb-6 text-lg">
          No downloads. No complicated setup. Just type and generate.
        </p>
        <SignedOut>
          <SignInButton>
            <button className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition hover:cursor-pointer">
              Get Started Now
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <Link
            href="/dashboard"
            className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
          >
            Go to Dashboard
          </Link>
        </SignedIn>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-400 text-sm border-t">
        &copy; {new Date().getFullYear()} AI Email Agent. Built with ❤️ and AI.
      </footer>
    </div>
  );
}
