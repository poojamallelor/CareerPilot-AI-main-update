"use client";
import { useContext } from "react";
import { ThemeContext } from "../components/ThemeContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Globe, GraduationCap, Rocket, Trophy, Building, ExternalLink } from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "Hiring Platforms",
    description: "Explore top job platforms like LinkedIn, Naukri, Indeed, and more",
    icon: Globe,
    href: "/company/hiring-platforms",
    external: false
  },
  {
    title: "Superset Campus Hiring",
    description: "Join Superset - India's leading campus hiring platform",
    icon: GraduationCap,
    href: "https://joinsuperset.com",
    external: true
  },
  {
    title: "Internship Platforms",
    description: "Find internships on Internshala, LinkedIn, LetsIntern & more",
    icon: Rocket,
    href: "/company/internship-platforms",
    external: false
  },
  {
    title: "Hiring Challenges",
    description: "Compete on HackerRank, LeetCode, Unstop, CodeChef & win jobs",
    icon: Trophy,
    href: "/company/hiring-challenges",
    external: false
  },
  {
    title: "MNC Career Portals",
    description: "Direct links to Google, Amazon, Microsoft, Meta & 50+ MNCs",
    icon: Building,
    href: "/company/mnc-careers",
    external: false
  }
];

export default function CompanyHub() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? "bg-[#0a0614] text-white" 
        : "bg-gradient-to-br from-purple-50/60 via-white to-indigo-50/50 text-stone-900"
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hiring Ecosystem
          </h1>
          <p className={`text-lg md:text-xl ${isDarkMode ? 'text-purple-300/80' : 'text-stone-600'} max-w-3xl mx-auto`}>
            Your complete guide to job platforms, internships, challenges, MNC portals, and remote opportunities
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const CardWrapper = feature.external ? 'a' : Link;
            const linkProps = feature.external 
              ? { href: feature.href, target: "_blank", rel: "noopener noreferrer" }
              : { href: feature.href };

            return (
              <CardWrapper key={index} {...linkProps} className="block">
                <Card className={`h-full transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer ${
                  isDarkMode 
                    ? 'bg-[#130c24] border-[#2c1c4d] hover:border-purple-500' 
                    : 'bg-white border-purple-100 hover:border-purple-400'
                }`}>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-3 rounded-lg ${
                        isDarkMode ? 'bg-purple-900/30' : 'bg-purple-100'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          isDarkMode ? 'text-purple-400' : 'text-purple-600'
                        }`} />
                      </div>
                      {feature.external && (
                        <ExternalLink className={`w-4 h-4 ${
                          isDarkMode ? 'text-gray-500' : 'text-gray-400'
                        }`} />
                      )}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className={isDarkMode ? 'text-purple-300/70' : 'text-stone-600'}>
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium ${
                      isDarkMode 
                        ? 'bg-purple-900/20 text-purple-400' 
                        : 'bg-purple-50 text-purple-600'
                    }`}>
                      {feature.external ? 'Visit Site' : 'Explore'} →
                    </div>
                  </CardContent>
                </Card>
              </CardWrapper>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className={`mt-16 p-8 rounded-2xl ${
          isDarkMode ? 'bg-gradient-to-r from-purple-900/20 to-indigo-900/20 border border-[#2c1c4d]' : 'bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200'
        }`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-500">50+</div>
              <div className={`text-sm ${isDarkMode ? 'text-purple-300/80' : 'text-stone-600'}`}>Job Platforms</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-500">100+</div>
              <div className={`text-sm ${isDarkMode ? 'text-purple-300/80' : 'text-stone-600'}`}>MNC Portals</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-500">30+</div>
              <div className={`text-sm ${isDarkMode ? 'text-purple-300/80' : 'text-stone-600'}`}>Challenge Platforms</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-fuchsia-500">1000+</div>
              <div className={`text-sm ${isDarkMode ? 'text-purple-300/80' : 'text-stone-600'}`}>Opportunities</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
