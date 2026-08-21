"use client";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { ThemeContext } from "./ThemeContext";
import { 
  BookOpen, 
  Map, 
  Brain, 
  Sparkles, 
  ArrowRight, 
  Briefcase, 
  Award, 
  Calendar,
  Compass 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Instruction = () => {
  const router = useRouter();
  const { isDarkMode } = useContext(ThemeContext);

  const learningPillars = [
    {
      title: "Explore AI Courses",
      description: "Dynamically generated curriculums across 50+ topics with comprehensive video tracks and exercises.",
      icon: BookOpen,
      badge: "Self-Paced",
      href: "/learn?page=CoursesExplore",
      gradient: "from-purple-600 to-indigo-600"
    },
    {
      title: "Career Roadmaps",
      description: "Interactive step-by-step milestone roadmaps tailored to your branch, domain, and experience.",
      icon: Map,
      badge: "AI Roadmap",
      href: "/learn?page=Roadmaps",
      gradient: "from-indigo-600 to-violet-600"
    },

    {
      title: "Real Company Projects",
      description: "Portfolio capstone projects with full problem statements, deliverables, and modern tech stacks.",
      icon: Briefcase,
      badge: "Portfolio",
      href: "/learn?page=RealCompanyProjects",
      gradient: "from-violet-600 to-purple-600"
    },
    {
      title: "Industry Certifications",
      description: "Official guides and preparation roadmaps for AWS, GCP, Azure, and high-demand credentials.",
      icon: Award,
      badge: "Certificates",
      href: "/learn?page=IndustryCertifications",
      gradient: "from-fuchsia-600 to-purple-600"
    },
    {
      title: "30-Day Preparation Plan",
      description: "Day-by-day structured milestone planner to prepare for technical interviews and placement drives.",
      icon: Calendar,
      badge: "Placements",
      href: "/learn?page=DayRemains",
      gradient: "from-purple-600 to-indigo-600"
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-700 via-indigo-600 to-violet-600 text-white p-8 sm:p-12 shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs sm:text-sm font-bold mb-4">
            <Compass className="w-4 h-4" />
            <span>AI Learning & Career Mastery</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 text-white">
            Welcome to the Learning Hub
          </h1>
          <p className="text-purple-100 text-base sm:text-lg leading-relaxed font-medium mb-6">
            Master high-demand tech skills with AI-curated courses, step-by-step career roadmaps, and real-world portfolio capstones.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={() => router.push("/learn?page=CoursesExplore")}
              className="bg-white text-purple-700 hover:bg-purple-50 font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Explore AI Courses
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Ambient background glow shapes */}
        <div className="absolute -top-16 -right-16 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 right-1/3 w-64 h-64 bg-fuchsia-400/20 rounded-full blur-xl pointer-events-none" />
      </div>

      {/* Learning Pillars Grid */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white">
            Choose Your Learning Path
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base mt-1">
            Pick a module below to start your targeted preparation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningPillars.map((pillar, idx) => (
            <Card
              key={idx}
              onClick={() => router.push(pillar.href)}
              className="group cursor-pointer hover-lift border transition-all duration-300 rounded-2xl bg-white dark:bg-[#130c24] border-stone-200 dark:border-[#2c1c4d] hover:border-purple-400 dark:hover:border-purple-500 shadow-sm hover:shadow-xl"
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${pillar.gradient} text-white shadow-md group-hover:scale-110 transition-transform`}>
                    <pillar.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-900/40">
                    {pillar.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-stone-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1.5 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center text-xs font-bold text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform">
                  <span>Launch Module</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Instruction;
