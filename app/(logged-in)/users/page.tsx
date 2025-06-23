"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/LandingPage/NavbarSection";
import { Copy, Users } from "lucide-react";
import toast from "react-hot-toast";

// Extend ClerkUser with image_url
type ClerkUser = {
  id: string;
  email_addresses: { email_address: string }[];
  first_name: string | null;
  last_name: string | null;
  image_url?: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<ClerkUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/clerk-users");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const handleCopy = (email: string) => {
    navigator.clipboard.writeText(email);
    toast.success("Email copied to clipboard!");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-indigo-700 mb-10 text-center flex items-center justify-center gap-2">
            <Users className="w-7 h-7 text-indigo-700" />
            User Directory
          </h1>

          {loading ? (
            <p className="text-center text-gray-500">Loading users...</p>
          ) : users.length === 0 ? (
            <p className="text-center text-gray-500">No users found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => {
                const email =
                  user.email_addresses[0]?.email_address || "No email";
                const image = user.image_url;

                return (
                  <div
                    key={user.id}
                    className="bg-white p-6 rounded-xl border border-gray-200 shadow hover:shadow-xl transition"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <Image
                        src={image || "https://i.pravatar.cc/300"}
                        alt="Profile"
                        width={48}
                        height={48}
                        className="rounded-full object-cover border border-black"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {user.first_name || "First Name"}{" "}
                          {user.last_name || "Last Name"}
                        </h3>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm text-gray-500 break-all">
                            {email}
                          </p>
                          {email !== "No email" && (
                            <button
                              onClick={() => handleCopy(email)}
                              className="text-indigo-500 hover:text-indigo-700 ml-2 hover:cursor-pointer transition"
                            >
                              <Copy size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
