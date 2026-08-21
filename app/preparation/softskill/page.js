"use client";

import { ExternalLink, Globe } from "lucide-react";
import {
  SiLinkedin,
  SiCoursera,
  SiUdemy,
  SiSkillshare,
  SiEdx,
} from "react-icons/si";
import { Card } from "../../../components/ui/card";
import { useContext } from "react";
import { ThemeContext } from "../../components/ThemeContext";

const softSkillsPlatforms = [
  { name: "LinkedIn Learning", icon: SiLinkedin, url: "https://www.linkedin.com/learning/", color: "#0A66C2" },
  { name: "Coursera", icon: SiCoursera, url: "https://www.coursera.org/", color: "#0056D3" },
  { name: "Udemy", icon: SiUdemy, url: "https://www.udemy.com/", color: "#A435F0" },
  { name: "Skillshare", icon: SiSkillshare, url: "https://www.skillshare.com/", color: "#00FF88" },
  { name: "edX", icon: SiEdx, url: "https://www.edx.org/", color: "#02262F" },
  { name: "Toastmasters", icon: Globe, url: "https://www.toastmasters.org/", color: "#004165" },
  { name: "MindTools", icon: Globe, url: "https://www.mindtools.com/", color: "#FF6B35" },
  { name: "Alison", icon: Globe, url: "https://alison.com/", color: "#00A651" },
  { name: "FutureLearn", icon: Globe, url: "https://www.futurelearn.com/", color: "#DE3A80" },
  { name: "Communication Coach AI", icon: Globe, url: "https://www.yoodli.ai/", color: "#6366F1" }
];

// Removed features and assessment actions

const SoftSkillAssessmentPage = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen p-4 transition-colors duration-300 ${
      isDarkMode
        ? "bg-[#0a0614] text-white"
        : "bg-gradient-to-br from-purple-50/60 via-white to-indigo-50/50 text-stone-900"
    }`}>
      <div className="max-w-4xl mx-auto">
        {/* Assessment header and actions removed permanently */}

        {/* Soft Skills Learning Platforms */}
        <Card className={`border-2 shadow-2xl rounded-2xl overflow-hidden mt-8 ${
          isDarkMode
            ? "bg-[#130c24] border-[#2c1c4d]"
            : "bg-white border-purple-100"
        }`}>
          <div className={`p-6 text-center ${
            isDarkMode
              ? "bg-[#2d1c4e] text-white"
              : "bg-purple-600 text-white"
          }`}>
            <h2 className="text-2xl font-bold mb-2">Soft Skills Learning Platforms</h2>
            <p className={isDarkMode ? "text-purple-200" : "text-purple-100"}>Enhance your professional skills with these platforms</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {softSkillsPlatforms.map((platform, index) => {
                const Icon = platform.icon;
                return (
                  <a
                    key={index}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <Card className={`h-full transition-all duration-300 hover:scale-105 hover:shadow-xl border ${
                      isDarkMode
                        ? "bg-[#0f091c] border-[#2c1c4d] hover:border-purple-500"
                        : "bg-white border-purple-100 hover:border-purple-400"
                    }`}>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className={`p-2 rounded-lg ${
                            isDarkMode ? "bg-stone-900" : "bg-gray-100"
                          }`} style={{ color: platform.color }}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <ExternalLink className={`w-4 h-4 group-hover:text-purple-500 ${
                            isDarkMode ? "text-gray-400" : "text-gray-400"
                          }`} />
                        </div>
                        <h3 className={`font-semibold text-sm ${
                          isDarkMode ? "text-foreground" : "text-gray-900"
                        }`}>{platform.name}</h3>
                        <p className={`text-xs truncate ${
                          isDarkMode ? "text-purple-300/70" : "text-stone-600"
                        }`}>{platform.url}</p>
                      </div>
                    </Card>
                  </a>
                );
              })}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SoftSkillAssessmentPage;
