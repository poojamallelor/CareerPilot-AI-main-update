import { NextResponse } from "next/server";

// Modern Route Segment Config
export const dynamic = 'force-dynamic'; // Ensure dynamic handling
export const maxDuration = 30; // Set max execution time (seconds)
export const runtime = 'nodejs'; // Explicit Node.js runtime
export const fetchCache = 'force-no-store'; // Disable caching for this route

export async function POST(request) {
  console.log("PDF API: Request received");

  try {
    // Verify content type
    const contentType = request.headers.get('content-type');
    if (!contentType?.includes('multipart/form-data')) {
      console.log("PDF API: Invalid content type");
      return NextResponse.json(
        { success: false, error: "Content-Type must be multipart/form-data" },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("pdf");

    // Validate file exists
    if (!file || typeof file === 'string') {
      console.log("PDF API: No PDF file uploaded");
      return NextResponse.json(
        { success: false, error: "No PDF file uploaded" },
        { status: 400 }
      );
    }

    // Log file metadata for debugging
    console.log("PDF API: Received file metadata:", {
      name: file.name,
      type: file.type,
      size: file.size,
    });

    // Validate file type
    if (!file.type || !file.type.includes("pdf")) {
      console.log("PDF API: Invalid file type:", file.type);
      return NextResponse.json(
        { success: false, error: "Invalid file type. Please upload a PDF." },
        { status: 400 }
      );
    }

    // File size validation
    const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: "File size exceeds 50MB limit" },
        { status: 413 }
      );
    }

    // For now, return a placeholder response until we implement proper PDF parsing
    // This allows the build to succeed while we work on the PDF processing
    return NextResponse.json({
      success: true,
      text: "PDF upload received successfully. Text extraction feature is being implemented.",
      metadata: {
        pages: 1,
        info: {
          title: file.name,
          author: null,
          creator: null,
          creationDate: null,
          modDate: null,
        }
      },
      textLength: 0,
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error("PDF API: Server error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}
