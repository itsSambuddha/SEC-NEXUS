import { currentUser } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/database";
import { NextResponse } from "next/server";
import User from "@/lib/database/models/user.model";

export async function POST() {
  // Use `currentUser` to get the full user object from Clerk
  const user = await currentUser();

  // Check for both the user object and their ID
  if (!user || !user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Ensure the database is connected. This is good practice,
    // though Mongoose often handles this implicitly on the first query.
    await connectToDatabase();

    // Prepare the complete user data for upserting
    const userData = {
      clerkUserId: user.id, // Changed from clerkId to clerkUserId to match model
      email: user.emailAddresses[0]?.emailAddress,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl, // Changed from photo to imageUrl to match model
      syncedAt: new Date(),
    };

    // Use the Mongoose User model for a clean and type-safe database operation.
    // `findOneAndUpdate` with `upsert` is perfect for creating or updating a user.
    const updatedUser = await User.findOneAndUpdate(
      { clerkUserId: user.id },
      { $set: userData },
      { upsert: true, new: true } // `new: true` returns the updated document
    );

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error syncing user:", { userId: user.id, error: errorMessage });
    return NextResponse.json({ error: "Database error", details: errorMessage }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const user = await currentUser();

  if (!user || !user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const body = await request.json();
    const { clerkUserId, ...updateData } = body;

    if (user.id !== clerkUserId) {
      return NextResponse.json({ error: "Forbidden: You can only update your own profile." }, { status: 403 });
    }

    const updatedUser = await User.findOneAndUpdate(
      { clerkUserId: clerkUserId },
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error updating user:", { error: errorMessage });
    return NextResponse.json({ error: "Database error", details: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const user = await currentUser();

  if (!user || !user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const body = await request.json();
    const { clerkUserId } = body;

    if (user.id !== clerkUserId) {
      return NextResponse.json({ error: "Forbidden: You can only delete your own profile." }, { status: 403 });
    }

    const deletedUser = await User.findOneAndDelete({ clerkUserId: clerkUserId });

    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error deleting user:", { error: errorMessage });
    return NextResponse.json({ error: "Database error", details: errorMessage }, { status: 500 });
  }
}