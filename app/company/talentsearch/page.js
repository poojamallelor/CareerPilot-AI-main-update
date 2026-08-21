"use client";
import React, { useState, useMemo, useContext } from "react";
import { ThemeContext } from "../../components/ThemeContext";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  GraduationCap,
  Code,
  Award,
  ExternalLink,
  FileText,
  Search,
  Filter,
  X,
} from "lucide-react";

const StudentProfilesPage = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    skills: [],
    degree: "",
    yearOfPassing: "",
    gender: "",
    minPercentage: "",
    certificates: [],
  });
  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    skills: [],
    degree: "",
    yearOfPassing: "",
    gender: "",
    minPercentage: "",
    certificates: [],
  });
  const [showFilters, setShowFilters] = useState(false);

  const students = [
    {
      id: "S001",
      name: "Rohan Sharma",
      email: "rohan.sharma@example.com",
      phone: "+91-9876543210",
      dob: "2000-04-15",
      gender: "Male",
      address: "123, MG Road, Pune, Maharashtra",
      education: [
        {
          degree: "B.Tech",
          branch: "Computer Science",
          institute: "ABC Institute of Technology",
          yearOfPassing: 2025,
          percentage: 82.5,
        },
      ],
      skills: ["Java", "React", "MySQL"],
      experience: "Fresher",
      resumeUrl: "https://example.com/resumes/rohan_sharma.pdf",
      applicationDate: "2025-05-30",
      bestproject: [
        { title: "Home Automation", link: "link1" },
        { title: "AI Skill Development", link: "link2" },
        { title: "Hello World", link: "link3" },
      ],
      certificates: ["ABC Internship", "AWS Developer"],
    },
    {
      id: "S002",
      name: "Priya Verma",
      email: "priya.verma@example.com",
      phone: "+91-9988776655",
      dob: "1999-12-20",
      gender: "Female",
      address: "456, Koregaon Park, Pune, Maharashtra",
      education: [
        {
          degree: "B.E.",
          branch: "Information Technology",
          institute: "XYZ College of Engineering",
          yearOfPassing: 2024,
          percentage: 88.2,
        },
      ],
      skills: ["Python", "Django", "PostgreSQL"],
      experience: "Fresher",
      resumeUrl: "https://example.com/resumes/priya_verma.pdf",
      applicationDate: "2025-05-29",
      bestproject: [
        { title: "E-Commerce Website", link: "link1" },
        { title: "Chatbot System", link: "link2" },
      ],
      certificates: ["Microsoft Azure", "Python Bootcamp"],
    },
    {
      id: "S003",
      name: "Aman Gupta",
      email: "aman.gupta@example.com",
      phone: "+91-9876512345",
      dob: "2001-01-10",
      gender: "Male",
      address: "789, LBS Marg, Mumbai, Maharashtra",
      education: [
        {
          degree: "B.Sc",
          branch: "Computer Science",
          institute: "Mumbai University",
          yearOfPassing: 2023,
          percentage: 76.4,
        },
      ],
      skills: ["HTML", "CSS", "JavaScript"],
      experience: "Fresher",
      resumeUrl: "https://example.com/resumes/aman_gupta.pdf",
      applicationDate: "2025-05-28",
      bestproject: [{ title: "Portfolio Website", link: "link1" }],
      certificates: ["Frontend Certification"],
    },
    {
      id: "S004",
      name: "Sneha Patil",
      email: "sneha.patil@example.com",
      phone: "+91-9898989898",
      dob: "2000-05-15",
      gender: "Female",
      address: "234, FC Road, Pune, Maharashtra",
      education: [
        {
          degree: "B.Tech",
          branch: "Electronics",
          institute: "Sinhgad Institute",
          yearOfPassing: 2024,
          percentage: 79.0,
        },
      ],
      skills: ["C", "Python", "Matlab"],
      experience: "Fresher",
      resumeUrl: "https://example.com/resumes/sneha_patil.pdf",
      applicationDate: "2025-05-27",
      bestproject: [{ title: "IoT Smart Dustbin", link: "link1" }],
      certificates: ["Embedded Systems Training"],
    },
    {
      id: "S005",
      name: "Raj Mehta",
      email: "raj.mehta@example.com",
      phone: "+91-9123456789",
      dob: "1999-08-18",
      gender: "Male",
      address: "501, Satellite Road, Ahmedabad, Gujarat",
      education: [
        {
          degree: "BCA",
          branch: "Computer Applications",
          institute: "Gujarat University",
          yearOfPassing: 2023,
          percentage: 84.3,
        },
      ],
      skills: ["PHP", "Laravel", "MySQL"],
      experience: "Fresher",
      resumeUrl: "https://example.com/resumes/raj_mehta.pdf",
      applicationDate: "2025-05-26",
      bestproject: [{ title: "College Management System", link: "link1" }],
      certificates: ["PHP Certification", "Laravel Bootcamp"],
    },
    {
      id: "S006",
      name: "Neha Jain",
      email: "neha.jain@example.com",
      phone: "+91-9090909090",
      dob: "2001-03-09",
      gender: "Female",
      address: "15, MG Road, Indore, Madhya Pradesh",
      education: [
        {
          degree: "MCA",
          branch: "Computer Applications",
          institute: "DAVV Indore",
          yearOfPassing: 2025,
          percentage: 91.0,
        },
      ],
      skills: ["Java", "Spring Boot", "Angular"],
      experience: "Fresher",
      resumeUrl: "https://example.com/resumes/neha_jain.pdf",
      applicationDate: "2025-05-25",
      bestproject: [{ title: "Online Banking System", link: "link1" }],
      certificates: ["Java Enterprise Dev"],
    },
    {
      id: "S007",
      name: "Kunal Joshi",
      email: "kunal.joshi@example.com",
      phone: "+91-9876554321",
      dob: "1998-11-01",
      gender: "Male",
      address: "102, Baner Road, Pune, Maharashtra",
      education: [
        {
          degree: "B.Tech",
          branch: "Mechanical",
          institute: "MIT WPU",
          yearOfPassing: 2024,
          percentage: 73.2,
        },
      ],
      skills: ["AutoCAD", "SolidWorks", "Python"],
      experience: "Fresher",
      resumeUrl: "https://example.com/resumes/kunal_joshi.pdf",
      applicationDate: "2025-05-24",
      bestproject: [{ title: "3D Printed Robot Arm", link: "link1" }],
      certificates: ["CAD Design Expert"],
    },
    {
      id: "S008",
      name: "Ankita Deshmukh",
      email: "ankita.deshmukh@example.com",
      phone: "+91-9765432109",
      dob: "2002-07-22",
      gender: "Female",
      address: "67, Shivaji Nagar, Nagpur, Maharashtra",
      education: [
        {
          degree: "B.Sc",
          branch: "IT",
          institute: "RTMNU",
          yearOfPassing: 2023,
          percentage: 85.1,
        },
      ],
      skills: ["JavaScript", "Node.js", "MongoDB"],
      experience: "Fresher",
      resumeUrl: "https://example.com/resumes/ankita_deshmukh.pdf",
      applicationDate: "2025-05-23",
      bestproject: [{ title: "Online Food Ordering System", link: "link1" }],
      certificates: ["Full Stack Web Dev"],
    },
    {
      id: "S009",
      name: "Vikram Singh",
      email: "vikram.singh@example.com",
      phone: "+91-9834567890",
      dob: "2000-02-11",
      gender: "Male",
      address: "8, Sector 15, Noida, Uttar Pradesh",
      education: [
        {
          degree: "B.Tech",
          branch: "Civil",
          institute: "Amity University",
          yearOfPassing: 2024,
          percentage: 68.9,
        },
      ],
      skills: ["AutoCAD", "Project Management"],
      experience: "Fresher",
      resumeUrl: "https://example.com/resumes/vikram_singh.pdf",
      applicationDate: "2025-05-22",
      bestproject: [{ title: "Smart Parking System", link: "link1" }],
      certificates: ["PM Certification"],
    },
    {
      id: "S010",
      name: "Divya Kapoor",
      email: "divya.kapoor@example.com",
      phone: "+91-9955667788",
      dob: "2001-06-05",
      gender: "Female",
      address: "23, Rajouri Garden, Delhi",
      education: [
        {
          degree: "B.Tech",
          branch: "IT",
          institute: "IP University",
          yearOfPassing: 2025,
          percentage: 89.7,
        },
      ],
      skills: ["C++", "Flutter", "Firebase"],
      experience: "Fresher",
      resumeUrl: "https://example.com/resumes/divya_kapoor.pdf",
      applicationDate: "2025-05-21",
      bestproject: [{ title: "College App", link: "link1" }],
      certificates: ["Flutter Dev Certification"],
    },
  ];

  const handleAction = (action, student) => {
    alert(`${action} clicked for ${student.name}`);
  };

  // Get all unique values for filter options
  const allSkills = [...new Set(students.flatMap((student) => student.skills))];
  const allDegrees = [
    ...new Set(
      students.flatMap((student) => student.education.map((edu) => edu.degree))
    ),
  ];
  const allYears = [
    ...new Set(
      students.flatMap((student) =>
        student.education.map((edu) => edu.yearOfPassing)
      )
    ),
  ].sort();
  const allCertificates = [
    ...new Set(students.flatMap((student) => student.certificates)),
  ];

  // Filter students based on applied filters (not the current filter state)
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      // Search filter
      if (appliedFilters.search) {
        const searchLower = appliedFilters.search.toLowerCase();
        const matchesSearch =
          student.name.toLowerCase().includes(searchLower) ||
          student.email.toLowerCase().includes(searchLower) ||
          student.skills.some((skill) =>
            skill.toLowerCase().includes(searchLower)
          ) ||
          student.education.some(
            (edu) =>
              edu.degree.toLowerCase().includes(searchLower) ||
              edu.branch.toLowerCase().includes(searchLower) ||
              edu.institute.toLowerCase().includes(searchLower)
          );
        if (!matchesSearch) return false;
      }

      // Skills filter
      if (appliedFilters.skills.length > 0) {
        const hasMatchingSkills = appliedFilters.skills.some((skill) =>
          student.skills.includes(skill)
        );
        if (!hasMatchingSkills) return false;
      }

      // Degree filter
      if (appliedFilters.degree) {
        const hasMatchingDegree = student.education.some(
          (edu) => edu.degree === appliedFilters.degree
        );
        if (!hasMatchingDegree) return false;
      }

      // Year of passing filter
      if (appliedFilters.yearOfPassing) {
        const hasMatchingYear = student.education.some(
          (edu) => edu.yearOfPassing.toString() === appliedFilters.yearOfPassing
        );
        if (!hasMatchingYear) return false;
      }

      // Gender filter
      if (appliedFilters.gender && student.gender !== appliedFilters.gender) {
        return false;
      }

      // Minimum percentage filter
      if (appliedFilters.minPercentage) {
        const hasMinPercentage = student.education.some(
          (edu) => edu.percentage >= parseFloat(appliedFilters.minPercentage)
        );
        if (!hasMinPercentage) return false;
      }

      // Certificates filter
      if (appliedFilters.certificates.length > 0) {
        const hasMatchingCertificates = appliedFilters.certificates.some(
          (cert) => student.certificates.includes(cert)
        );
        if (!hasMatchingCertificates) return false;
      }

      return true;
    });
  }, [students, appliedFilters]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleMultiSelectFilter = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter((item) => item !== value)
        : [...prev[filterType], value],
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      skills: [],
      degree: "",
      yearOfPassing: "",
      gender: "",
      minPercentage: "",
      certificates: [],
    });
    setAppliedFilters({
      search: "",
      skills: [],
      degree: "",
      yearOfPassing: "",
      gender: "",
      minPercentage: "",
      certificates: [],
    });
  };

  const applyFilters = () => {
    setAppliedFilters({ ...filters });
  };

  const activeFiltersCount = Object.values(filters).filter((value) =>
    Array.isArray(value) ? value.length > 0 : value !== ""
  ).length;

  const appliedFiltersCount = Object.values(appliedFilters).filter((value) =>
    Array.isArray(value) ? value.length > 0 : value !== ""
  ).length;

  const hasUnappliedChanges =
    JSON.stringify(filters) !== JSON.stringify(appliedFilters);

  const StudentCard = ({ student }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-foreground">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{student.name}</h2>
            <p className="text-blue-100 text-sm">ID: {student.id}</p>
            <p className="text-blue-100 text-sm">
              Applied: {student.applicationDate}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <Mail className="w-4 h-4" />
            <span className="text-sm">{student.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Phone className="w-4 h-4" />
            <span className="text-sm">{student.phone}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">
              {student.dob} ({student.gender})
            </span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm truncate">{student.address}</span>
          </div>
        </div>

        {/* Education */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-800">Education</h3>
          </div>
          {student.education.map((edu, index) => (
            <div key={index} className="text-sm text-gray-600">
              <p className="font-medium">
                {edu.degree} in {edu.branch}
              </p>
              <p>{edu.institute}</p>
              <p>
                Year: {edu.yearOfPassing} | Percentage: {edu.percentage}%
              </p>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Code className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-gray-800">Skills</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {student.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <ExternalLink className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-gray-800">Best Projects</h3>
          </div>
          <div className="space-y-2">
            {student.bestproject.map((project, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-purple-50 rounded-lg p-2"
              >
                <span className="text-sm font-medium text-purple-800">
                  {project.title}
                </span>
                <ExternalLink className="w-4 h-4 text-purple-600 cursor-pointer hover:text-purple-800" />
              </div>
            ))}
          </div>
        </div>

        {/* Certificates */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Award className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-gray-800">Certificates</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {student.certificates.map((cert, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t pt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={() => handleAction("Check Match", student)}
              className="bg-primary hover:opacity-90 text-foreground text-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-1"
            >
              <span>Check Match</span>
            </button>
            <button
              onClick={() => handleAction("Hire", student)}
              className="bg-green-600 hover:bg-green-700 text-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-1"
            >
              <span>Hire</span>
            </button>
            <button
              onClick={() => handleAction("Request Prepare", student)}
              className="bg-primary hover:opacity-90 text-foreground text-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-1"
            >
              <span>Request Prepare</span>
            </button>
            <button
              onClick={() => handleAction("More Info", student)}
              className="bg-gray-600 hover:bg-gray-700 text-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-1"
            >
              <FileText className="w-4 h-4" />
              <span>More Info</span>
            </button>
          </div>
        </div>

        {/* Resume Link */}
        <div className="text-center">
          <a
            href={student.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
          >
            <FileText className="w-4 h-4" />
            <span>View Resume</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );

  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen transition-colors duration-300 py-8 px-4 ${
      isDarkMode 
        ? "bg-[#0a0614] text-white" 
        : "bg-gradient-to-br from-purple-50/60 via-white to-indigo-50/50 text-stone-900"
    }`}>
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">
            Student Profiles Dashboard
          </h1>
          <p className={isDarkMode ? "text-purple-300/80" : "text-stone-600"}>
            Manage student applications and profiles
          </p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className={`rounded-xl shadow-lg p-6 border ${
          isDarkMode ? 'bg-[#130c24] border-[#2c1c4d]' : 'bg-white border-purple-100'
        }`}>
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, skills, degree, or institute..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  isDarkMode 
                    ? 'bg-stone-900 border-stone-700 text-white placeholder-stone-400' 
                    : 'bg-stone-50 border-stone-200 text-stone-900 placeholder-stone-400'
                }`}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                showFilters
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
              {appliedFiltersCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {appliedFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="border-t pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Skills Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills
                  </label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {allSkills.map((skill) => (
                      <label
                        key={skill}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          checked={filters.skills.includes(skill)}
                          onChange={() =>
                            handleMultiSelectFilter("skills", skill)
                          }
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Degree Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Degree
                  </label>
                  <select
                    value={filters.degree}
                    onChange={(e) =>
                      handleFilterChange("degree", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Degrees</option>
                    {allDegrees.map((degree) => (
                      <option key={degree} value={degree}>
                        {degree}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Year of Passing Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year of Passing
                  </label>
                  <select
                    value={filters.yearOfPassing}
                    onChange={(e) =>
                      handleFilterChange("yearOfPassing", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Years</option>
                    {allYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Gender Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    value={filters.gender}
                    onChange={(e) =>
                      handleFilterChange("gender", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Genders</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                {/* Minimum Percentage Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Percentage
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 80"
                    min="0"
                    max="100"
                    value={filters.minPercentage}
                    onChange={(e) =>
                      handleFilterChange("minPercentage", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Certificates Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Certificates
                  </label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {allCertificates.map((cert) => (
                      <label key={cert} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={filters.certificates.includes(cert)}
                          onChange={() =>
                            handleMultiSelectFilter("certificates", cert)
                          }
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{cert}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Clear Filters and Apply Filters Buttons */}
              <div className="flex justify-between items-center">
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                    <span>Clear All Filters</span>
                  </button>
                )}

                <div className="flex items-center space-x-4 ml-auto">
                  {hasUnappliedChanges && (
                    <span className="text-sm text-purple-600 font-medium bg-purple-50 px-3 py-1 rounded-full">
                      Changes not applied
                    </span>
                  )}
                  <button
                    onClick={() => {
                      applyFilters();
                    }}
                    disabled={!hasUnappliedChanges}
                    className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                      hasUnappliedChanges
                        ? "bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredStudents.length} of {students.length} students
          </div>
        </div>
      </div>

      {/* Student Cards Grid */}
      <div className="max-w-7xl mx-auto">
        {filteredStudents.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredStudents.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <User className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No students found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}
      </div>

      {/* Stats Summary */}
      <div className="max-w-7xl mx-auto mt-12">
        <div className={`rounded-xl shadow-lg p-6 border ${
          isDarkMode ? 'bg-[#130c24] border-[#2c1c4d] text-white' : 'bg-white border-purple-100 text-gray-800'
        }`}>
          <h2 className="text-xl font-bold mb-4">
            Application Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className={`text-center p-4 rounded-lg ${isDarkMode ? 'bg-blue-950/40' : 'bg-blue-50'}`}>
              <div className="text-2xl font-bold text-blue-600">
                {filteredStudents.length}
              </div>
              <div className="text-sm opacity-85">Filtered Results</div>
            </div>
            <div className={`text-center p-4 rounded-lg ${isDarkMode ? 'bg-green-950/40' : 'bg-green-50'}`}>
              <div className="text-2xl font-bold text-green-600">
                {
                  filteredStudents.filter((s) => s.experience === "Fresher")
                    .length
                }
              </div>
              <div className="text-sm opacity-85">Freshers</div>
            </div>
            <div className={`text-center p-4 rounded-lg ${isDarkMode ? 'bg-purple-950/40' : 'bg-purple-50'}`}>
              <div className="text-2xl font-bold text-purple-600">
                {filteredStudents.reduce((acc, s) => acc + s.skills.length, 0)}
              </div>
              <div className="text-sm opacity-85">Total Skills</div>
            </div>
            <div className={`text-center p-4 rounded-lg ${isDarkMode ? 'bg-fuchsia-950/40' : 'bg-fuchsia-50'}`}>
              <div className="text-2xl font-bold text-fuchsia-600">
                {filteredStudents.reduce(
                  (acc, s) => acc + s.certificates.length,
                  0
                )}
              </div>
              <div className="text-sm opacity-85">Certificates</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfilesPage;
