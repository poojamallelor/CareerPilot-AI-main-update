"use client";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import {
    BookOpen,
    Check,
    ChevronRight,
    Menu,
    Search,
    Sparkles,
    X
} from "lucide-react";
import { useState } from "react";
import { geminiModel } from '../../../config/AiModels';
import { db, isFirebaseEnabled } from "../../../lib/firebaseConfig";

function CourseRoadmap() {
  const [expandedModule, setExpandedModule] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState(null);
  const [progress, setProgress] = useState(0);
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleModule = (index) => {
    setExpandedModule(expandedModule === index ? -1 : index);
  };

  // const handleGenerateRoadmap = async (e) => {
  //   e.preventDefault();
  //   if (!inputValue.trim()) return;

  //   setLoading(true);
  //   setProgress(0);

  //   const progressInterval = setInterval(() => {
  //     setProgress((prev) => {
  //       const newProgress = prev + Math.random() * 15;
  //       return newProgress >= 95 ? 95 : newProgress;
  //     });
  //   }, 600);

  //   const prompt = `Create a detailed roadmap for learning ${inputValue}. Structure it like a hierarchical mind map with 10–12 main modules (as core topics). Under each module, list 3–6 detailed subtopics or skills. Use a clear format suitable for creating a flowchart or visual roadmap. Focus on covering beginner to advanced concepts in json format.`;

  //   try {
  //     const result = await AiPreCourse.sendMessage(prompt);
  //     const responseText = await result.response.text();
  //     const parsedResult = JSON.parse(responseText);
  //     setRoadmap(parsedResult);
  //     setProgress(100);
  //   } catch (error) {
  //     console.error("Error generating roadmap:", error);
  //   } finally {
  //     clearInterval(progressInterval);
  //     setLoading(false);
  //     setTimeout(() => setProgress(0), 1000);
  //   }
  // };

  const handleGenerateRoadmap = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setLoading(true);
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        return newProgress >= 95 ? 95 : newProgress;
      });
    }, 600);

    const prompt = `Create a detailed roadmap for learning ${inputValue}. Structure it like a hierarchical mind map with 10–12 main modules (as core topics). Under each module, list 3–6 detailed subtopics or skills. Use a clear format suitable for creating a flowchart or visual roadmap. Focus on covering beginner to advanced concepts in json format.`;

    try {
      const result = await geminiModel.sendMessage(prompt);
      const responseText = await result.response.text();
      const parsedResult = JSON.parse(responseText);

      // Persist only if Firebase is configured
      if (isFirebaseEnabled && db) {
        const q = query(
          collection(db, "courseroadmap"),
          where("title", "==", parsedResult.title)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          await addDoc(collection(db, "courseroadmap"), {
            ...parsedResult,
            timestamp: new Date(),
          });
          console.log("Roadmap stored in Firestore");
        } else {
          console.log("Roadmap already exists in Firestore");
        }
      } else {
        console.log("Skipping Firestore persistence (Firebase disabled)");
      }

      setRoadmap(parsedResult);
      setProgress(100);
    } catch (error) {
      console.error("Error generating or storing roadmap:", error);
    } finally {
      clearInterval(progressInterval);
      setLoading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };
  const recentCourses = [
    "Python Programming",
    "JavaScript Fundamentals",
    "Data Science",
    "Machine Learning",
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-lg z-20 transition-all duration-300 ease-in-out ${
          showSidebar ? "w-64" : "w-0 -ml-4"
        } lg:w-64 lg:ml-0 lg:relative fixed h-full`}
      >
        {showSidebar && (
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center space-x-8 mb-8">
              <div className="flex items-center space-x-1">
                <div className="bg-blue-600 text-foreground p-2 rounded-lg">
                  <BookOpen size={20} />
                </div>
                <h1 className="text-xl font-bold">LearnPath </h1>
              </div>
              {showSidebar && (
                <X size={24} onClick={() => setShowSidebar(false)} />
              )}
            </div>

            <div className="mb-8">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Recent Searches
              </h2>
              <ul className="space-y-2">
                {recentCourses.map((course, index) => (
                  <li key={index}>
                    <button
                      className="flex items-center text-gray-700 hover:bg-blue-50 hover:text-blue-600 p-2 rounded-lg w-full text-left"
                      onClick={() => {
                        setInputValue(course);
                      }}
                    >
                      <span className="mr-3 text-gray-400">
                        <ChevronRight size={16} />
                      </span>
                      {course}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Categories
              </h2>
              <ul className="space-y-2">
                {[
                  "Programming",
                  "Data Science",
                  "Design",
                  "Business",
                  "Marketing",
                ].map((category, index) => (
                  <li key={index}>
                    <button className="flex items-center text-gray-700 hover:bg-blue-50 hover:text-blue-600 p-2 rounded-lg w-full text-left">
                      <span className="mr-3 text-gray-400">
                        <ChevronRight size={16} />
                      </span>
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 lg:p-10">
        {/* Mobile header */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {showSidebar ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 text-foreground p-1 rounded-md">
              <BookOpen size={16} />
            </div>
            <h1 className="font-bold text-lg">LearnPath</h1>
          </div>
          <div className="w-10"></div> {/* Empty div for flex spacing */}
        </div>

        {/* Search Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 lg:hidden">
            Course Roadmap
          </h1>
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Generate Your Learning Path
            </h2>
            <p className="text-gray-600 mb-4">
              Enter a subject to create a customized learning roadmap with AI
            </p>

            <form
              onSubmit={handleGenerateRoadmap}
              className="flex flex-col lg:flex-row gap-3"
            >
              <div className="relative flex-grow">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter a subject (e.g., Python, Digital Marketing)"
                  className="w-full p-4 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search
                  className="absolute right-3 top-4 text-gray-400"
                  size={20}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`bg-primary hover:opacity-90 text-foreground text-foreground font-medium py-4 px-6 rounded-lg shadow transition-colors duration-200 flex items-center justify-center gap-2 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                <Sparkles size={18} />
                <span>{loading ? "Generating..." : "Generate Roadmap"}</span>
              </button>
            </form>

            {progress > 0 && progress < 100 && (
              <div className="mt-4">
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Crafting your personalized learning path...
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Roadmap Content */}
        {roadmap && (
          <div className="pb-20">
            <div className="text-center mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {roadmap?.title}
              </h1>
              <p className="text-gray-600 text-lg">
                A comprehensive learning path from beginner to advanced
              </p>
            </div>

            <div className="space-y-4">
              {roadmap?.modules?.map((module, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-xl transition-all duration-300 ${
                    expandedModule === index
                      ? "shadow-lg border-blue-400 transform scale-101"
                      : "shadow-md hover:shadow-lg border-transparent"
                  } border-l-4 overflow-hidden`}
                >
                  <div
                    className={`p-6 flex items-center justify-between cursor-pointer`}
                    onClick={() => toggleModule(index)}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          expandedModule === index
                            ? "bg-blue-600 text-foreground"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <h2 className="text-xl font-bold text-gray-800">
                        {module.title}
                      </h2>
                    </div>
                    <div
                      className={`transform transition-transform ${
                        expandedModule === index ? "rotate-90" : ""
                      }`}
                    >
                      <ChevronRight
                        size={24}
                        className={
                          expandedModule === index
                            ? "text-blue-600"
                            : "text-gray-400"
                        }
                      />
                    </div>
                  </div>

                  {expandedModule === index && (
                    <div className="px-6 pb-6 pt-0">
                      <div className="pl-14">
                        <ul className="space-y-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                          {module?.subtopics?.map((sub, i) => (
                            <li
                              key={i}
                              className="flex items-start bg-gray-50 p-3 rounded-lg"
                            >
                              <span className="mr-2 mt-1 bg-green-100 p-1 rounded-full text-green-500 flex-shrink-0">
                                <Check size={12} />
                              </span>
                              <span className="text-gray-700">{sub}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-6 flex justify-end">
                          <button className="bg-primary hover:opacity-90 text-foreground text-foreground py-2 px-4 rounded-lg shadow transition-colors duration-200 flex items-center gap-2">
                            <BookOpen size={16} />
                            <span>Start This Module</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseRoadmap;
