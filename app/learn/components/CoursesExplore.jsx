"use client";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../components/ThemeContext";
import { Input } from "../../../components/ui/input.jsx";
import { Button } from "../../../components/ui/button.jsx";
import { trackActivity } from "@/lib/tracking";
import { 
  Sparkles, 
  Search, 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  CheckCircle2, 
  ArrowRight,
  GraduationCap
} from "lucide-react";

export default function CoursesExplore() {
  const { isDarkMode } = useContext(ThemeContext);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topic, setTopic] = useState("Software Engineering Complete Roadmap 2025");
  const [searchInput, setSearchInput] = useState("");
  const [enrolledCourse, setEnrolledCourse] = useState(null);

  const suggestedTopics = [
    "Software Engineering 2025",
    "Full Stack Next.js & React",
    "AI & Generative Models",
    "Cloud Architecture & AWS",
    "Data Structures & Algorithms",
    "DevOps & Kubernetes"
  ];

  const fetchDynamicVideos = async (searchTopic) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/gemini/courses?q=${encodeURIComponent(searchTopic)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
        setVideos(data.data);
        if (searchTopic) {
          trackActivity(`Generated courses for ${searchTopic}`, 'learning', `/learn?page=CoursesExplore&q=${searchTopic}`);
        }
      } else {
        setVideos([]);
      }
    } catch (error) {
      console.error("Failed to fetch courses dynamically:", error);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDynamicVideos(topic);
  }, [topic]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setTopic(searchInput.trim());
    }
  };

  const handleEnroll = (course) => {
    setEnrolledCourse(course.id);
    trackActivity(`Enrolled in ${course.title}`, 'learning', '#');
    setTimeout(() => {
      setEnrolledCourse(null);
    }, 3000);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0a0614] text-stone-100' : 'bg-gradient-to-br from-purple-50/60 via-white to-indigo-50/50 text-stone-900'}`}>
      {/* Hero Header Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-fuchsia-600 py-12 shadow-lg text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs sm:text-sm font-bold mb-3">
            <Sparkles className="w-4 h-4" />
            <span>AI Curriculum Generation Engine</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black mb-3 tracking-tight">
            Explore AI-Generated Courses
          </h1>
          <p className="text-purple-100 text-sm sm:text-base max-w-2xl mx-auto font-medium">
            Specify any subject, domain, or technology to generate industry-aligned curriculum recommendations with real-world objectives.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* Search form & suggestions */}
        <div className={`p-6 rounded-2xl border shadow-sm ${
          isDarkMode ? 'bg-[#130c24] border-[#2c1c4d]' : 'bg-white border-purple-100'
        }`}>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3.5 text-stone-400 w-5 h-5" />
              <Input 
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="e.g. React Native Masterclass, System Design, Machine Learning..."
                className={`pl-11 h-12 rounded-xl text-base ${
                  isDarkMode 
                    ? 'bg-stone-900 border-stone-700 text-white placeholder-stone-400' 
                    : 'bg-stone-50 border-stone-200 text-stone-900 placeholder-stone-400'
                }`}
              />
            </div>
            <Button 
              type="submit" 
              disabled={loading} 
              className="h-12 px-8 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
            >
              {loading ? "Generating..." : "Generate Courses 🚀"}
            </Button>
          </form>

          {/* Quick topic pills */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 mr-1">Trending:</span>
            {suggestedTopics.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSearchInput(item);
                  setTopic(item);
                }}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer font-medium ${
                  topic === item
                    ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                    : isDarkMode
                      ? 'bg-stone-900 border-stone-800 text-stone-300 hover:border-purple-500/50'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-purple-300 hover:bg-purple-50'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Courses listing */}
        {loading ? (
          <div className="flex flex-col justify-center items-center h-64 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            <p className="text-purple-600 dark:text-purple-400 font-bold text-base">
              Generating your targeted curriculum...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <BookOpen className="w-12 h-12 text-stone-400 mx-auto mb-3" />
                <p className="text-stone-600 dark:text-stone-400 text-lg font-medium">
                  No courses generated yet. Search for a topic above!
                </p>
              </div>
            ) : (
              videos.map((course) => (
                <div 
                  key={course.id} 
                  className={`rounded-2xl p-6 border transition-all duration-300 hover-lift shadow-sm hover:shadow-xl flex flex-col justify-between ${
                    isDarkMode 
                      ? 'bg-[#130c24] border-[#2c1c4d] hover:border-purple-500/50' 
                      : 'bg-white border-stone-200 hover:border-purple-300'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-4 gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-900/40">
                        {course.category}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        course.level === 'Beginner' 
                          ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300' 
                          : course.level === 'Advanced' 
                            ? 'bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300' 
                            : 'bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300'
                      }`}>
                        {course.level}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2.5 text-stone-900 dark:text-white line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-stone-600 dark:text-stone-300 mb-6 leading-relaxed line-clamp-3">
                      {course.description}
                    </p>
                  </div>
                  
                  <div>
                    <div className={`grid grid-cols-2 gap-3 py-4 border-t border-b text-xs sm:text-sm ${
                      isDarkMode ? 'border-stone-800' : 'border-stone-100'
                    }`}>
                      <div>
                        <p className="text-stone-400 text-xs mb-0.5">Instructor</p>
                        <p className="font-semibold text-stone-800 dark:text-stone-200 truncate">{course.instructor}</p>
                      </div>
                      <div>
                        <p className="text-stone-400 text-xs mb-0.5">Duration</p>
                        <p className="font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-purple-500" />
                          {course.duration}
                        </p>
                      </div>
                      <div>
                        <p className="text-stone-400 text-xs mb-0.5">Students</p>
                        <p className="font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-amber-500" />
                          {course.students ? course.students.toLocaleString() : "2,400+"}
                        </p>
                      </div>
                      <div>
                        <p className="text-stone-400 text-xs mb-0.5">Rating</p>
                        <p className="font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                          {course.rating}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-5 flex justify-between items-center">
                      <span className="font-black text-xl text-purple-600 dark:text-purple-400">
                        {course.price}
                      </span>
                      <Button 
                        onClick={() => handleEnroll(course)}
                        className={`px-6 py-2.5 rounded-xl font-bold transition-all cursor-pointer ${
                          enrolledCourse === course.id
                            ? 'bg-emerald-600 text-white'
                            : 'bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:scale-105 active:scale-95'
                        }`}
                      >
                        {enrolledCourse === course.id ? (
                          <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" />
                            Enrolled!
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5">
                            <GraduationCap className="w-4 h-4" />
                            Enroll Now
                          </span>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
