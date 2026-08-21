"use client";
import {
  Book,
  BookOpen,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  ExternalLink,
  HelpCircle,
  Play,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "../../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";

const toSafeText = (val) => {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val === "object") {
    return val.name || val.title || val.course || val.topic || val.description || JSON.stringify(val);
  }
  return String(val);
};

function Precourse({ pre, inputValue }) {
  const [expandedSection, setExpandedSection] = useState(null);
  const [data, setData] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };

  useEffect(() => {
    if (pre) {
      setData(pre);
    } else {
      const stored = localStorage.getItem("roadmap");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setData(parsed.precourse);
        } catch (error) {
          console.error("Invalid roadmap data in localStorage");
        }
      }
    }
  }, [pre]);

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-stone-800 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 dark:bg-stone-800 rounded w-3/4"></div>
          <div className="h-32 bg-gray-200 dark:bg-stone-800 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 mb-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium mb-4">
          📚 Prerequisites & Preparation
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-stone-800 dark:text-stone-100 mb-3">
          {toSafeText(data.title) || `Prerequisites for ${inputValue || "Your Target Role"}`}
        </h1>
        <p className="text-stone-600 dark:text-stone-400 max-w-2xl mx-auto text-sm sm:text-base">
          Get ready for your journey with essential foundation knowledge and preparation steps
        </p>
        {data.estimated_prep_time && (
          <div className="mt-4 inline-flex items-center gap-2 text-orange-600 dark:text-orange-400">
            <Clock className="h-4 w-4" />
            <span className="font-medium">Estimated prep time: {toSafeText(data.estimated_prep_time)}</span>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Foundation Knowledge */}
        {data.foundation_knowledge && Array.isArray(data.foundation_knowledge) && (
          <Card className="bg-white dark:bg-stone-900 shadow-md border border-stone-200 dark:border-stone-800 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-stone-900 dark:text-stone-100 text-lg">
                <BookOpen className="h-5 w-5 text-orange-500" />
                Foundation Knowledge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {data.foundation_knowledge.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-stone-700 dark:text-stone-300 text-sm sm:text-base">
                      {toSafeText(item)}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Preparation Steps */}
        {data.preparation_steps && Array.isArray(data.preparation_steps) && (
          <Card className="bg-white dark:bg-stone-900 shadow-md border border-stone-200 dark:border-stone-800 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-stone-900 dark:text-stone-100 text-lg">
                <CheckCircle className="h-5 w-5 text-emerald-500" />
                Preparation Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {data.preparation_steps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="h-6 w-6 flex-shrink-0 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <span className="text-stone-700 dark:text-stone-300 text-sm sm:text-base">
                      {toSafeText(step)}
                    </span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Recommended Courses */}
      {data.recommended_courses && Array.isArray(data.recommended_courses) && (
        <Card className="mb-8 bg-white dark:bg-stone-900 shadow-md border border-stone-200 dark:border-stone-800 rounded-2xl">
          <CardHeader>
            <CardTitle
              className="flex items-center justify-between cursor-pointer text-stone-900 dark:text-stone-100 text-lg"
              onClick={() => toggleSection("courses")}
            >
              <div className="flex items-center gap-2">
                <Play className="h-5 w-5 text-orange-500" />
                Recommended Courses ({data.recommended_courses.length})
              </div>
              {expandedSection === "courses" ? (
                <ChevronUp className="h-5 w-5 text-stone-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-stone-400" />
              )}
            </CardTitle>
          </CardHeader>
          {expandedSection === "courses" && (
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {data.recommended_courses.map((course, index) => {
                  const courseTitle = typeof course === "string" ? course : (course?.course || course?.title || "Recommended Course");
                  const provider = course?.provider || "Online Platform";
                  const difficulty = course?.difficulty || "Beginner";
                  const duration = course?.duration || "Self-paced";

                  return (
                    <div
                      key={index}
                      className="border border-stone-200 dark:border-stone-800 rounded-xl p-4 hover:shadow-md transition-shadow bg-stone-50/50 dark:bg-stone-800/40"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-stone-800 dark:text-stone-100 text-sm sm:text-base">
                          {toSafeText(courseTitle)}
                        </h4>
                        <Badge
                          variant="secondary"
                          className={`text-xs ${
                            difficulty.toLowerCase().includes("beginner")
                              ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400"
                              : difficulty.toLowerCase().includes("intermediate")
                              ? "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400"
                              : "bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400"
                          }`}
                        >
                          {difficulty}
                        </Badge>
                      </div>
                      <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mb-2">
                        {toSafeText(provider)}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-stone-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {toSafeText(duration)}
                        </span>
                        {course?.url &&
                          course.url !== "Multiple options available" &&
                          course.url !== "Check Coursera, edX, or Udemy" && (
                            <a
                              href={course.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-orange-600 hover:text-orange-700 ml-auto"
                            >
                              <ExternalLink className="h-3 w-3" />
                              View
                            </a>
                          )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          )}
        </Card>
      )}

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Free Resources */}
        {(data.free_resources || data["Free Resources"]) && (
          <Card className="bg-white dark:bg-stone-900 shadow-md border border-stone-200 dark:border-stone-800 rounded-2xl">
            <CardHeader>
              <CardTitle
                className="flex items-center justify-between cursor-pointer text-stone-900 dark:text-stone-100 text-lg"
                onClick={() => toggleSection("free")}
              >
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-500" />
                  Free Resources
                </div>
                {expandedSection === "free" ? (
                  <ChevronUp className="h-5 w-5 text-stone-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-stone-400" />
                )}
              </CardTitle>
            </CardHeader>
            {expandedSection === "free" && (
              <CardContent>
                <ul className="space-y-2.5">
                  {(data.free_resources || data["Free Resources"]).map(
                    (resource, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Star className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span className="text-stone-700 dark:text-stone-300 text-sm">
                          {toSafeText(resource)}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </CardContent>
            )}
          </Card>
        )}

        {/* Practice Platforms */}
        {(data.practice_platforms || data["Practice Platforms"]) && (
          <Card className="bg-white dark:bg-stone-900 shadow-md border border-stone-200 dark:border-stone-800 rounded-2xl">
            <CardHeader>
              <CardTitle
                className="flex items-center justify-between cursor-pointer text-stone-900 dark:text-stone-100 text-lg"
                onClick={() => toggleSection("practice")}
              >
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-orange-500" />
                  Practice Platforms
                </div>
                {expandedSection === "practice" ? (
                  <ChevronUp className="h-5 w-5 text-stone-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-stone-400" />
                )}
              </CardTitle>
            </CardHeader>
            {expandedSection === "practice" && (
              <CardContent>
                <ul className="space-y-2.5">
                  {(data.practice_platforms || data["Practice Platforms"]).map(
                    (platform, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Play className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span className="text-stone-700 dark:text-stone-300 text-sm">
                          {toSafeText(platform)}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </CardContent>
            )}
          </Card>
        )}
      </div>

      {/* Books Recommendation */}
      {(data.books || data["Recommended Books"]) && (
        <Card className="mb-8 bg-white dark:bg-stone-900 shadow-md border border-stone-200 dark:border-stone-800 rounded-2xl">
          <CardHeader>
            <CardTitle
              className="flex items-center justify-between cursor-pointer text-stone-900 dark:text-stone-100 text-lg"
              onClick={() => toggleSection("books")}
            >
              <div className="flex items-center gap-2">
                <Book className="h-5 w-5 text-orange-500" />
                Recommended Books
              </div>
              {expandedSection === "books" ? (
                <ChevronUp className="h-5 w-5 text-stone-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-stone-400" />
              )}
            </CardTitle>
          </CardHeader>
          {expandedSection === "books" && (
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {(data.books || data["Recommended Books"]).map((book, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 border border-stone-200 dark:border-stone-800 rounded-xl bg-stone-50/50 dark:bg-stone-800/40"
                  >
                    <Book className="h-4 w-4 text-stone-400 flex-shrink-0" />
                    <span className="text-stone-700 dark:text-stone-300 text-sm font-medium">
                      {toSafeText(book)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      )}
    </div>
  );
}

export default Precourse;
