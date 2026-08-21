import {
  Book,
  ChevronDown,
  ChevronUp,
  Clock,
  Info,
  Target,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { AiProjectPlan } from '../../../config/AiModels';
import LoadingDialog from "../../components/LoadingDialog";
import Project_plan from "./ShowProjectPlan";

const ProjectCard = ({ project, setPlanStatus }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const project_plan = localStorage.getItem("project_plan");
    if (project_plan) {
      setPlanStatus(true);
    }
  });

  const handleStart = async () => {
    setLoading(true);
    const prompt = `on the basic of project details generate a ${project.timeRequired} project plan to complete the project.include day,work,outcomes,achivements,Key Tips.here is project details project title:${project.title}.project description:${project.description}.problem statement:${project.problemStatement}.in json formate.`;
    try {
      const result = await AiProjectPlan.sendMessage(prompt);
      const responseText = await result.response.text();
      console.log(responseText);
      const jsonresponse = JSON.parse(responseText);
      localStorage.setItem("project_plan", JSON.stringify(jsonresponse));
      setLoading(false);
      setPlanStatus(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="md:m-14 m-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border mt-5 border-blue-100 overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 text-foreground px-5 py-4 flex justify-between items-center ">
        <div className="flex items-center space-x-3">
          <Book className="text-foreground" />
          <h2
            className="text-xl font-semibold cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {project.title}
          </h2>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="hover:bg-blue-500 rounded-full p-2 transition-colors"
        >
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="p-6 space-y-5">
          {/* Description */}
          <div>
            <h3 className="text-lg font-bold text-blue-700 mb-3 flex items-center">
              <Target className="mr-2 text-blue-500" size={20} />
              Description
            </h3>
            <p className="text-gray-700 bg-blue-50 p-3 rounded-lg">
              {project.description}
            </p>
          </div>

          {/* Problem Statement */}
          <div>
            <h3 className="text-lg font-bold text-blue-700 mb-3 flex items-center">
              <Target className="mr-2 text-blue-500" size={20} />
              Problem Statement
            </h3>
            <p className="text-gray-700 bg-blue-50 p-3 rounded-lg">
              {project.problemStatement}
            </p>
          </div>

          {/* realWorldApplications */}
          <div>
            <h3 className="text-lg font-bold text-blue-700 mb-3 flex items-center">
              <Target className="mr-2 text-blue-500" size={20} />
              RealWorld Applications
            </h3>
            <p className="text-gray-700 bg-blue-50 p-3 rounded-lg">
              {project.realWorldApplications}
            </p>
          </div>

          {/* Outcomes */}
          <div>
            <h3 className="text-lg font-bold text-blue-700 mb-3 flex items-center">
              <Target className="mr-2 text-blue-500" size={20} />
              Outcomes
            </h3>
            <ul className="space-y-2 bg-blue-50 p-3 rounded-lg">
              {project.outcomes.map((outcome, i) => (
                <li key={i} className="text-gray-700 flex items-start">
                  <span className="mr-2 text-blue-500">•</span>
                  {outcome}
                </li>
              ))}
            </ul>
          </div>

          {/* Tips */}
          <div>
            <h3 className="text-lg font-bold text-blue-700 mb-3 flex items-center">
              <Info className="mr-2 text-blue-500" size={20} />
              Tips
            </h3>
            <ul className="space-y-2 bg-blue-50 p-3 rounded-lg">
              {project.tips.map((tip, i) => (
                <li key={i} className="text-gray-700 flex items-start">
                  <span className="mr-2 text-blue-500">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Key features */}
          <div>
            <h3 className="text-lg font-bold text-blue-700 mb-3 flex items-center">
              <Info className="mr-2 text-blue-500" size={20} />
              Key Features
            </h3>
            <ul className="space-y-2 bg-blue-50 p-3 rounded-lg">
              {project.keyFeatures.map((tip, i) => (
                <li key={i} className="text-gray-700 flex items-start">
                  <span className="mr-2 text-blue-500">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Tools And Technologies */}
          <div>
            <h3 className="text-lg font-bold text-blue-700 mb-3 flex items-center">
              <Target className="mr-2 text-blue-500" size={20} />
              Tools And Technologies
            </h3>
            <ul className="space-y-2 bg-blue-50 p-3 rounded-lg">
              {project.toolsAndTechnologies.map((tip, i) => (
                <li key={i} className="text-gray-700 flex items-start">
                  <span className="mr-2 text-blue-500">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Time Required */}
          <div className="flex items-center text-gray-600 bg-blue-50 p-3 rounded-lg">
            <Clock className="mr-2 text-blue-500" size={20} />
            <span className="font-medium">
              Time Required: {project.timeRequired}
            </span>
          </div>

          <Button
            onClick={() => {
              handleStart();
            }}
          >
            Start Project
          </Button>
          <LoadingDialog loading={loading} />
        </div>
      )}
    </div>
  );
};

const ProjectIdeas = ({ projects, level, setCheck, topicName }) => {
  const [planStatus, setPlanStatus] = useState(false);
  return (
    <>
      {planStatus ? (
        <>
          <Project_plan setPlanStatus={setPlanStatus} setCheck={setCheck} />
        </>
      ) : (
        <div className="container mx-auto px-4 py-8 bg-blue-50">
          <h1 className="text-4xl font-extrabold text-center mb-5  text-blue-900 capitalize">
            {topicName} Project Ideas for {level} level
          </h1>
          <p className="text-center mb-12 text-2xl">
            Choose One of them and start your project.
          </p>
          <div className="">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                setPlanStatus={setPlanStatus}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectIdeas;
