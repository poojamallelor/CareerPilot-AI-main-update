"use client";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog";
import { Button } from "../../../components/ui/button";
import { AiCareerFieldResult } from "../../../config/AiModels";
import LoadingDialog from "../../components/LoadingDialog";
import JobsRole, { normalizeJobRolesData, extractRoleTitle } from "./CategoryRole";
import { Sparkles, Map, Compass } from "lucide-react";

// Define AI models for this component
const JobRolls = AiCareerFieldResult;
const AiRoleMoreInfo = AiCareerFieldResult;

// SEO Meta Component
const SEOHead = ({ department, jobRoles }) => {
  useEffect(() => {
    const title = department
      ? `${department} Job Roles & Career Opportunities | CareerPilot AI`
      : "Engineering Job Roles & Career Finder | CareerPilot AI";
    document.title = title;

    const description = department
      ? `Explore ${department} job roles, career paths, salaries, and opportunities. Find your perfect career match with detailed role information and requirements.`
      : "Discover engineering job roles across Computer, Mechanical, Civil, Electrical, and Chemical engineering. Get detailed career information, salary insights, and roadmaps.";

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }
  }, [department]);

  return null;
};

export default function DepartmentJobRoles() {
  const [selectedBranch, setSelectedBranch] = useState("Computer Science");
  const [customBranch, setCustomBranch] = useState("");
  const [submittedValue, setSubmittedValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tree, setTree] = useState(false);
  const [conform, setConform] = useState(false);
  const [role, setRole] = useState("");
  const [status, setStatus] = useState(false);

  const branches = [
    "Computer Science",
    "Information Technology",
    "Data Science & AI",
    "Electronics & Communication",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Chemical Engineering",
    "Biotechnology",
    "Business & Management",
    "Other",
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const deptFromUrl = urlParams.get("department");
      const storedBranch = localStorage.getItem("branch");
      const storedJobs = localStorage.getItem("jobs");

      const activeDept = deptFromUrl || storedBranch || "Computer Science";

      if (branches.includes(activeDept)) {
        setSelectedBranch(activeDept);
      } else {
        setSelectedBranch("Other");
        setCustomBranch(activeDept);
      }

      if (storedJobs) {
        try {
          const parsed = JSON.parse(storedJobs);
          const normalized = normalizeJobRolesData(parsed, activeDept);
          if (normalized) {
            setSubmittedValue(normalized);
            setTree(true);
          }
        } catch {
          console.warn("Could not parse stored jobs from localStorage");
        }
      }
    }
  }, []);

  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch);
    if (branch !== "Other") {
      setCustomBranch("");
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();

    const inputValue =
      selectedBranch === "Other" ? customBranch.trim() : selectedBranch.trim();

    if (!inputValue) {
      alert("Please select or enter a department/branch");
      return;
    }

    setLoading(true);

    const BASIC_PROMPT = `Generate a comprehensive list of job roles available for the department/branch: "${inputValue}".
Respond ONLY with a valid JSON object strictly matching this schema:
{
  "branch": "${inputValue}",
  "jobRoles": [
    {
      "category": "Category Name (e.g. Core Engineering, Software & IT, Design & Analysis)",
      "roles": ["Specific Role Title 1", "Specific Role Title 2", "Specific Role Title 3", "Specific Role Title 4"]
    }
  ]
}`;

    try {
      const result = await JobRolls.sendMessage(BASIC_PROMPT);
      const responseText = result.response.text();

      let cleanedText = (responseText || "").trim();
      if (cleanedText.startsWith("```json")) {
        cleanedText = cleanedText.replace(/^```json\s*/, "").replace(/\s*```$/, "");
      } else if (cleanedText.startsWith("```")) {
        cleanedText = cleanedText.replace(/^```\s*/, "").replace(/\s*```$/, "");
      }

      const jsonStart = cleanedText.indexOf("{");
      const jsonEnd = cleanedText.lastIndexOf("}");
      if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
        cleanedText = cleanedText.substring(jsonStart, jsonEnd + 1);
      }

      let parsedResult;
      try {
        parsedResult = JSON.parse(cleanedText);
      } catch (parseError) {
        console.warn("JSON parsing failed, falling back:", parseError);
        parsedResult = null;
      }

      const normalized = normalizeJobRolesData(parsedResult || cleanedText, inputValue);

      if (typeof window !== "undefined") {
        localStorage.setItem("jobs", JSON.stringify(normalized));
        localStorage.setItem("branch", inputValue);
        window.dispatchEvent(
          new CustomEvent("jobsUpdated", {
            detail: { jobs: normalized, branch: inputValue },
          })
        );
      }

      setSubmittedValue(normalized);
      setTree(true);

      if (typeof window !== "undefined") {
        const newUrl = new URL(window.location);
        newUrl.searchParams.set("department", encodeURIComponent(inputValue));
        window.history.pushState({}, "", newUrl);
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      const fallbackData = normalizeJobRolesData(null, inputValue);
      if (typeof window !== "undefined") {
        localStorage.setItem("jobs", JSON.stringify(fallbackData));
        localStorage.setItem("branch", inputValue);
        window.dispatchEvent(
          new CustomEvent("jobsUpdated", {
            detail: { jobs: fallbackData, branch: inputValue },
          })
        );
      }
      setSubmittedValue(fallbackData);
      setTree(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRoadMap = async () => {
    setStatus(true);
    try {
      const cleanRole = extractRoleTitle(role) || "Software Engineer";
      if (typeof window !== "undefined") {
        localStorage.setItem("roadmapRole", cleanRole);
        localStorage.setItem("role", cleanRole);
      }
      window.location.href = "/careerplanning?page=RoleRoadMap";
    } catch (error) {
      console.error("Error in handleRoadMap:", error);
    } finally {
      setConform(false);
      setStatus(false);
    }
  };



  const jobRolesList =
    submittedValue?.jobRoles?.flatMap((c) => c.roles || []) || [];

  return (
    <>
      <SEOHead
        department={selectedBranch === "Other" ? customBranch : selectedBranch}
        jobRoles={jobRolesList}
      />
      <main
        className="min-h-screen py-12 px-4 sm:px-6 flex flex-col items-center justify-start"
        role="main"
      >
        <section
          id="department-select"
          aria-label="Department selection"
          className="w-full max-w-4xl"
        >
          <div className="text-center mb-10 space-y-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs sm:text-sm font-bold">
              <Compass className="w-4 h-4" />
              <span>Department Career Matrix</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-900 dark:text-white">
              Discover Roles in Your Department
            </h1>
            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-2xl mx-auto font-medium">
              Select your academic discipline or enter a custom field to explore in-demand job roles, salaries, and step-by-step career roadmaps.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#130c24] border border-purple-100 dark:border-[#2c1c4d] shadow-xl space-y-6"
          >
            <div>
              <label className="block text-sm font-bold text-stone-800 dark:text-stone-200 mb-3">
                Select Your Department / Field:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {branches.map((branch) => (
                  <button
                    key={branch}
                    type="button"
                    onClick={() => handleBranchSelect(branch)}
                    className={`p-3 rounded-xl text-xs sm:text-sm font-bold text-left transition-all cursor-pointer border ${
                      selectedBranch === branch
                        ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 text-white border-purple-600 shadow-md scale-[1.02]"
                        : "bg-purple-50/40 dark:bg-[#1a1130] text-stone-700 dark:text-stone-300 border-purple-100/80 dark:border-[#2c1c4d] hover:border-purple-300"
                    }`}
                  >
                    {branch}
                  </button>
                ))}
              </div>
            </div>

            {selectedBranch === "Other" && (
              <div className="pt-2 animate-in fade-in duration-200">
                <label
                  htmlFor="custom-branch"
                  className="block text-sm font-bold text-stone-800 dark:text-stone-200 mb-2"
                >
                  Enter Custom Department or Branch:
                </label>
                <input
                  id="custom-branch"
                  type="text"
                  value={customBranch}
                  onChange={(e) => setCustomBranch(e.target.value)}
                  placeholder="e.g., Aerospace Engineering, Mechatronics, Blockchain..."
                  className="w-full p-3.5 rounded-xl border border-purple-200 dark:border-[#2c1c4d] bg-white dark:bg-[#0e081c] text-stone-900 dark:text-white font-medium focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  required
                />
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-6 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-base shadow-md hover:scale-[1.01] active:scale-98 transition-all cursor-pointer"
            >
              {loading ? "Analyzing Department & Generating Roles..." : "Explore Job Roles 🚀"}
            </Button>
          </form>
        </section>

        {loading && (
          <div className="mt-8">
            <LoadingDialog loading={loading} />
          </div>
        )}

        {tree && (
          <section aria-label="Job roles results" className="w-full max-w-5xl mt-8">
            <JobsRole
              key={`${selectedBranch === "Other" ? customBranch : selectedBranch}`}
              setConform={setConform}
              setRole={setRole}
            />
          </section>
        )}

        {/* Role Decision Dialog */}
        <AlertDialog open={conform} onOpenChange={setConform}>
          <AlertDialogContent className="rounded-3xl max-w-lg p-6 sm:p-8 bg-white dark:bg-[#130c24] border border-purple-100 dark:border-[#2c1c4d] shadow-2xl">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300">
                <Sparkles className="w-6 h-6" />
              </div>
              <AlertDialogTitle className="text-2xl font-black text-stone-950 dark:text-white">
                {extractRoleTitle(role)}
              </AlertDialogTitle>
            </div>
            
            <AlertDialogDescription className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed mt-2">
              Explore step-by-step milestone learning roadmaps.
            </AlertDialogDescription>

            <AlertDialogFooter className="flex flex-col sm:flex-row gap-3 mt-6">
              <AlertDialogCancel
                onClick={() => setConform(false)}
                disabled={status}
                className="rounded-xl font-bold border-purple-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 cursor-pointer"
              >
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction
                onClick={handleRoadMap}
                disabled={status}
                className="rounded-xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Map className="w-4 h-4" />
                <span>View Roadmap 🚀</span>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </>
  );
}
