import React, { useState, useContext } from "react";
import { Grid3X3, Laptop, List, Search } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { ThemeContext } from "../../components/ThemeContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

function ShowToolsSoftware({ tools, value }) {
  const { isDarkMode } = useContext(ThemeContext);
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTools = tools.tools_and_software.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.use.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-4xl font-bold bg-gradient-to-r ${isDarkMode ? 'from-purple-300 to-indigo-200' : 'from-purple-800 to-indigo-600'} bg-clip-text text-transparent`}>
                Engineering Tools
              </h1>
              <p className={`mt-2 ${isDarkMode ? 'text-purple-300/80' : 'text-stone-600'}`}>
                Essential software for professionals
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition ${
                  viewMode === "grid"
                    ? "bg-purple-600 text-white"
                    : isDarkMode 
                      ? "bg-stone-900 text-stone-300 hover:bg-stone-850"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                <Grid3X3 size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition ${
                  viewMode === "list"
                    ? "bg-purple-600 text-white"
                    : isDarkMode 
                      ? "bg-stone-900 text-stone-300 hover:bg-stone-850"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative max-w-2xl">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search tools and software..."
              className={`w-full pl-12 pr-4 py-3 border rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                isDarkMode 
                  ? 'bg-stone-900 border-stone-850 text-white placeholder-stone-400' 
                  : 'bg-white border-purple-100 text-stone-900 placeholder-stone-400'
              }`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Tools Grid/List */}
        <div
          className={`
          ${
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }`}
        >
          {filteredTools?.map((tool, index) => (
            <Card
              key={index}
              className={`group hover:shadow-xl transition-all duration-300 border ${
                isDarkMode 
                  ? 'bg-[#130c24] border-[#2c1c4d]' 
                  : 'bg-white border-purple-100'
              } backdrop-blur-sm`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold">
                      {tool.name}
                    </CardTitle>
                    <CardDescription className="text-purple-600 dark:text-purple-400 font-medium mt-1">
                      {tool.use}
                    </CardDescription>
                  </div>
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                    <Laptop
                      size={20}
                      className="text-purple-600 dark:text-purple-400"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className={`mb-4 line-clamp-3 group-hover:line-clamp-none transition-all ${
                  isDarkMode ? 'text-purple-300/85' : 'text-stone-600'
                }`}>
                  {tool.description}
                </p>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">
                    Top Users:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {tool.top_companies_uses.map((company, idx) => (
                      <span
                        key={idx}
                        className={`inline-block px-3 py-1 rounded-full text-sm ${
                          isDarkMode ? 'bg-purple-950/40 text-purple-300' : 'bg-purple-50 text-purple-700'
                        }`}
                      >
                        {company}
                      </span>
                    ))}
                  </div>
                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-4"
                    onClick={() => {
                      window.location.href = `/course?course=${encodeURIComponent(
                        tool.name
                      )}&role=${encodeURIComponent(value)}`;
                    }}
                  >
                    Get Course
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowToolsSoftware;
