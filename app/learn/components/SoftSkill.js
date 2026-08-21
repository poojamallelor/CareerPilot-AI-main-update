import React, { useState, useContext } from "react";
import { ThemeContext } from "../../components/ThemeContext";
import {
  Book,
  Youtube,
  Globe,
  CheckCircle2,
  XCircle,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../../../components/ui/button";

const SoftSkillsModern = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [activeCategory, setActiveCategory] = useState("PersonalSkills");
  const [expandedSkill, setExpandedSkill] = useState(null);

  // Data remains the same as the original component
  const soft_skills = {
    PersonalSkills: [
      {
        Skill: "Integrity",
        Description:
          "The quality of being honest and having strong moral principles.",
        Dos: [
          "Always be truthful in your actions and words.",
          "Admit mistakes and take responsibility.",
          "Maintain confidentiality where appropriate.",
          "Stand up for what is right, even under pressure.",
        ],
        Donts: [
          "Avoid dishonesty or deceitful behavior.",
          "Do not compromise ethics for personal gain.",
          "Avoid breaking promises or commitments.",
          "Do not ignore unethical practices.",
        ],
        Tips: [
          "Reflect regularly on your values and decisions.",
          "Seek feedback on your actions to ensure consistency with your principles.",
          "Surround yourself with ethical role models.",
        ],
        Resources: {
          Books: [
            "The Seven Habits of Highly Effective People by Stephen Covey",
            "Integrity: The Courage to Meet the Demands of Reality by Henry Cloud",
          ],
          YouTube: ["https://youtu.be/wE4c2nKPmZI"],
          Websites: ["https://www.skillsusa.org"],
        },
      },
      {
        Skill: "Work Ethic",
        Description:
          "A set of values based on hard work, diligence, and commitment to quality.",
        Dos: [
          "Be punctual and meet deadlines.",
          "Stay focused and avoid distractions.",
          "Take pride in delivering high-quality work.",
          "Maintain a positive and proactive attitude.",
        ],
        Donts: [
          "Avoid procrastination or delaying tasks.",
          "Don’t neglect responsibilities or assignments.",
          "Avoid taking shortcuts that compromise quality.",
          "Don’t show apathy towards tasks or goals.",
        ],
        Tips: [
          "Set daily goals to stay organized.",
          "Break tasks into smaller, manageable steps.",
          "Seek feedback to improve your performance.",
          "Practice self-discipline to remain consistent.",
        ],
        Resources: {
          Books: [
            "Grit: The Power of Passion and Perseverance by Angela Duckworth",
            "The 5 AM Club by Robin Sharma",
          ],
          YouTube: ["https://youtu.be/H14bBuluwB8"],
          Websites: ["https://www.skillsusa.org"],
        },
      },
      {
        Skill: "Professionalism",
        Description:
          "The conduct, behavior, and attitude expected in a workplace or professional setting.",
        Dos: [
          "Dress appropriately for the environment.",
          "Communicate respectfully and clearly.",
          "Be punctual and reliable.",
          "Maintain a positive attitude and demeanor.",
        ],
        Donts: [
          "Avoid inappropriate or casual behavior in professional settings.",
          "Do not ignore workplace policies or procedures.",
          "Avoid gossiping or spreading negativity.",
          "Do not neglect proper communication etiquette.",
        ],
        Tips: [
          "Observe and learn from experienced professionals.",
          "Keep personal issues separate from work.",
          "Continuously work on improving your soft skills.",
          "Stay updated on industry standards and trends.",
        ],
        Resources: {
          Books: [
            "The Power of Professionalism by Bill Wiersma",
            "The Essentials of Business Etiquette by Barbara Pachter",
          ],
          YouTube: ["https://youtu.be/4ovfXUtBiSI"],
          Websites: ["https://www.skillsusa.org"],
        },
      },
      {
        Skill: "Responsibility",
        Description:
          "The ability to be accountable for your actions, tasks, and obligations.",
        Dos: [
          "Take ownership of your tasks and outcomes.",
          "Meet deadlines and fulfill commitments.",
          "Acknowledge and learn from mistakes.",
          "Support and assist team members when needed.",
        ],
        Donts: [
          "Avoid blaming others for your mistakes.",
          "Do not neglect your duties or procrastinate.",
          "Avoid making excuses for incomplete work.",
          "Do not ignore constructive feedback.",
        ],
        Tips: [
          "Use a task management system to stay organized.",
          "Break larger tasks into smaller, actionable steps.",
          "Develop a habit of reflecting on your performance.",
          "Communicate proactively about challenges or delays.",
        ],
        Resources: {
          Books: [
            "Extreme Ownership by Jocko Willink and Leif Babin",
            "Accountability: The Key to Driving a High-Performance Culture by Greg Bustin",
          ],
          YouTube: ["https://youtu.be/UhX5ybYdqUE"],
          Websites: ["https://www.skillsusa.org"],
        },
      },
      {
        Skill: "Adaptability/Flexibility",
        Description:
          "The ability to adjust to new conditions and remain effective in changing situations.",
        Dos: [
          "Embrace change with a positive attitude.",
          "Learn new skills and approaches when required.",
          "Stay open to constructive feedback.",
          "Develop solutions to unexpected challenges.",
        ],
        Donts: [
          "Avoid resisting changes without understanding them.",
          "Do not cling to old methods when new ones are more effective.",
          "Avoid being dismissive of others' ideas.",
          "Do not panic in uncertain situations.",
        ],
        Tips: [
          "Practice mindfulness to stay calm during transitions.",
          "Continuously develop problem-solving skills.",
          "Seek opportunities to learn and grow.",
          "Build resilience by reflecting on past experiences.",
        ],
        Resources: {
          Books: [
            "Who Moved My Cheese? by Spencer Johnson",
            "The Power of Now by Eckhart Tolle",
          ],
          YouTube: ["https://youtu.be/xNQOQgLkD9g"],
          Websites: ["https://www.skillsusa.org"],
        },
      },
      {
        Skill: "Self-Motivation",
        Description:
          "The ability to set and achieve goals independently, without external encouragement.",
        Dos: [
          "Set clear, achievable goals.",
          "Break tasks into manageable steps.",
          "Stay focused on long-term objectives.",
          "Celebrate small wins to maintain momentum.",
        ],
        Donts: [
          "Avoid procrastination and distractions.",
          "Do not wait for external motivation.",
          "Avoid neglecting self-care while working towards goals.",
          "Do not lose sight of the bigger picture.",
        ],
        Tips: [
          "Create a vision board to visualize goals.",
          "Develop a routine to stay consistent.",
          "Find a source of inspiration or purpose.",
          "Track progress and adjust goals as needed.",
        ],
        Resources: {
          Books: [
            "Drive: The Surprising Truth About What Motivates Us by Daniel H. Pink",
            "Atomic Habits by James Clear",
          ],
          YouTube: ["https://youtu.be/7xzR3od-Fqk"],
          Websites: ["https://www.skillsusa.org"],
        },
      },
    ],
    WorkplaceSkills: [
      {
        Skill: "Communication",
        Description:
          "The ability to convey information effectively and listen actively in both verbal and written forms.",
        Dos: [
          "Listen attentively and respectfully.",
          "Be clear and concise when speaking or writing.",
          "Adapt your communication style to your audience.",
          "Use appropriate body language.",
        ],
        Donts: [
          "Interrupt others while they are speaking.",
          "Use jargon or overly technical terms when unnecessary.",
          "Ignore non-verbal cues.",
          "Speak in a way that may cause confusion or misinterpretation.",
        ],
        Tips: [
          "Practice active listening to ensure full understanding.",
          "Clarify and summarize key points to ensure understanding.",
          "Be open to feedback on your communication style.",
          "Engage in conversations with an open and positive mindset.",
        ],
        Resources: {
          Books: [
            "Crucial Conversations by Patterson, Grenny, McMillan, and Switzler",
            "The Art of Communication by Judy Apps",
          ],
          YouTube: ["https://youtu.be/J4TzPC8dJj4"],
          Websites: ["https://www.skillsusa.org"],
        },
      },
      {
        Skill: "Decision Making",
        Description:
          "The ability to make informed choices that lead to successful outcomes.",
        Dos: [
          "Analyze all available options.",
          "Consider short-term and long-term impacts.",
          "Involve relevant stakeholders when necessary.",
          "Trust your intuition, backed by facts.",
        ],
        Donts: [
          "Rush decisions without considering all factors.",
          "Make decisions based solely on emotion.",
          "Ignore feedback from others.",
          "Overthink and delay the decision unnecessarily.",
        ],
        Tips: [
          "Use a decision-making model to guide you.",
          "Seek advice from experienced peers.",
          "Take time to reflect on your decisions for continuous improvement.",
          "Learn from past decisions to avoid repeating mistakes.",
        ],
        Resources: {
          Books: [
            "Decisive by Chip Heath",
            "The Decision Book by Mikael Krogerus",
          ],
          YouTube: ["https://youtu.be/YxyGGCS9nLE"],
          Websites: ["https://www.skillsusa.org"],
        },
      },
      {
        Skill: "Teamwork",
        Description:
          "The ability to collaborate effectively with others to achieve common goals and objectives.",
        Dos: [
          "Respect each team member's contributions.",
          "Communicate openly and actively with teammates.",
          "Support and help others when needed.",
          "Be flexible and willing to compromise.",
        ],
        Donts: [
          "Avoid being passive or disengaged.",
          "Ignore team goals in favor of personal objectives.",
          "Disrespect other team members' ideas.",
          "Blame others when things go wrong.",
        ],
        Tips: [
          "Engage in regular team meetings to ensure alignment.",
          "Embrace diversity and different perspectives.",
          "Provide constructive feedback to your team members.",
          "Build trust by being dependable and transparent.",
        ],
        Resources: {
          Books: [
            "The Five Dysfunctions of a Team by Patrick Lencioni",
            "Team of Teams by General Stanley McChrystal",
          ],
          YouTube: ["https://youtu.be/0MD4Ymjycjc"],
          Websites: ["https://www.skillsusa.org"],
        },
      },
      {
        Skill: "Multicultural Sensitivity & Awareness",
        Description:
          "The ability to understand, appreciate, and respect cultural differences in a diverse environment.",
        Dos: [
          "Learn about different cultural backgrounds and practices.",
          "Be open-minded and avoid biases.",
          "Respect diverse viewpoints and traditions.",
        ],
        Donts: [
          "Avoid making assumptions about people based on their culture.",
          "Disrespect cultural differences.",
          "Ignore cultural norms in the workplace.",
        ],
        Tips: [
          "Engage in cultural awareness training.",
          "Practice active listening and empathy.",
          "Participate in cross-cultural events or discussions.",
        ],
        Resources: {
          Books: ["The Culture Map by Erin Meyer"],
          YouTube: ["https://youtu.be/5Y7bZfgz5B0"],
          Websites: ["https://www.skillsusa.org"],
        },
      },
      {
        Skill: "Planning, Organizing & Management",
        Description:
          "The ability to set clear goals, organize tasks, and manage resources efficiently to achieve desired outcomes.",
        Dos: [
          "Prioritize tasks based on importance and deadlines.",
          "Set realistic goals and timelines.",
          "Break large tasks into smaller, manageable steps.",
        ],
        Donts: [
          "Be disorganized or chaotic.",
          "Procrastinate or leave tasks until the last minute.",
          "Ignore the resources or team members needed for success.",
        ],
        Tips: [
          "Use task management tools like to-do lists or project management software.",
          "Plan ahead and review progress regularly.",
          "Keep communication clear and timely with team members.",
        ],
        Resources: {
          Books: [
            "Getting Things Done by David Allen",
            "The 7 Habits of Highly Effective People by Stephen Covey",
          ],
          YouTube: ["https://youtu.be/jU9a9zwbA5g"],
          Websites: ["https://www.skillsusa.org"],
        },
      },
      {
        Skill: "Leadership",
        Description:
          "The ability to guide, motivate, and inspire others to achieve common goals and drive organizational success.",
        Dos: [
          "Lead by example and set a positive tone.",
          "Encourage collaboration and open communication.",
          "Empower others by trusting them with responsibilities.",
        ],
        Donts: [
          "Avoid micromanaging or controlling every aspect.",
          "Ignore the input and needs of team members.",
          "Shy away from making tough decisions when necessary.",
        ],
        Tips: [
          "Develop emotional intelligence to connect with others.",
          "Continuously work on your communication and decision-making skills.",
          "Provide constructive feedback and recognize team members' efforts.",
        ],
        Resources: {
          Books: [
            "Leaders Eat Last by Simon Sinek",
            "The 5 Levels of Leadership by John C. Maxwell",
          ],
          YouTube: ["https://youtu.be/2t2v4E6uHCw"],
          Websites: ["https://www.skillsusa.org"],
        },
      },
    ],
    TechnicalSkillsGroundedInAcademics: [
      {
        Skill: "Computer & Technology Literacy",
        Description:
          "The ability to effectively use computers, software, and digital tools to perform tasks and solve problems.",
        Dos: [
          "Stay updated on new technology and software tools.",
          "Practice using different software applications.",
          "Understand the basics of computer systems and networks.",
        ],
        Donts: [
          "Avoid using outdated software.",
          "Disregard security practices or updates.",
          "Rely solely on one tool or system.",
        ],
        Tips: [
          "Learn new software relevant to your field.",
          "Take online courses or tutorials on new technologies.",
          "Practice basic troubleshooting skills.",
        ],
        Resources: {
          Books: ["Digital Literacy For Dummies by Faithe Wempen"],
          YouTube: ["https://youtu.be/GUHLdE_zY40"],
          Websites: ["https://www.skillsusa.org"],
        },
      },
      {
        Skill: "Job-Specific Skills",
        Description:
          "The expertise and knowledge directly relevant to a specific job or profession.",
        Dos: [
          "Keep your skills updated according to industry trends.",
          "Seek hands-on experience in your field.",
          "Learn tools and technologies specific to your profession.",
        ],
        Donts: [
          "Ignore evolving trends in your industry.",
          "Become complacent in your current skill set.",
        ],
        Tips: [
          "Take additional training or certifications.",
          "Engage in relevant projects or internships.",
        ],
        Resources: {
          Books: ["The Lean Startup by Eric Ries"],
          YouTube: ["https://youtu.be/7iCxHvA5W5M"],
          Websites: ["https://www.skillsusa.org"],
        },
      },
      {
        Skill: "Safety & Health",
        Description:
          "Knowledge of safe work practices and maintaining a healthy work environment.",
        Dos: [
          "Follow established safety protocols.",
          "Ensure proper use of safety equipment and tools.",
          "Promote a healthy work-life balance.",
        ],
        Donts: [
          "Ignore safety regulations.",
          "Neglect to report hazards in the workplace.",
        ],
        Tips: [
          "Stay informed on safety training and updates.",
          "Maintain awareness of potential health risks in your environment.",
        ],
        Resources: {
          Books: [
            "Safety Culture: An Innovative Leadership Approach by Dr. John E. Flin",
          ],
          YouTube: ["https://youtu.be/3guElR9H4KM"],
          Websites: ["https://www.skillsusa.org"],
        },
      },
      {
        Skill: "Service Orientation",
        Description:
          "A focus on helping others and providing high-quality customer service.",
        Dos: [
          "Listen actively to customer needs.",
          "Maintain a positive and professional attitude.",
          "Go the extra mile to exceed customer expectations.",
        ],
        Donts: [
          "Ignore customer feedback.",
          "Be dismissive or rude to customers.",
        ],
        Tips: [
          "Always put the customer first.",
          "Anticipate customer needs and resolve issues quickly.",
        ],
        Resources: {
          Books: ["The Service Profit Chain by James L. Heskett"],
          YouTube: ["https://youtu.be/Mk8vN_93seM"],
          Websites: ["https://www.skillsusa.org"],
        },
      },
      {
        Skill: "Professional Development",
        Description:
          "Ongoing learning and growth to advance in one’s career and improve professional capabilities.",
        Dos: [
          "Engage in continuous education and skill development.",
          "Seek mentorship and constructive feedback.",
          "Network with other professionals in your field.",
        ],
        Donts: [
          "Limit yourself to a fixed skill set.",
          "Ignore opportunities for personal and career growth.",
        ],
        Tips: [
          "Attend workshops, webinars, and industry conferences.",
          "Set clear goals for career advancement.",
        ],
        Resources: {
          Books: ["The 7 Habits of Highly Effective People by Stephen Covey"],
          YouTube: ["https://youtu.be/ToHZza0YgHA"],
          Websites: ["https://www.skillsusa.org"],
        },
      },
    ],
  };

  const categoryTitles = {
    PersonalSkills: "Personal Growth",
    WorkplaceSkills: "Professional Dynamics",
    TechnicalSkillsGroundedInAcademics: "Technical Foundations",
  };

  const handleSkillClick = (skillName) => {
    setExpandedSkill(expandedSkill === skillName ? null : skillName);
  };

  const handleBuildProfile = () => {
    const branch = localStorage.getItem("branch");
    if (branch === "Computer Science and Engineering") {
      window.location.href = "/params/page?page=githubProfile";
    } else {
      window.location.href = "/params/page?page=linkedinProfile";
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 py-8 px-4 md:px-8 lg:px-16 ${
      isDarkMode ? 'bg-[#0a0614] text-white' : 'bg-gradient-to-br from-purple-50/60 via-white to-indigo-50/50 text-stone-900'
    }`}>
      {/* Header */}
      <div className={`backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 text-center border ${
        isDarkMode ? 'bg-[#130c24]/80 border-[#2c1c4d]' : 'bg-white/60 border-purple-100'
      }`}>
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 mb-2">
          Professional Skills Mastery
        </h1>
        <p className={isDarkMode ? 'text-purple-300/80' : 'text-stone-600'}>
          Elevate your career potential by developing comprehensive professional competencies
        </p>
      </div>

      {/* Category Navigation */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {Object.keys(categoryTitles).map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2 rounded-full text-sm md:text-base font-semibold transition-all transform border-2
              ${
                activeCategory === category
                  ? "bg-purple-600 text-white border-purple-600 shadow-md"
                  : isDarkMode
                    ? "bg-[#130c24] text-purple-300 border-[#2c1c4d] hover:border-purple-500"
                    : "bg-white text-gray-600 hover:bg-purple-50 border-gray-200 hover:border-purple-300 shadow-sm"
              }`}
          >
            {categoryTitles[category]}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
        {soft_skills[activeCategory]?.map((skill) => (
          <div
            key={skill.Skill}
            className={`rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden border ${
              isDarkMode ? 'bg-[#130c24] border-[#2c1c4d]' : 'bg-white border-purple-100'
            }`}
          >
            <div
              onClick={() => handleSkillClick(skill.Skill)}
              className={`p-5 flex justify-between items-center cursor-pointer transition-colors group ${
                isDarkMode ? 'hover:bg-purple-950/20' : 'hover:bg-purple-50/50'
              }`}
            >
              <h2 className={`text-xl font-bold group-hover:text-purple-600 transition-colors ${
                isDarkMode ? 'text-purple-300' : 'text-purple-850'
              }`}>
                {skill.Skill}
              </h2>
              {expandedSkill === skill.Skill ? (
                <ChevronUp className="w-6 h-6 text-purple-500 group-hover:text-purple-600" />
              ) : (
                <ChevronDown className="w-6 h-6 text-purple-500 group-hover:text-purple-600" />
              )}
            </div>

            {expandedSkill === skill.Skill && (
              <div className={`p-5 space-y-4 transition-all border-t ${isDarkMode ? 'bg-[#0f091c] border-[#2c1c4d]' : 'bg-gray-50 border-purple-50'}`}>
                <p className="italic mb-4 opacity-80">{skill.Description}</p>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Dos Section */}
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-emerald-950/20 text-emerald-300' : 'bg-green-50 text-green-700'}`}>
                    <div className="flex items-center mb-3">
                      <CheckCircle2 className="w-5 h-5 mr-2 text-green-600" />
                      <h3 className="font-semibold text-green-800 dark:text-green-300">Do's</h3>
                    </div>
                    <ul className="space-y-2 text-green-700 dark:text-green-400">
                      {skill.Dos.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2 text-green-600">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Don'ts Section */}
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-rose-950/20 text-rose-300' : 'bg-red-50 text-red-700'}`}>
                    <div className="flex items-center mb-3">
                      <XCircle className="w-5 h-5 mr-2 text-red-600" />
                      <h3 className="font-semibold text-red-850 dark:text-rose-300">Don'ts</h3>
                    </div>
                    <ul className="space-y-2 text-red-700 dark:text-rose-450">
                      {skill.Donts.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2 text-red-600">✗</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tips Section */}
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-purple-950/20 text-purple-300' : 'bg-blue-50 text-blue-700'}`}>
                  <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-3">Pro Tips</h3>
                  <ul className="space-y-2 text-purple-700 dark:text-purple-400">
                    {skill.Tips.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 text-purple-600">💡</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Resources Section */}
                <div className={`p-4 rounded-lg border ${
                  isDarkMode ? 'bg-indigo-950/20 text-indigo-300 border-[#2c1c4d]' : 'bg-gray-100 text-gray-700 border-gray-250'
                }`}>
                  <h3 className="font-semibold mb-3">
                    Learning Resources
                  </h3>
                  <div className="space-y-3">
                    {skill.Resources.Books && (
                      <div className="flex items-center gap-3">
                        <Book className="w-5 h-5 text-purple-500" />
                        <div>
                          {skill.Resources.Books.map((book, index) => (
                            <p key={index} className="text-sm opacity-90">
                              {book}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                    {skill.Resources.YouTube && (
                      <div className="flex items-center gap-3">
                        <Youtube className="w-5 h-5 text-red-500" />
                        <a
                          href={skill.Resources.YouTube[0]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:underline font-semibold"
                        >
                          Video Tutorial
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {activeCategory === "TechnicalSkillsGroundedInAcademics" && (
        <div className="flex justify-center mt-5">
          <Button
            className="bg-primary hover:opacity-90 text-white"
            onClick={() => handleBuildProfile()}
          >
            Let's Build Profile
          </Button>
        </div>
      )}

      {/* Footer Note */}
      <div className={`mt-8 text-center ${isDarkMode ? 'text-purple-300/60' : 'text-gray-600'}`}>
        <p className="max-w-2xl mx-auto">
          Developed in collaboration with{" "}
          <Link
            href="https://www.skillsusa.org/"
            target="_blank"
            className="font-bold text-purple-600 hover:text-purple-800 transition-colors"
          >
            SkillsUSA
          </Link>{" "}
          to empower professional growth
        </p>
      </div>
    </div>
  );
};

export default SoftSkillsModern;
