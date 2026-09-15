import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Resolve Gemini API key from multiple environment variables
const apiKey =
  process.env.GOOGLE_GEMINI_API_KEY ||
  process.env.GOOGLE_GENAI_API_KEY ||
  process.env.GEMINI_API_KEY ||
  process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const genAI = apiKey && apiKey.length > 20 ? new GoogleGenerativeAI(apiKey) : null;

// Rich curated question banks for all 4 modules (realistic, educational, and high-quality)
const CURATED_ASSESSMENT_BANKS = {
  AptitudeModule: [
    {
      id: 1,
      question: "A train running at 72 km/h crosses a 200-meter-long platform in 22 seconds. What is the length of the train?",
      options: ["240 meters", "200 meters", "280 meters", "320 meters"],
      correct: 0,
      category: "AptitudeModule",
      difficulty: "medium",
      explanation: "Speed = 72 * (5/18) = 20 m/s. Total distance = Speed * Time = 20 * 22 = 440m. Length of train = 440 - 200 = 240m."
    },
    {
      id: 2,
      question: "If A can complete a project in 12 days and B in 18 days, in how many days can they complete it working together?",
      options: ["6.5 days", "7.2 days", "8.0 days", "7.5 days"],
      correct: 1,
      category: "AptitudeModule",
      difficulty: "basic",
      explanation: "Combined 1-day work = (1/12) + (1/18) = 5/36. Total days needed = 36/5 = 7.2 days."
    },
    {
      id: 3,
      question: "Find the next number in the series: 4, 9, 25, 49, 121, 169, ?",
      options: ["225", "289", "361", "196"],
      correct: 1,
      category: "AptitudeModule",
      difficulty: "medium",
      explanation: "The series consists of squares of consecutive prime numbers: 2², 3², 5², 7², 11², 13², and next is 17² = 289."
    },
    {
      id: 4,
      question: "A merchant marks an item 40% above cost price and allows a discount of 15%. What is the profit percentage?",
      options: ["19%", "25%", "22%", "18%"],
      correct: 0,
      category: "AptitudeModule",
      difficulty: "medium",
      explanation: "Let CP = 100. Marked Price = 140. Selling Price = 140 * 0.85 = 119. Profit = 119 - 100 = 19%."
    },
    {
      id: 5,
      question: "If 'PENCIL' is coded as 'QGODJM' in a certain code language, how is 'ERASER' coded?",
      options: ["FSBTFS", "FSBTFQ", "FTBTFS", "FSATFR"],
      correct: 1,
      category: "AptitudeModule",
      difficulty: "basic",
      explanation: "Pattern: Alternating +1, +2, +1, +2, +1, +2: E(+1)=F, R(+2)=T/S, A(+1)=B, S(+2)=U, E(+1)=F, R(+2)=T."
    },
    {
      id: 6,
      question: "In a class of 60 students, 35 like Python, 25 like Java, and 12 like both. How many like neither language?",
      options: ["8", "12", "15", "10"],
      correct: 1,
      category: "AptitudeModule",
      difficulty: "basic",
      explanation: "Total liking at least one = 35 + 25 - 12 = 48. Neither = 60 - 48 = 12."
    },
    {
      id: 7,
      question: "The ratio of ages of two colleagues is 4:5. After 6 years, the ratio becomes 5:6. What is the age of the elder colleague?",
      options: ["24 years", "30 years", "35 years", "28 years"],
      correct: 1,
      category: "AptitudeModule",
      difficulty: "basic",
      explanation: "Let ages be 4x and 5x. (4x+6)/(5x+6) = 5/6 => 24x + 36 = 25x + 30 => x = 6. Elder = 5*6 = 30 years."
    },
    {
      id: 8,
      question: "A pipe can fill a tank in 6 hours and another pipe empties it in 8 hours. If both open together, how long to fill?",
      options: ["20 hours", "24 hours", "18 hours", "22 hours"],
      correct: 1,
      category: "AptitudeModule",
      difficulty: "medium",
      explanation: "Net rate = (1/6) - (1/8) = (4-3)/24 = 1/24 tank/hour. Time = 24 hours."
    },
    {
      id: 9,
      question: "What is the probability of getting a sum of 8 when rolling two fair 6-sided dice?",
      options: ["5/36", "1/6", "7/36", "1/9"],
      correct: 0,
      category: "AptitudeModule",
      difficulty: "medium",
      explanation: "Pairs with sum 8: (2,6), (3,5), (4,4), (5,3), (6,2) = 5 outcomes out of 36 total."
    },
    {
      id: 10,
      question: "If 15 workers can build a wall in 8 days, how many workers are needed to build the same wall in 6 days?",
      options: ["20 workers", "18 workers", "24 workers", "16 workers"],
      correct: 0,
      category: "AptitudeModule",
      difficulty: "basic",
      explanation: "Total work = 15 * 8 = 120 man-days. Workers needed for 6 days = 120 / 6 = 20 workers."
    }
  ],

  GeneralLifeUnderstanding: [
    {
      id: 1,
      question: "When facing a high-pressure deadline with incomplete specifications, what is your most effective first step?",
      options: [
        "Clarify high-impact requirements with stakeholders immediately and document assumptions",
        "Wait until complete specifications are provided by management",
        "Start coding every possible edge case without checking",
        "Delegate all ambiguous tasks to other teammates"
      ],
      correct: 0,
      category: "GeneralLifeUnderstanding",
      difficulty: "situational",
      explanation: "Proactive communication and rapid clarity on core priorities minimize rework and align stakeholder expectations."
    },
    {
      id: 2,
      question: "A colleague disagrees with your technical architectural decision during a team design review. How do you respond?",
      options: [
        "Listen to their rationale, evaluate trade-offs objectively using data, and find consensus",
        "Insist on your approach since you initiated the design",
        "Escalate the argument to the engineering manager immediately",
        "Completely abandon your design without discussion"
      ],
      correct: 0,
      category: "GeneralLifeUnderstanding",
      difficulty: "situational",
      explanation: "Constructive peer reviews thrive on data-driven trade-off analysis and psychological safety."
    },
    {
      id: 3,
      question: "How do you maintain long-term career growth and prevent burnout during intense sprint cycles?",
      options: [
        "Establish clear work-life boundaries, prioritize task delegation, and set regular learning time",
        "Work continuously through weekends to outwork everyone",
        "Avoid taking on challenging projects altogether",
        "Ignore stress signals until physical fatigue occurs"
      ],
      correct: 0,
      category: "GeneralLifeUnderstanding",
      difficulty: "behavioral",
      explanation: "Sustainable high performance comes from structured recovery, prioritization, and regular skill compounding."
    },
    {
      id: 4,
      question: "You notice a critical bug in production that was caused by your own pull request. What is the best course of action?",
      options: [
        "Acknowledge the issue openly, roll back or hotfix immediately, and conduct a blameless post-mortem",
        "Try to quietly push a fix without telling anyone on the team",
        "Blame the code reviewer who approved the pull request",
        "Wait for customers to report it before taking action"
      ],
      correct: 0,
      category: "GeneralLifeUnderstanding",
      difficulty: "situational",
      explanation: "Ownership, transparency, and blameless post-mortems build trust and resilient engineering teams."
    },
    {
      id: 5,
      question: "When learning a complex new technology or framework under limited time, which strategy is most effective?",
      options: [
        "Build a focused prototype applying core concepts, then consult docs for specific patterns",
        "Read the entire 500-page official documentation before writing a line of code",
        "Copy-paste solutions from StackOverflow without understanding how they work",
        "Memorize API syntax without practical application"
      ],
      correct: 0,
      category: "GeneralLifeUnderstanding",
      difficulty: "learning",
      explanation: "Project-based active learning combined with targeted documentation reading yields the fastest retention."
    },
    {
      id: 6,
      question: "How do you handle receiving critical feedback about your communication during a performance review?",
      options: [
        "Appreciate the feedback, ask for specific examples, and create an actionable improvement plan",
        "Become defensive and dismiss the reviewer's perspective",
        "Agree in the meeting but make no behavioral adjustments afterward",
        "Request to change teams immediately"
      ],
      correct: 0,
      category: "GeneralLifeUnderstanding",
      difficulty: "growth_mindset",
      explanation: "A growth mindset treats constructive feedback as actionable diagnostic data for personal improvement."
    },
    {
      id: 7,
      question: "When working in a cross-functional team with non-technical stakeholders (e.g., Marketing, Sales), how do you explain technical blockers?",
      options: [
        "Translate technical concepts into business impact, user experience terms, and clear timeline estimates",
        "Use dense engineering jargon to demonstrate technical superiority",
        "Refuse to explain technical details to non-engineers",
        "Over-promise impossible turnaround times to avoid discussion"
      ],
      correct: 0,
      category: "GeneralLifeUnderstanding",
      difficulty: "communication",
      explanation: "Effective technical leaders excel at bridging engineering complexity with business objectives."
    },
    {
      id: 8,
      question: "If an urgent request arrives while you are deep in a high-priority architectural task, how do you manage your focus?",
      options: [
        "Assess urgency and impact, communicate when you will address it, and protect uninterrupted deep work time",
        "Drop everything immediately and context-switch every time an email arrives",
        "Ignore the sender completely without acknowledging receipt",
        "Work on both simultaneously with divided attention"
      ],
      correct: 0,
      category: "GeneralLifeUnderstanding",
      difficulty: "time_management",
      explanation: "Triage frameworks (Eisenhower Matrix) allow engineers to protect deep work while ensuring urgent issues are triaged."
    },
    {
      id: 9,
      question: "What is your perspective on sharing knowledge and mentoring junior teammates in your engineering team?",
      options: [
        "Active mentoring multiplies team velocity, reinforces your own mastery, and creates a positive culture",
        "Knowledge should be hoarded to make yourself indispensable",
        "Only managers should be responsible for helping juniors",
        "Mentoring is a waste of productive engineering hours"
      ],
      correct: 0,
      category: "GeneralLifeUnderstanding",
      difficulty: "leadership",
      explanation: "Senior engineering impact is measured by how much you elevate the capability of the engineers around you."
    },
    {
      id: 10,
      question: "When project goals change abruptly midway due to shifting market dynamics, how do you adapt?",
      options: [
        "Embrace agility, salvage reusable components, and align rapidly with the new strategic direction",
        "Resist the changes and complain about wasted past effort",
        "Slow down productivity in protest",
        "Continue building the deprecated feature secretly"
      ],
      correct: 0,
      category: "GeneralLifeUnderstanding",
      difficulty: "adaptability",
      explanation: "Adaptability and pragmatic resourcefulness are hallmarks of resilient engineering professionals."
    }
  ],

  WorkStyleProfiler: [
    {
      id: 1,
      question: "In your daily work workflow, which environment brings out your highest productivity and creativity?",
      options: [
        "Autonomous deep-focus sessions with clear milestone checkpoints",
        "Highly collaborative, fast-paced brainstorms with constant peer interaction",
        "Structured, process-driven environments with predefined daily templates",
        "Exploratory, open-ended research with freedom to experiment"
      ],
      correct: -1,
      category: "WorkStyleProfiler",
      difficulty: "profiler",
      explanation: "Helps map whether you thrive best in startup autonomy, agile pods, structured enterprise, or R&D labs."
    },
    {
      id: 2,
      question: "When tackling a large, ambiguous engineering feature, what is your preferred starting approach?",
      options: [
        "Decompose into smaller user stories and build a rapid working prototype (Agile MVP)",
        "Write comprehensive design specifications and edge-case diagrams before coding (Structured)",
        "Pair-program with a peer to bounce architectural ideas in real time (Collaborative)",
        "Research cutting-edge libraries and benchmark existing open-source solutions (Research-driven)"
      ],
      correct: -1,
      category: "WorkStyleProfiler",
      difficulty: "profiler",
      explanation: "Identifies your problem decomposition strategy and execution preferences."
    },
    {
      id: 3,
      question: "How do you prefer to communicate updates, blockers, and project progress to your team?",
      options: [
        "Asynchronous written summaries (Slack / PR comments / Notion docs)",
        "Quick daily standups and face-to-face video syncs",
        "Interactive dashboards, Kanban boards, and automated CI/CD metrics",
        "One-on-one deep syncs directly with the project lead"
      ],
      correct: -1,
      category: "WorkStyleProfiler",
      difficulty: "profiler",
      explanation: "Maps your communication preference for remote vs hybrid vs in-person engineering setups."
    },
    {
      id: 4,
      question: "When faced with conflicting priorities from multiple project stakeholders, what is your natural instinct?",
      options: [
        "Quantify business impact and effort matrix (RICE score) to propose an objective priority list",
        "Convene a quick alignment meeting with all stakeholders to reach direct consensus",
        "Focus on the customer-facing core feature first, deferring internal optimizations",
        "Rely on the team manager or scrum master to establish the official order"
      ],
      correct: -1,
      category: "WorkStyleProfiler",
      difficulty: "profiler",
      explanation: "Measures decision-making autonomy and stakeholder negotiation style."
    },
    {
      id: 5,
      question: "What type of team role do you naturally gravitate towards during group projects?",
      options: [
        "Technical Architect / Problem Solver (diving into difficult core algorithms)",
        "Team Coordinator / Driver (keeping everyone on schedule and removing roadblocks)",
        "User Experience & Quality Champion (ensuring polished UI, edge testing, and docs)",
        "Innovator / Feature Generator (proposing creative additions and improvements)"
      ],
      correct: -1,
      category: "WorkStyleProfiler",
      difficulty: "profiler",
      explanation: "Reveals your natural team persona: Individual Contributor, Team Lead, Product Engineer, or Innovator."
    },
    {
      id: 6,
      question: "How do you prefer to manage your work hours and schedule flexibility?",
      options: [
        "Flexible, results-oriented hours focused on output and deliverable quality",
        "Consistent, structured 9-to-5 working hours with clear separation from personal life",
        "Intense sprint bursts followed by relaxed maintenance cycles",
        "Time-blocked schedule with dedicated deep-work and collaboration windows"
      ],
      correct: -1,
      category: "WorkStyleProfiler",
      difficulty: "profiler",
      explanation: "Assesses workplace scheduling compatibility and stamina management."
    },
    {
      id: 7,
      question: "When reviewing a teammate's pull request or project deliverable, what is your primary focus?",
      options: [
        "Clean architecture, performance optimization, and maintainable design patterns",
        "Reliability, comprehensive test coverage, and security vulnerability prevention",
        "Code simplicity, readability, and adherence to team style conventions",
        "End-user impact, UX smoothness, and business logic completeness"
      ],
      correct: -1,
      category: "WorkStyleProfiler",
      difficulty: "profiler",
      explanation: "Shows your engineering quality philosophy and review standards."
    },
    {
      id: 8,
      question: "What motivates you most in your day-to-day engineering journey?",
      options: [
        "Solving intellectually challenging, complex technical problems",
        "Seeing real users benefit from products I have built and shipped",
        "Mastering cutting-edge tools and staying ahead of technological trends",
        "Building strong team bonds and winning hackathons / milestones together"
      ],
      correct: -1,
      category: "WorkStyleProfiler",
      difficulty: "profiler",
      explanation: "Identifies your intrinsic career drivers (Craftsmanship, User Impact, Tech Mastery, or Community)."
    },
    {
      id: 9,
      question: "How do you approach risk-taking and technical experimentation in production projects?",
      options: [
        "Calculate risk carefully, experiment in sandbox/feature flags, and roll out progressively",
        "Move fast, build proof-of-concepts, and iterate quickly based on live feedback",
        "Favor battle-tested, stable, conservative enterprise technologies over newest trends",
        "Conduct thorough benchmark comparisons before introducing any new dependency"
      ],
      correct: -1,
      category: "WorkStyleProfiler",
      difficulty: "profiler",
      explanation: "Evaluates risk tolerance: conservative stability vs progressive innovation."
    },
    {
      id: 10,
      question: "What is your ideal long-term career progression trajectory?",
      options: [
        "Individual Contributor (Staff / Principal Engineer / Domain Specialist)",
        "Engineering Management (Team Lead / Engineering Manager / Director)",
        "Product & Entrepreneurship (Product Manager / Tech Founder / CTO)",
        "Consultant & Solutions Architect (High-level system design across industries)"
      ],
      correct: -1,
      category: "WorkStyleProfiler",
      difficulty: "profiler",
      explanation: "Helps tailor your CareerPilot AI roadmaps for technical vs management vs entrepreneurial tracks."
    }
  ],

  TechInterestExplorer: [
    {
      id: 1,
      question: "Which aspect of modern software systems excites you the most?",
      options: [
        "Crafting intuitive, highly responsive, and beautiful user interfaces (Frontend & UX)",
        "Architecting resilient APIs, distributed databases, and high-throughput microservices (Backend)",
        "Training intelligent models, NLP pipelines, and Generative AI applications (AI & Data Science)",
        "Automating cloud infrastructure, CI/CD pipelines, and zero-downtime deployments (Cloud & DevOps)"
      ],
      correct: -1,
      category: "TechInterestExplorer",
      difficulty: "interest",
      explanation: "Identifies core domain affinity: Frontend, Backend, AI/Data, or DevOps/Cloud."
    },
    {
      id: 2,
      question: "If you had a free weekend to build a project from scratch, which one would you choose?",
      options: [
        "A real-time collaborative web app with WebSockets and rich interactive animations",
        "A high-performance algorithmic trading bot or custom search engine",
        "An AI agent that summarizes research papers and answers questions from PDFs",
        "A mobile health and fitness tracker with offline sync and wearable integration"
      ],
      correct: -1,
      category: "TechInterestExplorer",
      difficulty: "interest",
      explanation: "Reveals project inspiration and natural domain interest."
    },
    {
      id: 3,
      question: "Which technology stack or ecosystem are you most curious to master?",
      options: [
        "React, Next.js, TypeScript, Tailwind CSS, Framer Motion",
        "Node.js / Go / Python (FastAPI), PostgreSQL, Redis, Docker, Kafka",
        "PyTorch, LangChain, Hugging Face, Vector Databases, OpenAI/Gemini APIs",
        "AWS / GCP, Kubernetes, Terraform, Prometheus, Linux Kernel Internals"
      ],
      correct: -1,
      category: "TechInterestExplorer",
      difficulty: "interest",
      explanation: "Aligns your profile with specific industry tech stacks."
    },
    {
      id: 4,
      question: "When evaluating mobile vs web vs systems development, where do you see your passion?",
      options: [
        "Cross-platform mobile apps (Flutter / React Native) that millions use in their pockets",
        "Modern scalable web applications accessible to anyone through a browser",
        "Low-level systems, Embedded devices, IoT hardware, and robotics (C/C++, Rust)",
        "Cybersecurity, Penetration testing, and vulnerability defense (Ethical Hacking)"
      ],
      correct: -1,
      category: "TechInterestExplorer",
      difficulty: "interest",
      explanation: "Discovers specialized platform preferences."
    },
    {
      id: 5,
      question: "How do you feel about working with large datasets and mathematical modeling?",
      options: [
        "Fascinated — I love discovering hidden patterns, training models, and statistical insights",
        "Moderate — I prefer data engineering and building clean data pipelines/schemas",
        "Visual — I enjoy creating interactive data visualizations, dashboards, and reports",
        "Functional — I prefer building product features and user journeys over heavy math"
      ],
      correct: -1,
      category: "TechInterestExplorer",
      difficulty: "interest",
      explanation: "Determines compatibility with Data Science vs Data Engineering vs Product Development."
    },
    {
      id: 6,
      question: "Which of the following emerging technology frontiers interests you the most?",
      options: [
        "Autonomous AI Agents & Multi-Modal Foundation Models",
        "Edge Computing, WebAssembly (WASM), and High-Performance Web Engines",
        "Decentralized Systems, Blockchain Smart Contracts & Web3",
        "Quantum Computing & Next-Generation Post-Quantum Cryptography"
      ],
      correct: -1,
      category: "TechInterestExplorer",
      difficulty: "interest",
      explanation: "Explores next-generation technological interests."
    },
    {
      id: 7,
      question: "What type of problem would you find most satisfying to debug and solve?",
      options: [
        "A visual glitch or layout shift that feels clunky on mobile devices",
        "A database query taking 5 seconds that you optimize to 50 milliseconds with indexing",
        "An AI model producing hallucinations that you fix using RAG and prompt engineering",
        "A CI/CD deployment failure that you automate to deploy in under 2 minutes"
      ],
      correct: -1,
      category: "TechInterestExplorer",
      difficulty: "interest",
      explanation: "Reveals technical troubleshooting satisfaction and aptitude."
    },
    {
      id: 8,
      question: "Which role in a tech company sounds most appealing to you?",
      options: [
        "Frontend / Full Stack Software Engineer at a fast-growing consumer tech startup",
        "Machine Learning / AI Research Engineer at an AI lab or autonomous tech company",
        "Cloud Architect / DevOps Lead ensuring 99.999% uptime for enterprise systems",
        "Security Architect / White-Hat Hacker protecting critical financial infrastructure"
      ],
      correct: -1,
      category: "TechInterestExplorer",
      difficulty: "interest",
      explanation: "Helps anchor target dream job roles for personalized roadmap generation."
    },
    {
      id: 9,
      question: "How do you prefer to interact with hardware and physical computing?",
      options: [
        "Purely software — I prefer cloud, web, and abstract virtualized environments",
        "Connected systems — I love IoT devices, sensors, smart home tech, and Raspberry Pi",
        "Core hardware — I enjoy microcontrollers, PCB design, VLSI chips, and robotics",
        "Automotive & Industrial — I am fascinated by EV motors, avionics, and industrial automation"
      ],
      correct: -1,
      category: "TechInterestExplorer",
      difficulty: "interest",
      explanation: "Bridges software preferences with core engineering disciplines (ECE/EE/Mech)."
    },
    {
      id: 10,
      question: "What is your primary goal from your technical learning journey on CareerPilot?",
      options: [
        "Land a high-paying product company software engineering placement (SDE-1)",
        "Build a rock-solid portfolio of production SaaS & AI applications",
        "Crack competitive coding, gate exams, and technical interview rounds",
        "Gain cross-functional skills to launch my own tech startup"
      ],
      correct: -1,
      category: "TechInterestExplorer",
      difficulty: "interest",
      explanation: "Sets baseline milestone targets for your personalized CareerPilot profile."
    }
  ]
};

