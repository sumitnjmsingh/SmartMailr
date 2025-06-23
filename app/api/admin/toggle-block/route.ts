// api/admin/toggle-block/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const { userId: adminId } = await auth();

  if (!adminId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // ✅ Check if requester is admin
    const adminRes = await fetch(`https://api.clerk.com/v1/users/${adminId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    });

    if (!adminRes.ok) {
      return NextResponse.json({ error: "Failed to verify admin" }, { status: 500 });
    }

    const adminUser = await adminRes.json();
    const isAdmin = adminUser?.public_metadata?.role === "admin";

    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { email, block } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // ✅ Look up user by email via Clerk
    const clerkRes = await fetch(`https://api.clerk.com/v1/users?email_address=${email}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    });

    const clerkData = await clerkRes.json();

    const targetUser = clerkData[0];
    if (!targetUser || !targetUser.id) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const targetUserId = targetUser.id;

    // ✅ Upsert user permission
    const updated = await db.userPermission.upsert({
      where: { userId: targetUserId },
      update: { isBlocked: block },
      create: {
        userId: targetUserId,
        email,
        isBlocked: block,
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("Toggle block error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
