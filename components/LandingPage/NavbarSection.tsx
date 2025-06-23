"use client";

import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";

export default function Navbar() {
  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-8xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          SmartEmailr
        </Link>

        <div className="flex items-center gap-4 text-sm">
          <Link
            href="/"
            className="text-gray-700 hover:text-indigo-600 transition"
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className="text-gray-700 hover:text-indigo-600 transition"
          >
            Dashboard
          </Link>

          <SignedOut>
            <SignInButton>
              <button className="text-white font-medium p-2 rounded-lg bg-purple-600 hover:cursor-pointer transition">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <SignOutButton>
              <button className="text-white font-medium hover:cursor-pointer p-2 rounded-lg bg-purple-600">
                Sign Out
              </button>
            </SignOutButton>
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
