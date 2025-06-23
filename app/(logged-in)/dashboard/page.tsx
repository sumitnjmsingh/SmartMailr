"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Mail } from "lucide-react";
import { ChevronDown } from "lucide-react";
import {
  SignInButton,
  SignOutButton,
  SignedOut,
  SignedIn,
} from "@clerk/nextjs";
import Link from "next/link";
import { Loader2 } from "lucide-react";

type ClerkUser = {
  id: string;
  email_addresses: { email_address: string }[];
  first_name: string | null;
  last_name: string | null;
};

export default function DashboardPage() {
  const [prompt, setPrompt] = useState("");
  const [subject, setSubject] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<ClerkUser[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<string>("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/clerk-users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    }
    fetchUsers();
  }, []);

  const handleGenerate = async () => {
    if (!subject.trim()) return toast.error("Please enter an email subject.");
    if (!prompt.trim()) return toast.error("Please enter a prompt.");
    if (!selectedEmail) return toast.error("Please select a recipient email.");

    setLoading(true);
    try {
      const res = await fetch("/api/generate-email", {
        method: "POST",
        body: JSON.stringify({ prompt, subject, email: selectedEmail }),
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
      <header className="px-6 py-2 flex justify-between items-center shadow bg-white">
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
            <Link href="/" className="text-indigo-600">
              Home
            </Link>
            <Link href="/users" className="text-indigo-600">
              Users
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
          Describe what you want to say, select an email, and let AI draft it.
        </p>

        <SignedIn>
          <div className="space-y-4 text-left">
            {/* Email Dropdown */}
            <div>
              <label className="text-md font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Mail className="w-5 h-5 text-indigo-600" />
                Send To
              </label>
              <div className="relative">
                <select
                  className="appearance-none w-full p-3 pr-10 border border-gray-300 rounded-lg shadow-sm text-gray-700 bg-white transition-all duration-200 
               focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-400"
                  value={selectedEmail}
                  onChange={(e) => setSelectedEmail(e.target.value)}
                >
                  <option value="" disabled className="text-gray-400">
                    Select Email
                  </option>
                  {users.map((u) => (
                    <option
                      key={u.id}
                      value={u.email_addresses[0]?.email_address}
                      className="text-gray-700"
                    >
                      {u.first_name} {u.last_name} (
                      {u.email_addresses[0]?.email_address})
                    </option>
                  ))}
                </select>

                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <ChevronDown size={18} />
                </div>
              </div>
            </div>

            <input
              type="text"
              className="w-full p-3 border border-gray-300 bg-white shadow-lg rounded-lg"
              placeholder="Email Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
              className="w-full p-3 border border-gray-300 bg-white shadow-lg rounded-lg"
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
