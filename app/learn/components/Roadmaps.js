"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Roadmaps() {
  const [predefinedRoadmaps, setPredefinedRoadmaps] = useState([]);
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);
  const [customCareer, setCustomCareer] = useState("");
  const [customLevel, setCustomLevel] = useState("Beginner");
  const [customDuration, setCustomDuration] = useState("6 months");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("predefined");
  const [expandedPhase, setExpandedPhase] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch predefined roadmaps on component mount
  useEffect(() => {
    fetchPredefinedRoadmaps();
  }, []);

  const fetchPredefinedRoadmaps = async () => {
    try {
      const response = await fetch("/api/gemini/roadmaps");
      const data = await response.json();
      setPredefinedRoadmaps(data);
    } catch (err) {
      console.error("Error fetching roadmaps:", err);
    }
  };

  const generateCustomRoadmap = async (e) => {
    e.preventDefault();
    if (!customCareer.trim()) {
      setError("Please enter a career field");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/gemini/roadmaps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          career: customCareer,
          level: customLevel,
          duration: customDuration,
        }),
      });

      if (!response.ok) throw new Error("Failed to generate roadmap");

      const data = await response.json();
      setSelectedRoadmap(data);
      setActiveTab("view");
    } catch (err) {
      setError("Failed to generate roadmap. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const selectPredefinedRoadmap = async (roadmap) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/gemini/roadmaps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          career: roadmap.title,
          level: roadmap.difficulty,
          duration: roadmap.duration,
        }),
      });

      if (!response.ok) throw new Error("Failed to load roadmap");

      const data = await response.json();
      setSelectedRoadmap(data);
      setActiveTab("view");
    } catch (err) {
      setError("Failed to load roadmap. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["all", "Programming", "Data Science", "Cloud & DevOps", "Mobile Development", "Design", "Marketing", "Security"];

  const filteredRoadmaps = selectedCategory === "all" 
    ? predefinedRoadmaps 
    : predefinedRoadmaps.filter(r => r.category === selectedCategory);

  const popularRoadmaps = predefinedRoadmaps.filter(r => r.popular);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            🗺️ Career Roadmaps
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            AI-powered career roadmaps to guide your professional journey. Choose from predefined paths or create a custom roadmap.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-8 space-x-4">
          <button
            onClick={() => setActiveTab("predefined")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "predefined"
                ? "bg-purple-600 text-foreground shadow-lg scale-105"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700"
            }`}
          >
            📚 Predefined Roadmaps
          </button>
          <button
            onClick={() => setActiveTab("custom")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "custom"
                ? "bg-purple-600 text-foreground shadow-lg scale-105"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700"
            }`}
          >
            ✨ Create Custom
          </button>
          {selectedRoadmap && (
            <button
              onClick={() => setActiveTab("view")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === "view"
                  ? "bg-purple-600 text-foreground shadow-lg scale-105"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700"
              }`}
            >
              👁️ View Roadmap
            </button>
          )}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300">
            {error}
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* Predefined Roadmaps Tab */}
          {activeTab === "predefined" && (
            <motion.div
              key="predefined"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {/* Category Filter */}
              <div className="mb-8 flex flex-wrap justify-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === cat
                        ? "bg-purple-600 text-foreground"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {cat === "all" ? "All" : cat}
                  </button>
                ))}
              </div>

              {/* Popular Roadmaps */}
              {selectedCategory === "all" && popularRoadmaps.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-foreground mb-6">
                    🔥 Popular Roadmaps
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {popularRoadmaps.map((roadmap) => (
                      <RoadmapCard
                        key={roadmap.id}
                        roadmap={roadmap}
                        onSelect={selectPredefinedRoadmap}
                        loading={loading}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* All Roadmaps */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-foreground mb-6">
                  {selectedCategory === "all" ? "All Roadmaps" : `${selectedCategory} Roadmaps`}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRoadmaps.map((roadmap) => (
                    <RoadmapCard
                      key={roadmap.id}
                      roadmap={roadmap}
                      onSelect={selectPredefinedRoadmap}
                      loading={loading}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Custom Roadmap Tab */}
          {activeTab === "custom" && (
            <motion.div
              key="custom"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-foreground mb-6">
                  Create Your Custom Roadmap
                </h2>
                <form onSubmit={generateCustomRoadmap} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Career Field *
                    </label>
                    <input
                      type="text"
                      value={customCareer}
                      onChange={(e) => setCustomCareer(e.target.value)}
                      placeholder="e.g., Full Stack Developer, Data Analyst, Cloud Architect"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-foreground focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Your Current Level
                    </label>
                    <select
                      value={customLevel}
                      onChange={(e) => setCustomLevel(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-foreground focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Target Duration
                    </label>
                    <select
                      value={customDuration}
                      onChange={(e) => setCustomDuration(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-foreground focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="3 months">3 months</option>
                      <option value="6 months">6 months</option>
                      <option value="9 months">9 months</option>
                      <option value="12 months">12 months</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-foreground font-bold py-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Generating Roadmap...
                      </span>
                    ) : (
                      "✨ Generate AI Roadmap"
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* View Roadmap Tab */}
          {activeTab === "view" && selectedRoadmap && (
            <motion.div
              key="view"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <RoadmapView
                roadmap={selectedRoadmap}
                expandedPhase={expandedPhase}
                setExpandedPhase={setExpandedPhase}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Roadmap Card Component
function RoadmapCard({ roadmap, onSelect, loading }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-all"
      onClick={() => onSelect(roadmap)}
    >
      <div className="text-4xl mb-4">{roadmap.icon}</div>
      <h3 className="text-xl font-bold text-gray-800 dark:text-foreground mb-2">
        {roadmap.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
        {roadmap.description}
      </p>
      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <span className="mr-2">📊</span>
          <span>{roadmap.difficulty}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <span className="mr-2">⏱️</span>
          <span>{roadmap.duration}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <span className="mr-2">🏷️</span>
          <span>{roadmap.category}</span>
        </div>
      </div>
      {roadmap.popular && (
        <div className="mt-4">
          <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-foreground text-xs font-semibold rounded-full">
            🔥 Popular
          </span>
        </div>
      )}
    </motion.div>
  );
}

// Roadmap View Component
function RoadmapView({ roadmap, expandedPhase, setExpandedPhase }) {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-foreground mb-8 shadow-xl">
        <h1 className="text-4xl font-bold mb-4">{roadmap.title}</h1>
        <p className="text-lg mb-6 opacity-90">{roadmap.description}</p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <div className="text-sm opacity-75">Duration</div>
            <div className="text-xl font-bold">{roadmap.totalDuration}</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <div className="text-sm opacity-75">Difficulty</div>
            <div className="text-xl font-bold">{roadmap.difficulty}</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <div className="text-sm opacity-75">Salary Range</div>
            <div className="text-xl font-bold">{roadmap.averageSalary}</div>
          </div>
        </div>
      </div>

      {/* Prerequisites */}
      {roadmap.prerequisites && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-foreground mb-4">
            📋 Prerequisites
          </h2>
          <ul className="grid md:grid-cols-2 gap-3">
            {roadmap.prerequisites.map((prereq, idx) => (
              <li key={idx} className="flex items-start text-gray-700 dark:text-gray-300">
                <span className="text-green-500 mr-2">✓</span>
                {prereq}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Phases */}
      <div className="space-y-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-foreground">
          🎯 Learning Phases
        </h2>
        {roadmap.phases.map((phase, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
          >
            <button
              onClick={() => setExpandedPhase(expandedPhase === idx ? null : idx)}
              className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-foreground font-bold text-xl">
                    {phase.phase}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-foreground">
                      {phase.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Duration: {phase.duration}
                    </p>
                  </div>
                </div>
                <svg
                  className={`w-6 h-6 text-gray-400 transition-transform ${
                    expandedPhase === idx ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            <AnimatePresence>
              {expandedPhase === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <div className="p-6 space-y-6">
                    <p className="text-gray-700 dark:text-gray-300">{phase.description}</p>

                    {phase.topics && (
                      <div>
                        <h4 className="font-bold text-gray-800 dark:text-foreground mb-2">
                          📚 Topics to Learn
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                          {phase.topics.map((topic, i) => (
                            <li key={i}>{topic}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {phase.skills && (
                      <div>
                        <h4 className="font-bold text-gray-800 dark:text-foreground mb-2">
                          💪 Skills to Develop
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {phase.skills.map((skill, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {phase.projects && (
                      <div>
                        <h4 className="font-bold text-gray-800 dark:text-foreground mb-2">
                          🛠️ Hands-on Projects
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                          {phase.projects.map((project, i) => (
                            <li key={i}>{project}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {phase.resources && (
                      <div>
                        <h4 className="font-bold text-gray-800 dark:text-foreground mb-2">
                          🔗 Learning Resources
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                          {phase.resources.map((resource, i) => (
                            <li key={i}>{resource}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Career Outcomes */}
      {roadmap.careerOutcomes && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-foreground mb-4">
            🎓 Career Outcomes
          </h2>
          <ul className="grid md:grid-cols-2 gap-3">
            {roadmap.careerOutcomes.map((outcome, idx) => (
              <li key={idx} className="flex items-start text-gray-700 dark:text-gray-300">
                <span className="text-purple-500 mr-2">🎯</span>
                {outcome}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Job Roles */}
      {roadmap.jobRoles && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-foreground mb-4">
            💼 Potential Job Roles
          </h2>
          <div className="flex flex-wrap gap-3">
            {roadmap.jobRoles.map((role, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow text-gray-700 dark:text-gray-300 font-medium"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
