'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  Code, 
  MessageSquare, 
  TrendingUp, 
  Award,
  Calendar,
  Target,
  CheckCircle,
  Activity,
  Briefcase
} from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { getActivities, getStats } from '@/lib/tracking';

export default function DashboardPage() {
  const { isLoaded, isSignedIn, user: clerkUser } = useUser();
  
  const [user, setUser] = useState({
    name: 'Career Pilot User',
    level: 'Beginner',
    completedTasks: 0,
    totalTasks: 20,
    streak: 0
  });

  const [stats, setStats] = useState({
    interviewsCompleted: 0,
    codesWritten: 0,
    skillsLearned: 0,
    certificatesEarned: 0
  });

  const [recentActivities, setRecentActivities] = useState([]);

  const upcomingTasks = [
    { id: 1, title: 'Take a Mock Interview', dueDate: 'Soon', priority: 'high', link: '/preparation/mockinterview' },
    { id: 2, title: 'Explore Job Roles', dueDate: 'Anytime', priority: 'medium', link: '/careerplanning?page=DepartmentJobRoles' },
    { id: 3, title: 'Start Coding Practice', dueDate: 'Anytime', priority: 'low', link: '/preparation/codinground' }
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedStats = getStats();
      const activities = getActivities();
      
      const interviewsCompleted = storedStats.interviews || 0;
      const codesWritten = storedStats.codes || 0;
      const skillsLearned = storedStats.roadmaps || 0;
      const certificates = storedStats.courses || 0;
      
      setStats({
        interviewsCompleted,
        codesWritten,
        skillsLearned,
        certificatesEarned: certificates
      });
      
      if (activities.length === 0) {
        setRecentActivities([{ id: 1, title: 'Welcome to CareerPilot AI', type: 'profile', time: 'Just now', link: '#' }]);
      } else {
        setRecentActivities(activities.slice(0, 5));
      }
      
      const totalProgress = (interviewsCompleted + codesWritten + skillsLearned + certificates);
      setUser(prev => ({
        ...prev,
        completedTasks: totalProgress,
        streak: totalProgress > 0 ? Math.min(Math.ceil(totalProgress/2), 7) : 0,
        level: totalProgress > 10 ? 'Advanced' : totalProgress > 5 ? 'Intermediate' : 'Beginner'
      }));
    }
  }, []);

  useEffect(() => {
    if (clerkUser) {
      setUser(prev => ({
        ...prev,
        name: clerkUser.firstName || clerkUser.fullName || 'Career Pilot User'
      }));
    }
  }, [clerkUser]);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      redirect('/');
    }
  }, [isSignedIn, isLoaded]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary"></div>
      </div>
    );
  }

  if (!isSignedIn) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const StatCard = ({ title, value, icon: Icon, colorClass }) => (
    <motion.div variants={itemVariants} className="card p-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className="text-muted-foreground text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
        </div>
        <div className={`p-4 rounded-xl ${colorClass}`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="card p-8 mb-8 bg-gradient-to-r from-primary/10 via-background to-accent/5 border-l-4 border-l-primary relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
            <div>
              <h1 className="text-4xl font-extrabold text-foreground mb-2">
                Welcome back, <span className="text-primary">{user.name}</span> 👋
              </h1>
              <p className="text-muted-foreground text-lg">
                Ready to advance your career today? You are currently a <span className="font-semibold text-accent">{user.level}</span>.
              </p>
            </div>
            <div className="flex items-center gap-4 bg-background/80 backdrop-blur-md p-4 rounded-xl border border-border shadow-sm">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{user.streak} day streak</div>
                <div className="text-sm text-muted-foreground font-medium">Keep the momentum going!</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Interviews Completed" value={stats.interviewsCompleted} icon={MessageSquare} colorClass="bg-purple-500" />
          <StatCard title="Codes Written" value={stats.codesWritten} icon={Code} colorClass="bg-indigo-500" />
          <StatCard title="Roadmaps Explored" value={stats.skillsLearned} icon={Briefcase} colorClass="bg-fuchsia-500" />
          <StatCard title="Courses Completed" value={stats.certificatesEarned} icon={Award} colorClass="bg-violet-500" />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (Progress & Actions) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Card */}
            <motion.div variants={itemVariants} className="card p-8">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-bold text-foreground">Learning Progress</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <span className="text-muted-foreground font-medium block">Overall Completion</span>
                    <span className="text-sm text-muted-foreground">{user.completedTasks} of {user.totalTasks} milestones achieved</span>
                  </div>
                  <span className="text-primary font-bold text-xl">{Math.min(100, Math.round((user.completedTasks / user.totalTasks) * 100))}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-4 overflow-hidden">
                  <motion.div 
                    className="bg-gradient-to-r from-primary to-accent h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (user.completedTasks / user.totalTasks) * 100)}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={itemVariants} className="card p-8">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-bold text-foreground">Quick Actions</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { title: 'Mock Interview', icon: MessageSquare, href: '/preparation/mockinterview', color: 'text-blue-500', bg: 'bg-blue-500/10' },
                  { title: 'Code Practice', icon: Code, href: '/preparation/codinground', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                  { title: 'Learn Skills', icon: BookOpen, href: '/learn?page=CoursesExplore', color: 'text-purple-500', bg: 'bg-purple-500/10' },
                  { title: 'Career Plan', icon: Target, href: '/careerplanning?page=RoleRoadMap', color: 'text-purple-500', bg: 'bg-purple-500/10' }
                ].map((action, idx) => (
                  <Link href={action.href} key={idx}>
                    <div className="flex flex-col items-center justify-center p-6 rounded-2xl border border-border bg-card hover:bg-secondary transition-all hover:-translate-y-1 hover:shadow-md h-full text-center group cursor-pointer">
                      <div className={`p-4 rounded-full ${action.bg} ${action.color} mb-3 group-hover:scale-110 transition-transform`}>
                        <action.icon className="w-6 h-6" />
                      </div>
                      <span className="font-semibold text-sm text-foreground">{action.title}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column (Activity & Tasks) */}
          <div className="space-y-8">
            {/* Recent Activity */}
            <motion.div variants={itemVariants} className="card p-6 h-[400px] flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold text-foreground">Recent Activity</h3>
              </div>
              <div className="space-y-4 overflow-y-auto flex-1 pr-2 custom-scrollbar">
                {recentActivities.map((activity, idx) => (
                  <Link href={activity.link || '#'} key={idx}>
                    <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-secondary transition-colors group cursor-pointer border border-transparent hover:border-border">
                      <div className="relative mt-1">
                        <div className="w-3 h-3 bg-primary rounded-full ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all"></div>
                        {idx !== recentActivities.length - 1 && <div className="absolute top-4 left-1.5 w-[2px] h-10 bg-border"></div>}
                      </div>
                      <div className="flex-1">
                        <div className="text-foreground font-semibold text-sm">{activity.title}</div>
                        <div className="text-muted-foreground text-xs font-medium mt-1">
                          {new Date(activity.time).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' })}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
                {recentActivities.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">No recent activity found.</div>
                )}
              </div>
            </motion.div>

            {/* Upcoming Tasks */}
            <motion.div variants={itemVariants} className="card p-6">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold text-foreground">Next Steps</h3>
              </div>
              <div className="space-y-3">
                {upcomingTasks.map((task) => (
                  <Link href={task.link} key={task.id}>
                    <div className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-secondary transition-colors cursor-pointer group">
                      <div className={`w-3 h-3 rounded-full shrink-0 ${
                        task.priority === 'high' ? 'bg-red-500' :
                        task.priority === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}></div>
                      <div className="flex-1 overflow-hidden">
                        <div className="text-foreground font-semibold text-sm truncate">{task.title}</div>
                        <div className="text-muted-foreground text-xs mt-1">Due: {task.dueDate}</div>
                      </div>
                      <CheckCircle className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
          
        </div>
      </motion.div>
    </div>
  );
}