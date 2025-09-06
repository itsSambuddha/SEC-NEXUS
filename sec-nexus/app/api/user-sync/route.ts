import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";

export const runtime = "nodejs"; // Important: Mongoose does not run on edge

export async function POST() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();

  const email = user.emailAddresses?.[0]?.emailAddress || "";
  const imageUrl = user.imageUrl || "";
  const username = user.username || "";
  const firstName = user.firstName || "";
  const lastName = user.lastName || "";

  // Upsert by Clerk user id
  await User.findOneAndUpdate(
    { clerkId: user.id },
    {
      clerkId: user.id,
      email,
      username,
      firstName,
      lastName,
      photo: imageUrl,
      updatedAt: new Date(),
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return NextResponse.json({ success: true });
}
