import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { generateEmail } from "@/lib/gemini";
import { db } from "@/lib/db";
import { sendEmail } from "@/lib/sendEmail";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { prompt, subject } = await req.json();
  const body = await generateEmail(prompt);

  const hardcodedEmail = "sumitsamsingh1111@gmail.com";

  if (hardcodedEmail) {
    const response =await sendEmail(hardcodedEmail, subject || "Your AI-Generated Email", body);
    console.log("Email sent successfully:", response);
  }

  await db.user.create({
    data: {
      user_id: userId,
      subject,
      body,
    },
  });

  return NextResponse.json({ subject, body });
}
