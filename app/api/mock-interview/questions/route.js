import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
const isDummyKey = !apiKey || apiKey.includes("your_gemini");
const genAI = !isDummyKey ? new GoogleGenerativeAI(apiKey) : null;

function generateDynamicMockQuestions(category, difficulty, count = 5) {
  const topics = {
    general: ["communication", "adaptability", "teamwork", "problem-solving", "leadership"],
    behavioral: ["conflict resolution", "failure", "success", "pressure", "initiative"],
    technical: ["debugging", "system design", "code optimization", "learning new tech", "code review"],
  };
  
  const subjects = topics[category] || topics.general;
  
  const templates = [
    "Could you describe a situation where you had to use your skills in {topic} to deal with a {difficulty} challenge?",
    "Tell me about a {difficulty} project where {topic} was crucial to your success.",
    "How do you approach {topic} when you are faced with a {difficulty} problem?",
    "Give an example of a {difficulty} scenario that tested your {topic} abilities.",
    "What is your philosophy on {topic} in a {difficulty} environment?"
  ];

  const shuffledTopics = [...subjects].sort(() => 0.5 - Math.random());
  const questions = [];
  
  for (let i = 0; i < count; i++) {
    const topic = shuffledTopics[i % shuffledTopics.length];
    const template = templates[Math.floor(Math.random() * templates.length)];
    const question = template
      .replace("{topic}", topic)
      .replace("{difficulty}", difficulty);
    questions.push(question);
  }
  
  return questions;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'general';
    const difficulty = searchParams.get('difficulty') || 'medium';

    if (!genAI) {
      console.warn("No Gemini API Key provided. Returning dynamic fallback mock interview questions.");
      return NextResponse.json({ success: true, questions: generateDynamicMockQuestions(category, difficulty, 5) });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `You are an expert technical and behavioral recruiter.
Please generate 5 realistic interview questions for a candidate.
Category: ${category}
Difficulty level: ${difficulty}

Return ONLY a valid JSON array of 5 strings. Each string is a single interview question. No markdown formatting, no explanations. 
Format:
["Question 1?", "Question 2?", "Question 3?", "Question 4?", "Question 5?"]
`;

    const result = await model.generateContent(prompt);
    let outputText = result.response.text();
    outputText = outputText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    let generatedQuestions;
    try {
      generatedQuestions = JSON.parse(outputText);
    } catch (parseErr) {
      console.error("Failed to parse Gemini output:", outputText);
      throw new Error("Invalid format from AI");
    }

    return NextResponse.json({
      success: true,
      questions: generatedQuestions
    });

  } catch (error) {
    console.error('Mock Interview API error:', error);
    const params = new URL(request.url).searchParams;
    return NextResponse.json({ success: true, questions: generateDynamicMockQuestions(params.get('category') || 'general', params.get('difficulty') || 'medium', 5) });
  }
}
