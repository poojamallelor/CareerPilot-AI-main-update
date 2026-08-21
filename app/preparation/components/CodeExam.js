// generate feedback here
import React, { useState, useEffect, useRef } from "react";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Play,
  Square,
  ArrowBigLeft,
} from "lucide-react";
import { FaArrowLeft } from "react-icons/fa";
import CodingRoundFeedback from "./CodingRoundFeedback";
import { AiCodingRoundFeedback } from '../../../config/AiModels';
import CodeEditor from "./Ediotor";

const CodingAssessment = ({ stateExam, questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [code, setCode] = useState("");
  const [exam, setExam] = useState("");
  const [check, setCheck] = useState(false);

  const textareaRef = useRef(null);

  useEffect(() => {
    let timer;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer); // Cleanup the timer when the component unmounts or timer stops
  }, [isTimerRunning, timeLeft]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isTimerRunning) {
        alert(
          "You have switched tabs! Please stay on this page while the timer is running."
        );
        setIsTimerRunning(false);
      }
    };

    const handleResize = () => {
      if (isTimerRunning) {
        alert(
          "Screen size changed! Split screen use is not allowed while the timer is running."
        );
        setIsTimerRunning(false);
      }
    };

    // Listen for visibility changes (tab switching)
    document.addEventListener("visibilitychange", handleVisibilityChange);
    // Listen for window resizing (split screen or window resizing)
    window.addEventListener("resize", handleResize);

    // Cleanup listeners on component unmount
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
    };
  }, [isTimerRunning]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the textarea and the timer is running
      if (textareaRef.current && !textareaRef.current.contains(event.target)) {
        if (isTimerRunning) {
          alert("You clicked outside the textarea while the timer is running!");
          setIsTimerRunning(false);
        }
      }
    };

    // Add event listener for detecting clicks outside the textarea
    document.addEventListener("click", handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isTimerRunning]);

  const startTimer = () => {
    const minutes = parseInt(questions[currentQuestionIndex].time_required);
    setTimeLeft(minutes * 60);
    setIsTimerRunning(true);
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "easy":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "hard":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const submitAnswer = async (currentQuestionIndex) => {
    if (isTimerRunning) {
      stopTimer();
    }
    const answer = code.trim();
    const prompt = `question:${questions[currentQuestionIndex].question},solution:${answer},check the solution and give feedback,include question,ideal answer (<precode> formate ) ,my misteks if ,way to improve.in json formate.`;
    try {
      const result = await AiCodingRoundFeedback.sendMessage(prompt);
      const resonseText = await result.response.text();
      console.log(resonseText);
      setExam(JSON.parse(resonseText));
      setCheck(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Header */}
        <div className="bg-blue-600 text-foreground p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold flex gap-2 items-center">
            <FaArrowLeft
              onClick={() => stateExam(false)}
              className="cursor-pointer"
              title="Go Back"
            />{" "}
            Coding Assessment
          </h1>
          <p className="text-blue-100 ml-8">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Question Panel */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <span
                className={`${getLevelColor(
                  questions[currentQuestionIndex].level
                )} text-foreground px-3 py-1 rounded-full text-sm`}
              >
                {questions[currentQuestionIndex].level}
              </span>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-blue-600 font-mono">
                  {isTimerRunning
                    ? formatTime(timeLeft)
                    : questions[currentQuestionIndex].time_required}
                </span>
              </div>
            </div>

            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              {questions[currentQuestionIndex].question}
            </h2>
            <div>
              <p>
                {" "}
                <span className="font-semibold">Input:</span>{" "}
                {questions[currentQuestionIndex].input}
              </p>
              <p>
                {" "}
                <span className="font-semibold">Output:</span>
                {questions[currentQuestionIndex].output}
              </p>
            </div>
            <div className="flex space-x-2 mt-5">
              {!isTimerRunning ? (
                <button
                  onClick={startTimer}
                  className="flex items-center space-x-2 bg-blue-600 text-foreground px-4 py-2 rounded hover:bg-blue-700"
                >
                  <Play className="w-4 h-4" />
                  <span>Start Timer</span>
                </button>
              ) : (
                <button
                  onClick={stopTimer}
                  className="flex items-center space-x-2 bg-red-600 text-foreground px-4 py-2 rounded hover:bg-red-700"
                >
                  <Square className="w-4 h-4" />
                  <span>Stop Timer</span>
                </button>
              )}
            </div>
          </div>

          {/* Code Editor */}
          <CodeEditor
            code={code}
            setCode={setCode}
            isTimerRunning={isTimerRunning}
            onSubmit={submitAnswer}
            currentQuestionIndex={currentQuestionIndex}
          />
        </div>

        {check && <CodingRoundFeedback feedback={exam} />}

        {/* Navigation */}
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-lg">
          <button
            onClick={() => {
              setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
            }}
            disabled={currentQuestionIndex === 0 || isTimerRunning} // Disable if no timer or at first question
            className="flex items-center space-x-2 px-4 py-2 text-blue-600 disabled:text-gray-400"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>
          <button
            onClick={() => {
              setCode("");
              setCheck(false);
              setCurrentQuestionIndex((prev) =>
                Math.min(questions.length - 1, prev + 1)
              );
            }}
            disabled={
              currentQuestionIndex === questions.length - 1 || isTimerRunning
            } // Disable if no timer or at last question
            className="flex items-center space-x-2 px-4 py-2 text-blue-600 disabled:text-gray-400"
          >
            <span>Next</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodingAssessment;
