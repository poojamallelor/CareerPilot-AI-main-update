import React, { useState } from "react";

const McqAssessment = () => {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // The MCQ data from your original file
  const mcq = {
    assessment: {
      title: "Senior Web Developer Assessment",
      sections: [
        {
          skill: "Back-End Web Development",
          questions: [
            {
              question:
                "Explain the concept of RESTful APIs and describe the key design principles involved in building a robust and scalable RESTful API.",
              options: [
                "A. RESTful APIs are stateless, use standard HTTP methods, and have a client-server architecture. Key principles include resource-based URLs, caching, and uniform interface.",
                "B. RESTful APIs are stateful, use custom HTTP methods, and require a complex client-server interaction. Key principles focus on data consistency.",
                "C. RESTful APIs are primarily used for internal communication within a monolithic application. Scalability is not a primary concern.",
                "D. RESTful APIs are a synonym for GraphQL and are primarily used for fetching data from a database.",
              ],
              answer: "A",
            },
            {
              question:
                "Describe different strategies for handling database transactions to ensure data consistency in a high-traffic web application. Include examples.",
              options: [
                "A. Optimistic locking is sufficient for all scenarios.",
                "B. Pessimistic locking is always the best approach.",
                "C. Transaction management techniques like two-phase commit (2PC) or XA transactions can be used for complex scenarios. Atomicity, consistency, isolation, and durability (ACID) properties should be considered.",
                "D. Database transactions are not necessary for high-traffic applications.",
              ],
              answer: "C",
            },
            {
              question:
                "How would you design a system to handle asynchronous tasks in a back-end application, such as sending emails or processing large files?",
              options: [
                "A. Use synchronous programming, blocking the main thread until the task completes.",
                "B. Implement a message queue system such as RabbitMQ or Kafka to handle asynchronous tasks.",
                "C. Rely on the operating system's built-in thread pool for all asynchronous operations.",
                "D. There is no need to handle asynchronous tasks; all tasks should be synchronous.",
              ],
              answer: "B",
            },
            {
              question:
                "Explain the difference between horizontal and vertical scaling in the context of backend systems. Provide examples of when each would be more appropriate.",
              options: [
                "A. Horizontal scaling adds more servers; vertical scaling upgrades existing servers. Horizontal is often preferred for scalability, while vertical is preferred for simplicity.",
                "B. Horizontal scaling upgrades existing servers; vertical scaling adds more servers. Vertical is always better.",
                "C. Both are the same thing.",
                "D. Neither are relevant for modern applications.",
              ],
              answer: "A",
            },
            {
              question:
                "Describe your experience with different database technologies (e.g., relational, NoSQL) and when you would choose one over the other. Provide specific examples.",
              options: [
                "A. I have only worked with MySQL and it's suitable for all applications.",
                "B. I have experience with various database types. Relational databases are best for structured data, while NoSQL databases are better for unstructured or semi-structured data, offering flexibility and scalability advantages in specific use cases (e.g., MongoDB for document storage, Cassandra for high-availability and scalability).",
                "C. Databases are irrelevant to backend development.",
                "D. I've only used in-memory databases.",
              ],
              answer: "B",
            },
          ],
        },
        {
          skill: "Software Development",
          questions: [
            {
              question:
                "Describe your experience with different software design patterns and provide examples of when you would use each. Explain the trade-offs involved in choosing a specific pattern.",
              options: [
                "A. I've only used singleton.",
                "B. I'm familiar with various patterns (e.g., MVC, Singleton, Factory, Observer). The choice depends on specific needs and considerations (e.g., scalability, maintainability, reusability).",
                "C. Design patterns are outdated and not relevant anymore.",
                "D. I don't use design patterns",
              ],
              answer: "B",
            },
            {
              question:
                "Explain the importance of unit testing and how you would approach writing effective unit tests. What testing frameworks are you familiar with?",
              options: [
                "A. Unit testing is unnecessary for larger projects.",
                "B. Unit testing ensures individual components function correctly and aids in debugging and refactoring. I use [mention specific frameworks like Jest, PHPUnit, etc.].",
                "C. Testing is only for junior developers.",
                "D. I do not write tests.",
              ],
              answer: "B",
            },
            {
              question:
                "How do you manage code versioning, branching strategies, and collaboration using Git?",
              options: [
                "A. I use Git only for committing code.",
                "B. I'm proficient in Git, utilizing branching strategies like Gitflow or GitHub flow for effective collaboration and version control. I understand merging, rebasing, and resolving conflicts.",
                "C. I've never used version control.",
                "D. I only use SVN.",
              ],
              answer: "B",
            },
            {
              question:
                "Explain SOLID principles and provide examples of how to apply them in object-oriented programming.",
              options: [
                "A. I'm not familiar with SOLID principles.",
                "B. SOLID principles (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion) guide robust and maintainable object-oriented design. I apply them by [provide concrete examples].",
                "C. SOLID is only for academic purposes.",
                "D. I've heard of SOLID but never used it.",
              ],
              answer: "B",
            },
            {
              question:
                "Describe your experience with debugging techniques and tools. How do you approach identifying and resolving complex software bugs?",
              options: [
                "A. I rely on trial and error.",
                "B. I use a systematic approach: logging, debugging tools (debuggers, profilers), and code analysis to pinpoint the root cause of bugs. I also leverage testing and version control to aid in the debugging process.",
                "C. Debugging is a waste of time.",
                "D. I don't know how to debug",
              ],
              answer: "B",
            },
          ],
        },
        {
          skill: "Object-Oriented Programming (OOP)",
          questions: [
            {
              question:
                "Explain the concept of polymorphism and give a real-world example of its application.",
              options: [
                "A. Polymorphism is not relevant to real-world applications.",
                "B. Polymorphism allows objects of different classes to be treated as objects of a common type. An example is a method that can process different shapes (circles, squares) without needing to know their specific type.",
                "C. Polymorphism is only used in game development.",
                "D. Polymorphism is a type of inheritance.",
              ],
              answer: "B",
            },
            {
              question:
                "Describe the principles of encapsulation and how it contributes to software maintainability and security.",
              options: [
                "A. Encapsulation is irrelevant to security.",
                "B. Encapsulation protects internal data by hiding implementation details and providing controlled access through methods. This improves maintainability and reduces the risk of unintended data modification, enhancing security.",
                "C. Encapsulation increases complexity and reduces flexibility.",
                "D. Encapsulation is only used in large projects.",
              ],
              answer: "B",
            },
            {
              question:
                "What is the difference between inheritance and composition in object-oriented programming? When would you prefer one over the other?",
              options: [
                "A. There is no difference between inheritance and composition.",
                'B. Inheritance establishes an "is-a" relationship, while composition establishes a "has-a" relationship. Composition is often preferred for flexibility and better code maintainability, reducing tight coupling.',
                "C. Inheritance is always better than composition.",
                "D. Composition is only used for small projects.",
              ],
              answer: "B",
            },
            {
              question:
                "Explain the concept of abstraction in OOP and provide a practical example of how it's used to simplify complex systems.",
              options: [
                "A. Abstraction is unnecessary in modern software.",
                "B. Abstraction hides complex implementation details and exposes only essential information to the user. For example, a car's driver doesn't need to know the inner workings of the engine to operate it.",
                "C. Abstraction makes code more difficult to understand.",
                "D. Abstraction only used for graphical user interfaces.",
              ],
              answer: "B",
            },
            {
              question:
                "Explain the concept of interfaces and abstract classes. When would you choose one over the other?",
              options: [
                "A. There is no difference between interfaces and abstract classes.",
                "B. Interfaces define a contract that classes must implement, while abstract classes provide partial implementations and can have concrete methods. Interfaces are typically used for defining behavior, while abstract classes are used for establishing a common base.",
                "C. Interfaces are never used in real-world applications.",
                "D. Abstract classes are more flexible than interfaces.",
              ],
              answer: "B",
            },
          ],
        },
        {
          skill: "Front-End Development",
          questions: [
            {
              question:
                "Describe your experience with modern JavaScript frameworks (React, Angular, Vue.js). Compare and contrast their strengths and weaknesses.",
              options: [
                "A. I only know vanilla Javascript.",
                "B. I have experience with [mention specific framework(s)], understanding their component-based architecture, state management, and routing mechanisms. I can articulate the trade-offs involved in choosing one framework over another based on project needs.",
                "C. Frameworks are outdated.",
                "D. I have not used any Javascript frameworks",
              ],
              answer: "B",
            },
            {
              question:
                "Explain how you would optimize a web page for performance, considering aspects like image optimization, code minification, and efficient use of CSS.",
              options: [
                "A. Performance optimization is not important.",
                "B. I would employ various techniques like image compression, code minification/bundling, lazy loading, efficient CSS usage (minimizing render blocking), and leveraging browser caching.",
                "C. I only use external libraries for optimization.",
                "D. Performance is only relevant for mobile devices.",
              ],
              answer: "B",
            },
            {
              question:
                "How would you implement responsive design principles to ensure a website looks good on different devices?",
              options: [
                "A. Responsive design is only relevant for mobile devices.",
                "B. I would use techniques like media queries, flexible layouts (grid, flexbox), and mobile-first development to create a responsive website that adapts to various screen sizes.",
                "C. Responsive design is not necessary anymore.",
                "D. I've never heard of responsive design.",
              ],
              answer: "B",
            },
            {
              question:
                "Describe your familiarity with front-end testing frameworks and methodologies. How do you approach writing effective front-end tests?",
              options: [
                "A. Front-end testing is unnecessary.",
                "B. I use [mention specific frameworks like Jest, Cypress, etc.] for unit, integration, and end-to-end testing. I write tests to ensure code functionality, usability, and responsiveness.",
                "C. Testing is only for backend development.",
                "D. I've never written front-end tests.",
              ],
              answer: "B",
            },
            {
              question:
                "Explain the concept of state management in a JavaScript application and describe different approaches you've used (e.g., Context API, Redux, Vuex).",
              options: [
                "A. State management is not needed in single page applications.",
                "B. State management is crucial for handling application data efficiently. I've used [mention specific methods] and can describe their strengths and weaknesses in different contexts.",
                "C. State management is only needed for large applications.",
                "D. I've never dealt with state management",
              ],
              answer: "B",
            },
          ],
        },
        {
          skill: "PHP Programming",
          questions: [
            {
              question:
                "Explain how you would use PHP to securely interact with a database, preventing SQL injection vulnerabilities.",
              options: [
                "A. I would directly concatenate user input into database queries.",
                "B. I would use parameterized queries or prepared statements to prevent SQL injection vulnerabilities.",
                "C. SQL injection is not a concern with PHP.",
                "D. I would sanitize user inputs manually.",
              ],
              answer: "B",
            },
            {
              question:
                "Describe your experience with PHP frameworks (Laravel, Symfony, CodeIgniter). Compare and contrast their features and when you would choose one over the other.",
              options: [
                "A. I only use vanilla PHP.",
                "B. I have experience with [mention specific framework(s)], understanding their routing, templating, and ORM features. I can explain when one might be better suited than another based on project complexity and requirements.",
                "C. Frameworks are only for beginners.",
                "D. I have not used any PHP frameworks.",
              ],
              answer: "B",
            },
            {
              question:
                "How would you handle sessions and user authentication securely in a PHP application?",
              options: [
                "A. I would store session data in cookies without encryption.",
                "B. I would use secure session management techniques, including HTTPS, secure cookie flags, and appropriate session handling methods, along with robust password hashing (e.g., bcrypt).",
                "C. Security is not a concern in PHP applications.",
                "D. I wouldn't use sessions.",
              ],
              answer: "B",
            },
            {
              question:
                "Explain how to use object-oriented programming principles in PHP to create reusable and maintainable code.",
              options: [
                "A. OOP is not necessary in PHP.",
                "B. I would utilize classes, objects, inheritance, polymorphism, and encapsulation to create structured, reusable, and maintainable PHP code.",
                "C. OOP only increases complexity.",
                "D. I prefer procedural programming in PHP.",
              ],
              answer: "B",
            },
            {
              question:
                "Describe your experience with different PHP extensions and libraries relevant to web development.",
              options: [
                "A. I have not used any PHP extensions.",
                "B. I'm familiar with extensions like [list examples, e.g., GD for image manipulation, mbstring for multibyte string handling, etc.], and commonly used libraries.",
                "C. Extensions are unnecessary.",
                "D. I only use default libraries.",
              ],
              answer: "B",
            },
          ],
        },
      ],
    },
  };

  const handleAnswer = (sectionIndex, questionIndex, optionLetter) => {
    const key = `${sectionIndex}-${questionIndex}`;
    setUserAnswers({
      ...userAnswers,
      [key]: optionLetter,
    });
  };

  const calculateScore = () => {
    let correct = 0;
    let total = 0;

    mcq.assessment.sections.forEach((section, sectionIndex) => {
      section.questions.forEach((question, questionIndex) => {
        const key = `${sectionIndex}-${questionIndex}`;
        total++;
        if (userAnswers[key] === question.answer) {
          correct++;
        }
      });
    });

    return {
      correct,
      total,
      percentage: Math.round((correct / total) * 100),
    };
  };

  const currentSection = mcq.assessment.sections[activeSectionIndex];
  const score = calculateScore();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-foreground" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* Header with title and theme toggle */}
      <header
        className={`p-4 ${
          darkMode ? "bg-gray-800" : "bg-white"
        } shadow-md fixed top-0 left-0 right-0 z-10`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">{mcq.assessment.title}</h1>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${
              darkMode
                ? "bg-gray-700 text-yellow-400"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      <div className="container mx-auto pt-20 pb-16 px-4">
        {/* Navigation tabs for sections */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex space-x-2 md:flex-wrap md:space-y-2">
            {mcq.assessment.sections.map((section, index) => (
              <button
                key={index}
                onClick={() => setActiveSectionIndex(index)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  activeSectionIndex === index
                    ? darkMode
                      ? "bg-blue-600 text-foreground"
                      : "bg-blue-500 text-foreground"
                    : darkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-white hover:bg-gray-100"
                } ${darkMode ? "border border-gray-700" : "shadow"}`}
              >
                {section.skill}
              </button>
            ))}
          </div>
        </div>

        {showResults ? (
          <div
            className={`rounded-lg p-6 ${
              darkMode ? "bg-gray-800" : "bg-white"
            } shadow-lg`}
          >
            <h2 className="text-2xl font-bold mb-4">Assessment Results</h2>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative w-48 h-48">
                <div
                  className={`w-48 h-48 rounded-full flex items-center justify-center text-3xl font-bold ${
                    score.percentage >= 70
                      ? "bg-green-100 text-green-800"
                      : score.percentage >= 50
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {score.percentage}%
                </div>
              </div>
              <div>
                <p className="text-lg mb-2">
                  You answered{" "}
                  <span className="font-bold">{score.correct}</span> out of{" "}
                  <span className="font-bold">{score.total}</span> questions
                  correctly.
                </p>
                <p className="text-lg mb-4">
                  {score.percentage >= 70
                    ? "Great job! You have a strong understanding of the concepts."
                    : score.percentage >= 50
                    ? "Good effort! With a bit more study, you can improve your score."
                    : "You might want to review the material again before retaking the assessment."}
                </p>
                <button
                  onClick={() => setShowResults(false)}
                  className={`px-4 py-2 rounded-lg ${
                    darkMode
                      ? "bg-primary hover:opacity-90 text-foreground"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-foreground`}
                >
                  Return to Assessment
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div
              className={`rounded-lg p-6 mb-4 ${
                darkMode ? "bg-gray-800" : "bg-white"
              } shadow-lg`}
            >
              <h2 className="text-xl font-bold mb-4">{currentSection.skill}</h2>

              {currentSection.questions.map((question, questionIndex) => {
                const questionKey = `${activeSectionIndex}-${questionIndex}`;
                const userAnswer = userAnswers[questionKey];

                return (
                  <div
                    key={questionIndex}
                    className={`mb-8 p-4 rounded-lg ${
                      darkMode ? "bg-gray-700" : "bg-gray-50"
                    }`}
                  >
                    <h3 className="text-lg font-medium mb-4">
                      <span className="font-bold text-blue-500">
                        Q{questionIndex + 1}.
                      </span>{" "}
                      {question.question}
                    </h3>
                    <div className="space-y-3">
                      {question.options.map((option, optionIndex) => {
                        const optionLetter = String.fromCharCode(
                          65 + optionIndex
                        ); // A, B, C, D

                        return (
                          <div
                            key={optionIndex}
                            onClick={() =>
                              handleAnswer(
                                activeSectionIndex,
                                questionIndex,
                                optionLetter
                              )
                            }
                            className={`p-3 rounded-lg cursor-pointer transition-all ${
                              userAnswer === optionLetter
                                ? darkMode
                                  ? "bg-blue-600 text-foreground"
                                  : "bg-blue-100 border-blue-500 border-2"
                                : darkMode
                                ? "bg-gray-800 hover:bg-gray-600"
                                : "bg-white hover:bg-gray-100 border border-gray-200"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                                  userAnswer === optionLetter
                                    ? darkMode
                                      ? "bg-white text-blue-600"
                                      : "bg-blue-500 text-foreground"
                                    : darkMode
                                    ? "bg-gray-600 text-foreground"
                                    : "bg-gray-200 text-gray-700"
                                }`}
                              >
                                {optionLetter}
                              </div>
                              <div className="flex-grow">
                                {option.substring(3)}{" "}
                                {/* Remove "A. ", "B. ", etc. */}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() =>
                  setActiveSectionIndex(Math.max(0, activeSectionIndex - 1))
                }
                disabled={activeSectionIndex === 0}
                className={`px-4 py-2 rounded-lg ${
                  activeSectionIndex === 0
                    ? darkMode
                      ? "bg-gray-700 cursor-not-allowed"
                      : "bg-gray-200 cursor-not-allowed"
                    : darkMode
                    ? "bg-primary hover:opacity-90 text-foreground"
                    : "bg-blue-500 hover:bg-blue-600 text-foreground"
                }`}
              >
                Previous
              </button>

              {activeSectionIndex === mcq.assessment.sections.length - 1 ? (
                <button
                  onClick={() => setShowResults(true)}
                  className={`px-4 py-2 rounded-lg ${
                    darkMode
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-green-500 hover:bg-green-600"
                  } text-foreground`}
                >
                  Submit Assessment
                </button>
              ) : (
                <button
                  onClick={() =>
                    setActiveSectionIndex(
                      Math.min(
                        mcq.assessment.sections.length - 1,
                        activeSectionIndex + 1
                      )
                    )
                  }
                  className={`px-4 py-2 rounded-lg ${
                    darkMode
                      ? "bg-primary hover:opacity-90 text-foreground"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-foreground`}
                >
                  Next
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* Progress indicator */}
      <div
        className={`fixed bottom-0 left-0 right-0 h-1 ${
          darkMode ? "bg-gray-700" : "bg-gray-200"
        }`}
      >
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{
            width: `${
              (Object.keys(userAnswers).length /
                mcq.assessment.sections.reduce(
                  (acc, section) => acc + section.questions.length,
                  0
                )) *
              100
            }%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default McqAssessment;
