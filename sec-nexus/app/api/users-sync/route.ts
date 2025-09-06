import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import { HARD_CODED_ADMIN } from "@/lib/config/admin";

export async function POST() {
  try {
    await connectToDatabase();

    const clerkUser = await currentUser();

    if (!clerkUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id, emailAddresses, firstName, lastName, imageUrl, username } = clerkUser;

    // Determine role based on hardcoded admin or default to student
    const role = id === HARD_CODED_ADMIN.clerkId ? 'management' : 'student';

    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        email: emailAddresses[0].emailAddress,
        firstName: firstName,
        lastName: lastName,
        photo: imageUrl,
        username: username,
        role: role,
      },
      { upsert: true, new: true }
    );

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error syncing user:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Runtime export for role checking
export async function GET() {
  try {
    await connectToDatabase();

    const clerkUser = await currentUser();

    if (!clerkUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await User.findOne({ clerkId: clerkUser.id });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    return NextResponse.json({
      role: user.role,
      isAdmin: user.role === 'management'
    });
  } catch (error) {
    console.error("Error getting user role:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
