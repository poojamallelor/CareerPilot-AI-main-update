import { NextResponse } from "next/server";
// import { chatService } from "../../../lib/dbService.js"; // Temporarily disabled

// Handle POST request for saving chat messages
export async function POST(request) {
  try {
    const { userId, sessionId, message, role } = await request.json();

    if (!userId || !sessionId || !message || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Temporarily disabled database saving
    // const savedMessage = await chatService.saveChatMessage(userId, sessionId, message, role);

    // Return success without database operation
    const mockSavedMessage = {
      id: Date.now(),
      userId,
      sessionId,
      message,
      role,
      timestamp: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      message: mockSavedMessage
    });
  } catch (error) {
    console.error("Error saving chat message:", error);
    return NextResponse.json(
      { error: "Failed to save chat message" },
      { status: 500 }
    );
  }
}

// Handle GET request for retrieving chat history
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");
    const sessionId = url.searchParams.get("sessionId");
    const limit = parseInt(url.searchParams.get("limit")) || 50;

    if (!userId || !sessionId) {
      return NextResponse.json(
        { error: "Missing userId or sessionId" },
        { status: 400 }
      );
    }

    // Get chat history from database
    const chatHistory = await chatService.getChatHistory(parseInt(userId), sessionId, limit);

    return NextResponse.json({
      success: true,
      chatHistory
    });
  } catch (error) {
    console.error("Error retrieving chat history:", error);
    return NextResponse.json(
      { error: "Failed to retrieve chat history" },
      { status: 500 }
    );
  }
}
