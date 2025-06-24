"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

import {
  SignInButton,
  SignOutButton,
  SignedOut,
  SignedIn,
} from "@clerk/nextjs";

type ClerkUser = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email_addresses: { email_address: string }[];
};

export default function BlockUserPage() {
  const [users, setUsers] = useState<ClerkUser[]>([]);
  const [email, setEmail] = useState("");
  const [block, setBlock] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/clerk-users");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
        toast.error("Failed to load user list");
      }
    }

    fetchUsers();
  }, []);

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Please select an email.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/toggle-block", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, block }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to update user");
        return;
      }

      toast.success(`${block ? "Blocked" : "Unblocked"} ${email}`);
      setEmail("");
    } catch (error) {
      console.error("Toggle error:", error);
      toast.error("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="px-6 py-2 flex justify-between items-center shadow bg-white gap-2">
        <Link href="/">
          <h1 className="text-xl font-bold text-indigo-600">SmartEmailr</h1>
        </Link>
        <nav className="space-x-4 flex items-center">
          <SignedOut>
            <SignInButton>
              <button className="text-indigo-600 hover:underline">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard" className="text-indigo-600">
              Dashboard
            </Link>
            <SignOutButton>
              <button className="ml-4 text-sm bg-purple-600 p-2 rounded-lg text-white hover:cursor-pointer">
                Sign Out
              </button>
            </SignOutButton>
          </SignedIn>
        </nav>
      </header>
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4 text-indigo-700">
          🔐 Block/Unblock User
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select User
            </label>
            <div className="relative">
              <select
                className="appearance-none w-full p-3 pr-10 border border-gray-300 rounded-lg shadow-sm text-gray-700 bg-white transition-all duration-200 
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              >
                <option value="" disabled>
                  Choose a user
                </option>
                {users.map((u) => (
                  <option
                    key={u.id}
                    value={u.email_addresses[0]?.email_address}
                  >
                    {u.first_name ?? ""} {u.last_name ?? ""} (
                    {u.email_addresses[0]?.email_address})
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                <ChevronDown size={18} />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Action
            </label>
            <div className="relative">
              <select
                value={block ? "block" : "unblock"}
                onChange={(e) => setBlock(e.target.value === "block")}
                className="appearance-none w-full p-3 pr-10 border border-gray-300 rounded-lg shadow-sm text-gray-700 bg-white transition-all duration-200 
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-400"
              >
                <option value="block">Block</option>
                <option value="unblock">Unblock</option>
              </select>

              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                <ChevronDown size={18} />
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`mt-4 w-full py-2 px-4 rounded-lg text-white font-semibold ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : block
                  ? "bg-red-600 hover:bg-red-700 hover:cursor-pointer"
                  : "bg-green-600 hover:bg-green-700 hover:cursor-pointer"
            } transition`}
          >
            {loading ? (
              <span className="flex justify-center items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Processing...
              </span>
            ) : block ? (
              "Block User"
            ) : (
              "Unblock User"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
