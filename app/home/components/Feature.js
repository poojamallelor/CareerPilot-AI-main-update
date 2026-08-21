"use client";

import {
  Award,
  Clock,
  Compass,
  MessageSquare,
  Shield,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useContext, useState } from "react";
import { ThemeContext } from "../../components/ThemeContext";

export default function FeatureSection() {
  const [activeTab, setActiveTab] = useState("students");
  const { isDarkMode } = useContext(ThemeContext);

  const features = {
    students: [
      {
        icon: <Compass className={`w-8 h-8 ${isDarkMode ? "text-foreground" : "text-indigo-600"}`} />,
        title: "Personalized Career Paths",
        description:
          "Discover tailored career journeys based on your unique skills, interests, and educational background.",
      },
      {
        icon: <TrendingUp className={`w-8 h-8 ${isDarkMode ? "text-foreground" : "text-indigo-600"}`} />,
        title: "Industry-Aligned Skills",
        description:
          "Learn exactly what employers are looking for with our curated skill development resources.",
      },
      {
        icon: <Users className={`w-8 h-8 ${isDarkMode ? "text-foreground" : "text-indigo-600"}`} />,
        title: "Study by Vedik technics",
        description:
          "Learn the skills you need to succeed with gurukul vedik technics.",
      },
      {
        icon: <Users className={`w-8 h-8 ${isDarkMode ? "text-foreground" : "text-indigo-600"}`} />,
        title: "No Language Barrier",
        description:
          "Learn in your preferred language with our multilingual study.",
      },
      {
        icon: <Users className={`w-8 h-8 ${isDarkMode ? "text-foreground" : "text-indigo-600"}`} />,
        title: "Help to Select Role",
        description:
          "Help to select right role based on your ikigai based assisment and Practical assessment.",
      },
      {
        icon: <MessageSquare className={`w-8 h-8 ${isDarkMode ? "text-foreground" : "text-indigo-600"}`} />,
        title: "Interview Preparation",
        description:
          "Practice with AI-powered mock interviews tailored to your target roles and industries.",
      },
      {
        icon: <Shield className={`w-8 h-8 ${isDarkMode ? "text-foreground" : "text-indigo-600"}`} />,
        title: "Verified Opportunities",
        description:
          "Access job listings that have been pre-screened for quality and relevance to students.",
      },
      {
        icon: <Star className={`w-8 h-8 ${isDarkMode ? "text-foreground" : "text-indigo-600"}`} />,
        title: "Portfolio Builder",
        description:
          "Create an impressive professional portfolio to showcase your projects and skills.",
      },
    ],
    employers: [
      {
        icon: <Target className={`w-8 h-8 ${isDarkMode ? "text-foreground" : "text-indigo-600"}`} />,
        title: "Talent Pipeline",
        description:
          "Connect with qualified students who are specifically developing skills for your industry.",
      },
      {
        icon: <Clock className={`w-8 h-8 ${isDarkMode ? "text-foreground" : "text-indigo-600"}`} />,
        title: "Time-Saving Recruiting",
        description:
          "Our matching algorithm identifies students who align with your company culture and needs.",
      },
      {
        icon: <Award className={`w-8 h-8 ${isDarkMode ? "text-foreground" : "text-indigo-600"}`} />,
        title: "Skills Verification",
        description:
          "Review student progress and skill certifications to ensure qualification for roles.",
      },
      {
        icon: <Zap className={`w-8 h-8 ${isDarkMode ? "text-foreground" : "text-indigo-600"}`} />,
        title: "Streamlined Onboarding",
        description:
          "Hire candidates who are already familiar with your industry requirements and expectations.",
      },
    ],
  };

  return (
    <section className={`py-16 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold ${isDarkMode ? "text-foreground" : "text-gray-900"}`}>
            Powerful Features for Career Success
          </h2>
          <p className={`mt-4 text-xl ${isDarkMode ? "text-gray-300" : "text-gray-600"} max-w-3xl mx-auto`}>
            Our platform offers specialized tools and resources for both
            students and employers
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className={`inline-flex p-1 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"} rounded-lg`}>
            <button
              onClick={() => setActiveTab("students")}
              className={`px-6 py-2 rounded-md text-sm font-medium ${
                activeTab === "students"
                  ? isDarkMode
                    ? "bg-gray-600 text-foreground"
                    : "bg-indigo-600 text-foreground"
                  : isDarkMode
                    ? "text-gray-300 hover:text-foreground"
                  : "text-gray-700 hover:text-indigo-600"
              } transition-all duration-200`}
            >
              For Students
            </button>
            <button
              onClick={() => setActiveTab("employers")}
              className={`px-6 py-2 rounded-md text-sm font-medium ${
                activeTab === "employers"
                  ? isDarkMode
                    ? "bg-gray-600 text-foreground"
                    : "bg-indigo-600 text-foreground"
                  : isDarkMode
                    ? "text-gray-300 hover:text-foreground"
                  : "text-gray-700 hover:text-indigo-600"
              } transition-all duration-200`}
            >
              For Employers
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features[activeTab].map((feature, index) => (
            <div
              key={index}
              className={`${isDarkMode
                ? "bg-gray-800 border-gray-700 hover:shadow-amber-900/20"
                : "bg-white border-gray-200 hover:shadow-md"}
                p-6 rounded-lg border shadow-sm transition group`}
            >
              <div className={`${isDarkMode
                ? "bg-gray-700 group-hover:bg-gray-600"
                : "bg-indigo-50 group-hover:bg-indigo-100"}
                rounded-lg p-4 inline-block mb-5 transition-all`}>
                {feature.icon}
              </div>
              <h3 className={`text-xl font-bold ${isDarkMode ? "text-foreground" : "text-gray-900"} mb-3`}>
                {feature.title}
              </h3>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h3 className={`text-2xl font-bold ${isDarkMode ? "text-foreground" : "text-gray-900"} mb-4`}>
            {activeTab === "students"
              ? "Ready to Launch Your Career?"
              : "Looking to Hire Fresh Talent?"}
          </h3>
          <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-6 max-w-2xl mx-auto`}>
            {activeTab === "students"
              ? "Join thousands of students who have successfully navigated their career journey with our platform."
              : "Connect with motivated students who are specifically training for careers in your industry."}
          </p>
          <button className={`${isDarkMode
            ? "bg-gray-600 hover:bg-gray-700 text-foreground"
            : "bg-indigo-600 hover:bg-indigo-700 text-foreground"}
            px-6 py-3 rounded-md transition font-medium`}>
            {activeTab === "students"
              ? "Create Free Account"
              : "Partner With Us"}
          </button>
        </div>
      </div>

      {/* Animated Blob Background */}
      <div className="absolute inset-0 overflow-hidden -z-10 opacity-10">
        <div className={`absolute -top-40 -right-40 w-80 h-80 ${
          isDarkMode ? "bg-gray-800" : "bg-indigo-300"
        } rounded-full blur-3xl`}></div>
        <div className={`absolute top-40 -left-40 w-80 h-80 ${
          isDarkMode ? "bg-gray-900" : "bg-blue-300"
        } rounded-full blur-3xl`}></div>
      </div>
    </section>
  );
}
