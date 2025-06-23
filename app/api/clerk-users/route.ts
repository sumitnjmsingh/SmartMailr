// api/clerk-users/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://api.clerk.com/v1/users", {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }

    const users = await res.json();
    return NextResponse.json(users);
  } catch (error) {
    console.error("Clerk fetch error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
