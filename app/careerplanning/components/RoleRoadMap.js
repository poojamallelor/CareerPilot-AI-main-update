"use client";
import { useCallback, useEffect, useState } from "react";
import { geminiModel } from "../../../config/AiModels";
import LoadingDialog from "../../components/LoadingDialog";
import Precourse from "./Precourse";
import StudentRoadMap from "./RoadMap";

export default function RoleRoadMap() {
  const [inputValue, setInputValue] = useState("");
  const [submittedValue, setSubmittedValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [tree, setTree] = useState(false);
  const [roadmap, setRoadmap] = useState("");
  const [branch, setBranch] = useState("Computer Science and Engineering");
  const [level, setLevel] = useState("beginner");
  const [pre, setPre] = useState("");
  const [experience, setExperience] = useState("0-1 years");
  const [interests, setInterests] = useState([]);
  const [careerGoals, setCareerGoals] = useState("");

  const cleanAndParseJSON = (text, fallback) => {
    if (!text || typeof text !== "string") return fallback;
    let cleaned = text.trim();
    if (cleaned.startsWith("```json")) {
      cleaned = cleaned.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    } else if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }

    const startObj = cleaned.indexOf("{");
    const endObj = cleaned.lastIndexOf("}");
    if (startObj !== -1 && endObj !== -1 && endObj > startObj) {
      cleaned = cleaned.substring(startObj, endObj + 1);
    }

    try {
      return JSON.parse(cleaned);
    } catch {
      return fallback;
    }
  };

  const createEnhancedFallbackRoadmap = useCallback(
    (role) => ({
      title: `Career Roadmap for ${role}`,
      introduction: `Welcome to your structured ${role} roadmap. Master core principles, deliver real-world solutions, and advance systematically.`,
      timeframe: "12-24 months for solid progression",
      goals: [
        `Master foundational and advanced ${role} principles`,
        "Build a compelling portfolio of domain projects",
        "Network with senior professionals and contribute to the community",
        "Achieve career growth with competitive remuneration",
      ],
      objectives: [
        "Complete foundational coursework with hands-on practice",
        "Build and showcase industry-ready projects",
        "Gain practical problem-solving experience",
        "Develop communication, leadership, and system design skills",
      ],
      phases: [
        {
          phase: "Foundation & Core Skills",
          duration: "Months 1-4",
          description: "Establish strong fundamental domain understanding and essential tools.",
          skills: ["Core Fundamentals", "Tooling & Environment", "Problem Solving"],
          projects: [`Basic ${role} Implementation`, "Interactive Exercises"],
          resources: ["Official Documentation", "Curated Courses", "Open Source Guides"],
          milestones: ["Complete foundations", "Publish first GitHub repository"],
        },
        {
          phase: "Intermediate & Real-World Application",
          duration: "Months 5-10",
          description: "Build robust, full-scale solutions and learn modern design patterns.",
          skills: ["System Architecture", "Performance Optimization", "Collaborative Workflows"],
          projects: ["Full-featured Portfolio Project", "Open Source Contribution"],
          resources: ["Advanced Guides", "Industry Case Studies"],
          milestones: ["Deploy production app", "Participate in code reviews"],
        },
        {
          phase: "Specialization & Career Acceleration",
          duration: "Months 11-18+",
          description: "Master complex systems, interview techniques, and leadership skills.",
          skills: ["Advanced Specialization", "System Design", "Mentorship & Leadership"],
          projects: ["Enterprise-grade Capstone", "Technical Article Writing"],
          resources: ["Industry Conferences", "Certifications"],
          milestones: ["Target role interview readiness", "Secure key certifications"],
        },
      ],
      skills_by_level: {
        beginner: ["Foundational Concepts", "Standard Tooling", "Syntax & Logic"],
        intermediate: ["Architecture Patterns", "API Design", "Testing & CI/CD"],
        advanced: ["Scalability & Optimization", "System Architecture", "Team Leadership"],
      },
      industry_trends: [
        "AI-assisted development & automation",
        "Cloud-native & distributed systems",
        "Security-first engineering practices",
      ],
      challenges: [
        "Navigating fast-evolving tools (Focus on fundamentals first)",
        "Balancing theory with hands-on coding (Build projects consistently)",
      ],
      networking: ["Tech Communities & Discord Servers", "Local Meetups & Hackathons", "LinkedIn Groups"],
      certifications: ["Recognized Industry Certifications", "Cloud & Domain Credentials"],
      salary_progression: "Entry level (₹5-8 LPA) → Mid level (₹10-18 LPA) → Senior (₹22+ LPA)",
      interview_preparation: [
        "Data structures & algorithms (if applicable)",
        "Domain-specific problem solving",
        "Behavioral STAR questions",
      ],
    }),
    []
  );

  const createPrecourseFallback = useCallback(
    (role) => ({
      title: `Prerequisites for ${role}`,
      estimated_prep_time: "4-8 weeks",
      foundation_knowledge: [
        `Core concepts and industry overview of ${role}`,
        "Logical reasoning and analytical thinking",
        "Familiarity with modern software, terminals, and cloud basics",
      ],
      recommended_courses: [
        {
          course: `Fundamentals of ${role}`,
          provider: "Online Learning Platforms",
          duration: "4 weeks",
          difficulty: "Beginner",
          url: "https://www.coursera.org",
        },
        {
          course: "Essential Computer Science & Problem Solving",
          provider: "Self-paced",
          duration: "3 weeks",
          difficulty: "Beginner",
          url: "https://edx.org",
        },
      ],
      preparation_steps: [
        "Review foundation topics and set a weekly study schedule",
        "Set up local development tools and workspace",
        "Join relevant developer/domain communities",
      ],
      free_resources: [
        "Official technical documentation & GitHub roadmaps",
        "FreeCodeCamp & YouTube technical deep-dives",
      ],
      practice_platforms: [
        "LeetCode / HackerRank",
        "Frontend Mentor / GitHub Projects",
      ],
      books: [
        `Clean Code & Best Practices for ${role}`,
        "The Pragmatic Programmer",
      ],
    }),
    []
  );

  const generateDynamicRoadmap = useCallback(
    async (targetRole, isManual = false) => {
      setLoading(true);

      const enhancedPrompt = `
        Create a comprehensive, personalized career roadmap for a "${targetRole}" position.
        Context:
        - Branch/Field: ${branch}
        - Experience Level: ${level} (${experience})
        - Career Goals: ${careerGoals || "Professional growth and skill development"}
        - Special Interests: ${interests.length > 0 ? interests.join(", ") : "General career advancement"}

        Respond ONLY with a valid JSON object matching this structure:
        {
          "title": "Career Roadmap for ${targetRole}",
          "introduction": "A personalized introduction for this career path",
          "timeframe": "12-24 months",
          "goals": ["Goal 1", "Goal 2", "Goal 3"],
          "objectives": ["Objective 1", "Objective 2", "Objective 3"],
          "phases": [
            {
              "phase": "Phase Name",
              "duration": "Timeframe",
              "description": "Description",
              "skills": ["Skill 1", "Skill 2"],
              "projects": ["Project 1", "Project 2"],
              "resources": ["Resource 1", "Resource 2"],
              "milestones": ["Milestone 1", "Milestone 2"]
            }
          ],
          "skills_by_level": {
            "beginner": ["Skill 1", "Skill 2"],
            "intermediate": ["Skill 1", "Skill 2"],
            "advanced": ["Skill 1", "Skill 2"]
          },
          "industry_trends": ["Trend 1", "Trend 2"],
          "challenges": ["Challenge 1", "Challenge 2"],
          "networking": ["Opportunity 1", "Opportunity 2"],
          "certifications": ["Cert 1", "Cert 2"],
          "salary_progression": "Entry level to senior salary growth",
          "interview_preparation": ["Topic 1", "Topic 2"]
        }
      `;

      try {
        const roadmapResult = await geminiModel.sendMessage(enhancedPrompt);
        const roadmapText = roadmapResult.response.text();
        const roadmapJSON = cleanAndParseJSON(
          roadmapText,
          createEnhancedFallbackRoadmap(targetRole)
        );

        const prePrompt = `
          Provide comprehensive prerequisite information for starting a career in "${targetRole}".
          Respond ONLY with a valid JSON object matching this structure:
          {
            "title": "Prerequisites for ${targetRole}",
            "estimated_prep_time": "4-8 weeks",
            "foundation_knowledge": ["Concept 1", "Concept 2"],
            "recommended_courses": [
              {
                "course": "Course Name",
                "provider": "Platform",
                "duration": "4 weeks",
                "difficulty": "Beginner",
                "url": "https://example.com"
              }
            ],
            "preparation_steps": ["Step 1", "Step 2"],
            "free_resources": ["Resource 1", "Resource 2"],
            "books": ["Book 1", "Book 2"],
            "practice_platforms": ["Platform 1", "Platform 2"]
          }
        `;

        const preResult = await geminiModel.sendMessage(prePrompt);
        const preText = preResult.response.text();
        const preJSON = cleanAndParseJSON(
          preText,
          createPrecourseFallback(targetRole)
        );

        setSubmittedValue(roadmapJSON);
        setPre(preJSON);
        setRoadmap(roadmapJSON);

        const localKey = isManual ? `roadmap_manual_${Date.now()}` : "roadmap";
        if (typeof window !== "undefined") {
          localStorage.setItem(
            localKey,
            JSON.stringify({
              role: targetRole,
              branch,
              level,
              experience,
              interests,
              careerGoals,
              roadmap: roadmapJSON,
              precourse: preJSON,
              timestamp: new Date().toISOString(),
            })
          );
        }

        setTree(true);
      } catch (error) {
        console.error("Error generating roadmap:", error);
        const fallbackRoadmap = createEnhancedFallbackRoadmap(targetRole);
        const fallbackPre = createPrecourseFallback(targetRole);
        setSubmittedValue(fallbackRoadmap);
        setPre(fallbackPre);
        setRoadmap(fallbackRoadmap);
        setTree(true);
      } finally {
        setLoading(false);
      }
    },
    [branch, level, experience, interests, careerGoals, createEnhancedFallbackRoadmap, createPrecourseFallback]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedRoadmap = localStorage.getItem("roadmap");
    const storedRole =
      localStorage.getItem("roadmapRole") || localStorage.getItem("role");

    if (storedRoadmap) {
      try {
        const parsedRoadmap = JSON.parse(storedRoadmap);
        setRoadmap(parsedRoadmap.roadmap);
        setPre(parsedRoadmap.precourse);
        setSubmittedValue(parsedRoadmap.roadmap);
        setTree(true);
      } catch (error) {
        console.error("Error parsing stored roadmap:", error);
        localStorage.removeItem("roadmap");
      }
    } else if (storedRole) {
      setInputValue(storedRole);
      setSubmittedValue(storedRole);
      localStorage.removeItem("roadmapRole");
      generateDynamicRoadmap(storedRole);
    }
  }, [generateDynamicRoadmap]);

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    if (!inputValue.trim()) return;

    setSubmittedValue(inputValue.trim());
    await generateDynamicRoadmap(inputValue.trim(), true);
  };

  const handleInterestChange = (interest) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const availableInterests = [
    "Frontend Development",
    "Backend Development",
    "Mobile Apps",
    "Data Science & AI",
    "Machine Learning",
    "Cloud Computing & DevOps",
    "Cybersecurity",
    "UI/UX Design",
    "Product Management",
    "Core Engineering & CAD",
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stone-50/50 dark:bg-stone-950 p-4 sm:p-6">
      {!tree ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-stone-900 p-6 sm:p-8 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-800 w-full max-w-2xl mt-4 space-y-6"
        >
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center p-3 bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 rounded-2xl mb-1">
              <span className="text-2xl">🚀</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white">
              AI Career Roadmap Generator
            </h1>
            <p className="text-stone-600 dark:text-stone-400 text-sm font-medium">
              Customized learning milestones, timelines, and prerequisites tailored to your career trajectory
            </p>
          </div>

          {/* Role Input */}
          <div>
            <label
              htmlFor="userInput"
              className="block text-stone-700 dark:text-stone-300 text-sm font-bold mb-2"
            >
              Target Role:
            </label>
            <input
              type="text"
              id="userInput"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full p-3.5 bg-stone-50 dark:bg-[#1a1130] border border-purple-200 dark:border-[#2c1c4d] rounded-xl shadow-sm text-stone-900 dark:text-stone-100 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              placeholder="e.g., Full Stack Developer, Data Scientist, Cloud Architect..."
              required
            />
          </div>

          {/* Branch/Field Selection */}
          <div>
            <label className="block text-stone-700 dark:text-stone-300 text-sm font-bold mb-2">
              Field / Branch:
            </label>
            <select
              onChange={(e) => setBranch(e.target.value)}
              className="w-full p-3.5 bg-stone-50 dark:bg-[#1a1130] border border-purple-200 dark:border-[#2c1c4d] rounded-xl shadow-sm text-stone-900 dark:text-stone-100 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              value={branch}
            >
              <option value="Computer Science and Engineering">Computer Science & Engineering</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Data Science">Data Science</option>
              <option value="Business and Management">Business & Management</option>
              <option value="Design and Creative">Design & Creative</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Experience Level */}
            <div>
              <label className="block text-stone-700 dark:text-stone-300 text-sm font-bold mb-2">
                Experience Level:
              </label>
              <select
                onChange={(e) => setLevel(e.target.value)}
                className="w-full p-3.5 bg-stone-50 dark:bg-[#1a1130] border border-purple-200 dark:border-[#2c1c4d] rounded-xl shadow-sm text-stone-900 dark:text-stone-100 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={level}
              >
                <option value="beginner">Beginner (0-1 years)</option>
                <option value="intermediate">Intermediate (1-3 years)</option>
                <option value="advanced">Advanced (3-5 years)</option>
                <option value="expert">Expert (5+ years)</option>
              </select>
            </div>

            {/* Experience Duration */}
            <div>
              <label className="block text-stone-700 dark:text-stone-300 text-sm font-bold mb-2">
                Target Timeframe:
              </label>
              <select
                onChange={(e) => setExperience(e.target.value)}
                className="w-full p-3.5 bg-stone-50 dark:bg-[#1a1130] border border-purple-200 dark:border-[#2c1c4d] rounded-xl shadow-sm text-stone-900 dark:text-stone-100 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={experience}
              >
                <option value="0-1 years">0-1 years</option>
                <option value="1-3 years">1-3 years</option>
                <option value="3-5 years">3-5 years</option>
              </select>
            </div>
          </div>

          {/* Career Goals */}
          <div>
            <label className="block text-stone-700 dark:text-stone-300 text-sm font-bold mb-2">
              Career Aspirations / Focus (Optional):
            </label>
            <textarea
              value={careerGoals}
              onChange={(e) => setCareerGoals(e.target.value)}
              className="w-full p-3.5 bg-stone-50 dark:bg-[#1a1130] border border-purple-200 dark:border-[#2c1c4d] rounded-xl shadow-sm text-stone-900 dark:text-stone-100 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., Transition into AI engineering, land a Tier-1 product company role..."
              rows="2"
            />
          </div>

          {/* Interests */}
          <div>
            <label className="block text-stone-700 dark:text-stone-300 text-sm font-bold mb-3">
              Areas of Interest:
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {availableInterests.map((interest) => (
                <label
                  key={interest}
                  className="flex items-center gap-2 p-2.5 rounded-xl border border-purple-100 dark:border-[#2c1c4d] bg-purple-50/40 dark:bg-[#1a1130] cursor-pointer hover:border-purple-300 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={interests.includes(interest)}
                    onChange={() => handleInterestChange(interest)}
                    className="accent-purple-600 rounded w-4 h-4"
                  />
                  <span className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-medium">
                    {interest}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !inputValue.trim()}
            className={`w-full py-4 rounded-xl text-white font-bold text-base transition-all shadow-md cursor-pointer ${
              loading
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 hover:from-purple-700 hover:to-indigo-700 active:scale-[0.99]"
            }`}
          >
            {loading ? "Generating Your Roadmap..." : "🚀 Generate AI Career Roadmap"}
          </button>
        </form>
      ) : (
        <div className="w-full max-w-6xl space-y-6">
          <div className="text-center">
            <button
              onClick={() => {
                setTree(false);
                if (typeof window !== "undefined") {
                  localStorage.removeItem("roadmap");
                }
                setSubmittedValue("");
                setPre("");
                setInputValue("");
                setCareerGoals("");
                setInterests([]);
              }}
              className="bg-stone-800 hover:bg-stone-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow transition-all"
            >
              ✨ Generate Another Roadmap
            </button>
          </div>
          <Precourse pre={pre} inputValue={inputValue} roadmap={roadmap} />
          <StudentRoadMap roadmap={submittedValue} setTree={setTree} />
        </div>
      )}

      {loading && <LoadingDialog loading={loading} />}
    </div>
  );
}
