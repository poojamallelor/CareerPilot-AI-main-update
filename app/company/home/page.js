// This is the Companies homepage component for a hiring platform
// File: app/companies/page.jsx

"use client";

import { useState } from "react";
import {
  ChevronRight,
  Users,
  Briefcase,
  Award,
  CheckCircle,
  Search,
  Star,
  Building,
  GraduationCap,
} from "lucide-react";

export default function CompaniesHomePage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the submission logic here
    alert(`Request demo submitted with: ${email}`);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Hire top quality</span>
              <span className="block text-blue-600">skilled students</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg md:mt-5 md:text-xl">
              Connect with pre-vetted, highly skilled students from top
              universities. Find the perfect talent to help your company grow.
            </p>
            <div className="mt-8 sm:flex">
              <div className="rounded-md shadow">
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-foreground bg-primary hover:opacity-90 text-foreground md:py-4 md:text-lg md:px-10"
                >
                  Post a Job
                </a>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 mt-10 lg:mt-0">
            <img
              className="w-full rounded-lg shadow-xl"
              src="/hiring.png"
              alt="Hiring platform illustration"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-1 text-3xl font-extrabold text-gray-900 sm:text-4xl sm:tracking-tight">
              Why choose TalentBridge?
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              We streamline your hiring process with pre-vetted candidates and
              powerful tools.
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                        <Users className="h-6 w-6 text-foreground" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      Quality Candidates
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      Access to pre-vetted students with verified skills and
                      background checks.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                        <Briefcase className="h-6 w-6 text-foreground" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      Simplified Hiring
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      Streamlined process that reduces time-to-hire by up to
                      75%.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                        <Award className="h-6 w-6 text-foreground" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      Skill Matching
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      Advanced algorithms match students with your specific
                      requirements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">
              Process
            </h2>
            <p className="mt-1 text-3xl font-extrabold text-gray-900 sm:text-4xl sm:tracking-tight">
              How it works
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Four simple steps to find your ideal candidates
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-foreground">
                  <span className="font-bold text-lg">1</span>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  Create a company profile
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  Tell us about your company and what makes it a great place to
                  work.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-foreground">
                  <span className="font-bold text-lg">2</span>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  Post your opportunities
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  Specify the roles, skills, and qualifications you're looking
                  for.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-foreground">
                  <span className="font-bold text-lg">3</span>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  Review matched candidates
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  Browse profiles of pre-vetted students who match your
                  requirements.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-foreground">
                  <span className="font-bold text-lg">4</span>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  Connect and hire
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  Schedule interviews and extend offers through our platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">
              Testimonials
            </h2>
            <p className="mt-1 text-3xl font-extrabold text-gray-900 sm:text-4xl sm:tracking-tight">
              Trusted by leading companies
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <Building className="h-12 w-12 text-blue-500" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-gray-900">TechCorp</h4>
                  <div className="flex text-yellow-400">
                    <Star className="h-5 w-5" />
                    <Star className="h-5 w-5" />
                    <Star className="h-5 w-5" />
                    <Star className="h-5 w-5" />
                    <Star className="h-5 w-5" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "TalentBridge helped us find exceptional student developers who
                brought fresh perspectives to our projects. The quality of
                candidates exceeded our expectations."
              </p>
              <p className="mt-4 font-medium">— Sarah Johnson, HR Director</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <Building className="h-12 w-12 text-blue-500" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-gray-900">
                    GrowthStartup
                  </h4>
                  <div className="flex text-yellow-400">
                    <Star className="h-5 w-5" />
                    <Star className="h-5 w-5" />
                    <Star className="h-5 w-5" />
                    <Star className="h-5 w-5" />
                    <Star className="h-5 w-5" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "As a fast-growing startup, we needed talent quickly. The
                platform's matching algorithm connected us with perfect-fit
                interns who hit the ground running."
              </p>
              <p className="mt-4 font-medium">— Michael Chen, Founder</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <Building className="h-12 w-12 text-blue-500" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-gray-900">
                    InnovateDesign
                  </h4>
                  <div className="flex text-yellow-400">
                    <Star className="h-5 w-5" />
                    <Star className="h-5 w-5" />
                    <Star className="h-5 w-5" />
                    <Star className="h-5 w-5" />
                    <Star className="h-5 w-5" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "The pre-vetting process saved us countless hours of screening.
                We found creative design students who brought innovative ideas
                to our brand refresh project."
              </p>
              <p className="mt-4 font-medium">
                — Alex Rivera, Creative Director
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
              Trusted by companies and students everywhere
            </h2>
            <p className="mt-3 text-xl text-blue-200 sm:mt-4">
              Our platform connects qualified students with opportunities at
              leading companies.
            </p>
          </div>
          <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
            <div className="flex flex-col">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-blue-200">
                Companies
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-foreground">
                1,000+
              </dd>
            </div>
            <div className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-blue-200">
                Students
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-foreground">
                50,000+
              </dd>
            </div>
            <div className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-blue-200">
                Placements
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-foreground">
                25,000+
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to find your next hire?</span>
            <span className="block text-blue-600">Get started today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-foreground bg-primary hover:opacity-90 text-foreground"
              >
                Post a Job
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50"
              >
                Request Demo
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="px-6 py-6 bg-blue-700 rounded-lg md:py-12 md:px-12 lg:py-16 lg:px-16 xl:flex xl:items-center">
            <div className="xl:w-0 xl:flex-1">
              <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                Want to stay updated on hiring trends?
              </h2>
              <p className="mt-3 max-w-3xl text-lg leading-6 text-blue-200">
                Sign up for our newsletter to receive tips, insights, and
                updates.
              </p>
            </div>
            <div className="mt-8 sm:w-full sm:max-w-md xl:mt-0 xl:ml-8">
              <form onSubmit={handleSubmit} className="sm:flex">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-3 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs border-gray-300 rounded-md"
                  placeholder="Enter your email"
                />
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center py-3 px-5 border border-transparent text-base font-medium rounded-md text-foreground bg-primary hover:opacity-90 text-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
              <p className="mt-3 text-sm text-blue-200">
                We care about your data. Read our{" "}
                <a href="#" className="text-foreground font-medium underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <nav
            className="-mx-5 -my-2 flex flex-wrap justify-center"
            aria-label="Footer"
          >
            <div className="px-5 py-2">
              <a
                href="#"
                className="text-base text-gray-500 hover:text-gray-900"
              >
                About
              </a>
            </div>

            <div className="px-5 py-2">
              <a
                href="#"
                className="text-base text-gray-500 hover:text-gray-900"
              >
                Blog
              </a>
            </div>

            <div className="px-5 py-2">
              <a
                href="#"
                className="text-base text-gray-500 hover:text-gray-900"
              >
                Jobs
              </a>
            </div>

            <div className="px-5 py-2">
              <a
                href="#"
                className="text-base text-gray-500 hover:text-gray-900"
              >
                Partners
              </a>
            </div>

            <div className="px-5 py-2">
              <a
                href="#"
                className="text-base text-gray-500 hover:text-gray-900"
              >
                Press
              </a>
            </div>

            <div className="px-5 py-2">
              <a
                href="#"
                className="text-base text-gray-500 hover:text-gray-900"
              >
                Privacy
              </a>
            </div>

            <div className="px-5 py-2">
              <a
                href="#"
                className="text-base text-gray-500 hover:text-gray-900"
              >
                Terms
              </a>
            </div>
          </nav>
          <div className="mt-8 flex justify-center space-x-6">
            {/* Social Links would go here */}
          </div>
          <p className="mt-8 text-center text-base text-gray-400">
            &copy; 2025 TalentBridge, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
