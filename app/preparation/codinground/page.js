"use client";
import {
  ExternalLink,
  Globe,
} from "lucide-react";
import {
  SiLeetcode,
  SiHackerrank,
  SiGeeksforgeeks,
  SiCodechef,
  SiCodeforces,
  SiHackerearth,
} from "react-icons/si";
import { Card, CardContent } from "../../../components/ui/card";
import { useContext } from "react";
import { ThemeContext } from "../../components/ThemeContext";
import { trackActivity } from "@/lib/tracking";

const codingPlatforms = [
  { name: "LeetCode", icon: SiLeetcode, url: "https://leetcode.com/", color: "#FFA116" },
  { name: "HackerRank", icon: SiHackerrank, url: "https://www.hackerrank.com/", color: "#00EA64" },
  { name: "GeeksforGeeks", icon: SiGeeksforgeeks, url: "https://www.geeksforgeeks.org/", color: "#2F8D46" },
  { name: "CodeChef", icon: SiCodechef, url: "https://www.codechef.com/", color: "#5B4638" },
  { name: "Codeforces", icon: SiCodeforces, url: "https://codeforces.com/", color: "#1F8ACB" },
  { name: "AtCoder", icon: Globe, url: "https://atcoder.jp/", color: "#000000" },
  { name: "InterviewBit Coding", icon: Globe, url: "https://www.interviewbit.com/practice/", color: "#FF6B35" },
  { name: "HackerEarth", icon: SiHackerearth, url: "https://www.hackerearth.com/", color: "#2C3454" },
  { name: "CoderPad", icon: Globe, url: "https://coderpad.io/", color: "#4CAF50" },
  { name: "Codility", icon: Globe, url: "https://www.codility.com/", color: "#FF5722" },
  { name: "Mettl Assessments", icon: Globe, url: "https://mettl.com/", color: "#9C27B0" },
  { name: "Qualified.io", icon: Globe, url: "https://www.qualified.io/", color: "#607D8B" }
];

export default function CodingRound() {
  const { isDarkMode } = useContext(ThemeContext);
  
  return (
    <>
      <div className={`min-h-screen ${
        isDarkMode ? "bg-background" : "bg-white"
      }`}>
        {/* A-to-Z Coding Practice Platforms */}
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className={`text-3xl font-bold mb-4 ${
                  isDarkMode ? "text-foreground" : "text-gray-900"
                }`}>Coding Practice Platforms</h2>
                <p className={`text-lg ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}>Master coding interviews with these top-rated platforms</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {codingPlatforms.map((platform, index) => {
                  const Icon = platform.icon;
                  return (
                    <a
                      key={index}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group"
                      onClick={() => trackActivity(`Practiced Coding on ${platform.name}`, 'coding', platform.url)}
                    >
                      <Card className={`h-full transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                        isDarkMode
                          ? "bg-gray-800 border-gray-700 hover:border-violet-500"
                          : "bg-white border-gray-200 hover:border-violet-400"
                      }`}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-lg ${
                              isDarkMode ? "bg-gray-700" : "bg-gray-100"
                            }`} style={{ color: platform.color }}>
                              <Icon className="w-8 h-8" />
                            </div>
                            <ExternalLink className={`w-4 h-4 group-hover:text-violet-500 ${
                              isDarkMode ? "text-gray-400" : "text-gray-400"
                            }`} />
                          </div>
                          <h3 className={`font-semibold mb-2 ${
                            isDarkMode ? "text-foreground" : "text-gray-900"
                          }`}>{platform.name}</h3>
                          <p className={`text-sm truncate ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}>{platform.url}</p>
                        </CardContent>
                      </Card>
                    </a>
                  );
                })}
              </div>
        </div>
      </div>
    </>
  );
}
