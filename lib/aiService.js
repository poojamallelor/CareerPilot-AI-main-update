// Real AI Service for CareerPilot AI
import axios from 'axios';

export class AiService {
  constructor(modelName) {
    this.modelName = modelName;
    this.baseURL = '/api/gemini';
  }

  async sendMessage(prompt) {
    try {
      console.log(`[${this.modelName}] Sending request to Gemini API`);

      const response = await axios.post(this.baseURL, {
        prompt: prompt
      });

      if (response.data.success) {
        return {
          response: {
            text: () => response.data.response
          }
        };
      } else {
        throw new Error(response.data.error || 'API request failed');
      }
    } catch (error) {
      console.error(`[${this.modelName}] Error:`, error.message);

      // Return fallback response for better UX
      return {
        response: {
          text: () => this.getFallbackResponse(prompt)
        }
      };
    }
  }

  getFallbackResponse(prompt) {
    const promptLower = prompt.toLowerCase();

    // Job roles JSON fallback
    if (
      promptLower.includes('job roll') ||
      promptLower.includes('job role') ||
      promptLower.includes('job roles') ||
      promptLower.includes('jobroll') ||
      promptLower.includes('jobroles') ||
      promptLower.includes('career roles') ||
      (promptLower.includes('branch') && promptLower.includes('json'))
    ) {
      // Try to extract the branch/department after the word 'branch'
      let dept = 'Engineering';
      const match = /branch\s+([^,.\n]+)/i.exec(prompt || '');
      if (match && match[1]) {
        dept = match[1].trim();
      }

      // Department-specific job roles
      const departmentRoles = {
        'Computer Science and Engineering': [
          {
            Category: 'Software Development',
            Roles: [
              'Full Stack Developer',
              'Backend Developer',
              'Frontend Developer',
              'Mobile App Developer',
              'Software Engineer',
            ],
          },
          {
            Category: 'Data Science & AI',
            Roles: [
              'Data Scientist',
              'Machine Learning Engineer',
              'AI Engineer',
              'Data Engineer',
              'Business Intelligence Analyst',
            ],
          },
          {
            Category: 'DevOps & Cloud',
            Roles: [
              'DevOps Engineer',
              'Cloud Architect',
              'Site Reliability Engineer',
              'System Administrator',
              'Infrastructure Engineer',
            ],
          },
          {
            Category: 'Cybersecurity',
            Roles: [
              'Security Engineer',
              'Penetration Tester',
              'Security Analyst',
              'Cybersecurity Consultant',
              'Information Security Manager',
            ],
          },
        ],
        'Electrical engineering': [
          {
            Category: 'Power Systems',
            Roles: [
              'Power Systems Engineer',
              'Electrical Design Engineer',
              'Grid Engineer',
              'Renewable Energy Engineer',
              'Power Electronics Engineer',
            ],
          },
          {
            Category: 'Electronics & Communication',
            Roles: [
              'Electronics Engineer',
              'RF Engineer',
              'Signal Processing Engineer',
              'Communication Systems Engineer',
              'Embedded Systems Engineer',
            ],
          },
          {
            Category: 'Control Systems',
            Roles: [
              'Control Systems Engineer',
              'Automation Engineer',
              'Instrumentation Engineer',
              'Process Control Engineer',
              'Robotics Engineer',
            ],
          },
          {
            Category: 'Telecommunications',
            Roles: [
              'Telecommunications Engineer',
              'Network Engineer',
              'Wireless Engineer',
              '5G/6G Engineer',
              'Satellite Communications Engineer',
            ],
          },
        ],
        'Mechanical engineering': [
          {
            Category: 'Design & Manufacturing',
            Roles: [
              'Mechanical Design Engineer',
              'Manufacturing Engineer',
              'Product Development Engineer',
              'CAD Engineer',
              'Quality Engineer',
            ],
          },
          {
            Category: 'Automotive',
            Roles: [
              'Automotive Engineer',
              'Engine Design Engineer',
              'Vehicle Dynamics Engineer',
              'Chassis Engineer',
              'Powertrain Engineer',
            ],
          },
          {
            Category: 'Thermal & Energy',
            Roles: [
              'Thermal Engineer',
              'HVAC Engineer',
              'Energy Systems Engineer',
              'Heat Transfer Engineer',
              'Refrigeration Engineer',
            ],
          },
          {
            Category: 'Aerospace',
            Roles: [
              'Aerospace Engineer',
              'Propulsion Engineer',
              'Structural Engineer',
              'Flight Test Engineer',
              'Systems Engineer',
            ],
          },
        ],
        'Civil engineering': [
          {
            Category: 'Structural Engineering',
            Roles: [
              'Structural Engineer',
              'Building Design Engineer',
              'Bridge Engineer',
              'Seismic Engineer',
              'Foundation Engineer',
            ],
          },
          {
            Category: 'Transportation',
            Roles: [
              'Transportation Engineer',
              'Highway Engineer',
              'Traffic Engineer',
              'Railway Engineer',
              'Airport Engineer',
            ],
          },
          {
            Category: 'Water Resources',
            Roles: [
              'Water Resources Engineer',
              'Hydraulic Engineer',
              'Environmental Engineer',
              'Coastal Engineer',
              'Irrigation Engineer',
            ],
          },
          {
            Category: 'Construction Management',
            Roles: [
              'Construction Manager',
              'Project Manager',
              'Site Engineer',
              'Planning Engineer',
              'Quantity Surveyor',
            ],
          },
        ],
        'Electronics and Telecommunication engineering': [
          {
            Category: 'Communication Systems',
            Roles: [
              'Communication Engineer',
              'Telecom Engineer',
              'Network Engineer',
              '5G Engineer',
              'Satellite Engineer',
            ],
          },
          {
            Category: 'Signal Processing',
            Roles: [
              'Signal Processing Engineer',
              'DSP Engineer',
              'Image Processing Engineer',
              'Audio Engineer',
              'Radar Engineer',
            ],
          },
          {
            Category: 'Embedded Systems',
            Roles: [
              'Embedded Systems Engineer',
              'Firmware Engineer',
              'IoT Engineer',
              'Microcontroller Engineer',
              'Hardware Engineer',
            ],
          },
          {
            Category: 'RF & Microwave',
            Roles: [
              'RF Engineer',
              'Microwave Engineer',
              'Antenna Engineer',
              'Wireless Engineer',
              'EMC Engineer',
            ],
          },
        ],
        'Chemical engineering': [
          {
            Category: 'Process Engineering',
            Roles: [
              'Process Engineer',
              'Chemical Process Engineer',
              'Plant Engineer',
              'Production Engineer',
              'Process Safety Engineer',
            ],
          },
          {
            Category: 'Petrochemicals',
            Roles: [
              'Petrochemical Engineer',
              'Refinery Engineer',
              'Oil & Gas Engineer',
              'Pipeline Engineer',
              'Drilling Engineer',
            ],
          },
          {
            Category: 'Pharmaceuticals',
            Roles: [
              'Pharmaceutical Engineer',
              'Bioprocess Engineer',
              'Validation Engineer',
              'Quality Control Engineer',
              'Regulatory Affairs Engineer',
            ],
          },
          {
            Category: 'Environmental',
            Roles: [
              'Environmental Engineer',
              'Waste Treatment Engineer',
              'Air Quality Engineer',
              'Sustainability Engineer',
              'Water Treatment Engineer',
            ],
          },
        ],
      };

      // Add more engineering disciplines and a generic fallback
      const additionalDepartments = {
        'Aerospace engineering': [
          {
            Category: 'Aircraft Design',
            Roles: [
              'Aerodynamics Engineer',
              'Aircraft Design Engineer',
              'Flight Test Engineer',
              'Propulsion Engineer',
              'Avionics Engineer',
            ],
          },
          {
            Category: 'Space Systems',
            Roles: [
              'Spacecraft Engineer',
              'Mission Design Engineer',
              'Satellite Engineer',
              'Launch Systems Engineer',
              'Space Operations Engineer',
            ],
          },
          {
            Category: 'Manufacturing',
            Roles: [
              'Manufacturing Engineer',
              'Quality Engineer',
              'Materials Engineer',
              'Production Engineer',
              'Assembly Engineer',
            ],
          },
        ],
        'Biomedical engineering': [
          {
            Category: 'Medical Devices',
            Roles: [
              'Medical Device Engineer',
              'Biomedical Equipment Technician',
              'Regulatory Affairs Engineer',
              'Clinical Engineer',
              'Product Development Engineer',
            ],
          },
          {
            Category: 'Biotechnology',
            Roles: [
              'Biotechnology Engineer',
              'Tissue Engineer',
              'Genetic Engineer',
              'Bioprocess Engineer',
              'Research Scientist',
            ],
          },
          {
            Category: 'Healthcare Technology',
            Roles: [
              'Healthcare IT Engineer',
              'Medical Software Engineer',
              'Telemedicine Engineer',
              'Health Informatics Specialist',
              'Digital Health Engineer',
            ],
          },
        ],
        'Environmental engineering': [
          {
            Category: 'Water & Wastewater',
            Roles: [
              'Water Treatment Engineer',
              'Wastewater Engineer',
              'Environmental Consultant',
              'Water Quality Engineer',
              'Hydraulic Engineer',
            ],
          },
          {
            Category: 'Air Quality & Climate',
            Roles: [
              'Air Quality Engineer',
              'Climate Change Analyst',
              'Environmental Scientist',
              'Carbon Footprint Analyst',
              'Sustainability Engineer',
            ],
          },
          {
            Category: 'Waste Management',
            Roles: [
              'Waste Management Engineer',
              'Recycling Engineer',
              'Hazardous Waste Engineer',
              'Solid Waste Engineer',
              'Environmental Remediation Engineer',
            ],
          },
        ],
        'Industrial engineering': [
          {
            Category: 'Operations Research',
            Roles: [
              'Operations Research Analyst',
              'Process Improvement Engineer',
              'Efficiency Expert',
              'Systems Analyst',
              'Optimization Engineer',
            ],
          },
          {
            Category: 'Manufacturing Systems',
            Roles: [
              'Manufacturing Systems Engineer',
              'Production Planner',
              'Quality Control Engineer',
              'Lean Manufacturing Engineer',
              'Supply Chain Engineer',
            ],
          },
          {
            Category: 'Human Factors',
            Roles: [
              'Ergonomics Engineer',
              'Safety Engineer',
              'Human Factors Engineer',
              'Workplace Design Engineer',
              'Occupational Health Engineer',
            ],
          },
        ],
        'Petroleum engineering': [
          {
            Category: 'Exploration',
            Roles: [
              'Reservoir Engineer',
              'Drilling Engineer',
              'Petroleum Geologist',
              'Seismic Engineer',
              'Well Engineer',
            ],
          },
          {
            Category: 'Production',
            Roles: [
              'Production Engineer',
              'Facilities Engineer',
              'Pipeline Engineer',
              'Offshore Engineer',
              'Field Engineer',
            ],
          },
          {
            Category: 'Refining',
            Roles: [
              'Refinery Engineer',
              'Process Engineer',
              'Petrochemical Engineer',
              'Plant Engineer',
              'Operations Engineer',
            ],
          },
        ],
      };

      // Merge additional departments
      Object.assign(departmentRoles, additionalDepartments);

      // Generic fallback for any unrecognized department
      const genericEngineeringRoles = [
        {
          Category: 'Technical Roles',
          Roles: [
            'Design Engineer',
            'Project Engineer',
            'Research Engineer',
            'Development Engineer',
            'Systems Engineer',
          ],
        },
        {
          Category: 'Management & Consulting',
          Roles: [
            'Engineering Manager',
            'Technical Consultant',
            'Project Manager',
            'Engineering Analyst',
            'Technical Sales Engineer',
          ],
        },
        {
          Category: 'Quality & Testing',
          Roles: [
            'Quality Engineer',
            'Test Engineer',
            'Validation Engineer',
            'Compliance Engineer',
            'Inspection Engineer',
          ],
        },
        {
          Category: 'Innovation & Research',
          Roles: [
            'R&D Engineer',
            'Innovation Engineer',
            'Technology Specialist',
            'Patent Engineer',
            'Technical Researcher',
          ],
        },
      ];

      // Get roles for the specific department, fallback to generic if not found
      const roles = departmentRoles[dept] || genericEngineeringRoles;
      const obj = { [`${dept} Job Roles`]: roles };
      return JSON.stringify(obj);
    }

    // Career guidance and general conversation fallbacks
    if (promptLower.includes('career') || promptLower.includes('job') || promptLower.includes('work')) {
      return "I'd be happy to help with your career planning! You can ask me about different engineering roles, required skills, career paths, or salary expectations. What specific area would you like to explore?";
    }

    if (promptLower.includes('hello') || promptLower.includes('hi') || promptLower.includes('hey')) {
      return "Hello! I'm your AI career assistant. I can help you with job search, career planning, skill development, and answering questions about various engineering fields. How can I assist you today?";
    }

    if (promptLower.includes('help') || promptLower.includes('what can you do')) {
      return "I can help you with:\n• Career planning and job role exploration\n• Engineering field comparisons\n• Skill development guidance\n• Interview preparation tips\n• Resume advice\n• Salary and industry insights\n\nWhat would you like to know more about?";
    }

    if (promptLower.includes('skill') || promptLower.includes('learn') || promptLower.includes('study')) {
      return "Great question about skills! For engineering careers, I recommend focusing on both technical and soft skills. Which specific field are you interested in? I can provide detailed skill requirements for different engineering disciplines.";
    }

    if (promptLower.includes('salary') || promptLower.includes('pay') || promptLower.includes('income')) {
      return "Salary ranges vary significantly based on location, experience, and specialization. Generally:\n• Entry level: ₹3-8 LPA\n• Mid level: ₹8-20 LPA\n• Senior level: ₹20+ LPA\n\nWhich specific role or field would you like salary details for?";
    }

    if (promptLower.includes('interview') || promptLower.includes('preparation')) {
      return "Interview preparation is crucial! I recommend:\n• Practice technical questions for your field\n• Prepare behavioral interview answers\n• Research the company thoroughly\n• Practice coding problems (for tech roles)\n• Prepare questions to ask the interviewer\n\nWould you like specific advice for any particular type of interview?";
    }

    if (promptLower.includes('resume') || promptLower.includes('cv')) {
      return "A strong resume should highlight:\n• Relevant technical skills\n• Project experience\n• Internships and work experience\n• Education and certifications\n• Quantifiable achievements\n\nWould you like specific tips for your engineering field or experience level?";
    }

    if (promptLower.includes('company') || promptLower.includes('companies')) {
      return "There are many great companies across different engineering fields! Tech giants, startups, consulting firms, and traditional engineering companies all offer excellent opportunities. What type of company culture or industry interests you most?";
    }

    if (promptLower.includes('flashcard')) {
      return JSON.stringify({
        flashcards: [
          {
            front: "What is artificial intelligence?",
            back: "AI is the simulation of human intelligence in machines that are programmed to think and learn."
          },
          {
            front: "What are the types of machine learning?",
            back: "Supervised learning, Unsupervised learning, and Reinforcement learning."
          }
        ]
      });
    }

    if (promptLower.includes('quiz') || promptLower.includes('mcq')) {
      return JSON.stringify({
        questions: [
          {
            question: "What does AI stand for?",
            options: ["Artificial Intelligence", "Automated Intelligence", "Advanced Intelligence", "Applied Intelligence"],
            correct: 0
          },
          {
            question: "Which is a popular machine learning library?",
            options: ["React", "TensorFlow", "Bootstrap", "jQuery"],
            correct: 1
          }
        ]
      });
    }

    if (promptLower.includes('question') || promptLower.includes('qa')) {
      return JSON.stringify({
        questions: [
          "What are the main applications of AI in today's world?",
          "How does machine learning differ from traditional programming?",
          "What are the ethical considerations in AI development?"
        ]
      });
    }

    if (promptLower.includes('teach') || promptLower.includes('explain')) {
      return "Here's a simple explanation: AI is like teaching computers to think and make decisions like humans. Start with basic concepts like pattern recognition, then move to algorithms, and finally practical applications.";
    }

    if (promptLower.includes('notes') || promptLower.includes('content')) {
      return `
## Chapter Notes

### Key Concepts
- Understanding the fundamentals
- Practical applications
- Real-world examples

### Important Points
1. Core principles and theory
2. Implementation strategies
3. Best practices

### Summary
This chapter covers essential concepts that form the foundation for advanced topics.
      `;
    }

    return "I can help you with your learning journey. Please provide more specific details about what you'd like to learn.";
  }
}

