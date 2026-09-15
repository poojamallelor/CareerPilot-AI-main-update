import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { findBestKnowledgeBaseAnswer, CHATBOT_KNOWLEDGE_BASE } from "../../../lib/chatbotKnowledgeBase";

// Resolve Gemini API Key from multiple supported environment variables
const apiKey =
  process.env.GOOGLE_GEMINI_API_KEY ||
  process.env.GOOGLE_GENAI_API_KEY ||
  process.env.GEMINI_API_KEY ||
  process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const genAI = apiKey && apiKey.length > 20 ? new GoogleGenerativeAI(apiKey) : null;

// CareerPilot AI System Prompt
const SYSTEM_PROMPT = `You are CareerPilot AI, an elite, friendly, and expert career guidance mentor for the CareerPilot AI platform.
You assist students, engineers, and job seekers with:
1. Career Planning & Engineering Department Job Roles (CSE, IT, ECE, EE, Mech, Civil, Chem, Biotech, etc.).
2. Actionable, milestone-based Career Roadmaps (Full Stack, AI/ML, DevOps, Cloud, Data Science, Cybersecurity, Mobile, UI/UX, etc.).
3. Technical & Behavioral Interview Preparation (DSA, System Design, STAR Method, HR rounds).
4. CareerPilot Assessment Portal guidance (Aptitude, General Life, Work Style, Tech Interest).
5. Resume optimization, ATS score improvement, and production-grade project recommendations.
6. Job platforms, campus drives (Superset), off-campus strategies, and salary expectations.

Guidelines:
- Provide clear, well-structured, formatted responses with Markdown (bold text, bullet points, numbered steps, code snippets).
- Be concise yet comprehensive and deeply practical.
- Keep a motivating and supportive tone.`;

// Handle POST request for dynamic AI chat with fallback to static 80+ Q&A knowledge base
export async function POST(request) {
  try {
    const body = await request.json();
    const message = body.message || body.prompt || "";
    const conversationHistory = body.conversationHistory || body.messages || [];

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: "Message or prompt is required" },
        { status: 400 }
      );
    }

    const trimmedMessage = message.trim();

    // 1. Attempt dynamic AI generation via Google Gemini if API is available
    if (genAI) {
      try {
        const candidateModels = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-2.0-flash", "gemini-pro"];
        let aiText = null;
        let lastError = null;

        for (const modelName of candidateModels) {
          try {
            const model = genAI.getGenerativeModel({ model: modelName });

            // Format past conversation messages if available
            let formattedPrompt = `${SYSTEM_PROMPT}\n\n`;
            if (conversationHistory.length > 0) {
              formattedPrompt += "Recent Conversation Context:\n";
              conversationHistory.slice(-6).forEach((msg) => {
                const role = msg.role === "user" ? "User" : "Assistant";
                formattedPrompt += `${role}: ${msg.content}\n`;
              });
            }
            formattedPrompt += `\nUser: ${trimmedMessage}\nAssistant:`;

            const timeoutPromise = new Promise((_, reject) =>
              setTimeout(() => reject(new Error("Gemini timeout after 15s")), 15000)
            );

            const result = await Promise.race([
              model.generateContent(formattedPrompt),
              timeoutPromise
            ]);

            const response = await result.response;
            aiText = response.text();
            if (aiText && aiText.trim()) {
              break; // Successfully got response
            }
          } catch (modelErr) {
            lastError = modelErr;
            console.warn(`[CareerPilot Chat] Model ${modelName} failed:`, modelErr.message);
            // Continue to try next candidate model
          }
        }

        if (aiText && aiText.trim()) {
          return NextResponse.json({
            success: true,
            response: aiText.trim(),
            mode: "ai",
            model: "gemini"
          });
        }
      } catch (geminiError) {
        console.error("[CareerPilot Chat] Gemini error, falling back to static knowledge base:", geminiError.message);
      }
    }

    // 2. Fallback to 80+ static curated Q&A knowledge base
    const kbMatch = findBestKnowledgeBaseAnswer(trimmedMessage);
    if (kbMatch && kbMatch.answer) {
      return NextResponse.json({
        success: true,
        response: kbMatch.answer,
        mode: "knowledge_base",
        source: "CareerPilot Curated Knowledge Base",
        matchedQuestion: kbMatch.question
      });
    }

    // 3. Smart generic fallback when no exact KB topic matched
    const genericResponse = generateSmartGeneralFallback(trimmedMessage);
    return NextResponse.json({
      success: true,
      response: genericResponse,
      mode: "static_fallback"
    });

  } catch (error) {
    console.error("[CareerPilot Chat] Handler error:", error);
    return NextResponse.json({
      success: true,
      response: "I am your CareerPilot AI Assistant! I can help you with Career Roadmaps, Department Job Roles, Assessment Portal preparation, Mock Interviews, and Resume Optimization. Please try asking about a specific role (e.g., 'Full Stack Roadmap' or 'ECE Job Roles')!",
      mode: "fallback_error"
    });
  }
}

// Fallback for general greetings or broad queries
function generateSmartGeneralFallback(query) {
  const q = query.toLowerCase();

  if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("greetings")) {
    return "👋 Hello! I am your **CareerPilot AI Assistant**.\n\nI can help you with:\n- 🚀 **Career Roadmaps** (Full Stack, AI/ML, DevOps, Data Science, etc.)\n- 💼 **Department Job Roles** (CSE, ECE, Mechanical, Electrical, Civil, Chemical)\n- 🧠 **Career Assessment Portal** guidance (Aptitude, Work Style, Tech Interest)\n- 🎙️ **Mock Interview Preparation** & HR behavioral tips (STAR Method)\n- 📄 **Resume & ATS Optimization** tips and live project ideas\n- 🏢 **Campus Placement Drives (Superset)** & Off-campus strategies\n\nWhat would you like to explore today?";
  }

  if (q.includes("help") || q.includes("what can you do") || q.includes("options")) {
    return "💡 Here are some things you can ask me:\n\n1. *\"What is the Full Stack Developer Roadmap?\"*\n2. *\"What are top job roles for ECE / Electronics students?\"*\n3. *\"How do I prepare for DSA and coding rounds?\"*\n4. *\"How does the Career Assessment Portal work?\"*\n5. *\"How to write an ATS-friendly resume for tech jobs?\"*\n6. *\"What are typical software engineer salary ranges in India?\"*";
  }

  return "I'm here to help guide your career journey on **CareerPilot AI**! 🚀\n\nYou can ask me about:\n- Step-by-step career roadmaps (Frontend, Backend, AI/ML, Cloud, Cybersecurity)\n- Job roles across CSE, ECE, Electrical, Mechanical, and Civil engineering\n- Career Assessment test modules and interview preparation\n- Resume building and campus hiring drives\n\nFeel free to ask a specific question!";
}
