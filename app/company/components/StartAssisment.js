"use client";

import { useEffect, useState } from "react";

import { Button } from "../../../components/ui/button";
import {
  AiMcqBasedAssisment,
  AiSkillFinder,
} from '../../../config/AiModels';

export default function TakeAssisment() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skill, setSkill] = useState("");
  const [load, setLoad] = useState({
    mcq: false,
    other: false,
  });
  const [data, setData] = useState({
    mcq: "",
    other: "",
  });

  const [formData, setFormData] = useState({
    jobRole: "",
    description: "",
    experience: "",
    questions: null,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.jobRole.trim()) newErrors.jobRole = "Job role is required";
    if (!formData.description.trim())
      newErrors.description = "Job description is required";
    if (!formData.experience.trim())
      newErrors.experience = "Experience is required";

    // Fixed validation for questions field
    if (formData.questions === null || formData.questions === undefined) {
      newErrors.questions = "No of Questions is required";
    } else if (formData.questions < 5 || formData.questions > 15) {
      newErrors.questions = "Questions must be between 5 and 15";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "number") {
      setFormData((prev) => ({
        ...prev,
        [name]: value === "" ? null : parseInt(value) || 0,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("description_skill"));
    const company_assessment1 = JSON.parse(
      localStorage.getItem("company_assessment1")
    );
    const company_assessment2 = JSON.parse(
      localStorage.getItem("company_assessment2")
    );

    if (storedData) {
      setSkill(storedData);
    }

    if (company_assessment1) {
      setData((prev) => ({
        ...prev,
        mcq: company_assessment1,
      }));
    }
    if (company_assessment2) {
      setData((prev) => ({
        ...prev,
        other: company_assessment2,
      }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const prompt = `analyze the following job description and list out the soft skill and hard skill mentioned in that job description. include soft_skill (list if mentioned otherwise list that important for that role), hard_skill.in json formate.
        job role:${formData.jobRole},job description:${formData.description}.`;
      try {
        const result = await AiSkillFinder.sendMessage(prompt);
        const responseText = await result.response.text();
        const data = JSON.parse(responseText);
        setSkill(data);
        localStorage.setItem("description_skill", JSON.stringify(data));
        console.log(data);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const generateMCQQuestion = async () => {
    setLoad((prev) => ({ ...prev, mcq: true }));

    const prompt = `hard skills:${JSON.stringify(
      skill.hard_skills
    )},question type: mcq based, questions per skill:5,level of question: ${
      formData.experience
    } experience. on the basic of this data give me list of question for assessment which test students ability for that job role. include questions,options.in json formate.`;
    try {
      const result = await AiMcqBasedAssisment.sendMessage(prompt);
      const responseText = await result.response.text();
      const data = JSON.parse(responseText);
      setData((prev) => ({
        ...prev,
        mcq: data,
      }));
      localStorage.setItem("company_assessment1", JSON.stringify(data));
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoad((prev) => ({ ...prev, mcq: false }));
    }
  };

  const generateQuestion = async () => {
    setLoad((prev) => ({ ...prev, other: true }));

    const questions = [
      "logical based",
      "real world based",
      "problem based",
      "situation based",
      "scenario based",
    ];

    const allQuestions = [];

    try {
      for (const questionType of questions) {
        const prompt = `hard skills:${JSON.stringify(
          skill.hard_skill
        )}, question type: ${questionType}, questions per skill: ${
          formData.questions
        }, level of question: ${
          formData.experience
        } experience. on the basic of this data give me list of question for assessment which test students ability for that job role. include questions.in json formate.`;

        const result = await AiMcqBasedAssisment.sendMessage(prompt);
        const responseText = await result.response.text();
        const data = JSON.parse(responseText);
        console.log(data);

        allQuestions.push({ questionType, data });
      }

      localStorage.setItem("company_assessment2", JSON.stringify(allQuestions));
      setData((prev) => ({
        ...prev,
        question: allQuestions,
      }));
      console.log(allQuestions);
    } catch (error) {
      console.log(error);
    } finally {
      setLoad((prev) => ({ ...prev, other: false }));
    }
  };

  return (
    <>
      <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-lg mt-10 border hover:border-blue-200">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-700 mb-6">
          Job Requisition Form
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5 ">
          {/* Job Role */}
          <div>
            <label
              htmlFor="jobRole"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Job Role*
            </label>
            <input
              type="text"
              id="jobRole"
              name="jobRole"
              value={formData.jobRole}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none ${
                errors.jobRole
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
              placeholder="e.g. Frontend Developer, Data Analyst"
            />
            {errors.jobRole && (
              <p className="mt-1 text-sm text-red-600">{errors.jobRole}</p>
            )}
          </div>
          {/* Experience */}
          <div>
            <label
              htmlFor="experience"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Experience Required*
            </label>
            <select
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none ${
                errors.experience
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
            >
              <option value="">Select experience level</option>
              <option value="Internship">Internship</option>
              <option value="Entry Level (0-1 years)">
                Entry Level (0-1 years)
              </option>
              <option value="Junior (1-2 years)">Junior (1-2 years)</option>
              <option value="Mid-Level (2-4 years)">
                Mid-Level (2-4 years)
              </option>
              <option value="Senior (4+ years)">Senior (4+ years)</option>
            </select>
            {errors.experience && (
              <p className="mt-1 text-sm text-red-600">{errors.experience}</p>
            )}
          </div>
          {/* Job Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Job Description*
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none ${
                errors.description
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
              placeholder="Describe the responsibilities, requirements, and qualifications for this role"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* no of question - fixed name to match state */}
          <div>
            <label
              htmlFor="questions"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              No Of Questions per Skill*
            </label>
            <input
              type="number"
              id="questions"
              name="questions"
              value={formData.questions === null ? "" : formData.questions}
              min={5}
              max={15}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none ${
                errors.questions
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
              placeholder="e.g. 5,6,7"
            />
            {errors.questions && (
              <p className="mt-1 text-sm text-red-600">{errors.questions}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 rounded-md text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                isSubmitting
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-primary hover:opacity-90 text-foreground"
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-foreground"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </div>
              ) : (
                "Submit Requisition"
              )}
            </button>
          </div>
        </form>

        <div>
          {skill && (
            <div className="grid grid-cols-2 mt-5">
              <div>
                <p>Hard Skills:</p>
                {skill?.hard_skills?.map((skill, index) => (
                  <p key={index}>{skill}</p>
                ))}
              </div>

              <div>
                <p>Soft Skills:</p>
                {skill?.soft_skills?.map((skill, index) => (
                  <p key={index}>{skill}</p>
                ))}
              </div>

              <div className="mt-2">
                {data.mcq && data.other ? (
                  <Button className="bg-green-600">Publish</Button>
                ) : (
                  <div className="mt-5 flex gap-2">
                    <Button onClick={() => generateMCQQuestion()}>
                      {load.mcq ? "Generating..." : "MCQ Question"}
                    </Button>
                    <Button onClick={() => generateQuestion()}>
                      {load.other ? "Generating..." : "General Question"}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
