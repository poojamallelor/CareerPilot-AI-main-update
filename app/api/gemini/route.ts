import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// Security: removed hardcoded API key. Use .env.local only.
const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

// Basic environment diagnostics (non-sensitive)
console.log('Gemini env check:', {
  hasApiKey: !!apiKey,
  keyLength: apiKey?.length,
  fromEnv: !!apiKey,
});

// Validate API key format (length heuristic only)
const isValidApiKey = !!apiKey && apiKey.length > 30;
if (!isValidApiKey) {
  console.warn('Gemini: Fallback mode (no valid API key). Set GOOGLE_GEMINI_API_KEY in .env.local');
}

const genAI = isValidApiKey ? new GoogleGenerativeAI(apiKey!) : null;

// Limits & helpers
const MAX_PROMPT_CHARS = 6000; // protect against excessively large payloads
function truncateForLog(input: string, max = 120) {
  return input.length > max ? input.substring(0, max) + '…' : input;
}

// Simple fallback generator to avoid 500s in development when API key isn't set
function getFallbackResponse(prompt: string): string {
  const p = (prompt || '').toLowerCase();

  // Career roadmap fallback (expects JSON)
  if (
    p.includes('career roadmap') ||
    (p.includes('roadmap') && p.includes('learning path'))
  ) {
    // Try to extract the role name from the prompt
    const roleMatch = /career roadmap for ["']?([^"'.]+)["']?/i.exec(
      prompt || ''
    );
    const roleName = roleMatch ? roleMatch[1].trim() : 'Software Engineer';

    return JSON.stringify({
      Role: roleName,
      'Learning Path': {
        'Beginner (0-1 years)': [
          `Learn fundamental ${roleName.toLowerCase()} concepts and basics`,
          'Complete introductory courses and tutorials',
          'Build simple projects to practice skills',
          'Join online communities and forums',
          'Get familiar with industry tools and practices',
        ],
        'Intermediate (1-3 years)': [
          'Work on more complex projects',
          'Learn advanced tools and techniques',
          'Contribute to open-source projects',
          'Seek mentorship and guidance',
          'Start specializing in specific areas',
        ],
        'Advanced (3-5 years)': [
          'Lead projects and teams',
          'Specialize in specific domains',
          'Mentor junior colleagues',
          'Stay updated with industry trends',
          'Drive technical decisions',
        ],
        'Expert (5+ years)': [
          'Become thought leader in the field',
          'Speak at conferences and events',
          'Write technical articles and blogs',
          'Drive innovation and research',
          'Shape industry standards',
        ],
      },
      'Required Skills by Level': {
        'Entry Level': [
          'Basic technical skills',
          'Communication',
          'Problem-solving',
          'Time management',
          'Teamwork',
        ],
        'Mid Level': [
          'Advanced technical expertise',
          'Leadership basics',
          'Project management',
          'Strategic thinking',
          'Cross-functional collaboration',
        ],
        'Senior Level': [
          'Domain expertise',
          'Team leadership',
          'Business acumen',
          'Innovation mindset',
          'Stakeholder management',
        ],
      },
      'Timeline and Milestones': [
        'Month 1-6: Foundation building and basic skills development',
        'Month 6-18: Practical experience and intermediate skills acquisition',
        'Year 2-3: Specialization and advanced capabilities development',
        'Year 3-5: Leadership roles and expert-level contributions',
        'Year 5+: Industry recognition and thought leadership',
      ],
      'Educational Requirements': [
        "Bachelor's degree in relevant field (Computer Science, Engineering, etc.)",
        'Relevant online courses and bootcamps',
        'Industry certifications and specialized training',
        'Continuous learning and upskilling programs',
        "Advanced degree (Master's/PhD) for senior positions",
      ],
      'Certification Paths': [
        'Technology-specific certifications (AWS, Google Cloud, Microsoft)',
        'Industry-recognized professional certifications',
        'Project management certifications (PMP, Agile)',
        'Leadership and management certifications',
        'Domain-specific specialized certifications',
      ],
      'Experience Levels': {
        'Entry Level (0-2 years)':
          'Junior roles, learning fundamentals, guided projects',
        'Mid Level (2-5 years)':
          'Independent work, moderate complexity projects, some mentoring',
        'Senior Level (5-8 years)':
          'Lead projects, mentor teams, strategic contributions',
        'Lead Level (8+ years)':
          'Organizational impact, industry leadership, innovation driving',
      },
      'Project Ideas': [
        'Personal portfolio projects to showcase skills',
        'Open-source contributions to popular repositories',
        'Industry-relevant case studies and solutions',
        'Innovation projects and research initiatives',
        'Community projects and volunteer work',
      ],
      'Networking Opportunities': [
        'Professional associations and industry societies',
        'Local meetups and user groups',
        'Industry conferences and workshops',
        'Online communities and forums (LinkedIn, Reddit, Discord)',
        'Alumni networks and mentorship programs',
      ],
      'Salary Progression': {
        'Entry Level (0-2 years)': '₹3,00,000 - ₹8,00,000 per annum',
        'Mid Level (2-5 years)': '₹8,00,000 - ₹15,00,000 per annum',
        'Senior Level (5-8 years)': '₹15,00,000 - ₹30,00,000 per annum',
        'Lead Level (8+ years)': '₹30,00,000+ per annum',
      },
      'Career Advancement Steps': [
        '1. Build strong foundational technical skills',
        '2. Gain practical experience through diverse projects',
        '3. Develop leadership and communication skills',
        '4. Stay updated with latest industry trends and technologies',
        '5. Build and maintain professional network',
        '6. Seek challenging opportunities and stretch assignments',
        '7. Consider specialization in high-demand areas',
        '8. Pursue continuous learning and skill development',
      ],
      'Free Resources': [
        'YouTube educational channels and tutorial series',
        'Free online courses from major universities (MIT OpenCourseWare, Stanford CS)',
        'Official documentation and getting started guides',
        'GitHub repositories with learning resources and projects',
        'Professional community forums (Stack Overflow, Reddit)',
        'Free webinars and virtual conferences',
        'Open source projects for hands-on learning',
        'Khan Academy and Coursera free courses',
        'FreeCodeCamp comprehensive curriculum',
        'Mozilla Developer Network (MDN) documentation',
        'Google Developers and Microsoft Learn platforms',
        'Codecademy free tier programming courses',
        'W3Schools interactive tutorials and references',
        'HackerEarth free learning modules',
        'GeeksforGeeks programming tutorials and practice',
      ],
      'Recommended Books': [
        `${roleName} fundamentals and best practices handbook`,
        'Clean Code: A Handbook of Agile Software Craftsmanship by Robert Martin',
        'Introduction to Algorithms by Cormen, Leiserson, Rivest, and Stein',
        'Design Patterns: Elements of Reusable Object-Oriented Software',
        'The Pragmatic Programmer by David Thomas and Andrew Hunt',
        'Code Complete by Steve McConnell',
        'Refactoring: Improving the Design of Existing Code by Martin Fowler',
        "You Don't Know JS series by Kyle Simpson",
        'Eloquent JavaScript by Marijn Haverbeke',
        'Head First Design Patterns by Eric Freeman',
        'The Mythical Man-Month by Frederick Brooks',
        'Cracking the Coding Interview by Gayle McDowell',
        'System Design Interview by Alex Xu',
        'The Clean Coder by Robert Martin',
        'Programming Pearls by Jon Bentley',
      ],
      'Practice Platforms': [
        'LeetCode - Algorithm and data structure practice',
        'HackerRank - Programming challenges and contests',
        'CodeSignal - Technical assessments and practice',
        'Codewars - Coding challenges with ranking system',
        'AtCoder - Competitive programming platform',
        'Codeforces - Programming contests and practice',
        'TopCoder - Algorithm competitions and challenges',
        'GitHub - Open source project contributions',
        'GitLab - Code collaboration and CI/CD practice',
        'Replit - Online IDE for quick coding practice',
        'CodePen - Frontend development playground',
        'JSFiddle - JavaScript testing and sharing',
        'Kaggle - Data science competitions and datasets',
        'Project Euler - Mathematical programming challenges',
        'Exercism - Programming exercises with mentorship',
        'CodinGame - Game-based programming challenges',
        'DevChallenges - Real-world frontend/fullstack projects',
        'Frontend Mentor - Frontend design challenges',
        'Hackerearth - Programming contests and hackathons',
        'Sphere Online Judge (SPOJ) - Algorithmic problems',
      ],
    });
  }

  // Role description fallback (expects JSON)
  if (
    p.includes('describe the role') ||
    (p.includes('role') && p.includes('responsibilities'))
  ) {
    // Try to extract the role name from the prompt
    const roleMatch = /describe the role of ["']?([^"'.]+)["']?/i.exec(
      prompt || ''
    );
    const roleName = roleMatch ? roleMatch[1].trim() : 'Software Engineer';

    return JSON.stringify({
      Role: roleName,
      'Core Responsibilities': [
        `Lead and manage ${roleName.toLowerCase()} projects and initiatives`,
        'Collaborate with cross-functional teams to deliver solutions',
        'Design, develop, and implement technical solutions',
        'Analyze requirements and provide technical recommendations',
        'Ensure quality standards and best practices are followed',
      ],
      'Skills and Qualifications': [
        "Bachelor's degree in relevant field",
        '3-5 years of professional experience',
        'Strong analytical and problem-solving skills',
        'Excellent communication and teamwork abilities',
        'Proficiency in relevant tools and technologies',
      ],
      'Tools and Technologies': [
        'Industry-standard software and platforms',
        'Programming languages and frameworks',
        'Project management and collaboration tools',
        'Version control and development environments',
        'Testing and deployment tools',
      ],
      'Work Environment':
        'Professional office environment with modern facilities, collaborative workspaces, and flexible work arrangements. May include remote work options and team-based projects.',
      'Career Path': [
        `Junior ${roleName}`,
        `${roleName}`,
        `Senior ${roleName}`,
        `Lead ${roleName}`,
        `${roleName} Manager/Director`,
      ],
      'Challenges and Rewards': {
        Challenges: [
          'Keeping up with rapidly evolving technology',
          'Managing complex project requirements',
          'Balancing technical debt with new feature development',
        ],
        Rewards: [
          'Opportunity to work on innovative projects',
          'Continuous learning and skill development',
          'Competitive compensation and growth opportunities',
        ],
      },
      'Industry Relevance': `${roleName} roles are in high demand across multiple industries including technology, finance, healthcare, and manufacturing. The field continues to grow with excellent job prospects.`,
      Companies: [
        'Technology companies (Google, Microsoft, Amazon)',
        'Financial services firms',
        'Healthcare organizations',
        'Consulting companies',
        'Startups and scale-ups',
      ],
      'Average Salary':
        '₹6,00,000 - ₹25,00,000 per annum (varies by experience, location, and company size)',
    });
  }

  // Job roles fallback (expects JSON)
  if (
    p.includes('job roll') ||
    p.includes('job role') ||
    p.includes('job roles') ||
    p.includes('jobroll') ||
    p.includes('jobroles') ||
    p.includes('career roles') ||
    (p.includes('branch') && p.includes('json'))
  ) {
    // Try to extract the branch/department after the word 'branch'
    let dept = 'Engineering';
    const match = /branch\s+([^,.\n]+)/i.exec(prompt || '');
    if (match && match[1]) {
      dept = match[1].trim();
    }

    const departmentRoles: Record<string, any[]> = {
      'Computer Science and Engineering': [
        {
          Category: 'Software Development',
          Roles: [
            'Full Stack Developer',
            'Backend Developer',
            'Frontend Developer',
            'Mobile App Developer',
            'Software Engineer',
            'Game Developer',
            'Embedded Systems Developer',
            'AR/VR Developer',
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
            'Computer Vision Engineer',
            'Natural Language Processing (NLP) Engineer',
            'Deep Learning Specialist',
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
            'Platform Engineer',
            'Cloud Security Engineer',
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
            'Incident Response Specialist',
            'Digital Forensics Analyst',
          ],
        },
        {
          Category: 'Research & Emerging Tech',
          Roles: [
            'Blockchain Developer',
            'Quantum Computing Researcher',
            'IoT Solutions Architect',
            'Robotics Software Engineer',
            'Edge Computing Specialist',
          ],
        },
        {
          Category: 'Quality Assurance & Testing',
          Roles: [
            'QA Engineer',
            'Automation Test Engineer',
            'Performance Tester',
            'Test Analyst',
          ],
        },
        {
          Category: 'IT & Technical Support',
          Roles: [
            'IT Support Specialist',
            'Network Administrator',
            'Database Administrator',
            'Technical Support Engineer',
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
    const additionalDepartments: Record<string, any[]> = {
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

    const obj: Record<string, any> = {
      [`${dept} Job Roles`]: roles,
    };
    return JSON.stringify(obj);
  }

  if (p.includes('flashcard')) {
    return JSON.stringify({
      flashcards: [
        {
          front: 'What is artificial intelligence?',
          back: 'AI is the simulation of human intelligence in machines that are programmed to think and learn.',
        },
        {
          front: 'What are the types of machine learning?',
          back: 'Supervised, Unsupervised, and Reinforcement learning.',
        },
      ],
    });
  }

  if (p.includes('quiz') || p.includes('mcq')) {
    return JSON.stringify({
      questions: [
        {
          question: 'What does AI stand for?',
          options: [
            'Artificial Intelligence',
            'Automated Intelligence',
            'Advanced Intelligence',
            'Applied Intelligence',
          ],
          correct: 0,
        },
        {
          question: 'Which is a popular machine learning library?',
          options: ['React', 'TensorFlow', 'Bootstrap', 'jQuery'],
          correct: 1,
        },
      ],
    });
  }

  if (p.includes('question') || p.includes('qa')) {
    return JSON.stringify({
      questions: [
        "What are the main applications of AI in today's world?",
        'How does machine learning differ from traditional programming?',
        'What are the ethical considerations in AI development?',
      ],
    });
  }

  if (p.includes('teach') || p.includes('explain')) {
    return "Here's a simple explanation: AI is like teaching computers to think and make decisions like humans. Start with basic concepts like pattern recognition, then move to algorithms, and finally practical applications.";
  }

  if (p.includes('notes') || p.includes('content')) {
    return `\n## Chapter Notes\n\n### Key Concepts\n- Understanding the fundamentals\n- Practical applications\n- Real-world examples\n\n### Important Points\n1. Core principles and theory\n2. Implementation strategies\n3. Best practices\n\n### Summary\nThis chapter covers essential concepts that form the foundation for advanced topics.\n`;
  }

  // Career guidance and general conversation fallbacks
  if (p.includes('career') || p.includes('job') || p.includes('work')) {
    return "I'd be happy to help with your career planning! You can ask me about different engineering roles, required skills, career paths, or salary expectations. What specific area would you like to explore?";
  }

  if (p.includes('hello') || p.includes('hi') || p.includes('hey')) {
    return "Hello! I'm your AI career assistant. I can help you with job search, career planning, skill development, and answering questions about various engineering fields. How can I assist you today?";
  }

  if (p.includes('help') || p.includes('what can you do')) {
    return 'I can help you with:\n• Career planning and job role exploration\n• Engineering field comparisons\n• Skill development guidance\n• Interview preparation tips\n• Resume advice\n• Salary and industry insights\n\nWhat would you like to know more about?';
  }

  if (p.includes('skill') || p.includes('learn') || p.includes('study')) {
    return 'Great question about skills! For engineering careers, I recommend focusing on both technical and soft skills. Which specific field are you interested in? I can provide detailed skill requirements for different engineering disciplines.';
  }

  if (p.includes('salary') || p.includes('pay') || p.includes('income')) {
    return 'Salary ranges vary significantly based on location, experience, and specialization. Generally:\n• Entry level: ₹3-8 LPA\n• Mid level: ₹8-20 LPA\n• Senior level: ₹20+ LPA\n\nWhich specific role or field would you like salary details for?';
  }

  if (p.includes('interview') || p.includes('preparation')) {
    return 'Interview preparation is crucial! I recommend:\n• Practice technical questions for your field\n• Prepare behavioral interview answers\n• Research the company thoroughly\n• Practice coding problems (for tech roles)\n• Prepare questions to ask the interviewer\n\nWould you like specific advice for any particular type of interview?';
  }

  if (p.includes('resume') || p.includes('cv')) {
    return 'A strong resume should highlight:\n• Relevant technical skills\n• Project experience\n• Internships and work experience\n• Education and certifications\n• Quantifiable achievements\n\nWould you like specific tips for your engineering field or experience level?';
  }

  if (p.includes('company') || p.includes('companies')) {
    return 'There are many great companies across different engineering fields! Tech giants, startups, consulting firms, and traditional engineering companies all offer excellent opportunities. What type of company culture or industry interests you most?';
  }

  // Generic fallback
  return "I can help you with your learning journey. Please provide more specific details about what you'd like to learn.";
}

export async function POST(request: NextRequest) {
  let prompt = '';

  try {
    console.log('Gemini API: Received request');

    // Parse the request body
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error('Gemini API: Failed to parse request body:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    prompt = body.prompt || body.message;

    if (!prompt) {
      console.log('Gemini API: Missing prompt in request');
      return NextResponse.json(
        { error: 'Prompt or message is required' },
        { status: 400 }
      );
    }

    console.log(
      'Gemini API: Processing prompt:',
      prompt.substring(0, 50) + '...'
    );

    // If we don't have a valid API key, use enhanced fallback immediately
    if (!isValidApiKey || !genAI) {
      console.log(
        'Gemini API: Using enhanced fallback response (no valid API key)'
      );
      const fallbackResponse = getEnhancedFallbackResponse(prompt);
      return NextResponse.json({
        success: true,
        response: fallbackResponse,
        mode: 'fallback',
        message:
          'Using enhanced AI simulation (set valid GOOGLE_GEMINI_API_KEY for real AI)',
      });
    }

    // Try to use real Gemini API
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      // Generate content with timeout
      const result = (await Promise.race([
        model.generateContent(prompt),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timeout')), 30000)
        ),
      ])) as any;

      const response = await result.response;
      const text = response.text();

      console.log('Gemini API: Successfully generated response');

      return NextResponse.json({
        success: true,
        response: text,
        mode: 'ai',
      });
    } catch (apiError: any) {
      console.log('Gemini API: Real API failed, using enhanced fallback');
      console.error('API Error details:', apiError.message);

      // Use enhanced fallback when real API fails
      const fallbackResponse = getEnhancedFallbackResponse(prompt);
      return NextResponse.json({
        success: true,
        response: fallbackResponse,
        mode: 'fallback',
        message:
          'AI service temporarily unavailable, using enhanced simulation',
      });
    }
  } catch (error) {
    console.error('Error in Gemini API route:', error);

    // Final fallback for any unexpected errors
    const fallbackResponse = getEnhancedFallbackResponse(
      prompt || 'general inquiry'
    );
    return NextResponse.json({
      success: true,
      response: fallbackResponse,
      mode: 'fallback',
      message: 'Using enhanced simulation due to service error',
    });
  }
}

// Enhanced fallback function for comprehensive roadmap generation
function getEnhancedFallbackResponse(prompt: string): string {
  const p = (prompt || '').toLowerCase();

  // NEW: Study material/recall fallback
  if (p.includes('study material') || p.includes('study plan') || p.includes('interview preparation')) {
    const topicMatch = /(?:study.*?for|study.*?plan.*?for|material.*?for).*?["']?([^"'.?!]+)["']?/i.exec(prompt || '');
    const topic = topicMatch ? topicMatch[1].trim() : 'Technology';
    
    // Clean up the topic name
    const cleanTopic = topic.replace(/for interview preparation.*$/i, '').trim();
    
    return JSON.stringify({
      courseTitle: `Complete ${cleanTopic} Interview Guide`,
      courseSummary: `Comprehensive ${cleanTopic} interview preparation covering fundamentals, advanced concepts, practical applications, and industry best practices. This study material is designed to help you ace technical interviews with confidence.`,
      chapters: [
        {
          chapterTitle: `${cleanTopic} Fundamentals`,
          chapterSummary: `Core concepts and foundational knowledge essential for understanding ${cleanTopic}`,
          topics: [
            `Introduction to ${cleanTopic}`,
            "Basic concepts and terminology",
            "Historical context and evolution",
            "Core principles and theory",
            "Fundamental operations and syntax"
          ]
        },
        {
          chapterTitle: "Data Structures and Algorithms",
          chapterSummary: "Essential data structures and algorithmic concepts frequently tested in interviews",
          topics: [
            "Arrays, Strings, and Linked Lists",
            "Stacks, Queues, and Hash Tables",
            "Trees and Binary Search Trees",
            "Graphs and Graph Algorithms",
            "Sorting and Searching Algorithms",
            "Dynamic Programming Basics"
          ]
        },
        {
          chapterTitle: `Advanced ${cleanTopic} Concepts`,
          chapterSummary: `In-depth coverage of advanced topics and sophisticated techniques in ${cleanTopic}`,
          topics: [
            "Advanced patterns and architectures",
            "Performance optimization techniques",
            "Security best practices",
            "Error handling and debugging",
            "Testing strategies and methodologies"
          ]
        },
        {
          chapterTitle: "System Design and Architecture",
          chapterSummary: "System design principles and architectural patterns commonly discussed in senior interviews",
          topics: [
            "Scalability and load balancing",
            "Database design and optimization",
            "Microservices vs Monolithic architecture",
            "Caching strategies and CDNs",
            "API design and RESTful services"
          ]
        },
        {
          chapterTitle: "Practical Application and Projects",
          chapterSummary: "Real-world applications, case studies, and hands-on project experience",
          topics: [
            "Industry use cases and applications",
            "Building scalable solutions",
            "Integration with other technologies",
            "DevOps and deployment strategies",
            "Monitoring and maintenance practices"
          ]
        },
        {
          chapterTitle: "Interview Preparation and Tips",
          chapterSummary: "Strategic preparation for technical interviews and behavioral questions",
          topics: [
            "Common interview questions and answers",
            "Coding challenge strategies",
            "Behavioral interview preparation",
            "Salary negotiation techniques",
            "Follow-up and networking tips"
          ]
        }
      ]
    });
  }

  // Enhanced career roadmap fallback with detailed structure
  if (
    p.includes('career roadmap') ||
    (p.includes('roadmap') && p.includes('learning path'))
  ) {
    const roleMatch = /career roadmap for ["']?([^"'.]+)["']?/i.exec(
      prompt || ''
    );
    const roleName = roleMatch
      ? roleMatch[1].trim()
      : extractRoleFromPrompt(prompt);

    return JSON.stringify({
      title: `Comprehensive Career Roadmap for ${roleName}`,
      introduction: `Welcome to your personalized ${roleName} career roadmap. This comprehensive guide has been carefully crafted to help you navigate your professional journey with confidence, providing structured learning paths, practical milestones, and industry insights to accelerate your career growth.`,
      timeframe:
        '12-36 months for significant career advancement with dedicated effort',
      goals: [
        `Master core ${roleName} skills and industry best practices`,
        'Build a compelling professional portfolio with real-world projects',
        'Develop strong professional network and industry connections',
        'Achieve competitive compensation and career advancement',
        'Establish expertise in emerging technologies and trends',
      ],
      objectives: [
        'Complete comprehensive foundational learning with hands-on practice',
        'Build and showcase multiple real-world projects demonstrating expertise',
        'Gain practical industry experience through internships or entry-level positions',
        'Develop essential soft skills including communication and leadership',
        'Stay current with industry trends and emerging technologies',
      ],
      phases: [
        {
          phase: 'Foundation Building',
          duration: '3-6 months',
          description:
            'Establish solid foundation with core concepts, basic tools, and fundamental understanding of the field',
          skills: [
            `Core ${roleName} concepts and principles`,
            'Industry-standard tools and technologies',
            'Problem-solving methodologies',
            'Basic project management',
            'Professional communication',
          ],
          projects: [
            `Introduction to ${roleName} - Basic implementation project`,
            'Tool familiarization - Hands-on practice exercises',
            'Guided tutorial projects following industry standards',
            'Personal learning portfolio setup',
            'First mini-project showcasing basic skills',
          ],
          resources: [
            'Online courses from Coursera, edX, or Udemy',
            'Official documentation and getting started guides',
            'YouTube tutorials and educational channels',
            'Professional community forums and discussion groups',
            'Free online bootcamps and workshops',
          ],
          milestones: [
            'Complete foundational courses with 80%+ scores',
            'Build first working project from scratch',
            'Join 2-3 professional online communities',
            'Create LinkedIn profile highlighting new skills',
            'Complete 5+ practice exercises or coding challenges',
          ],
        },
        {
          phase: 'Skill Development & Practical Application',
          duration: '6-12 months',
          description:
            'Advance technical abilities, work on meaningful projects, and gain practical experience through real-world applications',
          skills: [
            `Advanced ${roleName} concepts and specializations`,
            'Project architecture and design patterns',
            'Team collaboration and version control',
            'Testing and quality assurance practices',
            'Performance optimization and best practices',
          ],
          projects: [
            'Intermediate complexity project solving real problems',
            'Collaborative team project using industry workflows',
            'Open source contribution to existing projects',
            'Personal project showcasing advanced skills',
            'Internship or freelance project with real clients',
          ],
          resources: [
            'Advanced specialized courses and certifications',
            'Industry publications and technical blogs',
            'Professional conferences and webinars',
            'Mentorship programs and networking events',
            'Technical books from industry experts',
          ],
          milestones: [
            'Complete 2-3 substantial projects for portfolio',
            'Contribute to open source projects',
            'Attend industry conferences or meetups',
            'Establish mentor relationship',
            'Land internship or entry-level position',
          ],
        },
        {
          phase: 'Professional Growth & Specialization',
          duration: '12+ months',
          description:
            'Develop expertise in specific domains, take on leadership responsibilities, and establish yourself as a professional in the field',
          skills: [
            `Expert-level ${roleName} domain knowledge`,
            'Leadership and team management',
            'Strategic thinking and business acumen',
            'Innovation and emerging technology adoption',
            'Mentoring and knowledge sharing',
          ],
          projects: [
            'Complex enterprise-level projects',
            'Innovation initiatives and research projects',
            'Leading team projects and initiatives',
            'Speaking at conferences or writing technical articles',
            'Consulting or advisory roles for complex problems',
          ],
          resources: [
            'Executive education and advanced certifications',
            'Industry leadership programs',
            'Research papers and cutting-edge publications',
            'Professional coaching and career development',
            'Exclusive industry networks and communities',
          ],
          milestones: [
            'Achieve promotion to senior position',
            'Lead successful major project or initiative',
            'Become recognized expert in specialization area',
            'Mentor junior colleagues effectively',
            'Establish thought leadership through content creation',
          ],
        },
      ],
      skills_by_level: {
        beginner: [
          'Basic technical knowledge and tool familiarity',
          'Fundamental programming or domain concepts',
          'Effective communication and collaboration',
          'Learning agility and adaptability',
          'Time management and organization',
        ],
        intermediate: [
          'Advanced technical skills and best practices',
          'Project management and planning abilities',
          'Team leadership and collaboration',
          'Problem-solving and critical thinking',
          'Industry awareness and trend recognition',
        ],
        advanced: [
          'Expert-level domain knowledge and innovation',
          'Strategic planning and business alignment',
          'Team leadership and people development',
          'Cross-functional collaboration and influence',
          'Thought leadership and industry contribution',
        ],
      },
      industry_trends: [
        'Artificial Intelligence and Machine Learning integration',
        'Cloud-native technologies and microservices architecture',
        'Remote work and distributed team collaboration',
        'Sustainability and green technology focus',
        'Cybersecurity and privacy-first development',
        'Low-code/no-code platforms and automation',
        'DevOps and continuous integration/deployment practices',
      ],
      challenges: [
        'Staying current with rapidly evolving technology landscape',
        'Building practical experience while learning theoretical concepts',
        'Finding quality mentorship and career guidance',
        'Balancing depth vs breadth in skill development',
        'Competing in a competitive job market',
        'Managing imposter syndrome and building confidence',
      ],
      networking: [
        'Professional associations and industry groups',
        'Local meetups and user group communities',
        'Industry conferences and workshop events',
        'Online professional networks (LinkedIn, Twitter)',
        'Alumni networks and educational connections',
        'Open source communities and contribution opportunities',
      ],
      certifications: [
        `Industry-recognized ${roleName} certifications`,
        'Cloud platform certifications (AWS, Azure, GCP)',
        'Project management certifications (PMP, Agile)',
        'Vendor-specific technology certifications',
        'Professional development and soft skills credentials',
      ],
      salary_progression: `Entry level: ₹4-8 LPA → Mid-level: ₹8-18 LPA → Senior: ₹18-35 LPA → Expert: ₹35+ LPA. Progression depends on skills, location, company size, and market demand.`,
      interview_preparation: [
        `Technical assessments specific to ${roleName}`,
        'System design and architecture discussions',
        'Behavioral questions and situational scenarios',
        'Portfolio project presentations and code reviews',
        'Industry knowledge and current trends awareness',
        'Problem-solving and analytical thinking demonstrations',
      ],
      continuous_learning: [
        'Regular skill updates through online courses and workshops',
        'Following industry news and technology blogs',
        'Participating in professional development programs',
        'Attending conferences and staying connected with community',
        'Reading technical books and research papers',
        'Experimenting with new tools and emerging technologies',
      ],
    });
  }

  // Enhanced prerequisite information
  if (
    p.includes('prerequisite') ||
    p.includes('preparation') ||
    p.includes('before start')
  ) {
    const roleMatch = /prerequisite.*for ["']?([^"'.]+)["']?/i.exec(
      prompt || ''
    );
    const roleName = roleMatch
      ? roleMatch[1].trim()
      : extractRoleFromPrompt(prompt);

    return JSON.stringify({
      title: `Comprehensive Prerequisites for ${roleName}`,
      foundation_knowledge: [
        `Basic understanding of ${roleName} field and its applications`,
        'Fundamental computer science concepts and logical thinking',
        'Problem-solving skills and analytical mindset',
        'Basic mathematics and statistics (depending on field)',
        'Communication skills and ability to learn independently',
      ],
      recommended_courses: [
        {
          course: `Introduction to ${roleName}`,
          provider: 'Multiple platforms (Coursera, edX, Udemy)',
          duration: '4-8 weeks',
          difficulty: 'Beginner',
          url: 'Search on major learning platforms',
        },
        {
          course: 'Computer Science Fundamentals',
          provider: 'CS50x Harvard or similar',
          duration: '10-12 weeks',
          difficulty: 'Beginner',
          url: 'https://cs50.harvard.edu/x/',
        },
        {
          course: 'Programming Basics',
          provider: 'FreeCodeCamp, Codecademy',
          duration: '6-10 weeks',
          difficulty: 'Beginner',
          url: 'Multiple free options available',
        },
        {
          course: 'Professional Communication',
          provider: 'Coursera Business Writing',
          duration: '4 weeks',
          difficulty: 'Beginner',
          url: 'Professional development platforms',
        },
      ],
      preparation_steps: [
        'Assess your current knowledge and identify learning gaps',
        'Set clear, measurable learning goals with timeline',
        'Create dedicated learning environment and schedule',
        'Join relevant online communities and professional networks',
        'Start with basic concepts and gradually build complexity',
        'Practice regularly with hands-on exercises and projects',
        'Seek feedback from peers and mentors throughout journey',
      ],
      estimated_prep_time:
        '8-16 weeks for comprehensive preparation, depending on prior experience and time commitment',
      free_resources: [
        'YouTube educational channels and tutorial series',
        'Free online courses from major universities (MIT OpenCourseWare, Stanford CS)',
        'Official documentation and getting started guides',
        'GitHub repositories with learning resources and projects',
        'Professional community forums (Stack Overflow, Reddit)',
        'Free webinars and virtual conferences',
        'Open source projects for hands-on learning',
        'Khan Academy and Coursera free courses',
        'FreeCodeCamp comprehensive curriculum',
        'Mozilla Developer Network (MDN) documentation',
        'Google Developers and Microsoft Learn platforms',
        'Codecademy free tier programming courses',
        'W3Schools interactive tutorials and references',
        'HackerEarth free learning modules',
        'GeeksforGeeks programming tutorials and practice',
      ],
      books: [
        `${roleName} fundamentals and best practices handbook`,
        'Clean Code: A Handbook of Agile Software Craftsmanship by Robert Martin',
        'Introduction to Algorithms by Cormen, Leiserson, Rivest, and Stein',
        'Design Patterns: Elements of Reusable Object-Oriented Software',
        'The Pragmatic Programmer by David Thomas and Andrew Hunt',
        'Code Complete by Steve McConnell',
        'Refactoring: Improving the Design of Existing Code by Martin Fowler',
        "You Don't Know JS series by Kyle Simpson",
        'Eloquent JavaScript by Marijn Haverbeke',
        'Head First Design Patterns by Eric Freeman',
        'The Mythical Man-Month by Frederick Brooks',
        'Cracking the Coding Interview by Gayle McDowell',
        'System Design Interview by Alex Xu',
        'The Clean Coder by Robert Martin',
        'Programming Pearls by Jon Bentley',
      ],
      practice_platforms: [
        'LeetCode - Algorithm and data structure practice',
        'HackerRank - Programming challenges and contests',
        'CodeSignal - Technical assessments and practice',
        'Codewars - Coding challenges with ranking system',
        'AtCoder - Competitive programming platform',
        'Codeforces - Programming contests and practice',
        'TopCoder - Algorithm competitions and challenges',
        'GitHub - Open source project contributions',
        'GitLab - Code collaboration and CI/CD practice',
        'Replit - Online IDE for quick coding practice',
        'CodePen - Frontend development playground',
        'JSFiddle - JavaScript testing and sharing',
        'Kaggle - Data science competitions and datasets',
        'Project Euler - Mathematical programming challenges',
        'Exercism - Programming exercises with mentorship',
        'CodinGame - Game-based programming challenges',
        'DevChallenges - Real-world frontend/fullstack projects',
        'Frontend Mentor - Frontend design challenges',
        'Hackerearth - Programming contests and hackathons',
        'Sphere Online Judge (SPOJ) - Algorithmic problems',
      ],
    });
  }

  // Fallback to original function for other requests
  return getFallbackResponse(prompt);
}

function extractRoleFromPrompt(prompt: string): string {
  const p = prompt.toLowerCase();

  // Common tech roles
  if (p.includes('software engineer') || p.includes('developer'))
    return 'Software Engineer';
  if (p.includes('data scientist')) return 'Data Scientist';
  if (p.includes('product manager')) return 'Product Manager';
  if (p.includes('devops')) return 'DevOps Engineer';
  if (p.includes('ui/ux') || p.includes('designer')) return 'UI/UX Designer';
  if (p.includes('business analyst')) return 'Business Analyst';
  if (p.includes('qa') || p.includes('tester')) return 'QA Engineer';
  if (p.includes('cybersecurity')) return 'Cybersecurity Specialist';
  if (p.includes('machine learning')) return 'Machine Learning Engineer';
  if (p.includes('full stack')) return 'Full Stack Developer';

  // Generic fallback
  return 'Technology Professional';
}
