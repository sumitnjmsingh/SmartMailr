"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function CTASection() {
  return (
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
  );
}
