// /api/send-email/route.ts
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendEmail } from "@/lib/sendEmail";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { email, subject, body } = await req.json();

  if (!email || !subject || !body) {
    return NextResponse.json({ error: "Missing email, subject, or body" }, { status: 400 });
  }

  try {
    await sendEmail(email, subject, body);

    await db.user.create({
      data: {
        user_id: userId,
        subject,
        body,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json({ error: "Email send failed" }, { status: 500 });
  }
}
