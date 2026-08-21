import React, { useState, useRef, useEffect } from "react";
import { Mic, StopCircle, Camera, Play } from "lucide-react";

const Interview = () => {
  const [currentCategory, setCurrentCategory] = useState("General_Questions");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const [dynamicQuestions, setDynamicQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    "General_Questions",
    "Technical_Questions",
    "Behavioral_Questions",
    "Situational_Questions",
    "Closing_Questions"
  ];

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      try {
        const categoryMap = {
          "General_Questions": "general",
          "Technical_Questions": "technical",
          "Behavioral_Questions": "behavioral",
          "Situational_Questions": "behavioral",
          "Closing_Questions": "general"
        };
        const mappedCat = categoryMap[currentCategory] || "general";
        const res = await fetch(`/api/mock-interview/questions?category=${mappedCat}&difficulty=medium`);
        const data = await res.json();
        if (data.success && data.questions) {
          setDynamicQuestions(data.questions);
        } else {
          setDynamicQuestions(["Failed to fetch questions. Please proceed."]);
        }
      } catch (err) {
        setDynamicQuestions(["Error fetching questions. Check connection."]);
      } finally {
        setIsLoading(false);
        setCurrentQuestionIndex(0);
      }
    };
    fetchQuestions();
  }, [currentCategory]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        audioChunksRef.current = [];
        // Note: In a real app, you'd send this to a speech-to-text API
        setTranscription(
          "Sample transcription of your answer (actual transcription would require an API)"
        );
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone", err);
      alert("Could not access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < dynamicQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Move to next category or loop back
      const currentIndex = categories.indexOf(currentCategory);
      const nextIndex = (currentIndex + 1) % categories.length;
      setCurrentCategory(categories[nextIndex]);
    }
    // Reset transcription when moving to next question
    setTranscription("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Mock Interview Simulator
        </h1>

        {/* Category Selector */}
        <div className="flex justify-center mb-6 space-x-2 flex-wrap gap-y-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setCurrentCategory(category);
              }}
              className={`px-4 py-2 rounded ${
                currentCategory === category
                  ? "bg-blue-600 text-foreground"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {category.replace(/_/g, " ")}
            </button>
          ))}
        </div>

        {/* Question Display */}
        <div className="mb-6 text-center min-h-[100px] flex flex-col justify-center">
          <h2 className="text-xl font-semibold mb-4">
            {currentCategory.replace(/_/g, " ")}
          </h2>
          {isLoading ? (
            <div className="animate-pulse space-y-2 max-w-lg mx-auto w-full">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6 mx-auto"></div>
            </div>
          ) : (
            <p className="text-lg text-gray-700 transition-opacity duration-300">
              {dynamicQuestions[currentQuestionIndex]}
            </p>
          )}
        </div>

        {/* Camera and Recording Section */}
        <div className="flex justify-center items-center space-x-4 mb-6">
          {/* Camera Placeholder */}
          <div className="w-64 h-48 bg-gray-200 flex items-center justify-center">
            <Camera className="text-gray-500" size={48} />
            <p className="text-gray-500">Camera Preview</p>
          </div>

          {/* Recording Controls */}
          <div className="flex flex-col items-center space-y-4">
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="bg-green-500 text-foreground p-3 rounded-full hover:bg-green-600"
              >
                <Mic size={24} />
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="bg-red-500 text-foreground p-3 rounded-full hover:bg-red-600"
              >
                <StopCircle size={24} />
              </button>
            )}
            <button
              onClick={nextQuestion}
              className="bg-blue-500 text-foreground px-4 py-2 rounded hover:bg-blue-600"
            >
              Next Question <Play size={16} className="inline ml-2" />
            </button>
          </div>
        </div>

        {/* Transcription Display */}
        {transcription && (
          <div className="bg-gray-100 p-4 rounded-lg mt-4">
            <h3 className="font-semibold mb-2">Your Answer:</h3>
            <p className="text-gray-700">{transcription}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Interview;
