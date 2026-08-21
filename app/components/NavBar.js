"use client";
import { ChevronDown, Menu, X, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import ThemeToggle from "./ThemeToggle";
import { useUser, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRefs = useRef([]);
  const { isDarkMode } = useContext(ThemeContext);
  const pathname = usePathname();
  
  // Real Clerk auth from hooks
  const { isSignedIn } = useUser();

  const menuItems = [
    {
      name: "Career Planning",
      submenu: [
        { name: "Department Roles", href: "/careerplanning?page=DepartmentJobRoles" },
        { name: "Role Selection", href: "/careerplanning/checkcareer" },
        { name: "Role Roadmap", href: "/careerplanning?page=RoleRoadMap" },
      ],
    },
    {
      name: "Learn",
      submenu: [
        { name: "Explore Courses", href: "/learn?page=CoursesExplore" },
        { name: "Career Roadmaps", href: "/learn?page=Roadmaps" },
        { name: "Real Company Projects", href: "/learn?page=RealCompanyProjects" },
        { name: "Industry Certifications", href: "/learn?page=IndustryCertifications" },
      ],
    },
    {
      name: "Preparation",
      submenu: [
        { name: "Mock Interview", href: "/preparation/mockinterview" },
        { name: "Assessment Portal", href: "/preparation" },
        { name: "Soft Skills", href: "/preparation/softskill" },
        { name: "Coding Round", href: "/preparation/codinground" },
      ],
    },
    {
      name: "Company",
      submenu: [
        { name: "Hiring Platforms", href: "/company/hiring-platforms" },
        { name: "Superset Drives", href: "https://joinsuperset.com", external: true },
        { name: "Internship Platforms", href: "/company/internship-platforms" },
        { name: "Hiring Challenges", href: "/company/hiring-challenges" },
        { name: "MNC Career Portals", href: "/company/mnc-careers" },
        { name: "Startup Database", href: "https://drive.google.com/drive/folders/1kpMh9S6pEgfMMD2UOSeAmgx9Y-0HYFoj", external: true },
        { name: "Remote Hiring", href: "https://docs.google.com/spreadsheets/d/1m8zZ3Rz2LMwe707XfN9SkDG89AP5W1QE/edit?usp=drivesdk", external: true },
      ],
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRefs.current.every((ref) => ref && !ref.contains(event.target))
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleMobileMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <nav className="sticky top-0 z-50 transition-all duration-300 glass-nav shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Branding */}
          <Link
            href="/"
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={handleLinkClick}
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-violet-500 p-0.5 shadow-md group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
              <div className="w-full h-full rounded-[14px] bg-white dark:bg-[#130c24] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <span className="text-2xl sm:text-3xl font-black tracking-tight text-stone-900 dark:text-white">
              CareerPilot <span className="bg-gradient-to-r from-purple-600 via-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">AI</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href={"/"}
              className={`text-base font-bold transition-all duration-200 py-2 relative group ${
                pathname === "/" 
                  ? "text-purple-600 dark:text-purple-400" 
                  : "text-stone-700 hover:text-purple-600 dark:text-stone-300 dark:hover:text-purple-400"
              }`}
            >
              <span>Home</span>
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300 ${
                pathname === "/" ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </Link>

            {menuItems.map((item, index) => (
              <div
                key={item.name}
                className="relative"
                ref={(el) => (dropdownRefs.current[index] = el)}
                onMouseEnter={() => setActiveDropdown(index)}
              >
                <button
                  className={`flex items-center space-x-1.5 text-base font-bold transition-all duration-200 py-2 ${
                    activeDropdown === index
                      ? "text-purple-600 dark:text-purple-400"
                      : "text-stone-700 hover:text-purple-600 dark:text-stone-300 dark:hover:text-purple-400"
                  }`}
                  onClick={() => handleDropdownToggle(index)}
                >
                  <span>{item.name}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === index ? "rotate-180 text-purple-600 dark:text-purple-400" : "text-stone-400"
                    }`}
                  />
                </button>

                {/* Desktop Dropdown */}
                {activeDropdown === index && (
                  <div
                    className={`absolute top-full left-0 mt-2 w-64 shadow-2xl py-3 px-2 rounded-2xl border animate-in fade-in slide-in-from-top-2 duration-200 ${
                      isDarkMode
                        ? "bg-[#130c24]/95 backdrop-blur-xl border-[#2c1c4d] shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
                        : "bg-white/95 backdrop-blur-xl border-purple-100 shadow-[0_20px_40px_rgba(124,58,237,0.15)]"
                    }`}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.submenu.map((subItem) => (
                      subItem.external ? (
                        <a
                          key={subItem.name}
                          href={subItem.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 text-stone-700 dark:text-stone-300 hover:bg-purple-50 dark:hover:bg-purple-950/50 hover:text-purple-600 dark:hover:text-purple-400 hover:translate-x-1"
                          onClick={handleLinkClick}
                        >
                          {subItem.name}
                        </a>
                      ) : (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 text-stone-700 dark:text-stone-300 hover:bg-purple-50 dark:hover:bg-purple-950/50 hover:text-purple-600 dark:hover:text-purple-400 hover:translate-x-1"
                          onClick={handleLinkClick}
                        >
                          {subItem.name}
                        </Link>
                      )
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Controls */}
            <div className="flex items-center space-x-4 pl-4 border-l border-purple-200 dark:border-stone-800">
              <ThemeToggle />
              
              {!isSignedIn ? (
                <div className="flex items-center space-x-3">
                  <SignInButton mode="modal">
                    <button className="px-5 py-2.5 rounded-xl text-base font-bold transition-all duration-200 text-stone-700 dark:text-stone-300 hover:text-purple-600 dark:hover:text-white hover:bg-purple-50 dark:hover:bg-stone-800 cursor-pointer">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="btn-shimmer px-6 py-2.5 rounded-xl text-base font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 text-white shadow-md hover:shadow-purple-500/50 hover:scale-105 active:scale-95 transition-all cursor-pointer">
                      Sign Up
                    </button>
                  </SignUpButton>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/dashboard"
                    className="px-5 py-2.5 rounded-xl text-base font-bold bg-purple-50 text-purple-700 hover:bg-purple-100 dark:bg-purple-950/60 dark:text-purple-300 dark:hover:bg-purple-900/60 transition-all duration-200"
                  >
                    Dashboard
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              className="p-2.5 rounded-xl transition-all duration-200 text-stone-700 dark:text-white bg-purple-50 dark:bg-stone-800 hover:bg-purple-100 dark:hover:bg-stone-700 cursor-pointer"
              onClick={handleMobileMenuToggle}
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`md:hidden border-t animate-in slide-in-from-top duration-300 ${
          isDarkMode
            ? "bg-[#0a0614] border-[#2c1c4d] shadow-2xl"
            : "bg-white border-purple-100 shadow-xl"
        }`}>
          <div className="px-4 py-5 space-y-4 max-h-[85vh] overflow-y-auto">
            <Link
              href="/"
              className={`block px-4 py-3 rounded-xl text-base font-bold transition-all ${
                pathname === "/"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                  : "text-stone-800 dark:text-stone-200 hover:bg-purple-50 dark:hover:bg-stone-800"
              }`}
              onClick={handleLinkClick}
            >
              Home
            </Link>

            {menuItems.map((item, index) => (
              <div
                key={item.name}
                className={`rounded-xl border overflow-hidden ${
                  isDarkMode ? "border-stone-800 bg-stone-900/40" : "border-purple-100 bg-purple-50/40"
                }`}
              >
                <button
                  className="flex items-center justify-between w-full p-4 text-base font-bold text-left transition-colors text-stone-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400"
                  onClick={() => handleDropdownToggle(index)}
                >
                  <span>{item.name}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      activeDropdown === index ? "rotate-180 text-purple-600 dark:text-purple-400" : "text-stone-400"
                    }`}
                  />
                </button>

                {/* Mobile Dropdown */}
                {activeDropdown === index && (
                  <div className="px-4 pb-3 space-y-1.5 border-t border-purple-100 dark:border-stone-800">
                    {item.submenu.map((subItem) => (
                      subItem.external ? (
                        <a
                          key={subItem.name}
                          href={subItem.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block py-2 px-3 rounded-lg text-sm font-semibold text-stone-700 dark:text-stone-300 hover:text-purple-600 hover:bg-white dark:hover:bg-stone-800"
                          onClick={handleLinkClick}
                        >
                          {subItem.name}
                        </a>
                      ) : (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block py-2 px-3 rounded-lg text-sm font-semibold text-stone-700 dark:text-stone-300 hover:text-purple-600 hover:bg-white dark:hover:bg-stone-800"
                          onClick={handleLinkClick}
                        >
                          {subItem.name}
                        </Link>
                      )
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Mobile Authentication */}
            <div className="pt-4 border-t border-purple-100 dark:border-stone-800">
              {!isSignedIn ? (
                <div className="flex gap-3">
                  <SignInButton mode="modal">
                    <button className="flex-1 py-3 rounded-xl text-base font-bold transition-colors text-stone-700 dark:text-stone-200 border border-purple-200 dark:border-stone-700 hover:bg-purple-50 dark:hover:bg-stone-800">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="flex-1 py-3 rounded-xl text-base font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 text-white shadow-md">
                      Sign Up
                    </button>
                  </SignUpButton>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link
                    href="/dashboard"
                    className="block w-full text-center py-3 rounded-xl text-base font-bold bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300"
                    onClick={handleLinkClick}
                  >
                    Dashboard
                  </Link>
                  <div className="flex justify-center pt-1">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
