"use client";
import {
  AlertCircle,
  ArrowLeft,
  Award,
  Book,
  BookOpen,
  ChevronRight,
  Clock,
  DollarSign,
  GraduationCap,
  Lightbulb,
  MessageSquare,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Sparkles
} from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";

const toSafeText = (val) => {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val === "object") {
    return (
      val.title ||
      val.name ||
      val.skill ||
      val.project ||
      val.resource ||
      val.milestone ||
      val.topic ||
      val.description ||
      JSON.stringify(val)
    );
  }
  return String(val);
};

const StudentRoadMap = ({ setTree, roadmap }) => {
  const [data, setData] = useState(null);
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => {
    if (roadmap) {
      setData(roadmap);
    } else {
      const stored = localStorage.getItem("roadmap");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setData(parsed.roadmap);
        } catch (error) {
          console.error("Invalid roadmap data in localStorage");
        }
      }
    }
  }, [roadmap]);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-stone-600 dark:text-stone-400 text-sm font-medium">
            Loading your personalized career roadmap...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center px-4 py-1.5 bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 rounded-full text-xs sm:text-sm font-bold">
            <Sparkles className="w-4 h-4 mr-1.5" />
            AI-Generated Career Roadmap
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 dark:text-white tracking-tight">
            {toSafeText(data.title) || "Your Career Roadmap"}
          </h1>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-3xl mx-auto leading-relaxed font-medium">
            {toSafeText(data.introduction)}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-medium">
            {data.timeframe && (
              <span className="flex items-center gap-1.5 font-bold text-purple-600 dark:text-purple-400">
                <Clock className="h-4 w-4" />
                {toSafeText(data.timeframe)}
              </span>
            )}
            {data.salary_progression && (
              <span className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                <DollarSign className="h-4 w-4" />
                {toSafeText(data.salary_progression)}
              </span>
            )}
          </div>
        </div>

        {/* Goals, Objectives, Trends */}
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="bg-white dark:bg-[#130c24] border border-purple-100 dark:border-[#2c1c4d] shadow-md rounded-3xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-stone-900 dark:text-white text-base sm:text-lg font-bold">
                <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                Career Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2.5">
                {(data.goals || []).map((goal, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <div className="h-2 w-2 rounded-full bg-purple-600 dark:bg-purple-400 mt-2 flex-shrink-0" />
                    <span className="text-stone-700 dark:text-stone-300 text-sm">
                      {toSafeText(goal)}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#130c24] border border-purple-100 dark:border-[#2c1c4d] shadow-md rounded-3xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-stone-900 dark:text-white text-base sm:text-lg font-bold">
                <Trophy className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                Key Objectives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2.5">
                {(data.objectives || []).map((objective, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <div className="h-5 w-5 flex-shrink-0 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex items-center justify-center text-xs font-black">
                      {index + 1}
                    </div>
                    <span className="text-stone-700 dark:text-stone-300 text-sm">
                      {toSafeText(objective)}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#130c24] border border-purple-100 dark:border-[#2c1c4d] shadow-md rounded-3xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-stone-900 dark:text-white text-base sm:text-lg font-bold">
                <TrendingUp className="h-5 w-5 text-emerald-500" />
                Industry Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2.5">
                {(data.industry_trends || []).slice(0, 4).map((trend, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <div className="h-2 w-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <span className="text-stone-700 dark:text-stone-300 text-sm">
                      {toSafeText(trend)}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Learning Phases */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white mb-2">
              🎯 Your Learning Journey
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm max-w-2xl mx-auto font-medium">
              Follow this structured milestone sequence to elevate your technical capabilities.
            </p>
          </div>

          {/* Phase Navigation Tabs */}
          {data.phases && data.phases.length > 1 && (
            <div className="flex justify-center">
              <div className="flex flex-wrap gap-2 bg-white dark:bg-[#130c24] rounded-2xl p-1.5 shadow-sm border border-purple-100 dark:border-[#2c1c4d]">
                {data.phases.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActivePhase(index)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                      activePhase === index
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                        : "text-stone-600 dark:text-stone-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-stone-800"
                    }`}
                  >
                    Phase {index + 1}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Phase Details Card */}
          {data.phases && data.phases[activePhase] && (
            <Card className="bg-white dark:bg-[#130c24] border border-purple-100 dark:border-[#2c1c4d] shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-700 via-indigo-600 to-violet-600 text-white p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <Badge className="bg-white/20 text-white border-none font-bold text-xs mb-2">
                      Phase {activePhase + 1}
                    </Badge>
                    <CardTitle className="text-2xl sm:text-3xl font-black text-white">
                      {toSafeText(data.phases[activePhase].title)}
                    </CardTitle>
                    <p className="text-purple-100 text-sm sm:text-base mt-2 font-medium">
                      {toSafeText(data.phases[activePhase].description)}
                    </p>
                  </div>
                  {data.phases[activePhase].duration && (
                    <div className="shrink-0 flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-white font-bold text-sm">
                      <Clock className="h-4 w-4" />
                      {toSafeText(data.phases[activePhase].duration)}
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-6 sm:p-8 space-y-8 bg-purple-50/20 dark:bg-[#0e081c]">
                {/* Milestones / Topics */}
                {data.phases[activePhase].milestones && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
                      <Target className="h-5 w-5 text-purple-600" />
                      Key Milestones & Topics
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {data.phases[activePhase].milestones.map((m, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-white dark:bg-[#130c24] border border-purple-100 dark:border-[#2c1c4d] shadow-sm flex items-start gap-3"
                        >
                          <div className="w-6 h-6 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                            {idx + 1}
                          </div>
                          <div>
                            <h4 className="font-bold text-stone-900 dark:text-white text-sm">
                              {toSafeText(m.title || m)}
                            </h4>
                            {m.description && (
                              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                                {toSafeText(m.description)}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Practical Projects */}
                {data.phases[activePhase].projects && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-indigo-600" />
                      Capstone Hands-On Projects
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {data.phases[activePhase].projects.map((proj, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-white dark:bg-[#130c24] border border-purple-100 dark:border-[#2c1c4d] shadow-sm space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-stone-900 dark:text-white text-sm">
                              {toSafeText(proj.title || proj)}
                            </h4>
                            <Badge variant="outline" className="text-xs border-purple-200 text-purple-600">
                              Project {idx + 1}
                            </Badge>
                          </div>
                          {proj.description && (
                            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                              {toSafeText(proj.description)}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentRoadMap;
