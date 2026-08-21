import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
const isDummyKey = !apiKey || apiKey.includes("your_gemini");
const genAI = !isDummyKey ? new GoogleGenerativeAI(apiKey) : null;

// Dynamic algorithmic fallback courses just in case the API key is missing or fails
function generateDynamicFallbackCourses(query = "Software Engineering", level = "Beginner") {
  const categories = ["Programming", "System Design", "Cloud & DevOps", "Full Stack", "Data Science"];
  const instructors = ["Dr. Aris Vance", "Priya Sharma", "Vikram Patel", "Sarah Lin", "Alex Rivera"];
  
  const courseTemplates = [
    {
      titleSuffix: "Complete Masterclass & Hands-on Roadmap",
      desc: `Master the end-to-end fundamentals, industry best practices, and real-world architectures for ${query}.`,
      duration: "8 weeks",
      price: "Free",
      students: 4820,
      rating: "4.9"
    },
    {
      titleSuffix: "Zero to Hero Practical Bootcamp",
      desc: `Build production-ready projects and ace technical interviews in ${query} from ground up.`,
      duration: "10 weeks",
      price: "₹1,499",
      students: 3150,
      rating: "4.8"
    },
    {
      titleSuffix: "Advanced Architecture & System Design",
      desc: `Deep dive into advanced paradigms, scalable design patterns, and enterprise standards for ${query}.`,
      duration: "6 weeks",
      price: "₹2,199",
      students: 2400,
      rating: "4.9"
    },
    {
      titleSuffix: "Interview Preparation & Capstone Labs",
      desc: `Solve 100+ curated problems, review live case studies, and deploy full capstone applications for ${query}.`,
      duration: "4 weeks",
      price: "Free",
      students: 5620,
      rating: "4.7"
    }
  ];

  return courseTemplates.map((tpl, i) => ({
    id: `course_${Date.now()}_${i}`,
    title: `${query} — ${tpl.titleSuffix}`,
    description: tpl.desc,
    duration: tpl.duration,
    level: level || (i === 0 ? "Beginner" : i === 2 ? "Advanced" : "Intermediate"),
    instructor: instructors[i % instructors.length],
    category: categories[i % categories.length],
    students: tpl.students,
    rating: tpl.rating,
    price: tpl.price
  }));
}

export async function GET(request) {
  let query = "Software Engineering";
  let level = "Beginner";

  try {
    const { searchParams } = new URL(request.url);
    query = searchParams.get("q") || "Software Engineering";
    level = searchParams.get("level") || "Beginner";

    if (!genAI) {
      console.warn("No valid Gemini API Key provided. Returning dynamic fallback courses.");
      return NextResponse.json({ success: true, data: generateDynamicFallbackCourses(query, level) });
    }

    // Use standard Gemini 1.5 Flash model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `You are an expert e-learning course creator and curriculum designer. 
Generate exactly 4 realistic course recommendations for a student wanting to learn about "${query}" at a "${level}" level.

IMPORTANT: Your output MUST be ONLY a valid JSON array. No markdown, no commentary, no backticks.
Each object in the array MUST have:
[
  {
    "id": "course_1",
    "title": "Course Title",
    "description": "2 sentence description of the course contents.",
    "duration": "8 weeks",
    "level": "${level}",
    "instructor": "Instructor Name",
    "category": "Technology/Programming",
    "students": 3200,
    "rating": "4.8",
    "price": "Free"
  }
]`;

    const result = await model.generateContent(prompt);
    let outputText = result.response.text();
    outputText = outputText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const firstBracket = outputText.indexOf('[');
    const lastBracket = outputText.lastIndexOf(']');
    if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
      outputText = outputText.substring(firstBracket, lastBracket + 1);
    }

    let generatedCourses;
    try {
      generatedCourses = JSON.parse(outputText);
      if (!Array.isArray(generatedCourses) || generatedCourses.length === 0) {
        generatedCourses = generateDynamicFallbackCourses(query, level);
      }
    } catch (parseErr) {
      console.warn("Gemini JSON parse fallback activated for query:", query);
      generatedCourses = generateDynamicFallbackCourses(query, level);
    }

    return NextResponse.json({ success: true, data: generatedCourses });

  } catch (error) {
    console.error('Course API error (returning fallback):', error.message || error);
    return NextResponse.json({ 
      success: true, 
      data: generateDynamicFallbackCourses(query, level) 
    });
  }
}
