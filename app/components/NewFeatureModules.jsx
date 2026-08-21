"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeContext } from "./ThemeContext";
import { 
  Users, 
  Target, 
  Code, 
  Calculator, 
  Heart, 
  ArrowRight,
  Play
} from "lucide-react";

export default function NewFeatureModules() {
  const { isDarkMode } = useContext(ThemeContext);
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState(null);

  const featureModules = [
    {
      id: 'aptitude',
      title: 'Aptitude Module',
      subtitle: 'Quantitative, Logical, DI Basics',
      description: 'Master quantitative aptitude, logical reasoning, and data interpretation with adaptive diagnostic tests',
      icon: Calculator,
      gradient: 'from-purple-600 via-indigo-600 to-violet-600',
      features: ['Adaptive Tests', 'Real-time Analytics', 'Progress Tracking'],
      route: '/assessment?module=aptitude'
    },
    {
      id: 'general',
      title: 'General Questions Module',
      subtitle: 'Life-relatable fresher questions',
      description: 'Understand personality traits and workplace perspectives through relatable scenario questions',
      icon: Heart,
      gradient: 'from-violet-600 via-purple-600 to-fuchsia-600',
      features: ['Personality Insights', 'Life Skills Assessment', 'Growth Mindset'],
      route: '/assessment?module=general'
    },
    {
      id: 'workstyle',
      title: 'Work-Style Profiler',
      subtitle: 'Creative | Management | Technical | Analytical',
      description: '10 dynamic questions that drive role recommendations and team dynamic compatibility',
      icon: Users,
      gradient: 'from-indigo-600 via-purple-600 to-fuchsia-600',
      features: ['Role Matching', 'Career Roadmaps', 'Team Dynamics'],
      route: '/assessment?module=workstyle'
    },
    {
      id: 'techinterest',
      title: 'Tech-Interest Explorer',
      subtitle: 'Tech vs Non-Tech Alignment',
      description: '10 beginner-friendly questions to discover your software engineering interests and aptitude',
      icon: Code,
      gradient: 'from-purple-600 via-violet-600 to-indigo-600',
      features: ['Tech Aptitude', 'Domain Preferences', 'Learning Path'],
      route: '/assessment?module=techinterest'
    }
  ];

  const handleModuleClick = (module) => {
    try {
      router.push(`/assessment?module=${module.id}`);
    } catch (error) {
      console.error('Navigation error:', error);
      window.location.href = `/assessment?module=${module.id}`;
    }
  };

  const handleStartAssessment = () => {
    try {
      router.push('/assessment');
    } catch (error) {
      console.error('Navigation error:', error);
      window.location.href = '/assessment';
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <div className={`inline-flex items-center space-x-2.5 backdrop-blur-sm rounded-full px-6 py-3 text-base font-bold mb-6 border shadow-sm animate-float ${
            isDarkMode
              ? "bg-[#130c24] text-purple-300 border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.25)]"
              : "bg-purple-50 text-purple-800 border-purple-200"
          }`}>
            <Target className="w-5 h-5 text-purple-500" />
            <span>Career Diagnostic Modules</span>
          </div>
          
          <h2 className="text-4xl sm:text-6xl font-black mb-6 text-stone-950 dark:text-white">
            Discover Your{" "}
            <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-fuchsia-600 bg-clip-text text-transparent dark:from-white dark:via-purple-300 dark:to-fuchsia-400">
              Career Path
            </span>
          </h2>
          
          <p className={`text-xl sm:text-2xl leading-relaxed font-medium mb-10 ${
            isDarkMode ? "text-stone-300" : "text-stone-700"
          }`}>
            Take our comprehensive 4-module assessment to evaluate your aptitude, personality traits, work style, and technology affinity.
          </p>

          <button
            onClick={handleStartAssessment}
            className="btn-shimmer font-bold text-lg sm:text-xl px-10 py-5 rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 mx-auto bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 text-white shadow-md hover:shadow-purple-500/60 cursor-pointer"
          >
            <Play className="w-6 h-6 fill-current" />
            <span>Start Complete Assessment</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>

        {/* Feature Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {featureModules.map((module) => (
            <div
              key={module.id}
              className={`glow-card group relative rounded-3xl p-8 sm:p-10 border transition-all duration-500 cursor-pointer transform hover:scale-[1.02] ${
                isDarkMode
                  ? "bg-[#130c24]/95 backdrop-blur-sm border-[#2c1c4d] hover:border-purple-500/50 shadow-xl"
                  : "bg-white/95 backdrop-blur-sm border-purple-100 hover:border-purple-300 shadow-md"
              }`}
              onMouseEnter={() => setHoveredCard(module.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleModuleClick(module)}
            >
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-8">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${module.gradient} text-white shadow-md transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <module.icon className="w-9 h-9" />
                  </div>
                  
                  <div className="text-stone-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black mb-2 text-stone-950 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {module.title}
                    </h3>
                    <p className="text-sm sm:text-base font-bold text-purple-600 dark:text-purple-400">
                      {module.subtitle}
                    </p>
                  </div>

                  <p className={`text-base sm:text-lg leading-relaxed font-medium ${
                    isDarkMode ? "text-stone-300" : "text-stone-600"
                  }`}>
                    {module.description}
                  </p>

                  <div className="space-y-3 pt-2">
                    {module.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${module.gradient}`}></div>
                        <span className={`text-sm sm:text-base font-semibold ${
                          isDarkMode ? "text-stone-300" : "text-stone-800"
                        }`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-purple-100 dark:border-stone-800 flex items-center justify-between">
                    <button className="text-base font-bold text-purple-600 dark:text-purple-400 group-hover:underline transition-colors duration-300 flex items-center space-x-2">
                      <span>Launch Assessment</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics Section */}
        <div className={`rounded-3xl p-10 border transition-all ${
          isDarkMode
            ? "bg-[#130c24] border-[#2c1c4d]"
            : "bg-white border-purple-100 shadow-lg"
        }`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-2 text-center">
              <div className="text-4xl sm:text-5xl font-black text-stone-950 dark:text-white">
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent dark:from-white dark:to-purple-300">15+</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-stone-500 dark:text-stone-400">
                Departments
              </div>
            </div>
            <div className="space-y-2 text-center">
              <div className="text-4xl sm:text-5xl font-black text-stone-950 dark:text-white">
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent dark:from-white dark:to-purple-300">200+</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-stone-500 dark:text-stone-400">
                Job Roles
              </div>
            </div>
            <div className="space-y-2 text-center">
              <div className="text-4xl sm:text-5xl font-black text-stone-950 dark:text-white">
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent dark:from-white dark:to-purple-300">300+</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-stone-500 dark:text-stone-400">
                Roadmaps
              </div>
            </div>
            <div className="space-y-2 text-center">
              <div className="text-4xl sm:text-5xl font-black text-stone-950 dark:text-white">
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent dark:from-white dark:to-purple-300">10,000+</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-stone-500 dark:text-stone-400">
                Active Users
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}