// Module normalization helper
function normalizeModuleName(rawModule) {
  if (!rawModule) return 'AptitudeModule';
  const lower = rawModule.toLowerCase();
  if (lower.includes('aptitude')) return 'AptitudeModule';
  if (lower.includes('general') || lower.includes('life')) return 'GeneralLifeUnderstanding';
  if (lower.includes('work') || lower.includes('style')) return 'WorkStyleProfiler';
  if (lower.includes('tech') || lower.includes('interest')) return 'TechInterestExplorer';
  return rawModule;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const rawModule = searchParams.get('module') || 'AptitudeModule';
    const normalizedModule = normalizeModuleName(rawModule);

    // If Gemini is available, attempt to dynamically generate custom variations
    if (genAI) {
      try {
        const candidateModels = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-2.0-flash", "gemini-pro"];
        let outputText = null;

        const prompt = `You are an expert career assessment developer. Generate exactly 10 engaging, high-quality multiple-choice questions for the assessment module titled "${normalizedModule}".

Module Guidelines:
1. "AptitudeModule" -> Quantitative math, logical reasoning, data interpretation, pattern puzzles. Include correct answers (0-3).
2. "GeneralLifeUnderstanding" -> Professional EQ, situational judgment, conflict resolution, work-life management. Include correct answers (0-3).
3. "WorkStyleProfiler" -> Work preferences, collaboration style, risk tolerance, leadership approach. (For preference questions with no wrong answer, set 'correct' to -1).
4. "TechInterestExplorer" -> Software development, AI/ML, cloud, data, hardware interests. (Set 'correct' to -1).

IMPORTANT: Return ONLY a valid JSON array of 10 objects. No markdown backticks outside JSON. Structure:
[
  {
    "id": 1,
    "question": "Clear question text?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct": 0,
    "category": "${normalizedModule}",
    "difficulty": "medium",
    "explanation": "Clear explanation of the solution or insight."
  }
]`;

        for (const modelName of candidateModels) {
          try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const timeoutPromise = new Promise((_, reject) =>
              setTimeout(() => reject(new Error("Timeout")), 12000)
            );

            const result = await Promise.race([
              model.generateContent(prompt),
              timeoutPromise
            ]);

            const res = await result.response;
            outputText = res.text();
            if (outputText && outputText.includes("[")) break;
          } catch (mErr) {
            console.warn(`Gemini model ${modelName} failed in assessment:`, mErr.message);
          }
        }

        if (outputText) {
          // Clean markdown JSON code fences
          let cleaned = outputText.replace(/```json/gi, '').replace(/```/g, '').trim();
          const jsonStart = cleaned.indexOf('[');
          const jsonEnd = cleaned.lastIndexOf(']');
          if (jsonStart !== -1 && jsonEnd !== -1) {
            cleaned = cleaned.substring(jsonStart, jsonEnd + 1);
          }

          const parsed = JSON.parse(cleaned);
          if (Array.isArray(parsed) && parsed.length >= 5) {
            const normalizedQuestions = parsed.map((q, idx) => ({
              ...q,
              id: idx + 1,
              category: normalizedModule
            }));

            return NextResponse.json({
              success: true,
              module: normalizedModule,
              questions: normalizedQuestions,
              source: "gemini_ai"
            });
          }
        }
      } catch (aiErr) {
        console.warn("[Assessment API] Gemini generation failed, serving curated bank:", aiErr.message);
      }
    }

    // Serve rich curated question bank (guaranteed reliability)
    const curatedQuestions = CURATED_ASSESSMENT_BANKS[normalizedModule] || CURATED_ASSESSMENT_BANKS.AptitudeModule;
    return NextResponse.json({
      success: true,
      module: normalizedModule,
      questions: curatedQuestions,
      source: "curated_bank"
    });

  } catch (error) {
    console.error('[Assessment API] Error in GET:', error);
    const params = new URL(request.url).searchParams;
    const rawModule = params.get('module') || 'AptitudeModule';
    const normalizedModule = normalizeModuleName(rawModule);
    const fallbackQuestions = CURATED_ASSESSMENT_BANKS[normalizedModule] || CURATED_ASSESSMENT_BANKS.AptitudeModule;

    return NextResponse.json({
      success: true,
      module: normalizedModule,
      questions: fallbackQuestions,
      source: "fallback_recovery"
    });
  }
}