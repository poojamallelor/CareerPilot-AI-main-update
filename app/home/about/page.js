// pages/about.js
"use client";
import { useState } from "react";
import Head from "next/head";
import {
  Users,
  Globe,
  Target,
  Heart,
  Award,
  Clock,
  Building,
  BookOpen,
  MessageSquare,
  Mail,
} from "lucide-react";
import Image from "next/image";
import ContactForm from "./components/ContactForm";

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState("mission");

  // Team member data
  const teamMembers = [
    {
      name: "Nikhil Kandhare",
      role: "Developer",
      image: "/dev.jpg",
      bio: "Former HR executive with 15+ years experience connecting students with career opportunities. Founded CareerLaunch to bridge the education-employment gap.",
      linkedin: "#",
    },
    {
      name: "Saraswati Adkine",
      role: "Developer",
      image: "/dev2.jpg",
      bio: "Tech industry veteran passionate about using AI and data science to create personalized career paths for students.",
      linkedin: "#",
    },
    {
      name: "Ajiknya Nishane",
      role: "Frontend Developer",
      image: "/dev3.jpg",
      bio: "Former university career counselor dedicated to creating stronger connections between academic institutions and employers.",
      linkedin: "#",
    },
    {
      name: "Pooja Kale",
      role: "Documentation Lead",
      image: "/dev4.png",
      bio: "Experienced recruiter focused on helping companies discover diverse, talented students ready to contribute from day one.",
      linkedin: "#",
    },
    {
      name: "Ankita Warkhade",
      role: "Tester",
      image: "/pro2.jpg",
      bio: "Career coach with expertise in helping students identify their strengths and navigate the transition from academics to professional work.",
      linkedin: "#",
    },
    {
      name: "Janavi Khawale",
      role: "Tester",
      image: "/pro1.jpg",
      bio: "Marketing strategist with a passion for telling student success stories and building community around career development.",
      linkedin: "#",
    },
  ];

  // Partner logos
  const partners = [
    { name: "TechCorp", logo: "https://via.placeholder.com/150x60" },
    { name: "Global University", logo: "https://via.placeholder.com/150x60" },
    { name: "Finance Partners", logo: "https://via.placeholder.com/150x60" },
    { name: "Healthcare Systems", logo: "https://via.placeholder.com/150x60" },
    { name: "Creative Studios", logo: "https://via.placeholder.com/150x60" },
    { name: "Manufacturing Inc", logo: "https://via.placeholder.com/150x60" },
  ];

  // Values data
  const values = [
    {
      icon: <Users className="w-8 h-8 text-indigo-600" />,
      title: "Student-Centered",
      description:
        "We put students' needs and goals at the center of everything we do.",
    },
    {
      icon: <Heart className="w-8 h-8 text-indigo-600" />,
      title: "Inclusivity",
      description:
        "We're committed to making career opportunities accessible to all students.",
    },
    {
      icon: <Target className="w-8 h-8 text-indigo-600" />,
      title: "Impact-Driven",
      description:
        "We measure our success by the career outcomes of the students we serve.",
    },
    {
      icon: <Globe className="w-8 h-8 text-indigo-600" />,
      title: "Innovation",
      description:
        "We continuously evolve our approach to meet the changing needs of the job market.",
    },
  ];

  // Timeline data
  const timeline = [
    {
      year: "august 2024",
      title: "The Beginning",
      description:
        "CareerLaunch was founded with a mission to bridge the gap between education and employment.",
    },
    {
      year: "September 2024",
      title: "AI Integration",
      description:
        "Introduced AI-powered career guidance and personalized learning path recommendations.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>About Us | CareerLaunch</title>
        <meta
          name="description"
          content="Learn more about CareerLaunch - our mission, team, and commitment to helping students launch successful careers."
        />
      </Head>

      {/* Header Section */}
      <div className="bg-indigo-700 text-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              About CareerLaunch
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100">
              We're on a mission to transform how students discover, prepare
              for, and launch their ideal careers.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto py-4 scrollbar-hide">
            {["mission", "team", "values", "story", "partners"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap px-5 py-2 font-medium rounded-md mr-2 transition ${
                  activeTab === tab
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-600 hover:text-indigo-600"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mission Section */}
        {activeTab === "mission" && (
          <div className="space-y-16">
            {/* Mission Statement */}
            <div className="md:flex items-center gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Our Mission
                </h2>
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  At CareerLaunch, we believe every student deserves a clear
                  path from education to meaningful employment.
                </p>
                <p className="text-gray-600 mb-6">
                  We're dedicated to empowering students with the tools,
                  resources, and connections they need to discover their
                  professional passions, develop industry-relevant skills, and
                  launch rewarding careers aligned with their unique talents and
                  goals.
                </p>
                <p className="text-gray-600">
                  By building bridges between educational institutions and
                  employers, we're creating an ecosystem where students can
                  seamlessly transition from learning to earning, and where
                  employers can find talented, well-prepared graduates ready to
                  contribute from day one.
                </p>
              </div>
              <div className="md:w-1/2 mt-8 md:mt-0">
                <Image
                  src={"/student.jpg"}
                  width={500}
                  height={500}
                  alt="Students collaborating"
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
            </div>

            {/* Vision */}
            <div className="md:flex items-center gap-12 flex-row-reverse">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Our Vision
                </h2>
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  We envision a world where no student graduates wondering
                  "what's next?"
                </p>
                <p className="text-gray-600 mb-6">
                  We're working toward a future where the transition from
                  education to employment is transparent, accessible, and
                  efficient for students of all backgrounds. We see a world
                  where talent is distributed equally, and opportunity is too.
                </p>
                <p className="text-gray-600">
                  Through technology, personalization, and human connection,
                  we're creating pathways to successful careers for every
                  student, regardless of their starting point.
                </p>
              </div>
              <div className="md:w-1/2 mt-8 md:mt-0">
                <Image
                  src="/mentor.png"
                  width={500}
                  height={500}
                  alt="Student working with mentor"
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
            </div>

            {/* Impact Stats */}
            <div className="bg-indigo-50 rounded-xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Our Impact
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <p className="text-4xl font-bold text-indigo-600 mb-2">
                    10,000+
                  </p>
                  <p className="text-gray-700">Students Placed</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-indigo-600 mb-2">
                    500+
                  </p>
                  <p className="text-gray-700">Employer Partners</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-indigo-600 mb-2">85%</p>
                  <p className="text-gray-700">Placement Rate</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-indigo-600 mb-2">30+</p>
                  <p className="text-gray-700">Career Pathways</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Team Section */}
        {activeTab === "team" && (
          <div>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Meet Our Team
              </h2>
              <p className="text-xl text-gray-600">
                We're a diverse group of educators, technologists, and industry
                experts passionate about connecting students with rewarding
                careers.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
                >
                  <div className="flex flex-col items-center text-center">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={200}
                      height={200}
                      className="rounded-full mb-4 object-cover"
                    />
                    <h3 className="text-xl font-bold text-gray-900">
                      {member.name}
                    </h3>
                    <p className="text-indigo-600 font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 mb-4">{member.bio}</p>
                    <a
                      href={member.linkedin}
                      className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
                    >
                      Connect on LinkedIn
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Join Our Team CTA */}
            <div className="bg-indigo-50 rounded-xl p-8 mt-16 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Join Our Team
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                Passionate about helping students launch successful careers?
                We're always looking for talented individuals to join our
                mission.
              </p>
              <a
                href="#"
                className="inline-block bg-indigo-600 text-foreground px-6 py-3 rounded-md hover:bg-indigo-700 transition font-medium"
              >
                View Open Positions
              </a>
            </div>
          </div>
        )}

        {/* Values Section */}
        {activeTab === "values" && (
          <div>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Core Values
              </h2>
              <p className="text-xl text-gray-600">
                These principles guide every aspect of our work and define our
                approach to supporting students.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm p-8 border border-gray-200"
                >
                  <div className="bg-indigo-50 rounded-full p-4 inline-block mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-lg text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>

            {/* Approach Section */}
            <div className="mt-20">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Our Approach
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <div className="bg-indigo-50 p-4 rounded-full inline-block mb-6">
                    <BookOpen className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Data-Driven Guidance
                  </h3>
                  <p className="text-gray-600">
                    We combine industry insights, employment trends, and student
                    feedback to create personalized guidance that leads to
                    real-world success.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <div className="bg-indigo-50 p-4 rounded-full inline-block mb-6">
                    <MessageSquare className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Human Connection
                  </h3>
                  <p className="text-gray-600">
                    While we leverage technology, we never lose sight of the
                    importance of human mentorship, coaching, and community in
                    career development.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <div className="bg-indigo-50 p-4 rounded-full inline-block mb-6">
                    <Award className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Continuous Improvement
                  </h3>
                  <p className="text-gray-600">
                    We are constantly refining our platform and approaches based
                    on student outcomes and feedback from our employer partners.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Story/History Section */}
        {activeTab === "story" && (
          <div>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Story
              </h2>
              <p className="text-xl text-gray-600">
                The journey from a simple idea to empowering thousands of
                students around the world.
              </p>
            </div>

            {/* Founder Story */}
            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200 mb-16">
              <div className="md:flex gap-8 items-center">
                <div className="md:w-1/3 mb-6 md:mb-0">
                  <img
                    src="/dev.jpg"
                    alt="Nikhil Kandhare, Founder"
                    className="rounded-lg shadow w-full h-auto"
                  />
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    A Personal Mission
                  </h3>
                  <p className="text-gray-600 mb-4">
                    CareerLaunch began with our founder Nikhil Kandhare's
                    personal experience navigating the challenging transition
                    from college to career. After witnessing too many talented
                    peers struggle to find meaningful work despite their
                    education, she became determined to create a better way.
                  </p>
                  <p className="text-gray-600 mb-4">
                    "I saw the disconnect between what students were learning
                    and what employers were seeking. The talent was there, but
                    the pathways weren't clear," Nikhil explains.
                  </p>
                  <p className="text-gray-600">
                    With a background in both education and HR technology,
                    Nikhil assembled a team of experts who shared her vision: to
                    create personalized career journeys that would guide
                    students from their studies to successful employment.
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Our Journey
            </h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-indigo-200"></div>

              {/* Timeline events */}
              <div className="space-y-12">
                {timeline.map((event, index) => (
                  <div
                    key={index}
                    className={`relative flex flex-col md:flex-row ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className="md:w-1/2 mb-8 md:mb-0"></div>
                    <div className="absolute left-0 md:left-1/2 transform -translate-y-1/4 md:-translate-x-1/2 w-12 h-12 rounded-full bg-indigo-600 border-4 border-white flex items-center justify-center text-foreground font-bold z-10">
                      {index + 1}
                    </div>
                    <div
                      className={`md:w-1/2 bg-white rounded-lg shadow-sm p-6 border border-gray-200 relative ${
                        index % 2 === 0 ? "md:ml-12" : "md:mr-12"
                      }`}
                    >
                      <div className="mb-2 flex items-center">
                        <span className="text-indigo-600 font-bold mr-2">
                          {event.year}
                        </span>
                        <h4 className="text-lg font-bold text-gray-900">
                          {event.title}
                        </h4>
                      </div>
                      <p className="text-gray-600">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Partners Section */}
        {activeTab === "partners" && (
          <div>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Partners
              </h2>
              <p className="text-xl text-gray-600">
                We collaborate with leading organizations to create
                opportunities for students.
              </p>
            </div>

            {/* Universities */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                Universities
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                {partners.map((partner, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center justify-center h-24"
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-w-full max-h-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Employers */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                Employers
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                {partners.map((partner, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center justify-center h-24"
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-w-full max-h-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Partner With Us CTA */}
            <div className="bg-indigo-600 rounded-xl p-8 text-foreground text-center">
              <h3 className="text-2xl font-bold mb-4">Become a Partner</h3>
              <p className="text-indigo-100 max-w-2xl mx-auto mb-6">
                Join our network of universities and employers committed to
                helping students launch successful careers. Together, we can
                bridge the gap between education and employment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#"
                  className="bg-white text-indigo-600 px-6 py-3 rounded-md hover:bg-indigo-50 transition font-medium"
                >
                  For Universities
                </a>
                <a
                  href="#"
                  className="bg-indigo-800 text-foreground px-6 py-3 rounded-md hover:bg-indigo-700 transition font-medium"
                >
                  For Employers
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Contact Section */}
      <ContactForm />

      {/* Footer would go here - import from your main layout */}
    </div>
  );
}
