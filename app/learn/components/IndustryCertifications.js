"use client";
import React, { useState, useContext } from "react";
import { ThemeContext } from "../../components/ThemeContext";
import { 
  Award, 
  CheckCircle, 
  Clock, 
  Star, 
  TrendingUp, 
  Users, 
  BookOpen,
  ExternalLink,
  Play
} from "lucide-react";

const IndustryCertifications = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [selectedCategory, setSelectedCategory] = useState("cloud");
  const [enrolledCerts, setEnrolledCerts] = useState(new Set());

  const certificationCategories = {
    cloud: {
      title: "Cloud Computing",
      icon: "☁️",
      color: "blue",
      certifications: [
        {
          id: "aws-saa",
          title: "AWS Solutions Architect Associate",
          provider: "Amazon Web Services",
          level: "Associate",
          duration: "3-4 months",
          rating: 4.8,
          students: 125000,
          price: "$150",
          skills: ["AWS Architecture", "EC2", "S3", "VPC", "Security"],
          description: "Design and deploy scalable, highly available systems on AWS",
          examCode: "SAA-C03",
          validity: "3 years"
        },
        {
          id: "azure-fundamentals",
          title: "Microsoft Azure Fundamentals",
          provider: "Microsoft",
          level: "Fundamental",
          duration: "1-2 months",
          rating: 4.7,
          students: 98000,
          price: "$99",
          skills: ["Azure Services", "Cloud Concepts", "Security", "Pricing"],
          description: "Understand cloud concepts and Azure services fundamentals",
          examCode: "AZ-900",
          validity: "No expiration"
        },
        {
          id: "gcp-ace",
          title: "Google Cloud Associate Engineer",
          provider: "Google Cloud",
          level: "Associate",
          duration: "2-3 months",
          rating: 4.6,
          students: 87000,
          price: "$125",
          skills: ["GCP Services", "Compute Engine", "Kubernetes", "BigQuery"],
          description: "Deploy applications and monitor operations on Google Cloud",
          examCode: "Associate Cloud Engineer",
          validity: "2 years"
        }
      ]
    },
    development: {
      title: "Software Development",
      icon: "💻",
      color: "green",
      certifications: [
        {
          id: "oracle-java",
          title: "Oracle Certified Professional Java Developer",
          provider: "Oracle",
          level: "Professional",
          duration: "4-6 months",
          rating: 4.9,
          students: 156000,
          price: "$245",
          skills: ["Java 11", "OOP", "Collections", "Concurrency", "JVM"],
          description: "Master Java programming with enterprise-level expertise",
          examCode: "1Z0-819",
          validity: "No expiration"
        },
        {
          id: "microsoft-dotnet",
          title: "Microsoft .NET Developer Certification",
          provider: "Microsoft",
          level: "Associate",
          duration: "3-4 months",
          rating: 4.7,
          students: 89000,
          price: "$165",
          skills: ["C#", ".NET Core", "ASP.NET", "Entity Framework"],
          description: "Build modern applications using .NET framework",
          examCode: "AZ-204",
          validity: "2 years"
        },
        {
          id: "python-institute",
          title: "Python Institute PCPP Certification",
          provider: "Python Institute",
          level: "Professional",
          duration: "2-3 months",
          rating: 4.5,
          students: 73000,
          price: "$195",
          skills: ["Advanced Python", "OOP", "GUI", "Network Programming"],
          description: "Advanced Python programming for professional development",
          examCode: "PCPP-32-101",
          validity: "Lifetime"
        }
      ]
    },
    data: {
      title: "Data & Analytics",
      icon: "📊",
      color: "purple",
      certifications: [
        {
          id: "aws-data-analytics",
          title: "AWS Certified Data Analytics Specialty",
          provider: "Amazon Web Services",
          level: "Specialty",
          duration: "4-5 months",
          rating: 4.8,
          students: 67000,
          price: "$300",
          skills: ["Data Lakes", "Analytics", "Machine Learning", "Visualization"],
          description: "Design and implement AWS data analytics solutions",
          examCode: "DAS-C01",
          validity: "3 years"
        },
        {
          id: "google-data-engineer",
          title: "Google Cloud Professional Data Engineer",
          provider: "Google Cloud",
          level: "Professional",
          duration: "3-4 months",
          rating: 4.7,
          students: 45000,
          price: "$200",
          skills: ["BigQuery", "Dataflow", "Pub/Sub", "ML Models"],
          description: "Design and build data processing systems on GCP",
          examCode: "Professional Data Engineer",
          validity: "2 years"
        },
        {
          id: "tableau-desktop",
          title: "Tableau Desktop Certified Associate",
          provider: "Tableau",
          level: "Associate",
          duration: "2-3 months",
          rating: 4.6,
          students: 92000,
          price: "$250",
          skills: ["Data Visualization", "Analytics", "Dashboards", "Calculations"],
          description: "Create compelling data visualizations and dashboards",
          examCode: "Desktop Certified Associate",
          validity: "2 years"
        }
      ]
    },
    security: {
      title: "Cybersecurity",
      icon: "🔒",
      color: "red",
      certifications: [
        {
          id: "cissp",
          title: "Certified Information Systems Security Professional",
          provider: "ISC2",
          level: "Expert",
          duration: "6-8 months",
          rating: 4.9,
          students: 134000,
          price: "$749",
          skills: ["Security Architecture", "Risk Management", "Cryptography"],
          description: "Industry gold standard for information security professionals",
          examCode: "CISSP",
          validity: "3 years"
        },
        {
          id: "ceh",
          title: "Certified Ethical Hacker",
          provider: "EC-Council",
          level: "Professional",
          duration: "3-4 months",
          rating: 4.7,
          students: 98000,
          price: "$1199",
          skills: ["Penetration Testing", "Vulnerability Assessment", "Network Security"],
          description: "Learn ethical hacking techniques and security testing",
          examCode: "312-50",
          validity: "3 years"
        }
      ]
    }
  };

  const handleEnroll = (certId) => {
    setEnrolledCerts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(certId)) {
        newSet.delete(certId);
      } else {
        newSet.add(certId);
      }
      return newSet;
    });
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-500 text-blue-500 border-blue-500",
      green: "bg-green-500 text-green-500 border-green-500", 
      purple: "bg-purple-500 text-purple-500 border-purple-500",
      red: "bg-red-500 text-red-500 border-red-500"
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8 ${
      isDarkMode 
        ? "bg-[#0a0614] text-white" 
        : "bg-gradient-to-br from-purple-50/60 via-white to-indigo-50/50 text-stone-900"
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Industry-Leading{" "}
            <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
              Certifications
            </span>
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-purple-300/80' : 'text-stone-600'}`}>
            Earn recognized certifications from top tech companies and validate your skills with 
            industry-standard credentials that employers trust worldwide.
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(certificationCategories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`flex items-center space-x-3 px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 border-2 ${
                selectedCategory === key
                  ? "bg-purple-600 text-white border-purple-600 shadow-lg"
                  : isDarkMode 
                    ? "bg-[#130c24] text-purple-300 border-[#2c1c4d] hover:border-purple-500/50"
                    : "bg-white text-gray-700 border-gray-200 hover:border-purple-300"
              }`}
            >
              <span className="text-xl">{category.icon}</span>
              <span>{category.title}</span>
            </button>
          ))}
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {certificationCategories[selectedCategory].certifications.map((cert) => (
            <div
              key={cert.id}
              className={`rounded-2xl shadow-xl border p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${
                isDarkMode ? 'bg-[#130c24] border-[#2c1c4d]' : 'bg-white border-purple-100'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-purple-600/10 text-purple-500">
                  <Award className="w-8 h-8" />
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  cert.level === "Expert" ? "bg-red-100 text-red-700" :
                  cert.level === "Professional" ? "bg-purple-100 text-purple-700" :
                  cert.level === "Associate" ? "bg-blue-100 text-blue-700" :
                  "bg-green-100 text-green-700"
                }`}>
                  {cert.level}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
              <p className="opacity-80 mb-4">{cert.provider}</p>
              <p className="text-sm opacity-70 mb-6">{cert.description}</p>

              {/* Stats */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold">{cert.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-purple-500" />
                  <span className="text-sm opacity-70">{cert.students.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-purple-500" />
                  <span className="text-sm opacity-70">{cert.duration}</span>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold opacity-85 mb-3">Skills You'll Learn:</h4>
                <div className="flex flex-wrap gap-2">
                  {cert.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded-lg text-xs ${
                        isDarkMode ? 'bg-purple-950/40 text-purple-300' : 'bg-purple-50 text-purple-700'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className={`px-2 py-1 rounded-lg text-xs ${
                      isDarkMode ? 'bg-purple-950/20 text-purple-300/80' : 'bg-purple-50 text-purple-600'
                    }`}>
                      +{cert.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Exam Details */}
              <div className="border-t border-stone-250 dark:border-stone-850 pt-4 mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="opacity-60">Exam Code:</span>
                    <div className="font-semibold">{cert.examCode}</div>
                  </div>
                  <div>
                    <span className="opacity-60">Validity:</span>
                    <div className="font-semibold">{cert.validity}</div>
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold">{cert.price}</span>
                  <span className="opacity-60 text-sm ml-1">USD</span>
                </div>
                <button
                  onClick={() => handleEnroll(cert.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 flex items-center space-x-2 ${
                    enrolledCerts.has(cert.id)
                      ? "bg-green-600 text-white"
                      : "bg-purple-600 text-white hover:bg-purple-700 shadow-md hover:shadow-purple-500/25"
                  }`}
                >
                  {enrolledCerts.has(cert.id) ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Enrolled</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>Enroll</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className={`rounded-3xl shadow-xl p-12 border ${
            isDarkMode ? 'bg-[#130c24] border-[#2c1c4d]' : 'bg-white border-purple-100'
          }`}>
            <h2 className="text-3xl font-bold mb-4">
              Ready to Get Certified?
            </h2>
            <p className={`text-xl mb-8 max-w-2xl mx-auto ${isDarkMode ? 'text-purple-300/85' : 'text-stone-600'}`}>
              Join thousands of professionals who have advanced their careers with industry-recognized certifications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-600 via-indigo-600 to-fuchsia-600 text-white px-8 py-4 rounded-full font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                <span>View All Certifications</span>
                <ExternalLink className="w-4 h-4" />
              </button>
              <button className={`px-8 py-4 rounded-full font-semibold transition-all flex items-center justify-center space-x-2 ${
                isDarkMode 
                  ? 'bg-purple-950/40 text-purple-300 hover:bg-purple-950/60' 
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
              }`}>
                <span>Schedule Consultation</span>
                <BookOpen className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryCertifications;