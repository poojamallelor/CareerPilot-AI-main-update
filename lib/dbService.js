import { and, desc, eq } from 'drizzle-orm';
import { db } from './db.js';
import {
  chatHistory,
  interviewSessions,
  jobApplications,
  learningProgress,
  savedJobs,
  users
} from './schema.js';

// User operations
export const userService = {
  // Create a new user
  async createUser(userData) {
    try {
      const [user] = await db.insert(users).values(userData).returning();
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // Get user by email
  async getUserByEmail(email) {
    try {
      const [user] = await db.select().from(users).where(eq(users.email, email));
      return user;
    } catch (error) {
      console.error('Error getting user by email:', error);
      throw error;
    }
  },

  // Get user by ID
  async getUserById(id) {
    try {
      const [user] = await db.select().from(users).where(eq(users.id, id));
      return user;
    } catch (error) {
      console.error('Error getting user by ID:', error);
      throw error;
    }
  },

  // Update user
  async updateUser(id, userData) {
    try {
      const [user] = await db.update(users)
        .set({ ...userData, updatedAt: new Date() })
        .where(eq(users.id, id))
        .returning();
      return user;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
};

// Chat operations
export const chatService = {
  // Save chat message
  async saveChatMessage(userId, sessionId, message, role) {
    try {
      const [chatMessage] = await db.insert(chatHistory).values({
        userId,
        sessionId,
        message,
        role
      }).returning();
      return chatMessage;
    } catch (error) {
      console.error('Error saving chat message:', error);
      throw error;
    }
  },

  // Get chat history
  async getChatHistory(userId, sessionId, limit = 50) {
    try {
      const messages = await db.select()
        .from(chatHistory)
        .where(and(eq(chatHistory.userId, userId), eq(chatHistory.sessionId, sessionId)))
        .orderBy(desc(chatHistory.timestamp))
        .limit(limit);
      return messages.reverse(); // Return in chronological order
    } catch (error) {
      console.error('Error getting chat history:', error);
      throw error;
    }
  }
};

// Job operations
export const jobService = {
  // Save a job
  async saveJob(userId, jobData) {
    try {
      const [savedJob] = await db.insert(savedJobs).values({
        userId,
        jobId: jobData.id,
        jobTitle: jobData.title,
        company: jobData.company?.display_name || jobData.company,
        jobData
      }).returning();
      return savedJob;
    } catch (error) {
      console.error('Error saving job:', error);
      throw error;
    }
  },

  // Get saved jobs
  async getSavedJobs(userId) {
    try {
      const jobs = await db.select()
        .from(savedJobs)
        .where(eq(savedJobs.userId, userId))
        .orderBy(desc(savedJobs.savedAt));
      return jobs;
    } catch (error) {
      console.error('Error getting saved jobs:', error);
      throw error;
    }
  },

  // Track job application
  async trackApplication(userId, applicationData) {
    try {
      const [application] = await db.insert(jobApplications).values({
        userId,
        ...applicationData
      }).returning();
      return application;
    } catch (error) {
      console.error('Error tracking application:', error);
      throw error;
    }
  },

  // Get job applications
  async getApplications(userId) {
    try {
      const applications = await db.select()
        .from(jobApplications)
        .where(eq(jobApplications.userId, userId))
        .orderBy(desc(jobApplications.appliedDate));
      return applications;
    } catch (error) {
      console.error('Error getting applications:', error);
      throw error;
    }
  }
};

// Learning progress operations
export const learningService = {
  // Update learning progress
  async updateProgress(userId, courseId, courseName, progress, completed = false) {
    try {
      // Check if progress exists
      const [existing] = await db.select()
        .from(learningProgress)
        .where(and(eq(learningProgress.userId, userId), eq(learningProgress.courseId, courseId)));

      if (existing) {
        // Update existing progress
        const [updated] = await db.update(learningProgress)
          .set({
            progress,
            completed,
            lastAccessed: new Date()
          })
          .where(and(eq(learningProgress.userId, userId), eq(learningProgress.courseId, courseId)))
          .returning();
        return updated;
      } else {
        // Create new progress entry
        const [created] = await db.insert(learningProgress).values({
          userId,
          courseId,
          courseName,
          progress,
          completed
        }).returning();
        return created;
      }
    } catch (error) {
      console.error('Error updating learning progress:', error);
      throw error;
    }
  },

  // Get learning progress
  async getProgress(userId) {
    try {
      const progress = await db.select()
        .from(learningProgress)
        .where(eq(learningProgress.userId, userId))
        .orderBy(desc(learningProgress.lastAccessed));
      return progress;
    } catch (error) {
      console.error('Error getting learning progress:', error);
      throw error;
    }
  }
};

// Interview operations
export const interviewService = {
  // Save interview session
  async saveSession(userId, sessionData) {
    try {
      const [session] = await db.insert(interviewSessions).values({
        userId,
        ...sessionData
      }).returning();
      return session;
    } catch (error) {
      console.error('Error saving interview session:', error);
      throw error;
    }
  },

  // Get interview sessions
  async getSessions(userId) {
    try {
      const sessions = await db.select()
        .from(interviewSessions)
        .where(eq(interviewSessions.userId, userId))
        .orderBy(desc(interviewSessions.completedAt));
      return sessions;
    } catch (error) {
      console.error('Error getting interview sessions:', error);
      throw error;
    }
  }
};
