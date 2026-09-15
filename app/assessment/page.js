"use client";

import { useContext, useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ThemeContext } from "../components/ThemeContext";
import ErrorBoundary from "../components/ErrorBoundary";
import {
  Calculator,
  Heart,
  Users,
  Code,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  RotateCcw,
  Sparkles,
  Trophy,
  Target,
  BarChart2,
  BookOpen,
  HelpCircle,
  Play
} from "lucide-react";
import Link from "next/link";

const MODULE_CONFIG = {
  aptitude: {
    apiKey: "AptitudeModule",
    title: "Aptitude Assessment",
    description: "Quantitative math, logical reasoning, and data interpretation diagnostics",
    icon: Calculator,
    gradient: "from-purple-600 to-indigo-600",
    color: "purple",
    duration: "25 min",
    type: "scored"
  },
  general: {
    apiKey: "GeneralLifeUnderstanding",
    title: "General Life Understanding",
    description: "Emotional intelligence, situational judgment, and professional EQ",
    icon: Heart,
    gradient: "from-violet-600 to-fuchsia-600",
    color: "violet",
    duration: "20 min",
    type: "scored"
  },
  workstyle: {
    apiKey: "WorkStyleProfiler",
    title: "Work-Style Profiler",
    description: "Workplace preferences, collaboration style, and risk tolerance mapping",
    icon: Users,
    gradient: "from-indigo-600 to-purple-600",
    color: "indigo",
    duration: "15 min",
    type: "profiler"
  },
  techinterest: {
    apiKey: "TechInterestExplorer",
    title: "Tech-Interest Explorer",
    description: "Discover your affinity across Software, AI/ML, Cloud, and Systems",
    icon: Code,
    gradient: "from-purple-600 to-violet-600",
    color: "purple",
    duration: "20 min",
    type: "profiler"
  }
};

