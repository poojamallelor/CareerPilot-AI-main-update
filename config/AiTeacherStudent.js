// AI Teacher Student configuration for CareerPilot AI
class MockAiModel {
  constructor(name) {
    this.name = name;
  }

  async sendMessage(prompt) {
    console.log(`[${this.name}] Processing prompt`);

    if (prompt.includes('interview')) {
      return {
        response: {
          text: () => JSON.stringify({
            questions: ["Tell me about yourself", "Why this role?", "Your strengths?"]
          })
        }
      };
    }

    return {
      response: {
        text: () => JSON.stringify({
          content: "Mock response for development",
          suggestions: ["Practice more", "Good progress"]
        })
      }
    };
  }
}

// Create a mock instance for development
export const StudentInterview = new MockAiModel('StudentInterview');

export default StudentInterview;
