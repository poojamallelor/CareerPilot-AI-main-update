"use client";
import { useContext, useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ThemeContext } from "../components/ThemeContext";
import ErrorBoundary from "../components/ErrorBoundary";
import { Calculator, Heart, Users, Code, ArrowRight, CheckCircle } from "lucide-react";

function AssessmentContent() {
  const { isDarkMode } = useContext(ThemeContext);
  const searchParams = useSearchParams();
  const moduleParam = searchParams.get('module');
  // Map query param to API dataset key
  const moduleKeyMap = {
    aptitude: 'AptitudeModule',
    general: 'GeneralLifeUnderstanding',
    workstyle: 'WorkStyleProfiler',
    techinterest: 'TechInterestExplorer'
  };
  const apiModuleKey = moduleParam ? moduleKeyMap[moduleParam] : null;
  // Holds normalized module questions object { AptitudeModule: [...], ... }
  const [questions, setQuestions] = useState({});
  const [loading, setLoading] = useState(true);

  const moduleIcons = {
    aptitude: Calculator,
    general: Heart,
    workstyle: Users,
    techinterest: Code
  };

  const moduleNames = {
    aptitude: 'Aptitude Module',
    general: 'General Life Understanding',
    workstyle: 'Work Style Profiler',
    techinterest: 'Tech Interest Explorer'
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      // Only fetch if a specific module is requested to save AI cost/time
      if (apiModuleKey) {
        try {
          const response = await fetch(`/api/assessment/questions?module=${apiModuleKey}`);
          const data = await response.json();
          if (data.module && Array.isArray(data.questions)) {
            setQuestions({ [data.module]: data.questions });
          }
        } catch (error) {
          console.error('Error fetching questions:', error);
        } finally {
          setLoading(false);
        }
      } else {
        // No specific module selected, just show the portal landing page
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [apiModuleKey]);

  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-[#0a0614] text-white' : 'bg-gradient-to-br from-purple-50/60 via-white to-indigo-50/50 text-stone-900'} py-10 px-4 flex justify-center`}>
        <div className="max-w-3xl w-full">
          <div className="animate-pulse space-y-6">
            <div className={`h-10 ${isDarkMode ? 'bg-purple-950/40' : 'bg-purple-100/40'} rounded w-1/3 mb-6`}></div>
            <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-[#130c24] border border-[#2c1c4d]' : 'bg-white border border-purple-100 shadow'}`}>
              <div className="flex justify-between items-center mb-4">
                <div className={`h-4 ${isDarkMode ? 'bg-purple-950/40' : 'bg-purple-100/40'} rounded w-24`}></div>
                <div className={`h-4 ${isDarkMode ? 'bg-purple-950/40' : 'bg-purple-100/40'} rounded w-24`}></div>
              </div>
              <div className={`h-6 ${isDarkMode ? 'bg-purple-950/40' : 'bg-purple-100/40'} rounded w-3/4 mb-4`}></div>
              <div className="space-y-3">
                {[...Array(4)].map((_, idx) => (
                  <div key={idx} className={`h-12 w-full rounded-lg ${isDarkMode ? 'bg-stone-900' : 'bg-stone-100'}`}></div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-6">
                <div className={`h-10 ${isDarkMode ? 'bg-purple-950/40' : 'bg-purple-100/40'} rounded-full w-24`}></div>
                <div className={`h-10 ${isDarkMode ? 'bg-purple-950/40' : 'bg-purple-100/40'} rounded-full w-24`}></div>
              </div>
            </div>
            <div className="text-center text-purple-500 font-medium mt-4">Generating unique questions dynamically...</div>
          </div>
        </div>
      </div>
    );
  }

  const IconComponent = moduleParam ? moduleIcons[moduleParam] : Calculator;

  // If specific module requested and loaded, render interactive assessment component
  if (!loading && apiModuleKey && questions[apiModuleKey]) {
    return <ModuleAssessment 
      moduleParam={moduleParam}
      moduleDisplayName={moduleNames[moduleParam]}
      isDarkMode={isDarkMode}
      questions={questions[apiModuleKey]}
    />;
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0a0614] text-white' : 'bg-gradient-to-br from-purple-50/60 via-white to-indigo-50/50 text-stone-900'}`}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
            isDarkMode ? 'bg-purple-500/20' : 'bg-purple-100'
          }`}>
            <IconComponent className={`w-8 h-8 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
          </div>
          
          <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-foreground' : 'text-gray-900'}`}>
            {moduleParam ? moduleNames[moduleParam] : 'Career Assessment'}
          </h1>
          
          <p className={`text-xl ${isDarkMode ? 'text-purple-300/80' : 'text-stone-600'}`}>
            {moduleParam 
              ? `Complete your ${moduleNames[moduleParam]} assessment`
              : 'Discover your career path through comprehensive assessment'
            }
          </p>
        </div>

        <div className={`rounded-2xl p-8 border ${
          isDarkMode 
            ? 'bg-[#130c24] border-[#2c1c4d]' 
            : 'bg-white border border-purple-100 shadow-lg'
        }`}>
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span className={`text-lg font-medium ${isDarkMode ? 'text-foreground' : 'text-gray-900'}`}>
                Assessment data loaded successfully
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-6 rounded-xl border ${
                isDarkMode ? 'bg-purple-950/20 border-[#2c1c4d]' : 'bg-purple-50/40 border-purple-100'
              }`}>
                <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-foreground' : 'text-gray-900'}`}>
                  Total Questions Available
                </h3>
                <p className={`text-3xl font-bold text-purple-500`}>
                  40 (AI Generated)
                </p>
              </div>
              
              <div className={`p-6 rounded-xl border ${
                isDarkMode ? 'bg-purple-950/20 border-[#2c1c4d]' : 'bg-purple-50/40 border-purple-100'
              }`}>
                <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-foreground' : 'text-gray-900'}`}>
                  Modules Available
                </h3>
                <p className={`text-3xl font-bold text-green-500`}>4</p>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h4 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-foreground' : 'text-gray-900'}`}>
                Module Breakdown:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Aptitude Module
                  </span>
                  <span className={`font-medium ${isDarkMode ? 'text-foreground' : 'text-gray-900'}`}>
                    10 AI questions
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    General Life Understanding
                  </span>
                  <span className={`font-medium ${isDarkMode ? 'text-foreground' : 'text-gray-900'}`}>
                    10 AI questions
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Work Style Profiler
                  </span>
                  <span className={`font-medium ${isDarkMode ? 'text-foreground' : 'text-gray-900'}`}>
                    10 AI questions
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Tech Interest Explorer
                  </span>
                  <span className={`font-medium ${isDarkMode ? 'text-foreground' : 'text-gray-900'}`}>
                    10 AI questions
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center pt-6">
              <p className={`${isDarkMode ? 'text-purple-300/80' : 'text-stone-600'} mb-4`}>Select a module from the portal to begin.</p>
              <a href="/assessment?module=aptitude" className={`inline-block group font-semibold text-sm px-5 py-2 rounded-full mr-2 transition-all bg-purple-600 text-white hover:bg-purple-500`}>Aptitude</a>
              <a href="/assessment?module=general" className={`inline-block group font-semibold text-sm px-5 py-2 rounded-full mr-2 transition-all bg-fuchsia-600 text-white hover:bg-fuchsia-500`}>General</a>
              <a href="/assessment?module=workstyle" className={`inline-block group font-semibold text-sm px-5 py-2 rounded-full mr-2 transition-all bg-indigo-600 text-white hover:bg-indigo-500`}>Work Style</a>
              <a href="/assessment?module=techinterest" className={`inline-block group font-semibold text-sm px-5 py-2 rounded-full transition-all bg-violet-600 text-white hover:bg-violet-500`}>Tech Interest</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Interactive module assessment component
function ModuleAssessment({ moduleParam, moduleDisplayName, isDarkMode, questions }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // id -> selected option index
  const [submitted, setSubmitted] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const currentQuestion = questions[currentIndex];
  const total = questions.length;

  const handleSelect = (optionIdx) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionIdx }));
  };

  const next = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex(i => Math.min(i + 1, total - 1));
      setIsFading(false);
    }, 300);
  };
  const prev = () => {
    if (currentIndex > 0) {
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex(i => Math.max(i - 1, 0));
        setIsFading(false);
      }, 300);
    }
  };

  const onSubmit = () => {
    setSubmitted(true);
  };

  // Compute score only for questions with correct >= 0
  const scoredQuestions = questions.filter(q => q.correct >= 0);
  const score = scoredQuestions.reduce((acc, q) => acc + (answers[q.id] === q.correct ? 1 : 0), 0);
  const preferences = questions.filter(q => q.correct === -1).map(q => ({ question: q.question, choice: q.options[answers[q.id]] || null }));
  const unanswered = questions.filter(q => answers[q.id] == null).length;

  if (submitted) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-[#0a0614] text-white' : 'bg-gradient-to-br from-purple-50/60 via-white to-indigo-50/50 text-stone-900'} py-10 px-4`}> 
        <div className="max-w-3xl mx-auto">
          <h1 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-foreground' : 'text-gray-900'}`}>{moduleDisplayName} - Results</h1>
          <div className={`rounded-xl p-6 mb-6 border ${isDarkMode ? 'bg-[#130c24] border-[#2c1c4d]' : 'bg-white border-purple-100 shadow'}`}>
            <p className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>Score: {score} / {scoredQuestions.length}</p>
            <p className={`${isDarkMode ? 'text-purple-300/80' : 'text-stone-600'}`}>Unanswered: {unanswered}</p>
          </div>
          {preferences.length > 0 && (
            <div className={`rounded-xl p-6 mb-6 border ${isDarkMode ? 'bg-[#130c24] border-[#2c1c4d]' : 'bg-white border-purple-100 shadow'}`}>
              <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-foreground' : 'text-gray-900'}`}>Your Preferences</h2>
              <ul className="space-y-3">
                {preferences.map((p, idx) => (
                  <li key={idx} className={`${isDarkMode ? 'text-purple-300/85' : 'text-stone-700'}`}>
                    <span className="font-medium">Q: {p.question}</span><br />
                    <span className="text-sm">Selected: {p.choice || 'No selection'}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <a href="/assessment" className={`inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-medium`}>Back to Modules</a>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0a0614] text-white' : 'bg-gradient-to-br from-purple-50/60 via-white to-indigo-50/50 text-stone-900'} py-10 px-4`}>
      <div className="max-w-3xl mx-auto">
        <h1 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-foreground' : 'text-gray-900'}`}>{moduleDisplayName}</h1>
        <div className={`rounded-xl p-6 mb-6 border ${isDarkMode ? 'bg-[#130c24] border-[#2c1c4d]' : 'bg-white border-purple-100 shadow'}`}>
          <div className="flex justify-between items-center mb-4">
            <span className={`text-sm opacity-60`}>Question {currentIndex + 1} / {total}</span>
            <span className={`text-sm opacity-60`}>Answered: {Object.keys(answers).length}</span>
          </div>
          <div className={`transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
            <p className={`text-lg font-medium mb-4`}>{currentQuestion.question}</p>
            <div className="space-y-3">
              {currentQuestion.options.map((opt, idx) => {
                const selected = answers[currentQuestion.id] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition ${selected ? 'bg-purple-600 border-purple-600 text-white' : (isDarkMode ? 'bg-stone-900 border-stone-800 text-stone-200 hover:bg-stone-850' : 'bg-stone-50 border-stone-200 hover:bg-stone-100')}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex justify-between items-center mt-6">
            <button onClick={prev} disabled={currentIndex === 0} className={`px-5 py-2 rounded-full text-sm font-medium ${currentIndex === 0 ? 'opacity-40 cursor-not-allowed' : (isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300')}`}>Previous</button>
            {currentIndex < total - 1 && (
              <button onClick={next} className={`px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-full text-sm font-medium`}>Next</button>
            )}
            {currentIndex === total - 1 && (
              <button onClick={onSubmit} className={`px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-sm font-semibold`}>Submit</button>
            )}
          </div>
        </div>
        <a href="/assessment" className={`inline-block px-4 py-2 bg-purple-950/20 text-purple-300 border border-[#2c1c4d]/50 hover:bg-purple-950/40 rounded-full text-xs font-medium`}>Back</a>
      </div>
    </div>
  );
}

export default function AssessmentPage() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <AssessmentContent />
      </Suspense>
    </ErrorBoundary>
  );
}