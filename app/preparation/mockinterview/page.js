"use client";
import { ExternalLink, Globe } from "lucide-react";
import { SiZoom, SiGoogle } from "react-icons/si";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { useContext } from "react";
import { ThemeContext } from "../../components/ThemeContext";
import { trackActivity } from "@/lib/tracking";

const mockInterviewPlatforms = [
  { name: "Zoom", icon: SiZoom, url: "https://zoom.us/", color: "#2D8CFF" },
  { name: "Google Meet", icon: SiGoogle, url: "https://meet.google.com/", color: "#4285F4" },
  { name: "InterviewBit", icon: Globe, url: "https://www.interviewbit.com/", color: "#FF6B35" },
  { name: "Pramp", icon: Globe, url: "https://www.pramp.com/", color: "#4CAF50" },
  { name: "Gainlo", icon: Globe, url: "http://www.gainlo.co/", color: "#2196F3" },
  { name: "InterviewBuddy", icon: Globe, url: "https://interviewbuddy.in/", color: "#FF9800" },
  { name: "MeetLeet", icon: Globe, url: "https://meetleet.com/", color: "#9C27B0" },
  { name: "HireVue", icon: Globe, url: "https://www.hirevue.com/", color: "#E91E63" },
  { name: "HackerEarth Interviews", icon: Globe, url: "https://www.hackerearth.com/", color: "#2C3454" },
  { name: "iMocha", icon: Globe, url: "https://www.imocha.io/", color: "#607D8B" },
  { name: "Workday Interview", icon: Globe, url: "https://www.workday.com/", color: "#F44336" },
  { name: "Superset Interview", icon: Globe, url: "https://joinsuperset.com/", color: "#673AB7" }
];

export default function PreMockInterview() {
  const { isDarkMode } = useContext(ThemeContext);
  
  return (
    <div className={`min-h-screen p-6 transition-colors duration-300 ${
      isDarkMode ? "bg-[#0a0614] text-white" : "bg-gradient-to-br from-purple-50/60 via-white to-indigo-50/50 text-stone-900"
    }`}>
      <div className="max-w-6xl mx-auto">
        <Card className={isDarkMode ? "bg-[#130c24] border-[#2c1c4d]" : "bg-white border border-purple-100 shadow-xl"}>
          <CardHeader>
            <CardTitle className={`text-2xl ${
              isDarkMode ? "text-white" : "text-purple-900"
            }`}>Mock Interview Platforms</CardTitle>
            <p className={isDarkMode ? "text-purple-300/80" : "text-purple-700"}>
              Practice with these platforms used by real recruiters
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockInterviewPlatforms.map((platform, index) => {
                const Icon = platform.icon;
                return (
                  <a
                    key={index}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                    onClick={() => trackActivity(`Practiced Mock Interview on ${platform.name}`, 'interview', platform.url)}
                  >
                    <Card className={`h-full transition-all duration-300 hover:scale-105 hover:shadow-xl border ${
                      isDarkMode
                        ? "bg-[#0f091c] border-[#2c1c4d] hover:border-purple-500"
                        : "bg-white border-purple-100 hover:border-purple-400"
                    }`}>
                      <CardContent className="p-4">
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
                      </CardContent>
                    </Card>
                  </a>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

