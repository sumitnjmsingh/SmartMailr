"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  SignInButton,
  SignOutButton,
  SignedOut,
  SignedIn,
} from "@clerk/nextjs";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const [prompt, setPrompt] = useState("");
  const [subject, setSubject] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!subject.trim()) {
      toast.error("Please enter an email subject.");
      return;
    }

    if (!prompt.trim()) {
      toast.error("Please enter a prompt or email content.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/generate-email", {
        method: "POST",
        body: JSON.stringify({ prompt, subject }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setResponse(data.body);
    } catch (error) {
      console.error("Failed to generate email:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-white text-gray-800">
      <header className="px-6 py-4 flex justify-between items-center shadow bg-white">
        <h1 className="text-xl font-bold text-indigo-600">SmartEmailr</h1>
        <nav className="space-x-4 flex items-center">
          <SignedOut>
            <SignInButton>
              <button className="text-indigo-600 hover:underline">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/" className="text-indigo-600 hover:cursor-pointer">
              LandingPage
            </Link>
            <SignOutButton>
              <button className="ml-4 text-sm bg-purple-600 p-2 rounded-lg text-white hover:cursor-pointer">
                Sign Out
              </button>
            </SignOutButton>
          </SignedIn>
        </nav>
      </header>

      <section className="text-center py-16 px-6 max-w-3xl mx-auto">
        <h2 className="text-4xl font-extrabold text-indigo-700 mb-4">
          Write Better Emails with AI
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Describe what you want to say, and let AI craft the perfect email.
        </p>
        <SignedIn>
          <div className="space-y-4">
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Email Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Describe the email content you want..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={5}
            />
            <button
              onClick={handleGenerate}
              disabled={loading}
              className={`flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:cursor-pointer transition ${
                loading
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:bg-indigo-700"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  Generating...
                </>
              ) : (
                "✨ Generate Email"
              )}
            </button>

            {response && (
              <div className="mt-6 bg-gray-100 p-4 rounded-lg text-left whitespace-pre-wrap">
                <h3 className="font-semibold text-gray-700 mb-2">
                  Generated Email:
                </h3>
                {response}
              </div>
            )}
          </div>
        </SignedIn>
        <SignedOut>
          <p className="text-gray-500 text-md">
            Please sign in to generate emails using AI.
          </p>
        </SignedOut>
      </section>
    </div>
  );
}
