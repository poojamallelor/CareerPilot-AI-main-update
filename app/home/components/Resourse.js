import { useState } from "react";
import {
  ChevronRight,
  Briefcase,
  Map,
  BookOpen,
  Globe,
  FileText,
  Users,
  BarChart,
} from "lucide-react";

export default function CareerResources() {
  const [showAll, setShowAll] = useState(false);

  const resources = [
    {
      title: "Career Selection",
      description:
        "Confused about your next career choice? We've got you covered",
      icon: <Briefcase className="h-8 w-8 text-indigo-500 mb-4" />,
    },
    {
      title: "Role Roadmap",
      description:
        "Discover your ideal role based on your skills and interests",
      icon: <Map className="h-8 w-8 text-indigo-500 mb-4" />,
    },
    {
      title: "Skill Development",
      description:
        "Learn the skills you need to succeed in your chosen field with practical tips and projects",
      icon: <BookOpen className="h-8 w-8 text-indigo-500 mb-4" />,
    },
    {
      title: "Create Online Presence",
      description: "Build a strong online presence with our tips and tricks",
      icon: <Globe className="h-8 w-8 text-indigo-500 mb-4" />,
    },
    {
      title: "Resume Builder",
      description:
        "Create a professional resume with our easy-to-use templates",
      icon: <FileText className="h-8 w-8 text-indigo-500 mb-4" />,
    },
    {
      title: "Interview Prep",
      description: "Practice with our AI-powered interview simulator",
      icon: <Users className="h-8 w-8 text-indigo-500 mb-4" />,
    },
    {
      title: "Skills Assessment",
      description: "Identify your strengths and areas for improvement",
      icon: <BarChart className="h-8 w-8 text-indigo-500 mb-4" />,
    },
  ];

  const displayedResources = showAll ? resources : resources.slice(0, 3);

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Career Resources
            </h2>
            <p className="mt-2 text-xl text-gray-600">
              Tools and guides to help you succeed
            </p>
          </div>
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-4 md:mt-0 inline-flex items-center text-indigo-600 font-medium hover:text-indigo-700"
          >
            {showAll ? "Show less" : "View all resources"}
            <ChevronRight className="ml-1 h-5 w-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {displayedResources.map((resource, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition"
            >
              {resource.icon}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {resource.title}
              </h3>
              <p className="text-gray-600 mb-4">{resource.description}</p>
              <a
                href="#"
                className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-700"
              >
                Learn more <ChevronRight className="ml-1 h-5 w-5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
