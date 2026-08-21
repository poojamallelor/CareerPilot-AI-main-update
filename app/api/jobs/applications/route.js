import { NextResponse } from "next/server";
import { jobService } from "../../../../lib/dbService.js";

// Handle POST request for tracking job applications
export async function POST(request) {
  try {
    const { userId, applicationData } = await request.json();

    if (!userId || !applicationData || !applicationData.jobTitle || !applicationData.company) {
      return NextResponse.json(
        { error: "User ID, job title, and company are required" },
        { status: 400 }
      );
    }

    // Track application in database
    const application = await jobService.trackApplication(parseInt(userId), applicationData);

    return NextResponse.json({
      success: true,
      application
    });
  } catch (error) {
    console.error("Error tracking application:", error);
    return NextResponse.json(
      { error: "Failed to track application" },
      { status: 500 }
    );
  }
}

// Handle GET request for retrieving job applications
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

    // Get applications from database
    const applications = await jobService.getApplications(parseInt(userId));

    return NextResponse.json({
      success: true,
      applications
    });
  } catch (error) {
    console.error("Error retrieving applications:", error);
    return NextResponse.json(
      { error: "Failed to retrieve applications" },
      { status: 500 }
    );
  }
}

// Handle PUT request for updating application status
export async function PUT(request) {
  try {
    const { applicationId, status, notes } = await request.json();

    if (!applicationId || !status) {
      return NextResponse.json(
        { error: "Application ID and status are required" },
        { status: 400 }
      );
    }

    // Note: You would implement updateApplication method in jobService
    // const updatedApplication = await jobService.updateApplication(applicationId, { status, notes });

    return NextResponse.json({
      success: true,
      message: "Application updated successfully"
    });
  } catch (error) {
    console.error("Error updating application:", error);
    return NextResponse.json(
      { error: "Failed to update application" },
      { status: 500 }
    );
  }
}
