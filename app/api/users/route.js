import { NextResponse } from "next/server";
import { userService } from "../../../lib/dbService.js";

// Handle POST request for creating users
export async function POST(request) {
  try {
    const userData = await request.json();

    if (!userData.email || !userData.name) {
      return NextResponse.json(
        { error: "Email and name are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await userService.getUserByEmail(userData.email);
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // Create new user
    const newUser = await userService.createUser(userData);

    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
      }
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

// Handle GET request for retrieving user info
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get("id");
    const email = url.searchParams.get("email");

    if (!userId && !email) {
      return NextResponse.json(
        { error: "User ID or email is required" },
        { status: 400 }
      );
    }

    let user;
    if (userId) {
      user = await userService.getUserById(parseInt(userId));
    } else {
      user = await userService.getUserByEmail(email);
    }

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Remove sensitive information
    const { password, ...userInfo } = user;

    return NextResponse.json({
      success: true,
      user: userInfo
    });
  } catch (error) {
    console.error("Error retrieving user:", error);
    return NextResponse.json(
      { error: "Failed to retrieve user" },
      { status: 500 }
    );
  }
}

// Handle PUT request for updating user info
export async function PUT(request) {
  try {
    const { id, ...updateData } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Update user
    const updatedUser = await userService.updateUser(parseInt(id), updateData);

    if (!updatedUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Remove sensitive information
    const { password, ...userInfo } = updatedUser;

    return NextResponse.json({
      success: true,
      user: userInfo
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
