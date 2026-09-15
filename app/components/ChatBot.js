"use client";

import {
  Bot,
  Loader2,
  Send,
  User,
  X,
  Sparkles,
  RotateCcw,
  BookOpen,
  Zap,
  HelpCircle
} from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "./ThemeContext";

const SUGGESTED_PROMPTS = [
  "🚀 Full Stack Roadmap",
  "🧠 Assessment Portal Guide",
  "💼 ECE Job Roles",
  "🎙️ Mock Interview Prep",
  "📄 ATS Resume Tips",
  "💰 Tech Salaries in India",
  "⚡ Mechanical Career Options",
  "💡 Best DSA Strategy"
];

// Simple markdown formatter helper for messages
function FormattedMessage({ content }) {
  if (!content) return null;

  // Split lines
  const lines = content.split("\n");

  return (
    <div className="space-y-1.5 text-sm sm:text-base leading-relaxed break-words">
      {lines.map((line, idx) => {
        // Headers
        if (line.startsWith("### ")) {
          return (
            <h4 key={idx} className="font-bold text-sm sm:text-base mt-2 mb-1 text-purple-400">
              {line.replace("### ", "")}
            </h4>
          );
        }
        if (line.startsWith("## ")) {
          return (
            <h3 key={idx} className="font-extrabold text-base sm:text-lg mt-2 mb-1 text-purple-300">
              {line.replace("## ", "")}
            </h3>
          );
        }

        // Bullet points
        if (line.trim().startsWith("- ") || line.trim().startsWith("* ") || line.trim().startsWith("• ")) {
          const text = line.trim().replace(/^[-*•]\s+/, "");
          return (
            <div key={idx} className="flex items-start space-x-2 pl-2">
              <span className="text-purple-400 mt-1 text-xs">●</span>
              <span>{formatBoldAndCode(text)}</span>
            </div>
          );
        }

        // Numbered list
        const numMatch = line.trim().match(/^(\d+)\.\s+(.*)/);
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start space-x-2 pl-2">
              <span className="font-bold text-purple-400 text-xs mt-0.5">{numMatch[1]}.</span>
              <span>{formatBoldAndCode(numMatch[2])}</span>
            </div>
          );
        }

        // Empty lines
        if (!line.trim()) {
          return <div key={idx} className="h-1" />;
        }

        return <p key={idx}>{formatBoldAndCode(line)}</p>;
      })}
    </div>
  );
}

