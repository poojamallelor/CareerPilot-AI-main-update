// import React, { useState } from "react";

// function JobAssessment() {
//   const [formData, setFormData] = useState({
//     userId: "",
//     mobile: "",
//     email: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [isFormValid, setIsFormValid] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });

//     validateField(name, value);
//   };

//   const validateField = (name, value) => {
//     let newErrors = { ...errors };

//     switch (name) {
//       case "userId":
//         if (!value.trim()) {
//           newErrors.userId = "User ID is required";
//         } else if (value.length < 4) {
//           newErrors.userId = "User ID must be at least 4 characters";
//         } else {
//           delete newErrors.userId;
//         }
//         break;

//       case "mobile":
//         const mobileRegex = /^[0-9]{10}$/;
//         if (!value.trim()) {
//           newErrors.mobile = "Mobile number is required";
//         } else if (!mobileRegex.test(value)) {
//           newErrors.mobile = "Please enter a valid 10-digit mobile number";
//         } else {
//           delete newErrors.mobile;
//         }
//         break;

//       case "email":
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!value.trim()) {
//           newErrors.email = "Email address is required";
//         } else if (!emailRegex.test(value)) {
//           newErrors.email = "Please enter a valid email address";
//         } else {
//           delete newErrors.email;
//         }
//         break;

//       default:
//         break;
//     }

//     setErrors(newErrors);

//     // Check if form is valid
//     const isValid =
//       Object.keys(newErrors).length === 0 &&
//       formData.userId.trim() !== "" &&
//       formData.mobile.trim() !== "" &&
//       formData.email.trim() !== "";

//     setIsFormValid(isValid);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Validate all fields
//     validateField("userId", formData.userId);
//     validateField("mobile", formData.mobile);
//     validateField("email", formData.email);

//     if (isFormValid) {
//       // Start the assessment
//       console.log("Assessment started with data:", formData);
//       // Here you would typically navigate to the assessment page or start the assessment
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg border">
//       <h1 className="text-2xl font-bold text-center mb-6">Job Assessment</h1>

//       <div className="mb-6 p-4 bg-blue-50 rounded-md">
//         <h2 className="font-semibold text-lg mb-2">Instructions:</h2>
//         <ul className="list-disc pl-5 space-y-1 text-sm">
//           <li>
//             Complete all fields in the form below before starting the
//             assessment.
//           </li>
//           <li>
//             The assessment consists of multiple-choice questions and practical
//             tasks.
//           </li>
//           <li>You will have 60 minutes to complete the assessment.</li>
//           <li>Ensure you have a stable internet connection before starting.</li>
//           <li>Do not refresh or close the browser during the assessment.</li>
//         </ul>
//       </div>

//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label
//             htmlFor="userId"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             User ID <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             id="userId"
//             name="userId"
//             value={formData.userId}
//             onChange={handleChange}
//             className={`w-full px-3 py-2 border rounded-md ${
//               errors.userId ? "border-red-500" : "border-gray-300"
//             }`}
//             placeholder="Enter your user ID"
//           />
//           {errors.userId && (
//             <p className="text-red-500 text-xs mt-1">{errors.userId}</p>
//           )}
//         </div>

//         <div className="mb-4">
//           <label
//             htmlFor="mobile"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Mobile Number <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="tel"
//             id="mobile"
//             name="mobile"
//             value={formData.mobile}
//             onChange={handleChange}
//             className={`w-full px-3 py-2 border rounded-md ${
//               errors.mobile ? "border-red-500" : "border-gray-300"
//             }`}
//             placeholder="Enter your 10-digit mobile number"
//           />
//           {errors.mobile && (
//             <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
//           )}
//         </div>

//         <div className="mb-6">
//           <label
//             htmlFor="email"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Email Address <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className={`w-full px-3 py-2 border rounded-md ${
//               errors.email ? "border-red-500" : "border-gray-300"
//             }`}
//             placeholder="Enter your email address"
//           />
//           {errors.email && (
//             <p className="text-red-500 text-xs mt-1">{errors.email}</p>
//           )}
//         </div>

//         <button
//           type="submit"
//           className={`w-full py-3 px-4 rounded-md text-foreground font-medium ${
//             isFormValid
//               ? "bg-green-600 hover:bg-green-700"
//               : "bg-gray-400 cursor-not-allowed"
//           }`}
//           disabled={!isFormValid}
//         >
//           Start Assessment
//         </button>
//       </form>
//     </div>
//   );
// }

// export default JobAssessment;

import React, { useState, useEffect } from "react";
import { Camera, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

export default function JobAssessment() {
  const [currentPhase, setCurrentPhase] = useState("profiling");
  const [timer, setTimer] = useState(300);
  const [cameraActive, setCameraActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const mcqQuestions = [
    {
      question: "Which of the following is NOT a feature of React.js?",
      options: [
        "Virtual DOM",
        "Two-way data binding",
        "Component-based architecture",
        "JSX syntax",
      ],
      correctAnswer: 1,
    },
    {
      question: "What does CSS stand for?",
      options: [
        "Cascading Style Sheets",
        "Computer Style Sheets",
        "Creative Style System",
        "Coded Style Structures",
      ],
      correctAnswer: 0,
    },
    {
      question: "Which data structure follows the LIFO principle?",
      options: ["Queue", "Stack", "Linked List", "Tree"],
      correctAnswer: 1,
    },
  ];

  useEffect(() => {
    let interval;
    if (currentPhase === "softskill" && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      if (currentPhase === "softskill") {
        setCurrentPhase("hardskill");
      }
    }

    return () => clearInterval(interval);
  }, [currentPhase, timer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handlePhaseChange = (phase) => {
    setCurrentPhase(phase);
    setSelectedAnswer(null);
    if (phase === "softskill") {
      setTimer(300);
    }
  };

  const handleCameraToggle = () => {
    setCameraActive(!cameraActive);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < mcqQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
    }
  };

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Mobile Header for Small Screens */}
      <div className="lg:hidden bg-white shadow-md p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Job Assessment</h2>
        <div className="flex items-center space-x-2">
          {["profiling", "softskill", "hardskill"].map((phase, index) => (
            <div
              key={phase}
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                currentPhase === phase
                  ? "bg-blue-500 text-foreground"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className="hidden lg:block w-64 bg-white shadow-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">Job Assessment</h2>
          <p className="text-sm text-gray-500 mt-1">
            Complete all three phases
          </p>
        </div>

        <div className="mt-6">
          {[
            { phase: "profiling", label: "Profiling" },
            { phase: "softskill", label: "Soft Skills" },
            { phase: "hardskill", label: "Hard Skills" },
          ].map((item) => (
            <div
              key={item.phase}
              className={`p-4 border-l-4 ${
                currentPhase === item.phase
                  ? "border-blue-500 bg-blue-50"
                  : "border-transparent"
              } cursor-pointer hover:bg-gray-50`}
              onClick={() => handlePhaseChange(item.phase)}
            >
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentPhase === item.phase
                      ? "bg-blue-500 text-foreground"
                      : "bg-gray-200"
                  }`}
                >
                  {["profiling", "softskill", "hardskill"].indexOf(item.phase) +
                    1}
                </div>
                <span className="ml-3 font-medium">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
        {/* Profiling Phase */}
        {currentPhase === "profiling" && (
          <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-6">Personal Information</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+1 (123) 456-7890"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resume/CV
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:bg-gray-50 transition-colors">
                  <p className="text-gray-500 mb-4">
                    Drag and drop your file here or
                  </p>
                  <button
                    type="button"
                    className="px-4 py-2 bg-blue-500 text-foreground rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Browse files
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-6 py-3 bg-blue-500 text-foreground rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
                  onClick={() => handlePhaseChange("softskill")}
                >
                  Next: Soft Skills <ChevronRight className="ml-2" size={20} />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Soft Skills Phase */}
        {currentPhase === "softskill" && (
          <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <h3 className="text-xl font-semibold mb-4 sm:mb-0">
                Soft Skills Assessment
              </h3>
              <div className="flex items-center space-x-4">
                <div className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
                  Time Remaining: {formatTime(timer)}
                </div>
                <button
                  className={`p-2 rounded-full ${
                    cameraActive ? "bg-red-500 text-foreground" : "bg-gray-200"
                  }`}
                  onClick={handleCameraToggle}
                >
                  <Camera size={20} />
                </button>
              </div>
            </div>

            {cameraActive && (
              <div className="mb-6 bg-black h-48 md:h-64 rounded-lg flex items-center justify-center">
                <div className="text-foreground">Camera Preview (Simulated)</div>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">
                  Tell us about a challenging situation at work and how you
                  handled it.
                </h4>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe a challenging work situation, the actions you took, and the outcome..."
                ></textarea>
              </div>

              <div>
                <h4 className="font-medium mb-3">
                  How do you prioritize tasks when you have multiple deadlines?
                </h4>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Explain your approach to managing multiple priorities and meeting deadlines..."
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
                <button
                  type="button"
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
                  onClick={() => handlePhaseChange("profiling")}
                >
                  <ChevronLeft className="mr-2" size={20} /> Back: Profiling
                </button>
                <button
                  type="button"
                  className="px-6 py-3 bg-blue-500 text-foreground rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
                  onClick={() => handlePhaseChange("hardskill")}
                >
                  Next: Hard Skills <ChevronRight className="ml-2" size={20} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Hard Skills Phase */}
        {currentPhase === "hardskill" && (
          <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-6">
              Hard Skills Assessment
            </h3>

            <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
              <span className="text-sm font-medium text-gray-500 mb-2 sm:mb-0">
                Question {currentQuestion + 1} of {mcqQuestions.length}
              </span>
              <span className="text-sm font-medium text-blue-500">
                Time: No limit
              </span>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg mb-6">
              <h4 className="font-medium mb-4">
                {mcqQuestions[currentQuestion].question}
              </h4>
              <div className="space-y-3">
                {mcqQuestions[currentQuestion].options.map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-center p-3 rounded-md cursor-pointer transition-colors ${
                      selectedAnswer === index
                        ? "bg-blue-100 border border-blue-300"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    <input
                      type="radio"
                      id={`option-${index}`}
                      name="mcq-answer"
                      checked={selectedAnswer === index}
                      onChange={() => handleAnswerSelect(index)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 mr-3"
                    />
                    <label
                      htmlFor={`option-${index}`}
                      className="text-gray-700 flex-1"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="flex space-x-4">
                <button
                  type="button"
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
                  onClick={() => handlePhaseChange("softskill")}
                >
                  <ChevronLeft className="mr-2" size={20} /> Soft Skills
                </button>
                <button
                  type="button"
                  disabled={currentQuestion === 0}
                  className={`px-6 py-3 border border-gray-300 text-gray-700 rounded-md ${
                    currentQuestion > 0
                      ? "hover:bg-gray-50"
                      : "opacity-50 cursor-not-allowed"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center`}
                  onClick={handlePrevQuestion}
                >
                  <ChevronLeft className="mr-2" size={20} /> Previous
                </button>
              </div>

              <div>
                {currentQuestion < mcqQuestions.length - 1 ? (
                  <button
                    type="button"
                    className="px-6 py-3 bg-blue-500 text-foreground rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
                    onClick={handleNextQuestion}
                  >
                    Next <ChevronRight className="ml-2" size={20} />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="px-6 py-3 bg-green-600 text-foreground rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center"
                  >
                    Submit Assessment{" "}
                    <CheckCircle2 className="ml-2" size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
