"use client";
import React, { useState, useContext } from "react";
import { ThemeContext } from "../../components/ThemeContext";
import { 
  Trophy, 
  Calendar, 
  Users, 
  Clock, 
  Star, 
  Target, 
  Gift,
  Zap,
  Code,
  Globe,
  Medal,
  Flame,
  Play,
  ExternalLink
} from "lucide-react";

const CompetitionsHackathons = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState("live");
  const [registeredEvents, setRegisteredEvents] = useState(new Set());

  const competitions = {
    live: [
      {
        id: "hackathon-2025",
        title: "Global AI Hackathon 2025",
        type: "Hackathon",
        organizer: "TechGlobal",
        startDate: "2025-01-15",
        endDate: "2025-01-17",
        duration: "48 hours",
        participants: 15847,
        prizePool: "$100,000",
        difficulty: "Advanced",
        technologies: ["AI/ML", "Python", "TensorFlow", "React"],
        description: "Build innovative AI solutions to solve real-world problems",
        status: "Registration Open",
        daysLeft: 20,
        featured: true
      },
      {
        id: "code-sprint-weekly",
        title: "CodeSprint Weekly Challenge",
        type: "Coding Contest",
        organizer: "CodeChef",
        startDate: "2025-01-08",
        endDate: "2025-01-08",
        duration: "3 hours",
        participants: 8934,
        prizePool: "$5,000",
        difficulty: "Intermediate",
        technologies: ["Algorithms", "Data Structures", "C++", "Java"],
        description: "Weekly competitive programming challenge",
        status: "Live Now",
        daysLeft: 1
      },
      {
        id: "fintech-challenge",
        title: "FinTech Innovation Challenge",
        type: "Business Challenge",
        organizer: "JPMorgan Chase",
        startDate: "2025-02-01",
        endDate: "2025-02-28",
        duration: "4 weeks",
        participants: 2156,
        prizePool: "$75,000",
        difficulty: "Advanced",
        technologies: ["Blockchain", "React", "Node.js", "Docker"],
        description: "Revolutionize financial services with technology",
        status: "Registration Open",
        daysLeft: 35
      }
    ],
    upcoming: [
      {
        id: "google-code-jam",
        title: "Google Code Jam 2025",
        type: "Coding Contest",
        organizer: "Google",
        startDate: "2025-03-15",
        endDate: "2025-03-15",
        duration: "2.5 hours",
        participants: 0,
        prizePool: "$15,000",
        difficulty: "Expert",
        technologies: ["Algorithms", "Mathematics", "Any Language"],
        description: "Google's premier competitive programming contest",
        status: "Coming Soon",
        daysLeft: 80
      },
      {
        id: "nasa-space-apps",
        title: "NASA Space Apps Challenge",
        type: "Hackathon",
        organizer: "NASA",
        startDate: "2025-04-05",
        endDate: "2025-04-07",
        duration: "48 hours",
        participants: 0,
        prizePool: "$50,000",
        difficulty: "Intermediate",
        technologies: ["Space Tech", "Data Science", "Web Dev"],
        description: "Solve challenges using NASA's open data",
        status: "Coming Soon",
        daysLeft: 101
      }
    ],
    completed: [
      {
        id: "meta-hackathon",
        title: "Meta AR/VR Hackathon",
        type: "Hackathon",
        organizer: "Meta",
        startDate: "2024-11-15",
        endDate: "2024-11-17",
        duration: "48 hours",
        participants: 12000,
        prizePool: "$80,000",
        difficulty: "Advanced",
        technologies: ["AR/VR", "Unity", "C#", "JavaScript"],
        description: "Build immersive AR/VR experiences",
        status: "Completed",
        winner: "Team VisionaryVR"
      },
      {
        id: "advent-of-code",
        title: "Advent of Code 2024",
        type: "Coding Contest",
        organizer: "Advent of Code",
        startDate: "2024-12-01",
        endDate: "2024-12-25",
        duration: "25 days",
        participants: 250000,
        prizePool: "Glory",
        difficulty: "All Levels",
        technologies: ["Any Language", "Problem Solving"],
        description: "Daily programming challenges throughout December",
        status: "Completed"
      }
    ]
  };

  const leaderboard = [
    { rank: 1, name: "Alex Chen", points: 2847, avatar: "AC", country: "🇺🇸" },
    { rank: 2, name: "Maria Rodriguez", points: 2756, avatar: "MR", country: "🇪🇸" },
    { rank: 3, name: "Raj Patel", points: 2634, avatar: "RP", country: "🇮🇳" },
    { rank: 4, name: "Sarah Kim", points: 2521, avatar: "SK", country: "🇰🇷" },
    { rank: 5, name: "David Wilson", points: 2445, avatar: "DW", country: "🇬🇧" }
  ];

  const handleRegister = (eventId) => {
    setRegisteredEvents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-orange-100 text-orange-800";
      case "Expert": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Live Now": return "bg-red-500 text-foreground animate-pulse";
      case "Registration Open": return "bg-green-500 text-foreground";
      case "Coming Soon": return "bg-blue-500 text-foreground";
      case "Completed": return "bg-gray-500 text-foreground";
      default: return "bg-gray-500 text-foreground";
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8 ${
      isDarkMode 
        ? "bg-[#0a0614] text-white" 
        : "bg-gradient-to-br from-purple-50/60 via-white to-indigo-50/50 text-stone-900"
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Competitions &{" "}
            <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
              Hackathons
            </span>
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-purple-300/80' : 'text-stone-600'}`}>
            Compete with developers worldwide, showcase your skills, and win amazing prizes 
            in programming contests and innovation challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className={`flex space-x-1 rounded-xl p-1 mb-8 ${isDarkMode ? 'bg-[#130c24] border border-[#2c1c4d]' : 'bg-gray-100'}`}>
              {[
                { id: "live", label: "Live & Upcoming", icon: Flame },
                { id: "upcoming", label: "Coming Soon", icon: Calendar },
                { id: "completed", label: "Completed", icon: Trophy }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-semibold transition-all ${
                    activeTab === tab.id
                      ? isDarkMode ? "bg-[#2c1c4d] text-purple-300 shadow-md" : "bg-white text-purple-600 shadow-md"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Events Grid */}
            <div className="space-y-6">
              {competitions[activeTab].map((event) => (
                <div
                  key={event.id}
                  className={`rounded-2xl shadow-xl border-2 p-8 hover:shadow-2xl transition-all duration-300 ${
                    isDarkMode 
                      ? event.featured ? "bg-[#130c24] border-purple-500/50 ring-2 ring-purple-900/40" : "bg-[#130c24] border-[#2c1c4d]"
                      : event.featured ? "bg-white border-purple-300 ring-2 ring-purple-100" : "bg-white border-purple-100"
                  }`}
                >
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(event.status)}`}>
                          {event.status}
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(event.difficulty)}`}>
                          {event.difficulty}
                        </div>
                        {event.featured && (
                          <div className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 flex items-center space-x-1">
                            <Star className="w-3 h-3" />
                            <span>Featured</span>
                          </div>
                        )}
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                      <p className="opacity-80 mb-4">{event.description}</p>
                      
                      <div className="flex items-center space-x-6 text-sm opacity-60">
                        <div className="flex items-center space-x-1">
                          <Globe className="w-4 h-4" />
                          <span>{event.organizer}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{event.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{event.participants.toLocaleString()}</span>
                        </div>
                        {event.daysLeft && (
                          <div className="flex items-center space-x-1 text-purple-500">
                            <Calendar className="w-4 h-4" />
                            <span>{event.daysLeft} days left</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 lg:mt-0 lg:ml-8 text-right">
                      <div className="flex items-center justify-end space-x-2 mb-2">
                        <Gift className="w-5 h-5 text-green-500" />
                        <span className="text-2xl font-bold text-green-600">{event.prizePool}</span>
                      </div>
                      <div className="text-sm opacity-60">Prize Pool</div>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold opacity-85 mb-3">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {event.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-lg text-sm font-medium ${
                            isDarkMode ? 'bg-purple-950/40 text-purple-300' : 'bg-purple-100 text-purple-700'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    {activeTab === "completed" ? (
                      <div className="flex items-center space-x-2 opacity-80">
                        <Trophy className="w-4 h-4" />
                        <span>Winner: {event.winner || "Results Announced"}</span>
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => handleRegister(event.id)}
                          className={`flex-1 px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 flex items-center justify-center space-x-2 ${
                            registeredEvents.has(event.id)
                              ? "bg-green-600 text-white"
                              : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700"
                          }`}
                        >
                          {registeredEvents.has(event.id) ? (
                            <>
                              <Target className="w-4 h-4" />
                              <span>Registered</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4" />
                              <span>Register Now</span>
                            </>
                          )}
                        </button>
                        <button className={`px-6 py-3 rounded-full border-2 font-semibold transition-all flex items-center justify-center space-x-2 ${
                          isDarkMode 
                            ? 'border-[#2c1c4d] text-purple-300 hover:border-purple-500/50 hover:bg-[#130c24]' 
                            : 'border-purple-200 text-purple-700 hover:border-purple-300 hover:bg-purple-50'
                        }`}>
                          <ExternalLink className="w-4 h-4" />
                          <span>Learn More</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Leaderboard */}
            <div className={`rounded-2xl shadow-xl border p-6 ${
              isDarkMode ? 'bg-[#130c24] border-[#2c1c4d]' : 'bg-white border-purple-100'
            }`}>
              <div className="flex items-center space-x-2 mb-6">
                <Trophy className="w-6 h-6 text-yellow-500" />
                <h3 className="text-xl font-bold">Global Leaderboard</h3>
              </div>
              
              <div className="space-y-4">
                {leaderboard.map((user, index) => (
                  <div key={user.rank} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0 ? "bg-yellow-500 text-foreground" :
                      index === 1 ? "bg-gray-400 text-foreground" :
                      index === 2 ? "bg-orange-600 text-foreground" :
                      isDarkMode ? "bg-stone-850 text-stone-300" : "bg-gray-100 text-gray-700"
                    }`}>
                      {user.rank}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-foreground font-bold text-sm">
                      {user.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">{user.name}</span>
                        <span>{user.country}</span>
                      </div>
                      <div className="text-sm opacity-60">{user.points} points</div>
                    </div>
                    {index < 3 && <Medal className="w-5 h-5 text-yellow-500" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className={`rounded-2xl shadow-xl border p-6 ${
              isDarkMode ? 'bg-[#130c24] border-[#2c1c4d]' : 'bg-white border-purple-100'
            }`}>
              <h3 className="text-xl font-bold mb-6">Your Stats</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="opacity-80">Competitions Joined</span>
                  <span className="font-bold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-80">Top 10 Finishes</span>
                  <span className="font-bold">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-80">Total Points</span>
                  <span className="font-bold text-purple-600">1,847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-80">Global Rank</span>
                  <span className="font-bold text-purple-500">#156</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-250 dark:border-stone-800">
                <div className="flex items-center space-x-2 text-sm opacity-80">
                  <Zap className="w-4 h-4" />
                  <span>Next competition starts in 2 days</span>
                </div>
              </div>
            </div>

            {/* Practice Zone */}
            <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl shadow-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Practice Zone</h3>
              <p className="text-purple-100 mb-6 text-sm">
                Sharpen your skills with daily challenges and mock contests.
              </p>
              <button className="w-full bg-white text-purple-700 px-4 py-3 rounded-full font-semibold hover:bg-purple-50 transition-all flex items-center justify-center space-x-2">
                <Code className="w-4 h-4" />
                <span>Start Practice</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitionsHackathons;