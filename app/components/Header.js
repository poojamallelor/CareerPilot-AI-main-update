"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { DataCompanyMenu, DatamegaMenuData } from "../data/MegaMenu";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const megaMenuData = DatamegaMenuData;
// Company dropdown menu data
const companyMenuData = DataCompanyMenu;

// Shared mega menu component
const MegaMenuContent = ({ isMobile = false, onLinkClick }) => (
  <div className="p-6">
    <div
      className={`grid gap-6 ${
        isMobile ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 md:grid-cols-5 "
      }`}
    >
      {megaMenuData.map((section, index) => (
        <div key={index}>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {section.title}
          </h3>
          <ul className="space-y-2">
            {section.items.map((item, itemIndex) => (
              <li key={itemIndex}>
                <Link
                  href={item.href}
                  className="text-gray-600 hover:text-indigo-600 block py-1 transition-colors"
                  onClick={onLinkClick}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

// Company dropdown menu component
const CompanyDropdownMenu = ({ isMobile = false, onLinkClick }) => (
  <div
    className={`${
      isMobile
        ? "bg-gray-50 rounded-md mt-2 pl-4 pr-2 pb-2"
        : "bg-white rounded-lg shadow-lg border border-gray-200 p-4"
    }`}
  >
    <ul className="space-y-2">
      {companyMenuData.map((item, index) => (
        <li key={index}>
          <Link
            href={item.href}
            className="text-gray-600 hover:text-indigo-600 block py-2 transition-colors"
            onClick={onLinkClick}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isCompanyMenuOpen, setIsCompanyMenuOpen] = useState(false);
  const megaMenuRef = useRef(null);
  const servicesRef = useRef(null);
  const companyMenuRef = useRef(null);
  const companyRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Close other menus when mobile menu is toggled
    if (!isMenuOpen) {
      setIsMegaMenuOpen(false);
      setIsCompanyMenuOpen(false);
    }
  };

  const toggleMegaMenu = () => {
    setIsMegaMenuOpen(!isMegaMenuOpen);
    setIsCompanyMenuOpen(false); // Close company menu when opening services
  };

  const toggleCompanyMenu = () => {
    setIsCompanyMenuOpen(!isCompanyMenuOpen);
    setIsMegaMenuOpen(false); // Close services menu when opening company
  };

  const closeMegaMenu = () => {
    setIsMegaMenuOpen(false);
  };

  const closeCompanyMenu = () => {
    setIsCompanyMenuOpen(false);
  };

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsMegaMenuOpen(false);
    setIsCompanyMenuOpen(false);
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Handle services mega menu
      if (
        megaMenuRef.current &&
        !megaMenuRef.current.contains(event.target) &&
        servicesRef.current &&
        !servicesRef.current.contains(event.target)
      ) {
        setIsMegaMenuOpen(false);
      }

      // Handle company dropdown menu
      if (
        companyMenuRef.current &&
        !companyMenuRef.current.contains(event.target) &&
        companyRef.current &&
        !companyRef.current.contains(event.target)
      ) {
        setIsCompanyMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeAllMenus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div
              className="flex items-center cursor-pointer"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              <span className="text-xl md:text-2xl font-bold text-indigo-600">
                CareerLaunch
                <span className="text-gray-600 font-normal text-xs md:text-sm ml-1">
                  Beta
                </span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
              <Link
                href="/home"
                className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/students?page=AuthPortal"
                className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
              >
                For Student
              </Link>

              {/* For Company with Dropdown */}
              <div className="relative" ref={companyRef}>
                <button
                  onClick={toggleCompanyMenu}
                  className="flex items-center text-gray-700 hover:text-indigo-600 font-medium transition-colors"
                  aria-expanded={isCompanyMenuOpen}
                  aria-haspopup="true"
                >
                  For Company
                  <svg
                    className={`ml-1 h-4 w-4 transform transition-transform ${
                      isCompanyMenuOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Desktop Company Dropdown */}
                {isCompanyMenuOpen && (
                  <div
                    ref={companyMenuRef}
                    className="absolute top-full left-0 mt-2 w-64 z-50"
                  >
                    <CompanyDropdownMenu onLinkClick={closeCompanyMenu} />
                  </div>
                )}
              </div>

              {/* Services with Mega Menu */}
              <div className="relative" ref={servicesRef}>
                <button
                  onClick={toggleMegaMenu}
                  className="flex items-center text-gray-700 hover:text-indigo-600 font-medium transition-colors"
                  aria-expanded={isMegaMenuOpen}
                  aria-haspopup="true"
                >
                  Services
                  <svg
                    className={`ml-1 h-4 w-4 transform transition-transform ${
                      isMegaMenuOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Desktop Mega Menu Dropdown */}
                {isMegaMenuOpen && (
                  <div
                    ref={megaMenuRef}
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-screen max-w-4xl bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                  >
                    <MegaMenuContent onLinkClick={closeMegaMenu} />
                  </div>
                )}
              </div>

              <Link
                href="/job-board"
                className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
              >
                Job Board
              </Link>
              <Link
                href="/home/about"
                className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
              >
                About Us
              </Link>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
                    Log In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-indigo-600 text-primary-foreground px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors mr-2">
                  Dashboard
                </Link>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => {
                  toggleMenu();
                }}
                className="text-gray-500 hover:text-indigo-600 focus:outline-none focus:text-indigo-600 transition-colors"
                aria-label="Toggle mobile menu"
                aria-expanded={isMenuOpen}
              >
                {!isMenuOpen ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/home"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition-colors"
                onClick={closeAllMenus}
              >
                Home
              </Link>
              <Link
                href="/students?page=AuthPortal"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition-colors"
                onClick={closeAllMenus}
              >
                For Student
              </Link>

              {/* Mobile For Company Menu */}
              <div className="px-3 py-2">
                <button
                  onClick={toggleCompanyMenu}
                  className="flex items-center justify-between w-full text-base font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                  aria-expanded={isCompanyMenuOpen}
                >
                  For Company
                  <svg
                    className={`h-4 w-4 transform transition-transform ${
                      isCompanyMenuOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Mobile Company Dropdown */}
                {isCompanyMenuOpen && (
                  <CompanyDropdownMenu
                    isMobile={true}
                    onLinkClick={closeAllMenus}
                  />
                )}
              </div>

              {/* Mobile Services Menu */}
              <div className="px-3 py-2">
                <button
                  onClick={() => {
                    toggleMegaMenu();
                  }}
                  className="flex items-center justify-between w-full text-base font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                  aria-expanded={isMegaMenuOpen}
                >
                  Services
                  <svg
                    className={`h-4 w-4 transform transition-transform ${
                      isMegaMenuOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Mobile Services Dropdown */}
                {isMegaMenuOpen && (
                  <div className="mt-2 pl-4 pr-2 pb-2 bg-gray-50 rounded-md">
                    <MegaMenuContent
                      isMobile={true}
                      onLinkClick={closeAllMenus}
                    />
                  </div>
                )}
              </div>

              <Link
                href="/job-board"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition-colors"
                onClick={closeAllMenus}
              >
                Job Board
              </Link>
              <Link
                href="/home/about"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition-colors"
                onClick={closeAllMenus}
              >
                About Us
              </Link>
            </div>

            {/* Mobile Auth Buttons */}
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex flex-col items-center justify-center space-y-4 px-4">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button 
                      className="text-gray-700 hover:text-indigo-600 font-medium text-base px-3 py-2 transition-colors w-full text-center"
                      onClick={closeAllMenus}
                    >
                      Log In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button 
                      className="bg-indigo-600 text-primary-foreground px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors text-base w-full text-center"
                      onClick={closeAllMenus}
                    >
                      Sign Up
                    </button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <Link 
                    href="/dashboard" 
                    className="text-gray-700 hover:text-indigo-600 font-medium text-base px-3 py-2 transition-colors w-full text-center"
                    onClick={closeAllMenus}
                  >
                    Dashboard
                  </Link>
                  <div className="flex justify-center w-full pt-2">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </SignedIn>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export default Header;
