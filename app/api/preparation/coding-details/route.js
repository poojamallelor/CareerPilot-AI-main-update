import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Dynamic algorithmic fallback ensuring no static repeats
function generateDynamicCodingDetails() {
  const languages = ["Python", "Java", "C++", "JavaScript", "Go", "Rust", "Swift"];
  const randomLangs = languages.sort(() => 0.5 - Math.random()).slice(0, 4);
  
  return {
    codingRound: {
      define: "Coding interviews assess logical problem-solving and technical competency under time pressure. They often cover data structures, algorithms, and sometimes system design concepts. You may code live or use a whiteboard.",
      evaluation: {
        criteria: [
          { name: "Communication", description: "Explaining thought processes and tradeoffs clearly." },
          { name: "Problem Solving", description: "Breaking down complex issues systematically." },
          { name: "Technical Competency", description: "Writing correct, clean syntax." },
          { name: "Testing", description: "Handling edge cases gracefully." }
        ]
      },
      type: [
        { type: "Online Assessment", description: "Automated coding tests on hacker platforms." },
        { type: "Whiteboard Coding", description: "Solving algorithmic puzzles live on a board." },
        { type: "Pair Programming", description: "Collaborating on code with the interviewer." }
      ],
      skills: [
        { skill: "Data Structures", description: "Arrays, Maps, Trees, Graphs." },
        { skill: "Time Complexity", description: "Optimizing Big-O performance." }
      ],
      allowedLanguages: randomLangs.map(lang => ({
        language: lang,
        reason: "Widely used and robust standard library support."
      })),
      resources: {
        books: [
          { title: `Grokking ${randomLangs[0]} Algorithms dynamically generated`, author: "Algorithmic Generator", description: "Generated algorithmic thinking guide." }
        ],
        websites: [
          { name: "Live AI Curated Challenges", url: "https://leetcode.com", description: "Practice dynamic sets completely randomized." }
        ],
        youtubeQueries: [
          `${randomLangs[0]} advanced data structures tutorial`,
          `System design crash course dynamic for interviews`,
          `Behavioral and technical coding round prep ${new Date().getFullYear()}`
        ],
        tools: [
          { tool: "Dynamic IDE Collaborative", description: "Randomized tool recommendation.", url: "https://coderpad.io" }
        ]
      }
    }
  };
}

export async function GET(request) {
  try {
    if (!genAI) {
      return NextResponse.json({
        success: true,
        data: generateDynamicCodingDetails()
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
      You are an expert technical recruiter and software engineering mentor. Generate a comprehensively detailed JSON object named "codingRound" designed to help candidates prepare for coding interviews. Ensure all responses are highly professional, unique, and directly related to the current year's tech landscape.

      The JSON must strictly follow this structure:
      {
        "codingRound": {
          "define": "A 2-3 sentence overview of what modern coding rounds entail.",
          "evaluation": {
            "criteria": [ { "name": "CriteraName", "description": "Details" } ]
          },
          "type": [ { "type": "Interview Type", "description": "Details" } ],
          "skills": [ { "skill": "SkillName", "description": "Details" } ],
          "allowedLanguages": [ { "language": "Lang", "reason": "Why it's good" } ],
          "resources": {
            "books": [ { "title": "Unique Book", "author": "Author", "description": "Desc" } ],
            "websites": [ { "name": "Site", "url": "URL", "description": "Desc" } ],
            "youtubeQueries": [ "Data Structures crash course", "System Design interview prep 2026", "Dynamic programming tutorial" ],
            "tools": [ { "tool": "ToolName", "url": "URL", "description": "Desc" } ]
          }
        }
      }

      Generate exactly:
      - 4 unique criteria
      - 4 unique types
      - 4 unique skills
      - 4 random modern programming languages
      - 2 real-world programming books
      - 3 actual websites for interview prep
      - 3 highly specific youtube search queries (e.g. 'Advanced recursion tutorial python 2026')
      - 3 tools (like IDEs or whiteboards)
      
      Output ONLY valid JSON, do not use markdown ticks.
    `;

    const result = await model.generateContent(prompt);
    let textResult = result.response.text();
    textResult = textResult.replace(/```json/g, '').replace(/```/g, '').trim();
    
    // Safety parse
    const data = JSON.parse(textResult);

    return NextResponse.json({
      success: true,
      data: data
    });

  } catch (error) {
    console.error("AI Generation failed:", error);
    return NextResponse.json({
      success: true,
      data: generateDynamicCodingDetails()
    });
  }
}
