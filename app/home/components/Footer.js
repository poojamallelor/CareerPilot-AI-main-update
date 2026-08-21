"use client";
import {
  ArrowRight,
  Building,
  Facebook,
  Linkedin,
  Mail,
  Shield,
  Twitter,
  Users
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function Footer() {
  const [hoveredSection, setHoveredSection] = useState(null);
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  const footerSections = [
    {
      title: "Platform",
      links: ["Career Paths", "Job Board", "Resources", "Success Stories"],
      icon: <Building className="w-4 h-4" />,
    },
    {
      title: "Company",
      links: ["About Us", "For Employers", "For Universities", "Contact"],
      icon: <Users className="w-4 h-4" />,
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
      icon: <Shield className="w-4 h-4" />,
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="group">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent mb-4 group-hover:from-pink-400 group-hover:via-purple-400 group-hover:to-indigo-400 transition-all duration-500">
                CareerPilot AI
              </h3>
              <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full group-hover:w-32 transition-all duration-300"></div>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed">
              Bridging the gap between education and employment for students
              worldwide through innovative technology and personalized career
              guidance.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-2xl font-bold text-purple-400">50K+</div>
                <div className="text-xs text-gray-400">Students</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-2xl font-bold text-pink-400">1K+</div>
                <div className="text-xs text-gray-400">Companies</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-2xl font-bold text-indigo-400">95%</div>
                <div className="text-xs text-gray-400">Success Rate</div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 pt-4">
              {[
                { Icon: Facebook, color: "hover:text-blue-400" },
                { Icon: Twitter, color: "hover:text-sky-400" },
                { Icon: Linkedin, color: "hover:text-blue-500" },
                { Icon: Mail, color: "hover:text-purple-400" },
              ].map(({ Icon, color }, index) => (
                <a
                  key={index}
                  href="#"
                  className={`p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gray-400 ${color} hover:bg-white/10 hover:border-white/20 hover:scale-110 transition-all duration-300 group`}
                >
                  <Icon className="w-5 h-5 group-hover:animate-pulse" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Sections */}
          {footerSections.map((section, index) => (
            <div
              key={section.title}
              className="space-y-4"
              onMouseEnter={() => setHoveredSection(index)}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <div className="flex items-center space-x-2 mb-6">
                <div
                  className={`p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-white/10 transition-all duration-300 ${
                    hoveredSection === index ? "scale-110" : ""
                  }`}
                >
                  {section.icon}
                </div>
                <h3 className="font-bold text-foreground text-lg">
                  {section.title}
                </h3>
              </div>

              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-foreground flex items-center group transition-all duration-300 hover:translate-x-2"
                    >
                      <div className="w-1 h-1 bg-purple-400 rounded-full mr-3 group-hover:w-2 group-hover:bg-pink-400 transition-all duration-300"></div>
                      {link}
                      <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Bottom Section */}
        <div className="border-t border-gray-700/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <p className="text-gray-400">
                &copy; {new Date().getFullYear()} CareerPilot AI. All rights reserved.
              </p>
              <div className="hidden md:flex items-center space-x-2 text-gray-500">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">
                  Platform Status: All Systems Operational
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>Made with</span>
              <span className="text-red-400 animate-pulse">❤️</span>
              <span>for students worldwide by Team GCOEY</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
