// api/generate-email/route.ts
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { generateEmail } from "@/lib/gemini";
// import { db } from "@/lib/db";
// import { sendEmail } from "@/lib/sendEmail";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { prompt, subject } = await req.json();
  const body = await generateEmail(prompt);

  const subjectMatch = body.match(/^Subject:\s*(.+)/i);
  const extractedSubject = subjectMatch ? subjectMatch[1].trim() : subject;

  return NextResponse.json({ body, subject: extractedSubject });
}
