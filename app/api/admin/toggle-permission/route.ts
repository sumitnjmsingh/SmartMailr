// api/admin/toggle-permission/route.ts
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ allowed: false }, { status: 401 });
  }

  const permission = await db.userPermission.findUnique({
    where: { userId },
  });

  const allowed = permission?.isBlocked === false;

  return NextResponse.json({ allowed });
}
