// src/app/api/jobs/route.js
import { NextResponse } from "next/server";

// Sample mock job listings
const mockJobs = [
  {
    id: "1",
    title: "Software Engineer",
    company: {
      display_name: "TechCorp Solutions"
    },
    location: {
      display_name: "Bangalore, India"
    },
    description: "We are looking for a skilled software engineer to join our development team.",
    salary_min: 800000,
    salary_max: 1400000,
    created: new Date().toISOString(),
    category: {
      tag: "it-jobs"
    },
    redirect_url: "https://example.com/job1"
  },
  {
    id: "2",
    title: "Full Stack Developer",
    company: {
      display_name: "InnovateTech"
    },
    location: {
      display_name: "Pune, India"
    },
    description: "Join our team to work on cutting-edge web applications.",
    salary_min: 700000,
    salary_max: 1200000,
    created: new Date().toISOString(),
    category: {
      tag: "developer-jobs"
    },
    redirect_url: "https://example.com/job2"
  },
  {
    id: "3",
    title: "Data Scientist",
    company: {
      display_name: "Analytics Pro"
    },
    location: {
      display_name: "Mumbai, India"
    },
    description: "Looking for an experienced data scientist for our AI team.",
    salary_min: 1000000,
    salary_max: 1800000,
    created: new Date().toISOString(),
    category: {
      tag: "data-jobs"
    },
    redirect_url: "https://example.com/job3"
  },
  {
    id: "4",
    title: "Frontend Developer",
    company: {
      display_name: "UI Masters"
    },
    location: {
      display_name: "Delhi, India"
    },
    description: "Create beautiful and responsive web interfaces with our team.",
    salary_min: 600000,
    salary_max: 1000000,
    created: new Date().toISOString(),
    category: {
      tag: "design-jobs"
    },
    redirect_url: "https://example.com/job4"
  }
];

export async function GET(request) {
  try {
    // Get query parameters from searchParams
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    
    // If there's a query, filter the mock jobs
    let results = mockJobs;
    if (query) {
      const searchTerm = query.toLowerCase();
      results = mockJobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm) ||
        job.description.toLowerCase().includes(searchTerm) ||
        job.company.display_name.toLowerCase().includes(searchTerm)
      );
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Error in jobs API:", error);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}
