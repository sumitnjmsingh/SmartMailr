"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

type UserEntry = {
  userId: string; 
  email: string;
  isBlocked: boolean;
};

export default function AdminUserToggle() {
  const [users, setUsers] = useState<UserEntry[]>([]);
  const [loadingEmail, setLoadingEmail] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/clerk-users"); 
        if (!res.ok) throw new Error("Failed to fetch users");
        const data: UserEntry[] = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to load users");
      }
    }
    fetchUsers();
  }, []);

  const toggleBlock = async (email: string, block: boolean) => {
    setLoadingEmail(email);
    try {
      const res = await fetch("/api/admin/toggle-block", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, block }),
      });

      if (!res.ok) throw new Error();

      toast.success(`${block ? "Blocked" : "Unblocked"} ${email}`);
      setUsers((prev) =>
        prev.map((u) => (u.email === email ? { ...u, isBlocked: block } : u))
      );
    } catch {
      toast.error("Failed to update user");
    } finally {
      setLoadingEmail(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">
        🔐 Manage User Access
      </h1>
      <table className="w-full table-auto border-collapse shadow-md rounded overflow-hidden">
        <thead>
          <tr className="bg-indigo-100 text-left text-indigo-700 text-sm">
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.userId} className="border hover:bg-gray-50 transition">
              <td className="p-3">{u.email}</td>
              <td className="p-3 font-medium">
                {u.isBlocked ? "❌ Blocked" : "✅ Allowed"}
              </td>
              <td className="p-3">
                <button
                  onClick={() => toggleBlock(u.email, !u.isBlocked)}
                  disabled={loadingEmail === u.email}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                    u.isBlocked
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-red-600 hover:bg-red-700 text-white"
                  } ${
                    loadingEmail === u.email
                      ? "opacity-60 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {loadingEmail === u.email ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : u.isBlocked ? (
                    "Unblock"
                  ) : (
                    "Block"
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
