"use client";
import { ArrowLeft, Briefcase, ChevronRight, Plus, Search, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";

// Safe string extractor for any role item (string or object)
export const extractRoleTitle = (r) => {
  if (!r) return "";
  if (typeof r === "string") return r.trim();
  if (typeof r === "object") {
    return (
      r.role ||
      r.title ||
      r.name ||
      r.role_name ||
      r.job_title ||
      r.roleName ||
      r.jobTitle ||
      r.category_name ||
      r.category ||
      (typeof Object.values(r).find((v) => typeof v === "string" && v.length > 0) === "string"
        ? Object.values(r).find((v) => typeof v === "string" && v.length > 0)
        : "Specialist")
    );
  }
  return String(r);
};

// Robust normalizer for any shape of job roles returned by AI or stored in localStorage
export const normalizeJobRolesData = (rawData, fallbackBranch = "Engineering") => {
  if (!rawData) return null;

  let parsed = rawData;
  if (typeof rawData === "string") {
    try {
      parsed = JSON.parse(rawData);
    } catch {
      return null;
    }
  }

  if (!parsed || typeof parsed !== "object") return null;

  let detectedBranch = fallbackBranch || "Engineering";
  let extractedCategories = [];

  const processCategoryArray = (arr) => {
    return arr
      .map((item, index) => {
        if (!item) return null;

        if (typeof item === "string") {
          return {
            category: "General Roles",
            roles: [item.trim()],
          };
        }

        const catName =
          item.category ||
          item.category_name ||
          item.Category ||
          item.CATEGORY ||
          item.name ||
          item.title ||
          item.field ||
          `Category ${index + 1}`;

        const rawRoles =
          item.roles ||
          item.Roles ||
          item.ROLES ||
          item.job_roles ||
          item.jobRoles ||
          item.jobs ||
          item.positions ||
          [];

        let roleStrings = [];
        if (Array.isArray(rawRoles)) {
          roleStrings = rawRoles.map(extractRoleTitle).filter(Boolean);
        } else if (typeof rawRoles === "string") {
          roleStrings = [rawRoles.trim()];
        } else if (typeof rawRoles === "object" && rawRoles !== null) {
          roleStrings = Object.values(rawRoles).map(extractRoleTitle).filter(Boolean);
        }

        if (roleStrings.length === 0) {
          const potentialRole = item.role || item.role_name || item.title || item.name;
          if (potentialRole && typeof potentialRole === "string") {
            roleStrings = [potentialRole.trim()];
          }
        }

        return {
          category: String(catName),
          description: item.description || "",
          roles: Array.from(new Set(roleStrings)),
        };
      })
      .filter((c) => c !== null && c.roles && c.roles.length > 0);
  };

  if (Array.isArray(parsed)) {
    extractedCategories = processCategoryArray(parsed);
  } else if (typeof parsed === "object") {
    detectedBranch =
      parsed.branch ||
      parsed.department ||
      parsed.Department ||
      parsed.field ||
      fallbackBranch ||
      "Engineering";

    if (Array.isArray(parsed.jobRoles)) {
      extractedCategories = processCategoryArray(parsed.jobRoles);
    } else if (Array.isArray(parsed.job_roles)) {
      extractedCategories = processCategoryArray(parsed.job_roles);
    } else if (Array.isArray(parsed.categories)) {
      extractedCategories = processCategoryArray(parsed.categories);
    } else if (Array.isArray(parsed.roles)) {
      const roleStrings = parsed.roles.map(extractRoleTitle).filter(Boolean);
      extractedCategories = [
        {
          category: "Specialized Roles",
          roles: roleStrings,
        },
      ];
    } else {
      extractedCategories = Object.entries(parsed).map(([key, val], index) => {
        let roleStrings = [];
        if (Array.isArray(val)) {
          roleStrings = val.map(extractRoleTitle).filter(Boolean);
        } else if (typeof val === "object" && val !== null) {
          if (Array.isArray(val.roles)) {
            roleStrings = val.roles.map(extractRoleTitle).filter(Boolean);
          } else {
            roleStrings = Object.values(val).map(extractRoleTitle).filter(Boolean);
          }
        } else if (typeof val === "string") {
          roleStrings = [val.trim()];
        }

        return {
          category: key || `Category ${index + 1}`,
          roles: roleStrings,
        };
      });
    }
  }

  const mergedMap = new Map();
  extractedCategories.forEach((cat) => {
    if (!cat || !cat.category) return;
    if (mergedMap.has(cat.category)) {
      const existing = mergedMap.get(cat.category);
      existing.roles = Array.from(new Set([...existing.roles, ...cat.roles]));
    } else {
      mergedMap.set(cat.category, { ...cat, roles: Array.from(new Set(cat.roles)) });
    }
  });

  const finalJobRoles = Array.from(mergedMap.values()).filter(
    (c) => c.roles && c.roles.length > 0
  );

  if (finalJobRoles.length === 0) {
    return {
      branch: detectedBranch,
      jobRoles: [
        {
          category: "Core Technical Roles",
          roles: ["Software Engineer", "Systems Architect", "Data Engineer", "Full Stack Developer"],
        },
        {
          category: "Management & Strategy",
          roles: ["Technical Project Manager", "Engineering Lead", "Solutions Consultant"],
        },
      ],
    };
  }

  return {
    branch: detectedBranch,
    jobRoles: finalJobRoles,
  };
};

const JobsRole = ({ setConform, setRole }) => {
  const [skills, setSkills] = useState(null);
  const [jobRoll, setJobRoll] = useState("Engineering");
  const [searchQuery, setSearchQuery] = useState("");
  const [customRoleInput, setCustomRoleInput] = useState("");

  const loadJobsData = () => {
    if (typeof window === "undefined") return;
    const rawJobs = localStorage.getItem("jobs");
    const storedBranch = localStorage.getItem("branch") || "Engineering";

    if (rawJobs) {
      try {
        const normalized = normalizeJobRolesData(rawJobs, storedBranch);
        if (normalized) {
          setSkills(normalized);
          setJobRoll(normalized.branch || storedBranch);
          return;
        }
      } catch (err) {
        console.error("Error parsing jobs in CategoryRole:", err);
      }
    }
  };

  useEffect(() => {
    loadJobsData();

    const handleStorageChange = () => {
      loadJobsData();
    };

    window.addEventListener("jobsUpdated", handleStorageChange);
    return () => {
      window.removeEventListener("jobsUpdated", handleStorageChange);
    };
  }, []);

  const handleRoleClick = (job) => {
    const roleTitle = extractRoleTitle(job);
    if (!roleTitle) return;
    if (typeof window !== "undefined") {
      localStorage.setItem("role", roleTitle);
      localStorage.setItem("roadmapRole", roleTitle);
    }
    if (typeof setRole === "function") {
      setRole(roleTitle);
    }
    if (typeof setConform === "function") {
      setConform(true);
    }
  };

  const handleAddCustomRole = (e) => {
    e?.preventDefault?.();
    const trimmed = customRoleInput.trim();
    if (!trimmed) return;

    setSkills((prev) => {
      if (!prev) {
        return {
          branch: jobRoll,
          jobRoles: [
            {
              category: "Custom Roles",
              roles: [trimmed],
            },
          ],
        };
      }

      const updatedJobRoles = [...prev.jobRoles];
      let customCat = updatedJobRoles.find((c) => c.category === "Custom Roles");
      if (customCat) {
        if (!customCat.roles.includes(trimmed)) {
          customCat.roles = [trimmed, ...customCat.roles];
        }
      } else {
        updatedJobRoles.unshift({
          category: "Custom Roles",
          roles: [trimmed],
        });
      }

      const updated = { ...prev, jobRoles: updatedJobRoles };
      if (typeof window !== "undefined") {
        localStorage.setItem("jobs", JSON.stringify(updated));
      }
      return updated;
    });

    setCustomRoleInput("");
  };

  if (!skills || !skills.jobRoles || skills.jobRoles.length === 0) {
    return (
      <div className="container mx-auto p-4 sm:p-6 max-w-5xl">
        <Card className="w-full shadow-lg rounded-2xl p-8 text-center bg-white dark:bg-[#130c24] border-purple-100 dark:border-[#2c1c4d]">
          <h3 className="text-xl font-bold text-stone-800 dark:text-stone-100 mb-2">
            Select a Department to Discover Job Roles
          </h3>
          <p className="text-stone-600 dark:text-stone-400 text-sm mb-6">
            Choose your academic discipline or industry domain to view organized career categories.
          </p>
          <Button
            onClick={() => {
              const el = document.getElementById("department-select");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold"
          >
            Select Department
          </Button>
        </Card>
      </div>
    );
  }

  // Filter roles by search query
  const filteredCategories = skills.jobRoles
    .map((cat) => {
      const filteredRoles = cat.roles.filter((roleItem) => {
        const title = extractRoleTitle(roleItem);
        return title.toLowerCase().includes(searchQuery.toLowerCase());
      });
      return {
        ...cat,
        roles: filteredRoles,
      };
    })
    .filter((cat) => cat.roles.length > 0);

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-5xl">
      <Card className="w-full shadow-2xl overflow-hidden rounded-3xl border-purple-100 dark:border-[#2c1c4d]">
        <CardHeader className="bg-gradient-to-r from-purple-700 via-indigo-600 to-violet-600 text-white p-6 sm:p-8 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl shadow-inner">
                <Briefcase size={28} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {jobRoll} Career Paths
                </h2>
                <p className="text-purple-100 text-sm mt-0.5 font-medium">
                  Click on any role to view its detailed career roadmap
                </p>
              </div>
            </div>
          </div>

          {/* Search bar inside header */}
          <div className="mt-6 relative">
            <Search className="absolute left-3.5 top-3.5 text-stone-400 w-4 h-4" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search specific roles in this department..."
              className="pl-10 bg-white text-stone-900 border-none rounded-xl text-sm placeholder:text-stone-400 shadow-inner h-11"
            />
          </div>
        </CardHeader>

        <CardContent className="p-6 sm:p-8 space-y-8 bg-purple-50/20 dark:bg-[#0e081c]">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-10 text-stone-500 font-medium">
              No matching roles found for &quot;{searchQuery}&quot;.
            </div>
          ) : (
            filteredCategories.map((cat, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                  <h3 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100">
                    {cat.category}
                  </h3>
                  <Badge variant="outline" className="text-xs ml-auto border-purple-200 dark:border-purple-900/60 text-purple-700 dark:text-purple-300">
                    {cat.roles.length} Roles
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cat.roles.map((jobItem, idx) => {
                    const title = extractRoleTitle(jobItem);
                    return (
                      <Card
                        key={idx}
                        className="group hover-lift transition-all duration-300 cursor-pointer bg-white dark:bg-[#130c24] border-purple-100 dark:border-[#2c1c4d] shadow-sm hover:shadow-xl"
                        onClick={() => handleRoleClick(title)}
                      >
                        <CardContent className="p-4 flex items-center justify-between space-x-3">
                          <div className="flex items-center space-x-3 min-w-0">
                            <Badge
                              variant="secondary"
                              className="h-8 w-8 rounded-xl shrink-0 flex items-center justify-center bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-bold text-xs"
                            >
                              {idx + 1}
                            </Badge>
                            <span className="font-bold text-sm text-stone-800 dark:text-stone-200 truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                              {title}
                            </span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all shrink-0" />
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))
          )}

          {/* Add missing roles form */}
          <form
            onSubmit={handleAddCustomRole}
            className="pt-6 border-t border-purple-100 dark:border-[#2c1c4d] flex flex-col sm:flex-row gap-3 items-stretch sm:items-center"
          >
            <Input
              value={customRoleInput}
              onChange={(e) => setCustomRoleInput(e.target.value)}
              placeholder="Add a custom or missing job role..."
              className="bg-white dark:bg-[#130c24] border-purple-200 dark:border-[#2c1c4d] rounded-xl text-sm"
            />
            <Button
              type="submit"
              disabled={!customRoleInput.trim()}
              className="bg-purple-600 hover:bg-purple-700 text-white shrink-0 rounded-xl flex items-center gap-1.5 font-bold cursor-pointer"
            >
              <Plus size={16} />
              <span>Add Role</span>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobsRole;
