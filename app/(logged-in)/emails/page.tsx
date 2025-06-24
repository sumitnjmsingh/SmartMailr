"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Share2, ThumbsUp, X, Menu } from "lucide-react";
import { toast } from "react-hot-toast";
import {
  SignInButton,
  SignOutButton,
  SignedOut,
  SignedIn,
} from "@clerk/nextjs";
import Link from "next/link";

type EmailEntry = {
  id: string;
  subject: string;
  body: string;
  createdAt: string;
};

export default function EmailListPage() {
  const [emails, setEmails] = useState<EmailEntry[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<EmailEntry | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchEmails() {
      try {
        const res = await fetch("/api/emails");
        const data = await res.json();
        setEmails(data);
      } catch (err) {
        console.error("Failed to load emails", err);
        toast.error("Could not fetch emails");
      }
    }
    fetchEmails();
  }, []);

  const handleCardClick = (email: EmailEntry) => {
    setSelectedEmail(email);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="px-6 py-3 flex justify-between items-center shadow bg-white relative z-50">
        <Link href="/">
          <h1 className="text-xl font-bold text-indigo-600">SmartEmailr</h1>
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-indigo-600 hover:text-indigo-800"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex space-x-4 items-center">
          <SignedOut>
            <SignInButton>
              <button className="text-indigo-600 hover:underline">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Link href="/users" className="text-indigo-600">
              Users
            </Link>
            <Link href="/admin/block-user" className="text-indigo-600">
              BUser
            </Link>
            <Link href="/dashboard" className="text-indigo-600">
              Dashboard
            </Link>
            <SignOutButton>
              <button className="text-sm bg-purple-600 p-2 rounded-lg text-white">
                Sign Out
              </button>
            </SignOutButton>
          </SignedIn>
        </nav>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-full right-1 mt-2 w-36 bg-white border border-gray-200 rounded shadow-lg p-4 space-y-1 text-center lg:hidden">
            <SignedOut>
              <SignInButton>
                <button className="text-indigo-600 hover:underline w-full text-left">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <Link href="/users" className="block text-indigo-600">
                Users
              </Link>
              <Link href="/admin/block-user" className="block text-indigo-600">
                BUser
              </Link>
              <Link href="/dashboard" className="text-indigo-600">
                Dashboard
              </Link>
              <SignOutButton>
                <button className="text-sm bg-purple-600 px-3 py-1 rounded-lg text-white w-full text-left">
                  Sign Out
                </button>
              </SignOutButton>
            </SignedIn>
          </div>
        )}
      </header>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-indigo-700">
          📬 All Emails
        </h1>

        {emails.length === 0 ? (
          <p className="text-gray-500">No emails found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {emails.map((email) => (
              <div
                key={email.id}
                className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition-all p-4 flex flex-col justify-between hover:cursor-pointer hover:bg-indigo-50"
                onClick={() => handleCardClick(email)}
              >
                <div>
                  <h2 className="text-lg font-semibold text-indigo-700 mb-1">
                    {email.subject}
                  </h2>
                  <p className="text-gray-700 text-sm line-clamp-4 mb-4">
                    {email.body}
                  </p>
                </div>

                <div
                  className="mt-auto pt-2 flex items-center justify-start gap-4 text-gray-600 text-sm"
                  onClick={(e) => e.stopPropagation()} // prevent modal on icon click
                >
                  <button
                    className="flex items-center gap-1 hover:text-indigo-600 hover:cursor-pointer transition"
                    onClick={() => toast("👍 Liked!")}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    Like
                  </button>

                  <button
                    className="flex items-center gap-1 hover:text-indigo-600 transition hover:cursor-pointer"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(email.body);
                        toast("📋 Copied to clipboard!");
                      } catch (error) {
                        console.error("Failed to copy:", error);
                        toast.error("Failed to copy to clipboard");
                      }
                    }}
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>

                  <button
                    className="flex items-center gap-1 hover:text-indigo-600 transition hover:cursor-pointer"
                    onClick={() => toast("💬 Comment coming soon!")}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Comment
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for full view */}
        {selectedEmail && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white max-w-2xl w-full p-6 rounded-lg shadow-lg relative overflow-y-auto max-h-[90vh]">
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-red-600 hover:cursor-pointer"
                onClick={() => setSelectedEmail(null)}
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-bold text-indigo-700 mb-4">
                {selectedEmail.subject}
              </h2>
              <p className="text-gray-800 whitespace-pre-wrap">
                {selectedEmail.body}
              </p>

              <div className="mt-6 flex items-center gap-6 text-sm text-gray-600">
                <button
                  className="flex items-center gap-1 hover:text-indigo-600 transition"
                  onClick={() => toast("👍 Liked!")}
                >
                  <ThumbsUp className="w-4 h-4" />
                  Like
                </button>

                <button
                  className="flex items-center gap-1 hover:text-indigo-600 transition"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(selectedEmail.body);
                      toast("📋 Copied to clipboard!");
                    } catch (error) {
                      console.error("Failed to copy:", error);
                      toast.error("Failed to copy to clipboard");
                    }
                  }}
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>

                <button
                  className="flex items-center gap-1 hover:text-indigo-600 transition"
                  onClick={() => toast("💬 Comment coming soon!")}
                >
                  <MessageCircle className="w-4 h-4" />
                  Comment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
