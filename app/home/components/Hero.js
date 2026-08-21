"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { ThemeContext } from "../../components/ThemeContext";

function Hero() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <>
      <div className={`${isDarkMode
        ? "bg-gray-900 border-b border-gray-700 text-foreground"
        : "bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-6 ${
                isDarkMode ? "text-foreground" : "text-gray-900"
              }`}>
                Your Journey from Campus to Company Starts Here
              </h1>
              <p className={`text-xl md:text-2xl mb-8 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}>
                Personalized career paths, skills development, interview
                preparation and job opportunities tailored for students.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  href="/"
                  className={`${isDarkMode
                    ? "bg-gray-600 hover:bg-gray-700 text-foreground"
                    : "bg-blue-600 text-foreground hover:bg-blue-700"}
                    font-bold px-6 py-3 rounded-md transition flex items-center justify-center`}
                >
                  Explore Career Paths <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
                <a
                  href="#"
                  className={`border-2 ${isDarkMode
                    ? "border-gray-500 text-foreground hover:bg-gray-500 hover:text-black"
                    : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-foreground"}
                    font-bold px-6 py-3 rounded-md transition flex items-center justify-center`}
                >
                  View Job Listings
                </a>
              </div>
            </div>
            <div className="hidden md:block md:w-1/2">
              <Image
                src={"/interview.png"}
                width={800}
                height={800}
                alt="Students exploring career options"
                className={`rounded-lg ${isDarkMode ? "border border-gray-700" : "shadow-xl"}`}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
