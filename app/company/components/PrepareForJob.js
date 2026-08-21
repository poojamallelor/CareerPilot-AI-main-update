import React, { useState, useContext } from "react";
import { ThemeContext } from "../../components/ThemeContext";
import {
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  Briefcase,
  User,
  Target,
  Send,
} from "lucide-react";

function PrepareForJob() {
  const { isDarkMode } = useContext(ThemeContext);
  const [selectedJob, setSelectedJob] = useState(null);

  const jobPosts = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechNova Solutions",
      location: "Bangalore, India",
      type: "Full-Time",
      experience: "2+ years",
      salary: "₹8,00,000 - ₹12,00,000",
      description:
        "We are looking for a skilled Frontend Developer proficient in React.js and Tailwind CSS.",
      postedDate: "2025-06-10",
      tags: ["React", "JavaScript", "HTML", "CSS", "Tailwind"],
    },
    {
      id: 2,
      title: "Backend Engineer",
      company: "CodeCraft Inc.",
      location: "Remote",
      type: "Part-Time",
      experience: "3+ years",
      salary: "$30/hr",
      description:
        "Looking for an experienced backend engineer with Node.js and MongoDB expertise.",
      postedDate: "2025-06-12",
      tags: ["Node.js", "Express", "MongoDB", "API"],
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "PixelHub",
      location: "Pune, India",
      type: "Contract",
      experience: "1+ years",
      salary: "₹4,00,000 - ₹6,00,000",
      description:
        "Creative designer needed to design mobile and web interfaces using Figma.",
      postedDate: "2025-06-08",
      tags: ["Figma", "UI Design", "UX Research", "Adobe XD"],
    },
    {
      id: 4,
      title: "Full Stack Developer",
      company: "DevForge Labs",
      location: "Hyderabad, India",
      type: "Full-Time",
      experience: "4+ years",
      salary: "₹10,00,000 - ₹16,00,000",
      description:
        "Expert in MERN stack with solid deployment and CI/CD skills.",
      postedDate: "2025-06-13",
      tags: ["MERN", "React", "Node.js", "Docker", "CI/CD"],
    },
    {
      id: 5,
      title: "Data Analyst",
      company: "Insights360",
      location: "Mumbai, India",
      type: "Internship",
      experience: "0-1 year",
      salary: "₹15,000/month",
      description:
        "Analyze datasets using Python and SQL to generate business insights.",
      postedDate: "2025-06-09",
      tags: ["Python", "SQL", "Excel", "Data Analysis"],
    },
  ];

  const handleCheckMe = (job) => {
    alert(
      `Checking your profile compatibility for ${job.title} at ${job.company}`
    );
  };

  const handlePrepare = (job) => {
    alert(`Starting preparation resources for ${job.title}`);
    localStorage.setItem("role", job.title);
    window.location.href = "/careerplanning?page=RoleRoadMap";
  };

  const handleApply = (job) => {
    alert(`Redirecting to application page for ${job.title} at ${job.company}`);
  };

  const getTypeColor = (type) => {
    const colors = {
      "Full-Time": "bg-green-100 text-green-800",
      "Part-Time": "bg-blue-100 text-blue-800",
      Contract: "bg-purple-100 text-purple-800",
      Internship: "bg-fuchsia-100 text-fuchsia-800",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 p-4 md:p-8 ${
      isDarkMode ? 'bg-[#0a0614] text-white' : 'bg-gradient-to-br from-purple-50/60 via-white to-indigo-50/50 text-stone-900'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Job Preparation Hub
          </h1>
          <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-purple-300/80' : 'text-stone-600'}`}>
            Find your dream job, check your compatibility, prepare effectively,
            and apply with confidence
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className={`rounded-xl p-6 border ${
            isDarkMode ? 'bg-[#130c24] border-[#2c1c4d]' : 'bg-white border-purple-100 shadow-lg'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-80">Total Jobs</p>
                <p className="text-3xl font-bold">
                  {jobPosts.length}
                </p>
              </div>
              <Briefcase className="h-12 w-12 text-purple-500" />
            </div>
          </div>
          <div className={`rounded-xl p-6 border ${
            isDarkMode ? 'bg-[#130c24] border-[#2c1c4d]' : 'bg-white border-purple-100 shadow-lg'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-80">Remote Jobs</p>
                <p className="text-3xl font-bold">
                  {jobPosts.filter((job) => job.location === "Remote").length}
                </p>
              </div>
              <MapPin className="h-12 w-12 text-indigo-500" />
            </div>
          </div>
          <div className={`rounded-xl p-6 border ${
            isDarkMode ? 'bg-[#130c24] border-[#2c1c4d]' : 'bg-white border-purple-100 shadow-lg'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-80">
                  Fresh Postings
                </p>
                <p className="text-3xl font-bold">
                  {
                    jobPosts.filter((job) => {
                      const posted = new Date(job.postedDate);
                      const today = new Date();
                      const diffTime = Math.abs(today - posted);
                      const diffDays = Math.ceil(
                        diffTime / (1000 * 60 * 60 * 24)
                      );
                      return diffDays <= 7;
                    }).length
                  }
                </p>
              </div>
              <Clock className="h-12 w-12 text-fuchsia-500" />
            </div>
          </div>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {jobPosts.map((job) => (
            <div
              key={job.id}
              className={`rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1 border ${
                isDarkMode ? 'bg-[#130c24] border-[#2c1c4d]' : 'bg-white border-purple-100'
              }`}
            >
              {/* Card Header */}
              <div className={`p-6 border-b ${isDarkMode ? 'border-[#2c1c4d]' : 'border-purple-100'}`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1 group-hover:text-purple-600 transition-colors">
                      {job.title}
                    </h3>
                    <p className="font-medium opacity-80">{job.company}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(
                      job.type
                    )}`}
                  >
                    {job.type}
                  </span>
                </div>

                {/* Job Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <User className="h-4 w-4 mr-2" />
                    <span className="text-sm">{job.experience}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="h-4 w-4 mr-2" />
                    <span className="text-sm font-semibold text-green-600">
                      {job.salary}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      Posted {formatDate(job.postedDate)}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  {job.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-md font-medium transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className={`p-6 ${isDarkMode ? 'bg-purple-950/20' : 'bg-purple-50/30'}`}>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => handleCheckMe(job)}
                    className="flex items-center justify-center px-3 py-2 bg-primary hover:opacity-90 text-foreground text-foreground text-sm font-medium rounded-lg transition-colors group"
                  >
                    <User className="h-4 w-4 mr-1" />
                    Check Me
                  </button>
                  <button
                    onClick={() => handlePrepare(job)}
                    className="flex items-center justify-center px-3 py-2 bg-green-600 hover:bg-green-700 text-foreground text-sm font-medium rounded-lg transition-colors"
                  >
                    <Target className="h-4 w-4 mr-1" />
                    Prepare
                  </button>
                  <button
                    onClick={() => handleApply(job)}
                    className="flex items-center justify-center px-3 py-2 bg-primary hover:opacity-90 text-foreground text-foreground text-sm font-medium rounded-lg transition-colors"
                  >
                    <Send className="h-4 w-4 mr-1" />
                    Apply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pb-8">
          <p className="text-gray-600">
            Ready to take the next step in your career? Start preparing today!
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrepareForJob;
