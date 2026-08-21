"use client";
import { useContext } from "react";
import { ThemeContext } from "../../components/ThemeContext";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { ExternalLink, Briefcase, Users, Newspaper, Scissors } from "lucide-react";
import { SiLinkedin, SiIndeed, SiGlassdoor, SiUpwork, SiFiverr } from "react-icons/si";

const platformCategories = [
  {
    category: "General Job Platforms",
    platforms: [
      { name: "LinkedIn Jobs", icon: SiLinkedin, url: "https://linkedin.com/jobs", color: "#0A66C2" },
      { name: "Naukri", icon: Briefcase, url: "https://naukri.com", color: "#F59E0B" },
      { name: "Indeed", icon: SiIndeed, url: "https://indeed.com", color: "#2164F3" },
      { name: "Foundit (Monster)", icon: Briefcase, url: "https://foundit.in", color: "#8B5CF6" },
      { name: "Hirect", icon: Briefcase, url: "https://hirect.in", color: "#EAB308" },
      { name: "Shine", icon: Briefcase, url: "https://shine.com", color: "#10B981" },
      { name: "CutShort", icon: Scissors, url: "https://cutshort.io", color: "#EF4444" },
      { name: "Glassdoor", icon: SiGlassdoor, url: "https://glassdoor.com/Jobs", color: "#0CAA41" },
      { name: "TimesJobs", icon: Newspaper, url: "https://timesjobs.com", color: "#6366F1" }
    ]
  },
  {
    category: "Freelancing Platforms",
    platforms: [
      { name: "Upwork", icon: SiUpwork, url: "https://upwork.com", color: "#14A800" },
      { name: "Fiverr", icon: SiFiverr, url: "https://fiverr.com", color: "#1DBF73" }
    ]
  },
  {
    category: "Tech Hiring Platforms",
    platforms: [
      { name: "Wellfound (AngelList)", icon: Briefcase, url: "https://wellfound.com", color: "#000000" },
      { name: "TripleByte", icon: Briefcase, url: "https://triplebyte.com", color: "#3B82F6" },
      { name: "Turing", icon: Briefcase, url: "https://turing.com", color: "#06B6D4" },
      { name: "Jooble", icon: Briefcase, url: "https://jooble.org", color: "#8B5CF6" }
    ]
  },
  {
    category: "India-Focused Platforms",
    platforms: [
      { name: "FreshersWorld", icon: Users, url: "https://freshersworld.com", color: "#F97316" },
      { name: "FreshersLive", icon: Users, url: "https://fresherslive.com", color: "#3B82F6" },
      { name: "Apna", icon: Briefcase, url: "https://apna.co/jobs", color: "#10B981" },
      { name: "WorkIndia", icon: Briefcase, url: "https://workindia.in", color: "#EF4444" }
    ]
  }
];

export default function HiringPlatforms() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hiring Platforms</h1>
          <p className={`text-lg ${isDarkMode ? 'text-purple-300/80' : 'text-stone-600'}`}>
            Explore 25+ job platforms across general, freelancing, tech, and India-focused categories
          </p>
        </div>

        {/* Platform Categories */}
        {platformCategories.map((category, catIndex) => (
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