// Create instances for all AI models
export const geminiModel = new AiService("Gemini");
export const AiFlashCard = new AiService("AiFlashCard");
export const AiQuizRecall = new AiService("AiQuizRecall");
export const AiQueAns = new AiService("AiQueAns");
export const AiTeachToOther = new AiService("AiTeachToOther");
export const AiChapterContent = new AiService("AiChapterContent");
export const AiNotesSection = new AiService("AiNotesSection");
export const AiCourseContent = new AiService("AiCourseContent");
export const AiAnswerQueAns = new AiService("AiAnswerQueAns");
export const AiDoubtSuggestion = new AiService("AiDoubtSuggestion");

// Other existing models
export const AiDaysRemains = new AiService("AiDaysRemains");
export const AiProjectPlan = new AiService("AiProjectPlan");
export const AiProjectIdea = new AiService("AiProjectIdea");
export const AiResumeAnalyzer = new AiService("AiResumeAnalyzer");
export const AiTooldSoftware = new AiService("AiTooldSoftware");
export const AiCareerFieldResult = new AiService("AiCareerFieldResult");
export const AiCodingRoundFeedback = new AiService("AiCodingRoundFeedback");
export const AiQuizList = new AiService("AiQuizList");
export const AiSoftSkillQuestion = new AiService("AiSoftSkillQuestion");
export const AiFeedbackReport = new AiService("AiFeedbackReport");
export const AiMockInterview = new AiService("AiMockInterview");
export const AiSoftSkillReport = new AiService("AiSoftSkillReport");
export const AiCodingRoundQuestion = new AiService("AiCodingRoundQuestion");

export default geminiModel;
