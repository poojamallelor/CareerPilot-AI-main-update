"use client";
import React, { useState } from "react";
import {
  BarChart3,
  Users,
  TrendingUp,
  Video,
  BookOpen,
  Calendar,
  FileText,
  UserCheck,
  Bell,
  Settings,
  HelpCircle,
  Award,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Home,
  Activity,
  UserPlus,
  Clock,
  Play,
  Folder,
  PieChart,
  Send,
  Phone,
  Star,
  Plus,
} from "lucide-react";

const AdminSidebar = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

  const toggleExpanded = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const menuItems = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: Home,
      subItems: [
        { id: "overview", title: "Overview", icon: BarChart3 },
        { id: "metrics", title: "Key Metrics", icon: Activity },
        { id: "active-students", title: "Active Students", icon: Users },
      ],
    },
    {
      id: "students",
      title: "Students Management",
      icon: Users,
      subItems: [
        { id: "view-students", title: "View All Students", icon: Users },
        { id: "add-students", title: "Add/Import Students", icon: UserPlus },
        { id: "activity-logs", title: "Activity Logs", icon: Clock },
        { id: "assign-resources", title: "Assign Resources", icon: Folder },
      ],
    },
    {
      id: "progress",
      title: "Progress Tracking",
      icon: TrendingUp,
      subItems: [
        {
          id: "batch-performance",
          title: "Batch Performance",
          icon: BarChart3,
        },
        {
          id: "individual-reports",
          title: "Individual Reports",
          icon: FileText,
        },
        { id: "completion-stats", title: "Completion Stats", icon: PieChart },
      ],
    },
    {
      id: "interview",
      title: "Interview Practice",
      icon: Video,
      subItems: [
        { id: "mock-interviews", title: "Mock Interviews", icon: Play },
        { id: "feedback-scores", title: "Feedback & Scores", icon: Star },
        { id: "schedule-rounds", title: "Schedule Rounds", icon: Calendar },
      ],
    },
    {
      id: "resources",
      title: "Learning Resources",
      icon: BookOpen,
      subItems: [
        { id: "resource-library", title: "Resource Library", icon: Folder },
        { id: "custom-materials", title: "Custom Materials", icon: Plus },
        { id: "assign-groups", title: "Assign to Groups", icon: UserCheck },
      ],
    },
    {
      id: "guidance",
      title: "Guidance Sessions",
      icon: Phone,
      subItems: [
        { id: "schedule-sessions", title: "Schedule Sessions", icon: Calendar },
        { id: "past-sessions", title: "Past Sessions", icon: Clock },
        { id: "participation", title: "Track Participation", icon: Activity },
      ],
    },
    {
      id: "reports",
      title: "Reports & Analytics",
      icon: FileText,
      subItems: [
        {
          id: "weekly-reports",
          title: "Weekly/Monthly Reports",
          icon: FileText,
        },
        { id: "export-reports", title: "Export Reports", icon: Send },
        {
          id: "engagement-charts",
          title: "Engagement Charts",
          icon: BarChart3,
        },
      ],
    },
    {
      id: "batch-management",
      title: "Batch & Group",
      icon: UserCheck,
      subItems: [
        { id: "create-batches", title: "Create/Manage Batches", icon: Plus },
        { id: "assign-mentors", title: "Assign Mentors", icon: Users },
        {
          id: "batch-messaging",
          title: "Batch Messaging",
          icon: MessageSquare,
        },
      ],
    },
    {
      id: "notifications",
      title: "Noti & Anno",
      icon: Bell,
      subItems: [
        { id: "send-announcements", title: "Send Announcements", icon: Send },
        { id: "sent-messages", title: "Sent Messages", icon: MessageSquare },
        { id: "push-reminders", title: "Push Reminders", icon: Bell },
      ],
    },
    {
      id: "settings",
      title: "Settings",
      icon: Settings,
      subItems: [
        { id: "college-profile", title: "College Profile", icon: Home },
        { id: "login-settings", title: "Login Settings", icon: Settings },
        { id: "permissions", title: "Role & Permissions", icon: UserCheck },
      ],
    },
    {
      id: "support",
      title: "Support",
      icon: HelpCircle,
      subItems: [
        { id: "contact-support", title: "Contact Support", icon: Phone },
        { id: "faqs", title: "FAQs", icon: HelpCircle },
        { id: "ticket-history", title: "Ticket History", icon: FileText },
      ],
    },
  ];

  const optionalItems = [
    {
      id: "placement",
      title: "Placement Tracker",
      icon: Award,
      subItems: [
        { id: "placed-students", title: "Placed Students", icon: Award },
        { id: "placement-data", title: "Upload Data", icon: Plus },
      ],
    },
    {
      id: "feedback",
      title: "Feedback Collection",
      icon: MessageSquare,
      subItems: [
        {
          id: "student-feedback",
          title: "Student Feedback",
          icon: MessageSquare,
        },
        { id: "surveys", title: "Surveys & Forms", icon: FileText },
      ],
    },
    {
      id: "calendar",
      title: "Event Calendar",
      icon: Calendar,
      subItems: [
        { id: "upcoming-events", title: "Upcoming Events", icon: Calendar },
        { id: "schedule-events", title: "Schedule Events", icon: Plus },
      ],
    },
    {
      id: "certifications",
      title: "Certifications",
      icon: Award,
      subItems: [
        { id: "student-certs", title: "Student Certifications", icon: Award },
        {
          id: "verify-completion",
          title: "Verify Completion",
          icon: UserCheck,
        },
      ],
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-lg transition-all duration-300 ${
          sidebarCollapsed ? "w-16" : "w-80"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {!sidebarCollapsed && (
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Interview Platform
              </h1>
              <p className="text-sm text-gray-600">College Admin</p>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {sidebarCollapsed ? (
              <Menu className="w-5 h-5" />
            ) : (
              <X className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {/* Core Sections */}
          <div className={`${!sidebarCollapsed ? "mb-4" : "mb-2"}`}>
            {!sidebarCollapsed && (
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Core Features
              </p>
            )}
            {menuItems.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => {
                    if (item.subItems && !sidebarCollapsed) {
                      toggleExpanded(item.id);
                    } else {
                      setActiveSection(item.id);
                    }
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                    activeSection === item.id ||
                    activeSection.startsWith(item.id)
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5" />
                    {!sidebarCollapsed && (
                      <span className="font-medium">{item.title}</span>
                    )}
                  </div>
                  {!sidebarCollapsed &&
                    item.subItems &&
                    (expandedSections[item.id] ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    ))}
                </button>

                {!sidebarCollapsed &&
                  item.subItems &&
                  expandedSections[item.id] && (
                    <div className="ml-8 mt-2 space-y-1">
                      {item.subItems.map((subItem) => (
                        <button
                          key={subItem.id}
                          onClick={() => setActiveSection(subItem.id)}
                          className={`w-full flex items-center space-x-3 p-2 rounded-lg text-sm transition-colors ${
                            activeSection === subItem.id
                              ? "bg-blue-100 text-blue-700"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          <subItem.icon className="w-4 h-4" />
                          <span>{subItem.title}</span>
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            ))}
          </div>

          {/* Optional Sections */}
          <div
            className={`${
              !sidebarCollapsed ? "pt-4 border-t border-gray-200" : ""
            }`}
          >
            {!sidebarCollapsed && (
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Optional Features
              </p>
            )}
            {optionalItems.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => {
                    if (item.subItems && !sidebarCollapsed) {
                      toggleExpanded(item.id);
                    } else {
                      setActiveSection(item.id);
                    }
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                    activeSection === item.id ||
                    activeSection.startsWith(item.id)
                      ? "bg-purple-50 text-purple-700 border border-purple-200"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5" />
                    {!sidebarCollapsed && (
                      <span className="font-medium">{item.title}</span>
                    )}
                  </div>
                  {!sidebarCollapsed &&
                    item.subItems &&
                    (expandedSections[item.id] ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    ))}
                </button>

                {!sidebarCollapsed &&
                  item.subItems &&
                  expandedSections[item.id] && (
                    <div className="ml-8 mt-2 space-y-1">
                      {item.subItems.map((subItem) => (
                        <button
                          key={subItem.id}
                          onClick={() => setActiveSection(subItem.id)}
                          className={`w-full flex items-center space-x-3 p-2 rounded-lg text-sm transition-colors ${
                            activeSection === subItem.id
                              ? "bg-purple-100 text-purple-700"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          <subItem.icon className="w-4 h-4" />
                          <span>{subItem.title}</span>
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Demo Content Area */}
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Selected: {activeSection.replace("-", " ")}
          </h3>
          <p className="text-gray-600">Click on sidebar items to navigate</p>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
