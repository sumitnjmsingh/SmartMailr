import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const emails = await db.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        subject: true,
        body: true,
        createdAt: true,
      },
    });

    return NextResponse.json(emails);
  } catch (err) {
    console.error("Error fetching emails:", err);
    return NextResponse.json({ error: "Failed to fetch emails" }, { status: 500 });
  }
}
