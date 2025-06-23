"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold mb-4">
          AI-Powered Email Writing Assistant
        </h1>
        <p className="text-xl mb-6">
          Write smarter, faster, and more professional emails using the power of
          Generative AI.
        </p>
        <SignedOut>
          <SignInButton>
            <button className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition hover:cursor-pointer">
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
  );
}
