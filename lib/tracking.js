/**
 * Utility to track user activity in localStorage
 */

export const trackActivity = (title, type, link = "#") => {
  if (typeof window !== "undefined") {
    const activities = JSON.parse(localStorage.getItem("careerpilot_activities") || "[]");
    
    // Add new activity to the beginning
    const newActivity = {
      id: Date.now(),
      title,
      type, // 'interview', 'learning', 'profile', 'coding'
      time: new Date().toISOString(),
      link
    };
    
    const updatedActivities = [newActivity, ...activities].slice(0, 50); // Keep last 50
    localStorage.setItem("careerpilot_activities", JSON.stringify(updatedActivities));
    
    // Update raw stats
    const stats = JSON.parse(localStorage.getItem("careerpilot_stats") || '{"interviews":0, "codes":0, "roadmaps":0, "courses":0}');
    if (type === 'interview') stats.interviews += 1;
    if (type === 'coding') stats.codes += 1;
    if (type === 'profile') stats.roadmaps += 1;
    if (type === 'learning') stats.courses += 1;
    
    localStorage.setItem("careerpilot_stats", JSON.stringify(stats));
  }
};

export const getActivities = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("careerpilot_activities") || "[]");
  }
  return [];
};

export const getStats = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("careerpilot_stats") || '{"interviews":0, "codes":0, "roadmaps":0, "courses":0}');
  }
  return { interviews: 0, codes: 0, roadmaps: 0, courses: 0 };
};
