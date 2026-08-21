import { boolean, integer, jsonb, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').unique().notNull(),
  name: text('name').notNull(),
  password: text('password'),
  provider: text('provider').default('email'), // 'email', 'google', etc.
  profileImage: text('profile_image'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// User profiles for career data
export const userProfiles = pgTable('user_profiles', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  currentRole: text('current_role'),
  targetRole: text('target_role'),
  experience: text('experience'),
  skills: jsonb('skills'), // Array of skills
  education: jsonb('education'), // Education details
  preferences: jsonb('preferences'), // User preferences
  resumeUrl: text('resume_url'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Chat history
export const chatHistory = pgTable('chat_history', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  sessionId: text('session_id').notNull(),
  message: text('message').notNull(),
  role: text('role').notNull(), // 'user' or 'assistant'
  timestamp: timestamp('timestamp').defaultNow(),
});

// Job applications tracking
export const jobApplications = pgTable('job_applications', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  jobTitle: text('job_title').notNull(),
  company: text('company').notNull(),
  status: text('status').default('applied'), // 'applied', 'interview', 'rejected', 'accepted'
  appliedDate: timestamp('applied_date').defaultNow(),
  notes: text('notes'),
  jobUrl: text('job_url'),
});

// Learning progress
export const learningProgress = pgTable('learning_progress', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  courseId: text('course_id').notNull(),
  courseName: text('course_name').notNull(),
  progress: integer('progress').default(0), // percentage
  completed: boolean('completed').default(false),
  lastAccessed: timestamp('last_accessed').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Interview sessions
export const interviewSessions = pgTable('interview_sessions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  sessionType: text('session_type').notNull(), // 'mock', 'technical', 'behavioral'
  questions: jsonb('questions'), // Array of questions and answers
  score: integer('score'),
  feedback: text('feedback'),
  duration: integer('duration'), // in minutes
  completedAt: timestamp('completed_at').defaultNow(),
});

// Saved jobs
export const savedJobs = pgTable('saved_jobs', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  jobId: text('job_id').notNull(),
  jobTitle: text('job_title').notNull(),
  company: text('company').notNull(),
  jobData: jsonb('job_data'), // Complete job information
  savedAt: timestamp('saved_at').defaultNow(),
});
