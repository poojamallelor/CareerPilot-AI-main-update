"use client";
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle,
  Play,
  ShieldCheck,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
  Sparkles
} from "lucide-react";
import Image from "next/image";
import { useContext } from "react";
import { useRouter } from 'next/navigation';
import { ThemeContext } from "./components/ThemeContext";
import NewFeatureModules from './components/NewFeatureModules';

export default function JobPrepHomepage() {
  const { isDarkMode } = useContext(ThemeContext);
  const router = useRouter();

  const features = [
    {
      icon: Target,
      title: "Industry-Based Certifications",
      description:
        "Get certified in AWS, Google Cloud, Microsoft Azure, and other industry-leading platforms",
      color: "from-purple-600 to-indigo-600"
    },
    {
      icon: Users,
      title: "Real Company Projects",
      description:
        "Work on actual problem statements from top companies like Google, Microsoft, and Meta",
      color: "from-indigo-600 to-violet-600"
    },
    {
      icon: BookOpen,
      title: "Competitions & Hackathons",
      description:
        "Participate in coding challenges, hackathons, and competitive programming events",
      color: "from-purple-600 to-fuchsia-600"
    },
    {
      icon: Zap,
      title: "Aptitude Learning Platforms",
      description: "Master quantitative, logical reasoning, and verbal ability with adaptive practice",
      color: "from-violet-600 to-purple-600"
    },
    {
      icon: Brain,
      title: "AI-Powered Career Guidance",
      description:
        "Get personalized career recommendations using advanced ML algorithms and industry insights",
      color: "from-fuchsia-600 to-purple-600"
    },
    {
      icon: ShieldCheck,
      title: "Skill Assessment & Tracking",
      description:
        "Comprehensive skill evaluations with progress tracking and improvement roadmaps",
      color: "from-purple-600 to-indigo-600"
    },
    {
      icon: TrendingUp,
      title: "Industry Mentorship",
      description:
        "Connect with professionals from FAANG companies and leading tech organizations",
      color: "from-indigo-600 to-fuchsia-600"
    },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? "bg-[#0a0614] text-white" 
        : "bg-gradient-to-br from-purple-50/60 via-white to-indigo-50/50 text-stone-900"
    }`}>
      {/* Background Animated Purple Mesh Pattern */}
      <div className="fixed inset-0 pointer-events-none bg-grid-pattern opacity-60 z-0" />

      {/* Hero Section */}
      <section className="relative pt-24 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden z-10">
        {/* Animated Radiant Violet/Purple Floating Glows */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-purple-600/18 rounded-full blur-3xl pointer-events-none animate-float" />
        <div className="absolute top-28 right-1/4 w-96 h-96 bg-fuchsia-500/15 rounded-full blur-3xl pointer-events-none animate-float-delayed" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {/* Animated Floating Badge */}
              <div className={`inline-flex items-center space-x-2.5 backdrop-blur-md rounded-full px-5 py-2.5 text-base font-bold border shadow-sm animate-float ${
                isDarkMode
                  ? "bg-[#130c24] text-purple-300 border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.25)]"
                  : "bg-purple-50 text-purple-800 border-purple-200 shadow-sm"
              }`}>
                <Sparkles className="w-5 h-5 text-purple-500 animate-pulse" />
                <span>AI-Powered Job Preparation & Roadmaps</span>
              </div>

              {/* Headline with enhanced, bold size */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]">
                Launch Your
                <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-fuchsia-600 bg-clip-text text-transparent dark:from-white dark:via-purple-300 dark:to-fuchsia-400">
                  {" "}Career Journey
                </span>
              </h1>

              {/* Subtitle with bold readability */}
              <p className={`text-xl sm:text-2xl leading-relaxed font-medium ${
                isDarkMode ? "text-stone-300" : "text-stone-700"
              }`}>
                Master technical interviews, behavioral rounds, and industry
                skills with our comprehensive preparation platform. Join
                thousands who've transformed their careers.
              </p>

              {/* Action Buttons with Shimmer & Pulse Animations */}
              <div className="flex flex-col sm:flex-row gap-5 pt-2">
                <button 
                  onClick={() => router.push('/learn?page=CoursesExplore')}
                  className="btn-shimmer px-9 py-5 rounded-2xl text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 text-white shadow-md hover:shadow-purple-500/50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center space-x-3 group cursor-pointer"
                >
                  <span>Start Learning Now</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
                </button>

                <button 
                  onClick={() => router.push('/learn?page=RealCompanyProjects')}
                  className={`px-9 py-5 rounded-2xl text-lg sm:text-xl font-bold transition-all duration-300 flex items-center justify-center space-x-3 border hover:scale-105 active:scale-95 cursor-pointer ${
                    isDarkMode
                      ? "bg-[#130c24] text-white border-[#2c1c4d] hover:bg-stone-800 hover:border-purple-500/50 shadow-lg"
                      : "bg-white text-stone-900 border-purple-100 hover:bg-purple-50 hover:border-purple-300 shadow-lg"
                  }`}
                >
                  <Play className="w-5 h-5 text-purple-600 fill-current" />
                  <span>Explore Projects</span>
                </button>
              </div>

              {/* Stats Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-purple-200/80 dark:border-stone-800">
                <div className="text-center sm:text-left">
                  <div className="text-3xl sm:text-4xl font-black text-stone-950 dark:text-white">15+</div>
                  <div className="text-sm sm:text-base font-bold text-stone-500 dark:text-stone-400 mt-1">Departments</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-3xl sm:text-4xl font-black text-stone-950 dark:text-white">200+</div>
                  <div className="text-sm sm:text-base font-bold text-stone-500 dark:text-stone-400 mt-1">Job Roles Mapped</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-3xl sm:text-4xl font-black text-stone-950 dark:text-white">300+</div>
                  <div className="text-sm sm:text-base font-bold text-stone-500 dark:text-stone-400 mt-1">Roadmaps</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-3xl sm:text-4xl font-black text-stone-950 dark:text-white">10,000+</div>
                  <div className="text-sm sm:text-base font-bold text-stone-500 dark:text-stone-400 mt-1">Active Learners</div>
                </div>
              </div>
            </div>

            {/* Right Card with Floating Glows */}
            <div className="relative">
              <div className={`glow-card relative rounded-3xl p-8 sm:p-10 backdrop-blur-xl border shadow-2xl transition-all duration-300 ${
                isDarkMode
                  ? "bg-[#130c24]/95 border-purple-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
                  : "bg-white/95 border-purple-100 shadow-[0_20px_40px_rgba(124,58,237,0.12)]"
              }`}>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <CheckCircle className="w-7 h-7 text-emerald-500 flex-shrink-0 animate-bounce" />
                    <span className="font-bold text-lg sm:text-xl text-stone-950 dark:text-white">
                      AWS Certification track completed
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <CheckCircle className="w-7 h-7 text-emerald-500 flex-shrink-0 animate-bounce [animation-delay:0.3s]" />
                    <span className="font-bold text-lg sm:text-xl text-stone-950 dark:text-white">
                      Real-world company project deployed
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <CheckCircle className="w-7 h-7 text-emerald-500 flex-shrink-0 animate-bounce [animation-delay:0.6s]" />
                    <span className="font-bold text-lg sm:text-xl text-stone-950 dark:text-white">
                      Aptitude assessments passed with 94%
                    </span>
                  </div>

                  <div className="rounded-2xl p-6 mt-8 bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-900/40 shadow-inner">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-base sm:text-lg text-stone-900 dark:text-stone-200">Overall Readiness Progress</span>
                      <span className="font-black text-xl text-purple-600 dark:text-purple-400">92%</span>
                    </div>
                    <div className="w-full bg-stone-200 dark:bg-stone-800 rounded-full h-3.5 overflow-hidden">
                      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-fuchsia-500 h-3.5 rounded-full w-[92%] transition-all duration-1000 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Phases Section */}
      <section className="flex justify-center px-4 py-10 z-10 relative">
        <div className="max-w-5xl w-full p-3 rounded-3xl bg-white/60 dark:bg-stone-900/50 backdrop-blur-xl border border-purple-200/60 dark:border-stone-800 shadow-xl">
          <Image
            src="/phases.png"
            height={800}
            width={1000}
            alt="phases"
            priority={false}
            loading="lazy"
            sizes="(max-width: 640px) 95vw, (max-width: 1024px) 90vw, 1000px"
            className="w-full h-auto rounded-2xl"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HwAFgwJ/l9tZ4QAAAABJRU5ErkJggg=="
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 z-10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-6xl font-black mb-6">
              Complete Learning{" "}
              <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-fuchsia-600 bg-clip-text text-transparent dark:from-white dark:via-purple-300 dark:to-fuchsia-400">
                Ecosystem
              </span>
            </h2>
            <p className={`text-xl sm:text-2xl leading-relaxed font-medium ${
              isDarkMode ? "text-stone-300" : "text-stone-700"
            }`}>
              Master industry skills through certifications, real projects, hackathons, and comprehensive aptitude assessments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`glow-card group rounded-3xl p-8 border transition-all duration-300 hover:scale-105 ${
                  isDarkMode
                    ? "bg-[#130c24]/90 backdrop-blur-sm border-[#2c1c4d] hover:border-purple-500/50 shadow-xl"
                    : "bg-white/95 backdrop-blur-sm border-purple-100 hover:border-purple-300 shadow-md"
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${feature.color} text-white shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3.5 text-stone-950 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {feature.title}
                </h3>
                <p className={`text-base sm:text-lg leading-relaxed ${
                  isDarkMode ? "text-stone-300" : "text-stone-600"
                }`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Detailed Features Showcase */}
          <div className="space-y-24">
            {/* Feature 1: Industry-Leading Certifications */}
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <div className="space-y-7">
                <div className={`inline-flex items-center space-x-2.5 backdrop-blur-sm rounded-full px-5 py-2.5 text-base font-bold border ${
                  isDarkMode
                    ? "bg-[#130c24] text-purple-300 border-purple-500/30"
                    : "bg-purple-50 text-purple-800 border-purple-200"
                }`}>
                  <Zap className="w-5 h-5 text-purple-500" />
                  <span>AI-Curated</span>
                </div>
                <h3 className="text-4xl sm:text-5xl font-black leading-tight">
                  Industry-Leading{" "}
                  <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent dark:from-white dark:to-purple-300">
                    Certifications
                  </span>
                </h3>
                <p className={`text-xl leading-relaxed font-medium ${
                  isDarkMode ? "text-stone-300" : "text-stone-700"
                }`}>
                  Earn recognized certifications from AWS, Google Cloud, Microsoft Azure, and other leading platforms. Validate your skills with industry-standard credentials that employers trust.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3.5">
                    <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                    <span className={`text-lg font-semibold ${isDarkMode ? "text-stone-300" : "text-stone-800"}`}>
                      AWS, Azure, GCP certified paths
                    </span>
                  </div>
                  <div className="flex items-center space-x-3.5">
                    <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                    <span className={`text-lg font-semibold ${isDarkMode ? "text-stone-300" : "text-stone-800"}`}>
                      Industry-recognized credentials
                    </span>
                  </div>
                  <div className="flex items-center space-x-3.5">
                    <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                    <span className={`text-lg font-semibold ${isDarkMode ? "text-stone-300" : "text-stone-800"}`}>
                      25+ certification programs
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => router.push('/learn?page=IndustryCertifications')}
                  className="btn-shimmer bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 text-white font-bold text-lg px-8 py-4 rounded-2xl hover:scale-105 transition-all shadow-md flex items-center space-x-3 cursor-pointer">
                  <span>Start Certification</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <div className="relative">
                <div className={`glow-card rounded-3xl p-8 sm:p-10 border shadow-2xl ${
                  isDarkMode
                    ? "bg-[#130c24]/95 border-purple-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
                    : "bg-white border-purple-100 shadow-[0_20px_40px_rgba(124,58,237,0.12)]"
                }`}>
                  <div className="rounded-2xl p-7 mb-6 bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-9 h-9 bg-purple-600 rounded-xl flex items-center justify-center shadow-md">
                        <span className="text-white font-black text-xs">AWS</span>
                      </div>
                      <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                        <span className="text-white font-black text-xs">AZ</span>
                      </div>
                      <div className="w-9 h-9 bg-fuchsia-600 rounded-xl flex items-center justify-center shadow-md">
                        <span className="text-white font-black text-xs">GCP</span>
                      </div>
                    </div>
                    <div>
                      <div className="mb-2 font-bold text-2xl text-stone-950 dark:text-white">
                        AWS Solutions Architect
                      </div>
                      <div className="text-emerald-500 font-bold text-base">
                        ✓ Professional Level Certification
                      </div>
                      <div className="mt-6 rounded-xl p-4 bg-white dark:bg-[#130c24] border border-purple-200 dark:border-stone-700 shadow-sm">
                        <div className="text-purple-700 dark:text-purple-300 text-sm sm:text-base font-bold">
                          Next: Google Cloud Professional Developer
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg text-stone-700 dark:text-stone-300">Certification Progress</span>
                    <span className="text-3xl font-black text-purple-600 dark:text-purple-400">3/25</span>
                  </div>
                  <div className="w-full bg-stone-200 dark:bg-stone-800 rounded-full h-3.5 mt-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-500 h-3.5 rounded-full w-[24%]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2: Real Company Projects */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative lg:order-1">
                <div className={`glow-card rounded-3xl p-8 sm:p-10 border shadow-2xl ${
                  isDarkMode
                    ? "bg-[#130c24]/95 border-purple-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
                    : "bg-white border-purple-100 shadow-[0_20px_40px_rgba(124,58,237,0.12)]"
                }`}>
                  <div className="grid grid-cols-2 gap-5 mb-6">
                    <div className="rounded-2xl p-5 bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40">
                      <div className="font-bold mb-2 text-base text-stone-950 dark:text-white">Google Project</div>
                      <div className="w-full bg-stone-200 dark:bg-stone-800 rounded-full h-2.5">
                        <div className="bg-emerald-500 h-2.5 rounded-full w-[100%]"></div>
                      </div>
                      <div className="text-emerald-500 text-xs mt-2 font-bold">Completed</div>
                    </div>
                    <div className="rounded-2xl p-5 bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40">
                      <div className="font-bold mb-2 text-base text-stone-950 dark:text-white">Meta Challenge</div>
                      <div className="w-full bg-stone-200 dark:bg-stone-800 rounded-full h-2.5">
                        <div className="bg-purple-600 h-2.5 rounded-full w-[75%]"></div>
                      </div>
                      <div className="text-purple-600 dark:text-purple-400 text-xs mt-2 font-bold">In Progress</div>
                    </div>
                    <div className="rounded-2xl p-5 bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40">
                      <div className="font-bold mb-2 text-base text-stone-950 dark:text-white">Microsoft Task</div>
                      <div className="w-full bg-stone-200 dark:bg-stone-800 rounded-full h-2.5">
                        <div className="bg-indigo-500 h-2.5 rounded-full w-[30%]"></div>
                      </div>
                      <div className="text-indigo-500 text-xs mt-2 font-bold">Started</div>
                    </div>
                    <div className="rounded-2xl p-5 bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40">
                      <div className="font-bold mb-2 text-base text-stone-950 dark:text-white">Netflix System</div>
                      <div className="w-full bg-stone-200 dark:bg-stone-800 rounded-full h-2.5">
                        <div className="bg-stone-400 h-2.5 rounded-full w-[0%]"></div>
                      </div>
                      <div className="text-stone-400 text-xs mt-2 font-bold">Not Started</div>
                    </div>
                  </div>
                  <div className="rounded-2xl p-5 bg-white dark:bg-[#130c24] border border-purple-200 dark:border-stone-700 shadow-sm">
                    <div className="font-bold mb-1.5 text-base text-stone-950 dark:text-white">Next Recommended Project</div>
                    <div className="text-purple-700 dark:text-purple-300 text-sm font-semibold leading-relaxed">
                      Complete "Amazon E-commerce System Design" - Scalable microservices architecture
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-7 lg:order-2">
                <div className={`inline-flex items-center space-x-2.5 backdrop-blur-sm rounded-full px-5 py-2.5 text-base font-bold border ${
                  isDarkMode
                    ? "bg-[#130c24] text-purple-300 border-purple-500/30"
                    : "bg-purple-50 text-purple-800 border-purple-200"
                }`}>
                  <Target className="w-5 h-5 text-purple-500" />
                  <span>Portfolio Engineering</span>
                </div>
                <h3 className="text-4xl sm:text-5xl font-black leading-tight">
                  <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent dark:from-white dark:to-purple-300">
                    Real Company
                  </span>{" "}
                  Projects
                </h3>
                <p className={`text-xl leading-relaxed font-medium ${
                  isDarkMode ? "text-stone-300" : "text-stone-700"
                }`}>
                  Work on actual problem statements from leading tech companies. Solve real-world challenges used by Google, Microsoft, Meta, and other top organizations for their hiring process.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3.5">
                    <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                    <span className={`text-lg font-semibold ${isDarkMode ? "text-stone-300" : "text-stone-800"}`}>
                      Problems from FAANG companies
                    </span>
                  </div>
                  <div className="flex items-center space-x-3.5">
                    <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                    <span className={`text-lg font-semibold ${isDarkMode ? "text-stone-300" : "text-stone-800"}`}>
                      Industry-level complexity projects
                    </span>
                  </div>
                  <div className="flex items-center space-x-3.5">
                    <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                    <span className={`text-lg font-semibold ${isDarkMode ? "text-stone-300" : "text-stone-800"}`}>
                      100+ real problem statements
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => router.push('/learn?page=RealCompanyProjects')}
                  className="btn-shimmer font-bold text-lg px-9 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 text-white shadow-md hover:scale-105 transition-all flex items-center space-x-3 cursor-pointer">
                  <span>Start Projects</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Feature Modules Section */}
      <NewFeatureModules />
    </div>
  );
}
