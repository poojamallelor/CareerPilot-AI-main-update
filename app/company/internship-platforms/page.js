"use client";
import { useContext } from "react";
import { ThemeContext } from "../../components/ThemeContext";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { ExternalLink, UserSearch, Smile, Users, Building } from "lucide-react";
import { SiLinkedin, SiGoogle, SiAmazon, SiKaggle } from "react-icons/si";

const internshipCategories = [
  {
    category: "Major Internship Platforms",
    platforms: [
      { name: "Internshala", icon: UserSearch, url: "https://internshala.com", color: "#00A5EC" },
      { name: "LinkedIn Internships", icon: SiLinkedin, url: "https://linkedin.com/jobs/internship", color: "#0A66C2" },
      { name: "Naukri Internships", icon: UserSearch, url: "https://naukri.com/internship-jobs", color: "#F59E0B" },
      { name: "LetsIntern", icon: UserSearch, url: "https://letsintern.com", color: "#8B5CF6" },
      { name: "HelloIntern", icon: Smile, url: "https://hellointern.com", color: "#EAB308" }
    ]
  },
  {
    category: "Tech Student Platforms",
    platforms: [
      { name: "Kaggle", icon: SiKaggle, url: "https://kaggle.com", color: "#20BEFF" },
      { name: "YouthOp", icon: Users, url: "https://youthop.com", color: "#10B981" },
      { name: "Google Students", icon: SiGoogle, url: "https://buildyourfuture.withgoogle.com", color: "#4285F4" },
      { name: "Microsoft Students", icon: Building, url: "https://careers.microsoft.com/students/us/en", color: "#00A4EF" },
      { name: "AWS Educate", icon: SiAmazon, url: "https://aws.amazon.com/education/awseducate", color: "#FF9900" }
    ]
  }
];

export default function InternshipPlatforms() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Internship Platforms</h1>
          <p className={`text-lg ${isDarkMode ? 'text-purple-300/80' : 'text-stone-600'}`}>
            Find internships on top platforms - from Internshala to Google, Microsoft & AWS programs
          </p>
        </div>

        {/* Platform Categories */}
        {internshipCategories.map((category, catIndex) => (
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
