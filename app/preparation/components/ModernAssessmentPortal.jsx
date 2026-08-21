"use client";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { ThemeContext } from "../../components/ThemeContext";
import {
  Brain,
  Users,
  Target,
  Code,
  Calculator,
  Heart,
  ArrowRight,
  Play,
  Clock,
  CheckCircle,
  Star,
  Sparkles
} from "lucide-react";

export default function ModernAssessmentPortal() {
  const { isDarkMode } = useContext(ThemeContext);
  const router = useRouter();

  const assessmentModules = [
    {
      id: 'aptitude',
      title: 'Aptitude Assessment',
      description: 'Quantitative, Logical, and Data Interpretation skills evaluation',
      icon: Calculator,
      duration: '25 min',
      questions: '10 Questions',
      difficulty: 'Adaptive',
      gradient: 'from-purple-600 to-indigo-600'
    },
    {
      id: 'general',
      title: 'General Life Understanding',
      description: 'Personality traits and life perspective assessment',
      icon: Heart,
      duration: '20 min',
      questions: '10 Questions',
      difficulty: 'Beginner',
      gradient: 'from-violet-600 to-fuchsia-600'
    },
    {
      id: 'workstyle',
      title: 'Work-Style Profiler',
      description: 'Discover your work preferences and collaboration style',
      icon: Users,
      duration: '15 min',
      questions: '10 Questions',
      difficulty: 'Intermediate',
      gradient: 'from-indigo-600 to-purple-600'
    },
    {
      id: 'techinterest',
      title: 'Tech-Interest Explorer',
      description: 'Evaluate your technology aptitude and interests',
      icon: Code,
      duration: '20 min',
      questions: '10 Questions',
      difficulty: 'Beginner',
      gradient: 'from-purple-600 to-violet-600'
    }
  ];

  const handleStartAssessment = (moduleId) => {
    router.push(`/assessment?module=${moduleId}`);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0a0614]' : 'bg-gradient-to-br from-purple-50/60 via-white to-indigo-50/50'}`}>
      <div className="bg-gradient-to-r from-purple-700 via-indigo-600 to-violet-600 py-16 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold">
            <Sparkles className="w-4 h-4" />
            <span>Multi-Dimensional Career Diagnostics</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            Career Assessment Portal
          </h1>
          <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto font-medium">
            Discover your core strengths and optimal career alignment through our comprehensive 4-module assessment suite
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className={`text-center p-8 rounded-3xl border ${isDarkMode ? 'bg-[#130c24] border-[#2c1c4d]' : 'bg-white border-purple-100 shadow-lg'}`}>
            <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${isDarkMode ? 'bg-purple-950/60 text-purple-300' : 'bg-purple-100 text-purple-600'}`}>
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-1 text-stone-900 dark:text-white">Total Duration</h3>
            <p className="text-3xl font-black text-purple-600 dark:text-purple-400 mb-1">70 min</p>
            <p className="text-xs font-bold text-stone-500 dark:text-stone-400">Self-Paced Timed</p>
          </div>

          <div className={`text-center p-8 rounded-3xl border ${isDarkMode ? 'bg-[#130c24] border-[#2c1c4d]' : 'bg-white border-purple-100 shadow-lg'}`}>
            <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${isDarkMode ? 'bg-purple-950/60 text-purple-300' : 'bg-purple-100 text-purple-600'}`}>
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-1 text-stone-900 dark:text-white">Diagnostic Pillars</h3>
            <p className="text-3xl font-black text-purple-600 dark:text-purple-400 mb-1">4 Modules</p>
            <p className="text-xs font-bold text-stone-500 dark:text-stone-400">Holistic Assessment</p>
          </div>

          <div className={`text-center p-8 rounded-3xl border ${isDarkMode ? 'bg-[#130c24] border-[#2c1c4d]' : 'bg-white border-purple-100 shadow-lg'}`}>
            <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${isDarkMode ? 'bg-purple-950/60 text-purple-300' : 'bg-purple-100 text-purple-600'}`}>
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-1 text-stone-900 dark:text-white">Curated Questions</h3>
            <p className="text-3xl font-black text-purple-600 dark:text-purple-400 mb-1">40 Total</p>
            <p className="text-xs font-bold text-stone-500 dark:text-stone-400">Adaptive Benchmarking</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {assessmentModules.map((module) => (
            <div key={module.id} className={`group rounded-3xl p-8 border transition-all duration-300 hover:scale-[1.02] cursor-pointer ${isDarkMode
                ? 'bg-[#130c24]/90 border-[#2c1c4d] hover:border-purple-500/50 shadow-xl'
                : 'bg-white border-purple-100 hover:shadow-xl shadow-md'
              }`}>
              <div className="flex items-start justify-between mb-6">
                <div className={`p-4 rounded-2xl bg-gradient-to-r ${module.gradient} text-white shadow-md`}>
                  <module.icon className="w-8 h-8" />
                </div>
                <div className="text-right text-stone-500 dark:text-stone-400">
                  <div className="text-sm font-bold text-purple-600 dark:text-purple-400">{module.duration}</div>
                  <div className="text-xs font-medium">{module.questions}</div>
                </div>
              </div>

              <h3 className="text-2xl font-black mb-3 text-stone-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {module.title}
              </h3>

              <p className="mb-6 leading-relaxed text-sm sm:text-base text-stone-600 dark:text-stone-300 font-medium">
                {module.description}
              </p>

              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-900/40">
                  {module.difficulty}
                </span>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-purple-500 fill-current" />
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleStartAssessment(module.id)}
                className={`w-full bg-gradient-to-r ${module.gradient} text-white py-4 px-6 rounded-2xl font-bold transition-all duration-300 hover:shadow-lg flex items-center justify-center space-x-2 cursor-pointer`}
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Launch Assessment</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        <div className={`text-center mt-16 p-12 rounded-3xl border ${isDarkMode
            ? 'bg-[#130c24] border-[#2c1c4d]'
            : 'bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-100 shadow-xl'
          }`}>
          <h2 className="text-3xl font-black mb-3 text-stone-900 dark:text-white">
            Ready to Begin Full Assessment?
          </h2>
          <p className="text-base text-stone-600 dark:text-stone-300 mb-8 max-w-xl mx-auto font-medium">
            Complete all 4 modules to unlock your comprehensive personalized career report and role suitability matrix.
          </p>
          <button
            onClick={() => router.push('/assessment')}
            className="bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 text-white px-10 py-4 rounded-2xl text-lg font-bold transition-all duration-300 hover:scale-105 shadow-md flex items-center space-x-2 mx-auto cursor-pointer"
          >
            <Target className="w-6 h-6" />
            <span>Launch Complete Assessment</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}