function AssessmentContent() {
  const { isDarkMode } = useContext(ThemeContext);
  const searchParams = useSearchParams();
  const router = useRouter();

  const rawModule = (searchParams.get("module") || "").toLowerCase();
  const activeModuleKey = MODULE_CONFIG[rawModule] ? rawModule : null;

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    if (!activeModuleKey) {
      setQuestions([]);
      setLoading(false);
      return;
    }

    const fetchQuestions = async () => {
      setLoading(true);
      setLoadError(null);
      try {
        const config = MODULE_CONFIG[activeModuleKey];
        const res = await fetch(`/api/assessment/questions?module=${config.apiKey}`);
        if (!res.ok) throw new Error("Failed to load questions");
        const data = await res.json();
        if (data && Array.isArray(data.questions) && data.questions.length > 0) {
          setQuestions(data.questions);
        } else {
          throw new Error("Empty question list returned");
        }
      } catch (err) {
        console.error("Error fetching assessment questions:", err);
        setLoadError("Unable to load questions dynamically. Retrying with curated bank...");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [activeModuleKey]);

  // If a specific module is selected and questions are loading
  if (activeModuleKey && loading) {
    return (
      <div
        className={`min-h-screen ${
          isDarkMode
            ? "bg-[#0a0614] text-white"
            : "bg-gradient-to-br from-purple-50/60 via-white to-indigo-50/50 text-stone-900"
        } py-12 px-4 flex justify-center items-center`}
      >
        <div className="max-w-2xl w-full text-center space-y-6">
          <div className="relative inline-block">
            <div className="w-20 h-20 rounded-3xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center animate-pulse mx-auto">
              <Sparkles className="w-10 h-10 text-purple-400 animate-spin" />
            </div>
          </div>
          <h2 className="text-2xl font-bold">Generating Assessment Questions...</h2>
          <p className="text-sm text-stone-400 max-w-md mx-auto">
            Configuring adaptive diagnostics and personalized evaluation metrics for {MODULE_CONFIG[activeModuleKey]?.title}
          </p>
          <div className="w-48 h-1.5 bg-purple-950/60 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 animate-[pulse_1.5s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </div>
    );
  }

  // If a specific module is selected and questions loaded, render active assessment
  if (activeModuleKey && questions.length > 0) {
    return (
      <ActiveModuleAssessment
        moduleKey={activeModuleKey}
        config={MODULE_CONFIG[activeModuleKey]}
        questions={questions}
        isDarkMode={isDarkMode}
        onExit={() => router.push("/assessment")}
      />
    );
  }

  // Default Landing: Full Career Assessment Portal Overview
  return <AssessmentPortalLanding isDarkMode={isDarkMode} onSelectModule={(mod) => router.push(`/assessment?module=${mod}`)} />;
}

// Active Assessment Interactive Test Component
function ActiveModuleAssessment({ moduleKey, config, questions, isDarkMode, onExit }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // questionId -> optionIndex
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(25 * 60); // 25 min default timer
  const [isTimerActive, setIsTimerActive] = useState(true);

  const total = questions.length;
  const currentQ = questions[currentIndex] || {};
  const Icon = config.icon;

  // Countdown timer
  useEffect(() => {
    if (!isTimerActive || isSubmitted) return;
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerActive, isSubmitted]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remSecs.toString().padStart(2, "0")}`;
  };

  const handleSelectOption = (idx) => {
    if (isSubmitted) return;
    const qId = currentQ.id !== undefined ? currentQ.id : currentIndex;
    setAnswers((prev) => ({ ...prev, [qId]: idx }));
  };

  const nextQuestion = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentIndex(0);
    setIsSubmitted(false);
    setTimeRemaining(25 * 60);
    setIsTimerActive(true);
  };

  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / total) * 100);

  // Results calculation
  const scoredQuestions = questions.filter((q) => q.correct !== -1 && q.correct !== undefined);
  const score = scoredQuestions.reduce((acc, q, idx) => {
    const qId = q.id !== undefined ? q.id : idx;
    return acc + (answers[qId] === q.correct ? 1 : 0);
  }, 0);

  const scorePercentage = scoredQuestions.length > 0 ? Math.round((score / scoredQuestions.length) * 100) : 100;

  // Results View
  if (isSubmitted) {
    return (
      <div
        className={`min-h-screen ${
          isDarkMode
            ? "bg-[#0a0614] text-white"
            : "bg-gradient-to-br from-purple-50/60 via-white to-indigo-50/50 text-stone-900"
        } py-12 px-4`}
      >
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Result Header */}
          <div
            className={`rounded-3xl p-8 border text-center relative overflow-hidden shadow-2xl ${
              isDarkMode
                ? "bg-[#130c24] border-[#2c1c4d]"
                : "bg-white border-purple-100 shadow-xl"
            }`}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-xl mb-4">
              <Trophy className="w-10 h-10" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-black mb-2">
              {config.title} — Results
            </h1>
            <p className="text-sm sm:text-base text-stone-400 max-w-xl mx-auto mb-6">
              You have completed the assessment. Here is your detailed performance breakdown and skill diagnostic report.
            </p>

            {/* Scorecard Box */}
            {config.type === "scored" ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-6">
                <div
                  className={`p-5 rounded-2xl border ${
                    isDarkMode ? "bg-purple-950/20 border-purple-900/40" : "bg-purple-50 border-purple-100"
                  }`}
                >
                  <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">Score</p>
                  <p className="text-3xl font-black text-purple-500">
                    {score} / {scoredQuestions.length}
                  </p>
                </div>

                <div
                  className={`p-5 rounded-2xl border ${
                    isDarkMode ? "bg-emerald-950/20 border-emerald-900/40" : "bg-emerald-50 border-emerald-100"
                  }`}
                >
                  <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">Accuracy</p>
                  <p className="text-3xl font-black text-emerald-500">{scorePercentage}%</p>
                </div>

                <div
                  className={`p-5 rounded-2xl border ${
                    isDarkMode ? "bg-indigo-950/20 border-indigo-900/40" : "bg-indigo-50 border-indigo-100"
                  }`}
                >
                  <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">Proficiency</p>
                  <p className="text-lg font-bold text-indigo-400 mt-1">
                    {scorePercentage >= 80 ? "🌟 Advanced" : scorePercentage >= 60 ? "👍 Proficient" : "📚 Developing"}
                  </p>
                </div>
              </div>
            ) : (
              <div
                className={`p-6 rounded-2xl border max-w-xl mx-auto mb-6 ${
                  isDarkMode ? "bg-purple-950/20 border-purple-900/40" : "bg-purple-50 border-purple-100"
                }`}
              >
                <h3 className="text-lg font-bold text-purple-400 mb-2">Diagnostic Profile Complete!</h3>
                <p className="text-sm text-stone-300">
                  Your preferences and technological interests have been mapped to your CareerPilot personalized learning tracks.
                </p>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={handleRetake}
                className="px-6 py-3 rounded-2xl font-bold text-sm bg-purple-600 hover:bg-purple-500 text-white shadow-lg transition-all flex items-center space-x-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Module</span>
              </button>

              <button
                onClick={onExit}
                className={`px-6 py-3 rounded-2xl font-bold text-sm border transition-all cursor-pointer ${
                  isDarkMode
                    ? "bg-[#1f143a] border-[#2c1c4d] text-stone-200 hover:bg-[#2b1c50]"
                    : "bg-white border-purple-200 text-purple-700 hover:bg-purple-50 shadow-sm"
                }`}
              >
                Back to All Modules
              </button>

              <Link
                href="/careerplanning?page=RoleRoadMap"
                className="px-6 py-3 rounded-2xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:scale-105 transition-transform flex items-center space-x-2"
              >
                <span>View Career Roadmaps</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Question Breakdown and Explanations */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black">Detailed Solutions & Analysis</h2>
            {questions.map((q, idx) => {
              const qId = q.id !== undefined ? q.id : idx;
              const selectedOptIdx = answers[qId];
              const isCorrect = q.correct !== -1 ? selectedOptIdx === q.correct : true;

              return (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border transition-all ${
                    isDarkMode ? "bg-[#130c24] border-[#2c1c4d]" : "bg-white border-purple-100 shadow-md"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                      Question {idx + 1}
                    </span>
                    {q.correct !== -1 && (
                      <span
                        className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold ${
                          isCorrect
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                        }`}
                      >
                        {isCorrect ? <CheckCircle className="w-3.5 h-3.5 mr-1" /> : <XCircle className="w-3.5 h-3.5 mr-1" />}
                        {isCorrect ? "Correct" : "Incorrect"}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-base sm:text-lg mb-4">{q.question}</h3>

                  <div className="space-y-2 mb-4">
                    {q.options?.map((opt, optIdx) => {
                      const isUserChoice = selectedOptIdx === optIdx;
                      const isCorrectChoice = q.correct === optIdx;

                      let optStyle = isDarkMode
                        ? "bg-[#1a1033] border-[#2c1c4d] text-stone-300"
                        : "bg-purple-50/40 border-purple-100 text-stone-700";

                      if (isCorrectChoice) {
                        optStyle = "bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-semibold";
                      } else if (isUserChoice && !isCorrect) {
                        optStyle = "bg-rose-500/20 border-rose-500/60 text-rose-300 font-semibold";
                      } else if (isUserChoice && q.correct === -1) {
                        optStyle = "bg-purple-600/30 border-purple-500 text-purple-200 font-semibold";
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`px-4 py-2.5 rounded-xl border text-sm flex items-center justify-between ${optStyle}`}
                        >
                          <span>{opt}</span>
                          {isCorrectChoice && <span className="text-xs font-bold text-emerald-400">✓ Correct Answer</span>}
                          {isUserChoice && !isCorrectChoice && (
                            <span className="text-xs font-bold text-rose-400">Your Answer</span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {q.explanation && (
                    <div
                      className={`p-3.5 rounded-xl text-xs sm:text-sm border leading-relaxed ${
                        isDarkMode
                          ? "bg-purple-950/30 border-purple-900/50 text-purple-200"
                          : "bg-purple-50 border-purple-200 text-purple-900"
                      }`}
                    >
                      <strong className="font-bold">Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Active Assessment Question Card
  const currentQId = currentQ.id !== undefined ? currentQ.id : currentIndex;
  const currentSelectedIdx = answers[currentQId];

  return (
    <div
      className={`min-h-screen ${
        isDarkMode
          ? "bg-[#0a0614] text-white"
          : "bg-gradient-to-br from-purple-50/60 via-white to-indigo-50/50 text-stone-900"
      } py-8 px-4`}
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Top bar with module info, timer & progress */}
        <div
          className={`p-4 sm:p-5 rounded-2xl border flex items-center justify-between shadow-md ${
            isDarkMode ? "bg-[#130c24] border-[#2c1c4d]" : "bg-white border-purple-100"
          }`}
        >
          <div className="flex items-center space-x-3">
            <button
              onClick={onExit}
              className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Exit Assessment"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="font-black text-base sm:text-lg">{config.title}</h2>
              <p className="text-xs text-purple-400 font-semibold">
                Question {currentIndex + 1} of {total}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 font-mono text-sm font-bold">
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeRemaining)}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-stone-800/40 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Main Question Card */}
        <div
          className={`p-6 sm:p-8 rounded-3xl border shadow-xl ${
            isDarkMode ? "bg-[#130c24] border-[#2c1c4d]" : "bg-white border-purple-100"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-600/20 text-purple-300 border border-purple-500/30">
              Module: {config.title}
            </span>
            <span className="text-xs font-semibold text-stone-400">
              Answered: {answeredCount} / {total}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold mb-6 leading-snug">
            {currentQ.question}
          </h3>

          {/* Option list */}
          <div className="space-y-3 mb-8">
            {currentQ.options?.map((opt, optIdx) => {
              const isSelected = currentSelectedIdx === optIdx;

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-transparent shadow-lg scale-[1.01]"
                      : isDarkMode
                      ? "bg-[#1a1033] border-[#2c1c4d] text-stone-200 hover:bg-[#231645] hover:border-purple-500/50"
                      : "bg-purple-50/40 border-purple-100 text-stone-800 hover:bg-purple-100/70"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : isDarkMode
                          ? "bg-stone-800 text-stone-300"
                          : "bg-white text-purple-700 shadow-sm"
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="text-sm sm:text-base font-medium">{opt}</span>
                  </div>

                  {isSelected && <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Question Navigation Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10 dark:border-[#2c1c4d]">
            <button
              onClick={prevQuestion}
              disabled={currentIndex === 0}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                currentIndex === 0
                  ? "opacity-30 cursor-not-allowed"
                  : isDarkMode
                  ? "bg-stone-800 text-white hover:bg-stone-700"
                  : "bg-stone-100 text-stone-800 hover:bg-stone-200"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentIndex < total - 1 ? (
              <button
                onClick={nextQuestion}
                className="px-6 py-2.5 rounded-xl text-sm font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-md transition-all flex items-center space-x-1.5 cursor-pointer"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setIsSubmitted(true)}
                className="px-8 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-xl transition-all flex items-center space-x-1.5 cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Submit Assessment</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Landing View for the Assessment Portal
function AssessmentPortalLanding({ isDarkMode, onSelectModule }) {
  const modules = Object.entries(MODULE_CONFIG).map(([key, item]) => ({
    id: key,
    ...item
  }));

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-[#0a0614]" : "bg-gradient-to-br from-purple-50/60 via-white to-indigo-50/50"
      }`}
    >
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-600 to-violet-600 py-16 text-white shadow-2xl relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold shadow-inner">
            <Sparkles className="w-4 h-4 text-purple-200" />
            <span>AI-Powered Career Diagnostics & Benchmarking</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            Career Assessment Portal
          </h1>
          <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto font-medium leading-relaxed">
            Evaluate your core strengths, problem-solving aptitude, and technical preferences through our comprehensive 4-module assessment suite.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        {/* Metric Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className={`text-center p-6 rounded-3xl border ${
              isDarkMode ? "bg-[#130c24] border-[#2c1c4d]" : "bg-white border-purple-100 shadow-lg"
            }`}
          >
            <div className="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center bg-purple-500/20 text-purple-400">
              <Clock className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-white">Total Time</h3>
            <p className="text-3xl font-black text-purple-500 my-1">70 min</p>
            <p className="text-xs font-medium text-stone-500 dark:text-stone-400">Self-Paced Timed Modules</p>
          </div>

          <div
            className={`text-center p-6 rounded-3xl border ${
              isDarkMode ? "bg-[#130c24] border-[#2c1c4d]" : "bg-white border-purple-100 shadow-lg"
            }`}
          >
            <div className="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center bg-indigo-500/20 text-indigo-400">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-white">Diagnostic Pillars</h3>
            <p className="text-3xl font-black text-indigo-400 my-1">4 Modules</p>
            <p className="text-xs font-medium text-stone-500 dark:text-stone-400">Holistic Multi-Dimensional Evaluation</p>
          </div>

          <div
            className={`text-center p-6 rounded-3xl border ${
              isDarkMode ? "bg-[#130c24] border-[#2c1c4d]" : "bg-white border-purple-100 shadow-lg"
            }`}
          >
            <div className="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center bg-emerald-500/20 text-emerald-400">
              <CheckCircle className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-white">Curated Questions</h3>
            <p className="text-3xl font-black text-emerald-500 my-1">40 Total</p>
            <p className="text-xs font-medium text-stone-500 dark:text-stone-400">Adaptive AI & Industry Standards</p>
          </div>
        </div>

        {/* 4 Interactive Assessment Modules */}
        <div className="grid md:grid-cols-2 gap-6">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between shadow-xl ${
                  isDarkMode
                    ? "bg-[#130c24]/90 border-[#2c1c4d] hover:border-purple-500/50"
                    : "bg-white border-purple-100 hover:shadow-2xl"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${m.gradient} text-white shadow-md`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-purple-400 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                        {m.duration}
                      </span>
                      <p className="text-xs text-stone-500 mt-1 font-medium">10 Questions</p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-stone-900 dark:text-white mb-2">
                    {m.title}
                  </h3>

                  <p className="text-sm text-stone-600 dark:text-stone-300 font-medium mb-6 leading-relaxed">
                    {m.description}
                  </p>
                </div>

                <button
                  onClick={() => onSelectModule(m.id)}
                  className={`w-full py-4 px-6 rounded-2xl font-bold text-white bg-gradient-to-r ${m.gradient} shadow-lg hover:shadow-purple-500/40 transition-all flex items-center justify-center space-x-2 cursor-pointer group`}
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>Launch {m.title.split(" ")[0]} Assessment</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function AssessmentPage() {
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center font-bold text-purple-500">
            Loading Assessment Portal...
          </div>
        }
      >
        <AssessmentContent />
      </Suspense>
    </ErrorBoundary>
  );
}