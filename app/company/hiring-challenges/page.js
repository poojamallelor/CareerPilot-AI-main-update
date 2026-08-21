"use client";
import { useContext } from "react";
import { ThemeContext } from "../../components/ThemeContext";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { ExternalLink, Trophy } from "lucide-react";
import { 
  SiHackerrank, SiCodechef, SiLeetcode, SiCodeforces, 
  SiHackerearth, SiTopcoder, SiGoogle, 
  SiMeta, SiTcs, SiInfosys
} from "react-icons/si";

const challengeCategories = [
  {
    category: "Challenge Platforms",
    platforms: [
      { name: "Unstop", icon: SiHackerrank, url: "https://unstop.com", color: "#2EC866" },
      { name: "HackerRank", icon: SiHackerrank, url: "https://hackerrank.com/contests", color: "#00EA64" },
      { name: "CodeChef", icon: SiCodechef, url: "https://codechef.com/contests", color: "#5B4638" },
      { name: "LeetCode", icon: SiLeetcode, url: "https://leetcode.com/contest", color: "#FFA116" },
      { name: "CodeForces", icon: SiCodeforces, url: "https://codeforces.com", color: "#1F8ACB" },
      { name: "AtCoder", icon: Trophy, url: "https://atcoder.jp", color: "#000000" },
      { name: "HackerEarth", icon: SiHackerearth, url: "https://hackerearth.com/challenges", color: "#2C3454" },
      { name: "TopCoder", icon: SiTopcoder, url: "https://topcoder.com", color: "#29A8E0" }
    ]
  },
  {
    category: "Company Hiring Competitions",
    platforms: [
      { name: "TCS CodeVita", icon: SiTcs, url: "https://tcscodevita.com", color: "#0F62FE" },
      { name: "Infosys HackWithInfy", icon: SiInfosys, url: "https://infy.com/hackwithinfy", color: "#007CC3" },
      { name: "Google Contests", icon: SiGoogle, url: "https://codingcompetitions.withgoogle.com", color: "#4285F4" },
      { name: "Meta Hacker Cup", icon: SiMeta, url: "https://facebook.com/codingcompetitions", color: "#0668E1" },
      { name: "Flipkart GRiD", icon: SiHackerrank, url: "https://unstop.com/hackathons/flipkart-grid", color: "#F5C518" }
    ]
  }
];

export default function HiringChallenges() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? "bg-[#0a0614] text-white" 
        : "bg-gradient-to-br from-purple-50/60 via-white to-indigo-50/50 text-stone-900"
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hiring Challenges</h1>
          <p className={`text-lg ${isDarkMode ? 'text-purple-300/80' : 'text-stone-600'}`}>
            Compete on top coding platforms and win direct job opportunities from companies
          </p>
        </div>

        {/* Platform Categories */}
        {challengeCategories.map((category, catIndex) => (
          <div key={catIndex} className="mb-12">
            <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
              {category.category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.platforms.map((platform, index) => {
                const Icon = platform.icon;
                return (
                  <a
                    key={index}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <Card className={`h-full transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                      isDarkMode 
                        ? 'bg-[#130c24] border-[#2c1c4d] hover:border-purple-500' 
                        : 'bg-white border-purple-100 hover:border-purple-400'
                    }`}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
                                 style={{ color: platform.color }}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <span className="text-xl">{platform.emoji}</span>
                          </div>
                          <ExternalLink className={`w-4 h-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'} group-hover:text-purple-500`} />
                        </div>
                        <CardTitle className="text-lg mt-3">{platform.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className={`text-sm ${isDarkMode ? 'text-purple-300/70' : 'text-stone-600'} truncate`}>
                          {platform.url}
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
