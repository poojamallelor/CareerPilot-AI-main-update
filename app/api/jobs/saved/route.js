import { NextResponse } from "next/server";
import { jobService } from "../../../../lib/dbService.js";

// Handle POST request for saving jobs
export async function POST(request) {
  try {
    const { userId, jobData } = await request.json();

    if (!userId || !jobData) {
      return NextResponse.json(
        { error: "User ID and job data are required" },
        { status: 400 }
      );
    }

    // Save job to database
    const savedJob = await jobService.saveJob(parseInt(userId), jobData);

    return NextResponse.json({
      success: true,
      savedJob
    });
  } catch (error) {
    console.error("Error saving job:", error);
    return NextResponse.json(
      { error: "Failed to save job" },
      { status: 500 }
    );
  }
}

// Handle GET request for retrieving saved jobs
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Get saved jobs from database
    const savedJobs = await jobService.getSavedJobs(parseInt(userId));

    return NextResponse.json({
      success: true,
      jobs: savedJobs
    });
  } catch (error) {
    console.error("Error retrieving saved jobs:", error);
    return NextResponse.json(
      { error: "Failed to retrieve saved jobs" },
      { status: 500 }
    );
  }
}
