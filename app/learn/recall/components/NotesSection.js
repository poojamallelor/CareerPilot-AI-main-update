"use client";
import React, { useState, useEffect } from "react";
import { Card, CardHeader } from "../../../../components/ui/card";
import {
  BookOpen,
  Trophy,
  MessageSquare,
  Smartphone,
  Play,
  Menu,
  X,
} from "lucide-react";
import dynamic from "next/dynamic";
// Dynamically import browser-only components to avoid SSR 'document is not defined'
const Note = dynamic(() => import("./Note"), { ssr: false });
const FlashCard = dynamic(() => import("../start/components/FlashCard"), {
  ssr: false,
});
const McqPrepare = dynamic(() => import("../start/components/McqPrepare"), {
  ssr: false,
});
const TeachToOther = dynamic(() => import("../start/components/TeachToOther"), {
  ssr: false,
});
const QueAns = dynamic(() => import("../start/components/QueAns"), {
  ssr: false,
});
import { useSearchParams } from "next/navigation";

const CourseInterface = () => {
  const searchParams = useSearchParams();
  const value = searchParams?.get("value");
  const chapter = Number(searchParams?.get("chapter")) - 1;

  const [course, setCourse] = useState(null);

  const [active, setActive] = useState(0); //chapter
  const [active2, setActive2] = useState(chapter || 0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChaptersOpen, setIsChaptersOpen] = useState(false);

  const sidebarItems = [
    { icon: BookOpen, label: "Notes" },
    { icon: MessageSquare, label: "Flash Cards" },
    { icon: Trophy, label: "Quiz" },
    { icon: Smartphone, label: "Teach to Other" },
    { icon: Play, label: "Questions/Answers" },
  ];

  useEffect(() => {
    setActive(value);
    // Safely read from localStorage on the client only
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem("RecallSyllabus");
      if (stored) {
        try {
          setCourse(JSON.parse(stored));
        } catch {
          // ignore parse errors; keep course as null
        }
      }
    }
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".sidebar") &&
        !event.target.closest(".menu-button")
      ) {
        setIsSidebarOpen(false);
        setIsChaptersOpen(false);
      }
    };

    // Only add event listeners on client side
    if (typeof document !== 'undefined') {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 p-4 z-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-full" />
            <span className="font-semibold">Recall</span>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setIsChaptersOpen(!isChaptersOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Trophy className="w-6 h-6" />
            </button>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg menu-button"
            >
              {isSidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex relative pt-16 lg:pt-0">
        {/* Sidebar */}
        <div
          className={`
          fixed lg:static lg:block sidebar
          ${isSidebarOpen ? "block" : "hidden"}
          w-72 h-screen bg-white border-r border-gray-200 p-4 z-40
        `}
        >
          <div className="mb-8 hidden lg:block">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded-full" />
              <span className="font-semibold">Recall</span>
            </div>
          </div>

          <nav>
            {sidebarItems?.map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg mb-1 cursor-pointer ${
                  active == index
                    ? "bg-blue-500 text-foreground"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => {
                  setActive(index);
                  setIsSidebarOpen(false);
                }}
              >
                <item.icon
                  className={`w-5 h-5 ${
                    active == index ? "text-foreground" : "text-gray-500"
                  }`}
                />
                <span className={active == index ? "font-medium" : ""}>
                  {item.label}
                </span>
              </div>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6">
              <h1 className="text-xl lg:text-2xl font-bold mb-2">
                {course?.courseTitle}
              </h1>
              <p className="text-gray-600 text-sm lg:text-base">
                {course?.courseSummary}
              </p>
            </div>

            <Card className="mb-6">
              <CardHeader className="pb-4 font-bold">
                {sidebarItems[active]?.label}
              </CardHeader>
              {active == 0 && <Note Course={course} active2={active2} />}
              {active == 1 && <FlashCard course={course} active2={active2} />}
              {active == 2 && <McqPrepare course={course} active2={active2} />}
              {active == 3 && <TeachToOther />}
              {active == 4 && <QueAns />}
            </Card>
          </div>
        </div>

        {/* Chapters Sidebar */}
        {active != 3 && active != 4 && course && course.chapters && (
          <div
            className={`
            fixed lg:static sidebar mt-2
            ${isChaptersOpen ? "block" : "hidden lg:block"}
            w-72 h-screen bg-white border-l border-gray-200 p-4 z-30
            right-0 top-0 pt-16 lg:pt-4
          `}
          >
            <nav>
              <ul>
                {course.chapters.map((chapter, index) => (
                  <li
                    key={index}
                    className={`p-2 mb-1 cursor-pointer text-sm lg:text-base ${
                      active2 == index
                        ? "bg-blue-400 text-foreground rounded-lg"
                        : ""
                    }`}
                    onClick={() => {
                      setActive2(index);
                      setIsChaptersOpen(false);
                    }}
                  >
                    {index + 1}. {chapter?.chapterTitle}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseInterface;
