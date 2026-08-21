import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { AiDaysRemains } from '../../../config/AiModels';
import LoadingDialog from "../../components/LoadingDialog";
import StudyPlan from "./Day30ShowDay";

const DayRemains = () => {
  const [data, setData] = useState("");

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    jobRole: "",
    jobDescription: "",
    skills: [{ name: "", level: "1" }],
    studyHours: "",
  });

  const [errors, setErrors] = useState({
    jobRole: "",
    jobDescription: "",
    skills: [],
    studyHours: "",
  });

  const validateForm = () => {
    let newErrors = {
      jobRole: "",
      jobDescription: "",
      skills: [],
      studyHours: "",
    };
    let isValid = true;

    // Job Role validation
    if (!formData.jobRole.trim()) {
      newErrors.jobRole = "Job role is required";
      isValid = false;
    } else if (formData.jobRole.length < 3) {
      newErrors.jobRole = "Job role must be at least 3 characters";
      isValid = false;
    }

    // Job Description validation
    if (!formData.jobDescription.trim()) {
      newErrors.jobDescription = "Job description is required";
      isValid = false;
    } else if (formData.jobDescription.length < 20) {
      newErrors.jobDescription =
        "Job description must be at least 20 characters";
      isValid = false;
    }

    // Skills validation
    const skillErrors = formData.skills.map((skill) => {
      const errors = {};
      if (!skill.name.trim()) {
        errors.name = "Skill name is required";
        isValid = false;
      }
      return errors;
    });

    if (skillErrors.some((error) => Object.keys(error).length > 0)) {
      newErrors.skills = skillErrors;
    }

    // Study Hours validation
    const hours = Number(formData.studyHours);
    if (!formData.studyHours) {
      newErrors.studyHours = "Study hours are required";
      isValid = false;
    } else if (isNaN(hours) || hours < 4 || hours > 20) {
      newErrors.studyHours = "Study hours must be between 4 and 20";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSkillChange = (index, field, value) => {
    setFormData((prev) => {
      const newSkills = [...prev.skills];
      newSkills[index] = {
        ...newSkills[index],
        [field]: value,
      };
      return {
        ...prev,
        skills: newSkills,
      };
    });
    // Clear error for this skill
    setErrors((prev) => {
      const newSkillErrors = [...(prev.skills || [])];
      if (newSkillErrors[index]) {
        newSkillErrors[index] = { ...newSkillErrors[index], [field]: "" };
      }
      return {
        ...prev,
        skills: newSkillErrors,
      };
    });
  };

  const addSkill = () => {
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, { name: "", level: "1" }],
    }));
  };

  const removeSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
    setErrors((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    // setLoading(true);
    if (validateForm()) {
      try {
        setFormData({
          jobRole: "",
          jobDescription: "",
          skills: [{ name: "", level: "1" }],
          studyHours: "",
        });
        setErrors({
          jobRole: "",
          jobDescription: "",
          skills: [],
          studyHours: "",
        });
      } catch (error) {
        console.error("Error:", error);
      }
      setLoading(true);
      const prompt = `I need a 30-day study plan to prepare for a job as a role: ${formData.jobRole
        }. The job description includes the following key skills and responsibilities: ${formData.jobDescription
        }. My current skill level in each area is: ${formData.skills
          .map((skill) => `${skill.name}: ${skill.level}`)
          .join(
            ", "
          )} as (new-1,beginner-2,intermediate-3,advanced-4,expert-5). The plan should be broken down into daily or weekly tasks, including specific resources (e.g., online courses, books, practice exercises) where possible. Prioritize tasks based on the importance of each skill for the job and my current skill level. The plan should also include time for review and practice tests. Finally, suggest realistic time allocation for each task, considering a daily study time of approximately : ${formData.studyHours
        } hours.in json format.`;

      try {
        const result = await AiDaysRemains.sendMessage(prompt);
        const data = await result.response.text();
        const json = await JSON.parse(data);
        // console.log(json);
        localStorage.setItem("data", JSON.stringify(json));
        setData(json);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("data");
    if (data) {
      setData(JSON.parse(data));
    }
  }, []);
  return (
    <>
      {!data ? (
        <Card className="w-full max-w-2xl mx-auto md:mt-12">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Job Details Form
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Job Role */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Job Role
              </label>
              <input
                type="text"
                name="jobRole"
                value={formData.jobRole}
                onChange={handleChange}
                title="job role eg.web developer"
                placeholder="e.g. Frontend Developer"
                className={`w-full px-4 py-2 rounded-lg border ${errors.jobRole ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-800 dark:border-gray-700`}
              />
              {errors.jobRole && (
                <p className="text-red-500 text-sm mt-1">{errors.jobRole}</p>
              )}
            </div>

            {/* Job Description */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Job Description
              </label>
              <textarea
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
                placeholder="Describe the job responsibilities..."
                title="job description of job role..."
                rows="4"
                className={`w-full px-4 py-2 rounded-lg border ${errors.jobDescription ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-800 dark:border-gray-700`}
              />
              {errors.jobDescription && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.jobDescription}
                </p>
              )}
            </div>

            {/* Skills Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Skills
                </label>
                <Button
                  type="button"
                  onClick={addSkill}
                  variant="outline"
                  title="Add Skill"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add Skill
                </Button>
              </div>
              <div className="flex md:gap-[400px] gap-[230px]">
                <span>Skill Name</span>
                <span>Skill Level</span>
              </div>
              {formData.skills.map((skill, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={skill.name}
                      title="add skill eg.python"
                      onChange={(e) =>
                        handleSkillChange(index, "name", e.target.value)
                      }
                      placeholder="Skill name"
                      className={`w-full px-4 py-2 rounded-lg border ${errors.skills?.[index]?.name
                          ? "border-red-500"
                          : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-800 dark:border-gray-700`}
                    />
                    {errors.skills?.[index]?.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.skills[index].name}
                      </p>
                    )}
                  </div>

                  <div className="w-36">
                    <select
                      value={skill.level}
                      onChange={(e) =>
                        handleSkillChange(index, "level", e.target.value)
                      }
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-800 dark:border-gray-700"
                    >
                      <option value="1">New</option>
                      <option value="2">Beginner</option>
                      <option value="3">Intermediate</option>
                      <option value="4">Advanced</option>
                      <option value="5">Expert</option>
                    </select>
                  </div>
                  {formData.skills.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => removeSkill(index)}
                      variant="ghost"
                      size="icon"
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Study Hours */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Study Hours (per day)
              </label>
              <input
                type="number"
                name="studyHours"
                title="Study Hours per Day"
                value={formData.studyHours}
                onChange={handleChange}
                placeholder="e.g. 12"
                min="1"
                max="20"
                className={`w-full px-4 py-2 rounded-lg border ${errors.studyHours ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-800 dark:border-gray-700`}
              />
              {errors.studyHours && (
                <p className="text-red-500 text-sm mt-1">{errors.studyHours}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                onClick={handleSubmit}
                title="Submit"
                className="w-full bg-primary hover:opacity-90 text-foreground text-foreground py-2 rounded-lg transition-colors duration-200"
              >
                Submit
              </Button>
              <LoadingDialog loading={loading} />
            </div>
          </CardContent>
        </Card>
      ) : (
        <StudyPlan data={data} />
      )}
    </>
  );
};

export default DayRemains;
