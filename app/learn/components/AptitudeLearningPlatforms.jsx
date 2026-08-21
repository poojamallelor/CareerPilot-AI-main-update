"use client";
import React, { useContext } from "react";
import { Brain, ArrowRight } from "lucide-react";
import { ThemeContext } from "../../components/ThemeContext";

const platforms = [
  { name: "HackerRank", url: "https://www.hackerrank.com/domains/algorithms", desc: "Practice algorithms and data structures with timed challenges." },
  { name: "Codeforces", url: "https://codeforces.com/", desc: "Competitive programming rounds to improve problem-solving speed." },
  { name: "LeetCode", url: "https://leetcode.com/", desc: "Interview-focused problems with detailed discussions and solutions." },
  { name: "GeeksforGeeks Aptitude", url: "https://www.geeksforgeeks.org/quantitative-aptitude/", desc: "Quantitative aptitude topics with explanations and quizzes." },
  { name: "TalentSprint Aptitude", url: "https://talentsprint.com/aptitude", desc: "Practice aptitude tests with topic-wise assessments." },
  { name: "Edabit", url: "https://edabit.com/challenges", desc: "Beginner-friendly coding puzzles to build fundamentals." },
];

export default function AptitudeLearningPlatforms() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen transition-colors duration-300 py-10 px-4 ${
      isDarkMode 
        ? "bg-[#0a0614] text-white" 
        : "bg-gradient-to-br from-purple-50/60 via-white to-indigo-50/50 text-stone-900"
    }`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Brain className="w-8 h-8 text-purple-600" />
          <h1 className="text-2xl font-bold">Aptitude & Problem-Solving Platforms</h1>
        </div>
        <p className={`mb-6 ${isDarkMode ? 'text-purple-300/80' : 'text-stone-600'}`}>
          Boost your aptitude and problem-solving skills with curated platforms. Start with beginner-friendly sites and progress to competitive programming rounds.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {platforms.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group block rounded-lg border p-4 transition ${
                isDarkMode 
                  ? "bg-[#130c24] border-[#2c1c4d] hover:border-purple-500" 
                  : "bg-white border-purple-100 hover:border-purple-600"
              }`}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{p.name}</h2>
                <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-purple-600" />
              </div>
              <p className={`mt-2 text-sm ${isDarkMode ? 'text-purple-300/70' : 'text-stone-600'}`}>{p.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
