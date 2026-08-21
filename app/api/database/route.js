import { NextResponse } from "next/server";
import { checkDatabaseConnection, initializeDatabase } from "../../../scripts/initDB.js";

// Handle GET request to check database connection
export async function GET(request) {
  try {
    const connectionStatus = await checkDatabaseConnection();

    return NextResponse.json({
      success: true,
      database: connectionStatus
    });
  } catch (error) {
    console.error("Database check error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Database connection failed",
        details: error.message
      },
      { status: 500 }
    );
  }
}

// Handle POST request to initialize database
export async function POST(request) {
  try {
    const initResult = await initializeDatabase();

    if (initResult.success) {
      return NextResponse.json({
        success: true,
        message: "Database initialized successfully"
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Database initialization failed",
          details: initResult.error
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Database initialization error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Database initialization failed",
        details: error.message
      },
      { status: 500 }
    );
  }
}
