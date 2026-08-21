"use client";
import { ArrowDown, ArrowUp, Sparkles, Heart } from "lucide-react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

const Footer = () => {
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      setShowScrollButtons(scrollY > 400);
      setIsAtTop(scrollY < 100);
      setIsAtBottom(scrollY + windowHeight >= documentHeight - 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  };

  return (
    <footer className={`relative py-16 transition-colors duration-300 border-t ${
      isDarkMode
        ? "bg-[#0a0614] text-stone-300 border-[#2c1c4d]"
        : "bg-gradient-to-br from-purple-50/70 via-white to-indigo-50/60 text-stone-900 border-purple-100"
    }`}>
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      <div className="container mx-auto px-6 md:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* CareerPilot AI Section */}
          <div className="lg:pr-8">
            <div className="flex items-center space-x-3 mb-6">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br from-purple-600 via-indigo-600 to-violet-600 shadow-md transform hover:scale-105 transition-transform duration-300 text-white"
              >
                <Sparkles className="w-6 h-6" />
              </div>
              <h3
                className={`text-2xl sm:text-3xl font-black tracking-tight ${
                  isDarkMode ? "text-white" : "text-stone-950 font-bold"
                }`}
              >
                CareerPilot AI
              </h3>
            </div>
            <p className={`mb-8 text-base sm:text-lg leading-relaxed font-medium ${
              isDarkMode ? "text-stone-300" : "text-stone-600"
            }`}>
              Your AI-powered career companion helping you navigate your professional
              journey with confidence, tailored roadmaps, and competitive exam readiness.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a
                href="#"
                className={`p-3.5 rounded-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${
                  isDarkMode
                    ? "text-stone-400 hover:text-white bg-[#130c24] hover:bg-[#1877F2] hover:shadow-lg border border-[#2c1c4d]"
                    : "text-stone-600 hover:text-white bg-white hover:bg-[#1877F2] hover:shadow-lg border border-purple-100 shadow-sm"
                }`}
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>

              <a
                href="#"
                className={`p-3.5 rounded-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${
                  isDarkMode
                    ? "text-stone-400 hover:text-white bg-[#130c24] hover:bg-[#1DA1F2] hover:shadow-lg border border-[#2c1c4d]"
                    : "text-stone-600 hover:text-white bg-white hover:bg-[#1DA1F2] hover:shadow-lg border border-purple-100 shadow-sm"
                }`}
                aria-label="Twitter"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>

              <a
                href="#"
                className={`p-3.5 rounded-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${
                  isDarkMode
                    ? "text-stone-400 hover:text-white bg-[#130c24] hover:bg-gradient-to-r hover:from-[#E4405F] hover:to-[#FD5949] hover:shadow-lg border border-[#2c1c4d]"
                    : "text-stone-600 hover:text-white bg-white hover:bg-gradient-to-r hover:from-[#E4405F] hover:to-[#FD5949] hover:shadow-lg border border-purple-100 shadow-sm"
                }`}
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              <a
                href="#"
                className={`p-3.5 rounded-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${
                  isDarkMode
                    ? "text-stone-400 hover:text-white bg-[#130c24] hover:bg-[#0077B5] hover:shadow-lg border border-[#2c1c4d]"
                    : "text-stone-600 hover:text-white bg-white hover:bg-[#0077B5] hover:shadow-lg border border-purple-100 shadow-sm"
                }`}
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div>
              <h4 className="text-lg font-bold mb-4 text-purple-600 dark:text-purple-400">
                Career Tracks
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/careerplanning?page=DepartmentJobRoles" className="text-stone-600 dark:text-stone-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">
                    Department Roles
                  </Link>
                </li>
                <li>
                  <Link href="/careerplanning/checkcareer" className="text-stone-600 dark:text-stone-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">
                    Career Diagnostic
                  </Link>
                </li>
                <li>
                  <Link href="/careerplanning?page=RoleRoadMap" className="text-stone-600 dark:text-stone-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">
                    Role Roadmaps
                  </Link>
                </li>
                <li>
                  <Link href="/learn?page=TestAbility" className="text-stone-600 dark:text-stone-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">
                    Ability Assessments
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 text-purple-600 dark:text-purple-400">
                Preparation Hub
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/learn?page=CoursesExplore" className="text-stone-600 dark:text-stone-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">
                    AI Generated Courses
                  </Link>
                </li>
                <li>
                  <Link href="/learn?page=RealCompanyProjects" className="text-stone-600 dark:text-stone-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">
                    Company Projects
                  </Link>
                </li>
                <li>
                  <Link href="/preparation/mockinterview" className="text-stone-600 dark:text-stone-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">
                    Mock Interview
                  </Link>
                </li>
                <li>
                  <Link href="/preparation/codinground" className="text-stone-600 dark:text-stone-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">
                    Technical Coding Round
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-12 mt-12 border-t border-purple-100 dark:border-stone-800 text-center text-sm text-stone-500 dark:text-stone-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} CareerPilot AI. Built for next-generation engineers.</p>
          <div className="flex items-center space-x-2 text-stone-500">
            <span>Powered by Gemini AI</span>
            <span>•</span>
            <span>All Rights Reserved</span>
          </div>
        </div>
      </div>

      {/* Floating Scroll Buttons */}
      {showScrollButtons && (
        <div className="fixed bottom-6 left-6 flex flex-col space-y-2 z-50">
          {!isAtTop && (
            <button
              onClick={scrollToTop}
              className="p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg transition-all hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          )}
          {!isAtBottom && (
            <button
              onClick={scrollToBottom}
              className="p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg transition-all hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Scroll to bottom"
            >
              <ArrowDown className="w-5 h-5" />
            </button>
          )}
        </div>
      )}
    </footer>
  );
};

export default Footer;
