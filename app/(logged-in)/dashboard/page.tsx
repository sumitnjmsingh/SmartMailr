"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Mail, ChevronDown, Loader2, Menu, X } from "lucide-react";
import {
  SignInButton,
  SignOutButton,
  SignedOut,
  SignedIn,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";

type ClerkUser = {
  id: string;
  email_addresses: { email_address: string }[];
  first_name: string | null;
  last_name: string | null;
};

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [prompt, setPrompt] = useState("");
  const [subject, setSubject] = useState("");
  const [response, setResponse] = useState("");
  const [GenerateEmailLoading, setGenerateEmailLoading] = useState(false);
  const [SendEmailLoading, setSendEmailLoading] = useState(false);
  const [users, setUsers] = useState<ClerkUser[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<string>("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Fetch all Clerk users for dropdown
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/clerk-users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users", err);
        toast.error("Unable to load user list.");
      }
    }
    fetchUsers();
  }, []);

  // Check if current user is blocked
  useEffect(() => {
    async function checkAccess() {
      if (!isLoaded || !user) return;

      const role = user.publicMetadata?.role;
      const admin = role === "admin";
      setIsAdmin(admin);

      if (admin) {
        setIsBlocked(false); // Always allow admin
        return;
      }

      try {
        const res = await fetch("/api/admin/toggle-permission");
        if (!res.ok) throw new Error("Failed to check permissions");
        const data = await res.json();
        setIsBlocked(!data.allowed);
      } catch (error) {
        console.error("Error checking permissions:", error);
        toast.error("Failed to check access permissions.");
        setIsBlocked(true);
      }
    }

    checkAccess();
  }, [isLoaded, user]);

  const handleGenerate = async () => {
    if (!subject.trim()) return toast.error("Please enter an email subject.");
    if (!prompt.trim()) return toast.error("Please enter a prompt.");
    if (!selectedEmail) return toast.error("Please select a recipient email.");

    setGenerateEmailLoading(true);
    try {
      const res = await fetch("/api/generate-email", {
        method: "POST",
        body: JSON.stringify({ prompt, subject }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setResponse(data.body);
      setSubject(data.subject || subject);
    } catch (error) {
      console.error("Failed to generate email:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setGenerateEmailLoading(false);
    }
  };

  const handleSend = async () => {
    if (!subject.trim() || !selectedEmail || !response.trim()) {
      return toast.error("Fill all fields before sending.");
    }

    setSendEmailLoading(true);
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: selectedEmail,
          subject,
          body: response,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        toast.error(error.error || "Failed to send");
        return;
      }

      toast.success("Email sent!");
      setPrompt("");
      setSubject("");
      setResponse("");
      setSelectedEmail("");
    } catch (error) {
      console.error("Failed to send email:", error);
      toast.error("Server error");
    } finally {
      setSendEmailLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-white text-gray-800">
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
            <Link href="/emails" className="text-indigo-600">
              Emails
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
              <Link href="/emails" className="text-indigo-600">
                Emails
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

      <section className="text-center py-16 px-6 max-w-3xl mx-auto">
        <h2 className="text-4xl font-extrabold text-indigo-700 mb-4">
          Write Better Emails with AI
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Describe what you want to say, select an email, and let AI draft it.
        </p>

        <SignedIn>
          <div className="space-y-4 text-left">
            {isBlocked && !isAdmin ? (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 font-medium shadow">
                🚫 You are currently blocked from generating emails. Please
                contact the admin.
              </div>
            ) : (
              <>
                {/* Dropdown */}
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

                {/* Subject + Prompt + Button */}
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
                  disabled={GenerateEmailLoading || (isBlocked && !isAdmin)}
                  className={`flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:cursor-pointer transition ${
                    GenerateEmailLoading || (isBlocked && !isAdmin)
                      ? "opacity-60 cursor-not-allowed"
                      : "hover:bg-indigo-700"
                  }`}
                >
                  {GenerateEmailLoading ? (
                    <>
                      <Loader2 className="animate-spin w-5 h-5" />
                      Generating...
                    </>
                  ) : (
                    "✨ Generate Email"
                  )}
                </button>

                {response && (
                  <div className="mt-6">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Edit Email Body
                    </label>
                    <textarea
                      className="w-full p-3 border border-gray-300 bg-white shadow rounded-lg"
                      rows={8}
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                    />

                    <button
                      onClick={handleSend}
                      disabled={SendEmailLoading}
                      className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition disabled:opacity-60 hover:cursor-pointer"
                    >
                      {SendEmailLoading ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="animate-spin w-4 h-4" />
                          Sending...
                        </span>
                      ) : (
                        " 📩 Send Email"
                      )}
                    </button>
                  </div>
                )}
              </>
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
