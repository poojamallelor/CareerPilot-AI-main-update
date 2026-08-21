import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
const isDummyKey = !apiKey || apiKey.includes("your_gemini");
const genAI = !isDummyKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(request) {
  try {
    const { career, level, duration, focus } = await request.json();

    if (!career) {
      return NextResponse.json(
        { error: "Career field is required" },
        { status: 400 }
      );
    }

    // Check if API key is configured or is dummy
    if (!genAI) {
      console.warn("Gemini API key not valid, returning dynamic mock data");
      return NextResponse.json(getMockRoadmap(career, level));
    }

    // Generate roadmap using Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Create a detailed career roadmap for: ${career}
    
    Level: ${level || "Beginner"}
    Duration: ${duration || "6 months"}
    Focus Areas: ${focus || "General"}
    
    Please provide a comprehensive roadmap in the following JSON format:
    {
      "title": "Career title",
      "description": "Brief overview",
      "totalDuration": "duration",
      "difficulty": "level",
      "phases": [
        {
          "phase": 1,
          "title": "Phase title",
          "duration": "duration",
          "description": "Phase description",
          "topics": ["topic1", "topic2", ...],
          "skills": ["skill1", "skill2", ...],
          "projects": ["project1", "project2", ...],
          "resources": ["resource1", "resource2", ...]
        }
      ],
      "prerequisites": ["prerequisite1", "prerequisite2", ...],
      "careerOutcomes": ["outcome1", "outcome2", ...],
      "averageSalary": "salary range",
      "jobRoles": ["role1", "role2", ...]
    }
    
    Make it practical, India-focused with realistic timelines and resources.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Try to parse JSON from the response
    let roadmapData;
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/);
      const jsonText = jsonMatch ? jsonMatch[1] : text;
      roadmapData = JSON.parse(jsonText);
    } catch (parseError) {
      console.error("Failed to parse Gemini response:", parseError);
      // Return mock data if parsing fails
      return NextResponse.json(getMockRoadmap(career, level));
    }

    return NextResponse.json(roadmapData);
  } catch (error) {
    console.error("Error generating roadmap:", error);
    console.warn("Fallback dynamically to mock roadmaps due to API error", error);
    try {
      const { career, level } = await request.json();
      return NextResponse.json(getMockRoadmap(career, level));
    } catch {
      return NextResponse.json(getMockRoadmap("Software Engineer", "Beginner"));
    }
  }
}

// GET endpoint for predefined roadmaps
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "all";

  const predefinedRoadmaps = [
    {
      id: "fullstack",
      title: "Full Stack Web Development",
      description: "Complete roadmap to become a full-stack developer",
      category: "Programming",
      icon: "💻",
      difficulty: "Beginner to Advanced",
      duration: "6-12 months",
      popular: true,
    },
    {
      id: "data-science",
      title: "Data Science & AI",
      description: "Master data science, machine learning, and AI",
      category: "Data Science",
      icon: "📊",
      difficulty: "Intermediate to Advanced",
      duration: "8-12 months",
      popular: true,
    },
    {
      id: "devops",
      title: "DevOps Engineer",
      description: "Learn cloud, CI/CD, and infrastructure automation",
      category: "Cloud & DevOps",
      icon: "☁️",
      difficulty: "Intermediate",
      duration: "6-9 months",
      popular: true,
    },
    {
      id: "mobile-dev",
      title: "Mobile App Development",
      description: "Build native and cross-platform mobile apps",
      category: "Mobile Development",
      icon: "📱",
      difficulty: "Beginner to Advanced",
      duration: "5-8 months",
      popular: false,
    },
    {
      id: "cybersecurity",
      title: "Cybersecurity Specialist",
      description: "Protect systems and data from cyber threats",
      category: "Security",
      icon: "🔒",
      difficulty: "Intermediate to Advanced",
      duration: "8-12 months",
      popular: false,
    },
    {
      id: "blockchain",
      title: "Blockchain Developer",
      description: "Build decentralized applications and smart contracts",
      category: "Blockchain",
      icon: "⛓️",
      difficulty: "Advanced",
      duration: "6-10 months",
      popular: false,
    },
    {
      id: "ui-ux",
      title: "UI/UX Designer",
      description: "Design beautiful and user-friendly interfaces",
      category: "Design",
      icon: "🎨",
      difficulty: "Beginner to Intermediate",
      duration: "4-8 months",
      popular: true,
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing",
      description: "Master SEO, SEM, social media, and content marketing",
      category: "Marketing",
      icon: "📈",
      difficulty: "Beginner",
      duration: "3-6 months",
      popular: false,
    },
  ];

  const filtered =
    category === "all"
      ? predefinedRoadmaps
      : predefinedRoadmaps.filter((r) => r.category.toLowerCase().includes(category.toLowerCase()));

  return NextResponse.json(filtered);
}

// Mock roadmap generator
function getMockRoadmap(career, level = "Beginner") {
  return {
    title: `${career} Career Roadmap`,
    description: `A comprehensive roadmap to become a successful ${career} professional`,
    totalDuration: "6-12 months",
    difficulty: level,
    phases: [
      {
        phase: 1,
        title: "Foundation & Basics",
        duration: "2-3 months",
        description: "Build a strong foundation with core concepts and fundamentals",
        topics: [
          "Introduction to " + career,
          "Core Concepts & Terminology",
          "Industry Overview",
          "Essential Tools & Technologies",
        ],
        skills: [
          "Basic programming/technical skills",
          "Problem-solving mindset",
          "Learning resources identification",
        ],
        projects: [
          "Simple portfolio website",
          "Basic " + career + " project",
          "Personal learning blog",
        ],
        resources: [
          "Free online courses (Coursera, edX)",
          "YouTube tutorials",
          "Official documentation",
          "Community forums",
        ],
      },
      {
        phase: 2,
        title: "Intermediate Skills",
        duration: "3-4 months",
        description: "Deep dive into advanced topics and practical applications",
        topics: [
          "Advanced " + career + " concepts",
          "Best practices & design patterns",
          "Testing & debugging",
          "Performance optimization",
        ],
        skills: [
          "Advanced technical proficiency",
          "Code quality & maintainability",
          "Collaboration & version control",
        ],
        projects: [
          "Full-featured application",
          "Open-source contributions",
          "Real-world problem solving",
        ],
        resources: [
          "Udemy/Pluralsight courses",
          "Technical books",
          "GitHub repositories",
          "Tech blogs & articles",
        ],
      },
      {
        phase: 3,
        title: "Professional Excellence",
        duration: "2-3 months",
        description: "Master professional skills and build your career",
        topics: [
          "System design & architecture",
          "Production deployment",
          "Security & compliance",
          "Career development",
        ],
        skills: [
          "Professional communication",
          "Project management",
          "Interview preparation",
        ],
        projects: [
          "Capstone project",
          "Interview portfolio",
          "Technical blog/content",
        ],
        resources: [
          "Interview prep platforms",
          "Networking events",
          "Mentorship programs",
          "Job boards",
        ],
      },
    ],
    prerequisites: [
      "Basic computer skills",
      "English proficiency",
      "Dedication & consistency",
      "6-8 hours/week time commitment",
    ],
    careerOutcomes: [
      "Job-ready skills in " + career,
      "Professional portfolio",
      "Industry connections",
      "Interview confidence",
      "Career advancement opportunities",
    ],
    averageSalary: "₹4-12 LPA (India) based on experience",
    jobRoles: [
      career + " Developer",
      "Junior " + career + " Engineer",
      career + " Specialist",
      "Associate " + career + " Consultant",
    ],
  };
}