// Helper to bold **text** and inline `code`
function formatBoldAndCode(text) {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-bold text-purple-200 dark:text-purple-300">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 rounded text-xs bg-purple-900/40 text-purple-300 border border-purple-800/50 font-mono"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const { isDarkMode } = useContext(ThemeContext);

  // Initial greeting message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content:
            "👋 Hello! I'm your **CareerPilot AI Career Assistant**.\n\nI am powered by **Google Gemini** with a fallback knowledge base of **80+ curated career topics**.\n\nAsk me anything about:\n- 🚀 Step-by-step Career Roadmaps\n- 💼 Engineering Department Roles (CSE, ECE, ME, EE, Civil)\n- 🧠 Assessment Portal & Aptitude Preparation\n- 🎙️ Mock Interview & HR STAR method questions\n- 📄 ATS Resume Tips & Real Company Projects",
          mode: "ai"
        }
      ]);
    }
  }, [messages.length]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendQuery = async (queryText) => {
    if (!queryText.trim() || isLoading) return;

    const userMessage = { role: "user", content: queryText.trim() };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      // First try /api/chat which has dynamic Gemini + 80+ static KB fallback
      let response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: queryText.trim(),
          conversationHistory: newMessages.slice(-6)
        })
      });

      // Fallback to /api/gemini if /api/chat isn't available
      if (!response.ok) {
        response = await fetch("/api/gemini", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: queryText.trim(),
            type: "conversation"
          })
        });
      }

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      const assistantMessage =
        data.response || "I can help guide you with career roadmaps, job roles, assessment prep, and interviews. What specific topic would you like to explore?";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: assistantMessage,
          mode: data.mode || "ai",
          source: data.source
        }
      ]);
    } catch (error) {
      console.error("Error calling AI API:", error);
      const errorMessage =
        "I'm here to help! You can ask about:\n- Full Stack, AI/ML, DevOps Roadmaps\n- Department Roles for CSE, ECE, Mechanical, EE\n- Career Assessment Portal guide & Aptitude Tips\n- Resume ATS tips and Mock Interviews";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: errorMessage, mode: "fallback" }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendQuery(input);
  };

  const handleResetChat = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "✨ Chat reset. How can I assist you with your career roadmaps, job preparation, or assessments today?",
        mode: "ai"
      }
    ]);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      {/* Chat toggle floating button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 p-4 rounded-2xl shadow-2xl z-[60] transition-all duration-300 bg-gradient-to-tr from-purple-600 via-indigo-600 to-violet-600 text-white shadow-purple-500/30 hover:shadow-purple-500/60 hover:scale-105 active:scale-95 cursor-pointer border border-white/20 flex items-center justify-center group"
        aria-label="Toggle chat assistant"
      >
        {isChatOpen ? (
          <X size={26} />
        ) : (
          <div className="relative">
            <Bot size={26} />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-white"></span>
            </span>
          </div>
        )}
      </button>

      {/* Chat window container */}
      <div
        className={`fixed bottom-24 right-4 sm:right-6 w-[94vw] sm:w-[440px] h-[580px] max-h-[80vh] rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 transform z-[60] flex flex-col border ${
          isChatOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        } ${
          isDarkMode
            ? "bg-[#130c24]/98 backdrop-blur-2xl border-[#2c1c4d] shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
            : "bg-white/98 backdrop-blur-2xl border-purple-100 shadow-[0_20px_50px_rgba(124,58,237,0.18)]"
        }`}
      >
        {/* Chat header */}
        <div className="p-4 bg-gradient-to-r from-purple-700 via-indigo-600 to-violet-600 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-white/20 backdrop-blur-md shadow-inner">
              <Sparkles size={20} className="text-purple-200 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="font-bold text-base tracking-tight">CareerPilot AI</h3>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-extrabold bg-emerald-400/30 text-emerald-200 border border-emerald-400/40">
                  Dynamic AI
                </span>
              </div>
              <p className="text-xs text-purple-100/90 font-medium">
                Gemini AI & 80+ Knowledge Topics
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={handleResetChat}
              title="Reset conversation"
              className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw size={17} />
            </button>
            <button
              onClick={toggleChat}
              className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Suggested Quick Prompt Chips */}
        <div
          className={`px-3 py-2 border-b overflow-x-auto whitespace-nowrap flex space-x-1.5 scrollbar-none text-xs font-medium ${
            isDarkMode ? "border-[#2c1c4d] bg-[#0c0717]" : "border-purple-100 bg-purple-50/50"
          }`}
        >
          {SUGGESTED_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => sendQuery(prompt)}
              disabled={isLoading}
              className={`px-2.5 py-1 rounded-full border transition-all text-xs flex-shrink-0 cursor-pointer ${
                isDarkMode
                  ? "bg-purple-950/40 border-purple-900/60 text-purple-300 hover:bg-purple-900/60 hover:text-white"
                  : "bg-white border-purple-200 text-purple-700 hover:bg-purple-100"
              }`}
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Messages container */}
        <div
          className={`p-4 flex-1 overflow-y-auto space-y-4 ${
            isDarkMode ? "text-stone-200" : "text-stone-800"
          }`}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex flex-col ${message.role === "user" ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[88%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-none shadow-md"
                    : isDarkMode
                    ? "bg-[#1a1033] border border-[#2c1c4d] text-stone-200 rounded-bl-none shadow-sm"
                    : "bg-purple-50/90 border border-purple-100 text-stone-800 rounded-bl-none shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between space-x-2 mb-1.5 pb-1 border-b border-white/10 dark:border-[#2c1c4d]/50">
                  <div className="flex items-center space-x-1.5">
                    {message.role === "user" ? (
                      <>
                        <User size={14} />
                        <span className="font-bold text-xs">You</span>
                      </>
                    ) : (
                      <>
                        <Bot size={14} className="text-purple-400" />
                        <span className="font-bold text-xs text-purple-400">CareerPilot AI</span>
                      </>
                    )}
                  </div>

                  {message.role === "assistant" && message.mode && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                        message.mode === "ai"
                          ? "bg-purple-500/20 text-purple-300"
                          : "bg-indigo-500/20 text-indigo-300"
                      }`}
                    >
                      {message.mode === "ai" ? "Gemini AI" : "Knowledge Base"}
                    </span>
                  )}
                </div>

                {message.role === "assistant" ? (
                  <FormattedMessage content={message.content} />
                ) : (
                  <p className="whitespace-pre-wrap">{message.content}</p>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start">
              <div
                className={`px-4 py-3 rounded-2xl max-w-[85%] rounded-bl-none border ${
                  isDarkMode
                    ? "bg-[#1a1033] border-[#2c1c4d] text-stone-200"
                    : "bg-purple-50 border-purple-100 text-stone-800"
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <Bot size={14} className="text-purple-400" />
                  <span className="font-bold text-xs text-purple-400">CareerPilot AI</span>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Loader2 size={16} className="animate-spin text-purple-500" />
                  <span className="font-medium text-xs text-purple-300">
                    Generating personalized guidance...
                  </span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input form */}
        <form
          onSubmit={handleSubmit}
          className={`p-3.5 border-t ${
            isDarkMode ? "border-[#2c1c4d] bg-[#0a0614]" : "border-purple-100 bg-purple-50/40"
          }`}
        >
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              placeholder="Ask anything about roles, roadmaps, salaries, interview tips..."
              className={`flex-1 px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all ${
                isDarkMode
                  ? "bg-[#130c24] border-[#2c1c4d] text-white placeholder-stone-400"
                  : "bg-white border-purple-200 text-stone-900 placeholder-stone-400"
              }`}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white disabled:opacity-40 shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-all"
            >
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChatBot;
