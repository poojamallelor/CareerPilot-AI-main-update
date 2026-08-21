"use client";
import { doc, getDoc } from "firebase/firestore";
import {
    Camera,
    CameraOff,
    ChevronLeft,
    ChevronRight,
    ListVideo,
    Mic,
    RotateCcw,
    StopCircle,
    Timer,
    Volume2,
    VolumeX
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Textarea } from "../../../../components/ui/textarea";
import { AiFeedbackReport } from '../../../../config/AiModels';
import { db } from "../../../../lib/firebaseConfig";
import LoadingDialog from "../../../components/LoadingDialog";
import InterviewFeedbackUI from "../components/InterviewFeedbackUI";

const MockInterview = () => {
  const [isItRecording, setIsItRecording] = useState(false);
  const [err, setErr] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState([]);
  const [timeLeft, setTimeLeft] = useState(120);
  const [cameraOn, setCameraOn] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showResponses, setShowResponses] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("General_Questions");
  const [complete, setComplete] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [ok, setOk] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);
  const params = useParams();
  const mockId = params.mockId;
  const [mockData, setMockData] = useState(null);

  useEffect(() => {
    const fetchMockData = async () => {
      if (!mockId) return;
      try {
        const docRef = doc(db, "mockinterview", mockId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          // Check if the mockId field inside the document matches the actual document ID
          if (data.mockId === mockId) {
            setMockData(data);
            // Extract questions from the mock data
            if (data.questions && Array.isArray(data.questions)) {
              setQuestions(data.questions);
              setOk(true);
            }
            console.log("Document data:", data);
          } else {
            console.log("mockId mismatch inside the document.");
          }
        } else {
          console.log("Document does not exist.");
        }
      } catch (err) {
        console.log("Error fetching data: " + err.message);
      }
    };

    fetchMockData();
  }, [mockId]);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
    speechRecognitionProperties: {
      interimResults: true,
      lang: 'en-US'
    },
    timeout: 10000, // Increase timeout to 10 seconds
  });

  // Add microphone permission state
  const [micPermission, setMicPermission] = useState(false);
  const [permissionError, setPermissionError] = useState("");

  // Check microphone permission on component mount
  useEffect(() => {
    const checkMicPermission = async () => {
      try {
        if (typeof navigator !== 'undefined' && navigator.mediaDevices) {
          // Request permission
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          // If successful, stop the stream and set permission to true
          stream.getTracks().forEach(track => track.stop());
          setMicPermission(true);
          setPermissionError("");
        }
      } catch (error) {
        console.error("Microphone permission error:", error);
        setMicPermission(false);
        if (error.name === 'NotAllowedError') {
          setPermissionError("Microphone access denied. Please allow microphone access in your browser settings.");
        } else if (error.name === 'NotFoundError') {
          setPermissionError("No microphone found. Please connect a microphone and try again.");
        } else {
          setPermissionError("Unable to access microphone. Please check your browser settings.");
        }
      }
    };

    checkMicPermission();
  }, []);

  useEffect(() => {
    if (results.length > 0) {
      const newAnswer = results.map((result) => result.transcript).join(" ");
      setUserAnswer((prevAnswer) => prevAnswer + " " + newAnswer);
      setResults([]);
    }
  }, [results, setResults]);

  useEffect(() => {
    if (isItRecording) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsItRecording(false);
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isItRecording]);

  const toggleCamera = async () => {
    try {
      if (!cameraOn) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraOn(true);
      } else {
        streamRef.current?.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
        setCameraOn(false);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const toggleSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(
        mockData?.questions[currentCategory][currentQuestion]
      );
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
      handleStop();
    }
  };
  const handleNextQuestion = () => {
    if (isItRecording) stopSpeechToText();
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    if (currentQuestion < mockData?.questions[currentCategory].length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimeLeft(120);
      setIsItRecording(false);
    }
    if (currentQuestion === mockData?.questions[currentCategory].length - 1) {
      switch (currentCategory) {
        case "General_Questions":
          setCurrentCategory("Technical_Questions");
          setCurrentQuestion(0);
          break;
        case "Technical_Questions":
          setCurrentCategory("Situational_Questions");
          setCurrentQuestion(0);
          break;
        case "Situational_Questions":
          setCurrentCategory("Closing_Questions");
          setCurrentQuestion(0);
          break;
        case "Closing_Questions":
          setComplete(true);
          break;
        default:
          setCurrentCategory("General_Questions");
          setCurrentQuestion(0);
          break;
      }
    }
    setUserAnswer("");
    setFeedback("");
  };

  const handleReset = () => {
    if (isItRecording) stopSpeechToText();
    if (isSpeaking) window.speechSynthesis.cancel();
    setCurrentQuestion(0);
    setResponses([]);
    setTimeLeft(120);
    setUserAnswer("");
    setIsSpeaking(false);
  };

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      window.speechSynthesis.cancel();
      if (isItRecording) stopSpeechToText();
    };
  }, []);

  const myvideoRef = useRef(null);

  const handlePlay = () => {
    if (myvideoRef.current) {
      myvideoRef.current.play();
    }
  };
  const handleStop = () => {
    if (myvideoRef.current) {
      myvideoRef.current.pause(); // Correct usage
    }
  };
  const handleRestart = () => {
    if (myvideoRef.current) {
      myvideoRef.current.currentTime = 0; // Reset the video to the start
      myvideoRef.current.play(); // Play the video
    }
  };

  const handleFeedback = async () => {
    if (userAnswer !== "" && userAnswer.length >= 10) {
      if (!feedback) {
        setLoading(true);
        const prompt = `generate feedback report to the ${currentCategory} given by user.include user_answer,ideal_answer,my_mistakes,Area_of_improvements,feedback,rating(out of 5),conclusion.Question:${mockData?.questions?.[currentCategory][currentQuestion]}.User Answer:${userAnswer}.in json formate.`;
        try {
          const result = await AiFeedbackReport.sendMessage(prompt);
          const responseText = result.response.text();
          console.log(responseText);
          const feedbackjson = JSON.parse(responseText);
          setFeedback(feedbackjson);
          setShowResponses(true);
          localStorage.setItem("feedback", JSON.stringify(feedbackjson));
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      } else {
        // setFeedback(feedback);
        setShowResponses(true);
      }
    } else {
      alert("Please enter your answer first");
    }
  };
  return (
    <div className="max-w-8xl mx-auto p-6 space-y-1">
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-none">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            AI-Powered Mock Interview
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Video and Controls */}
        <div className="space-y-4  p-2 border rounded-lg">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-video bg-background">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                {!cameraOn && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                    <CameraOff size={48} className="mb-2" />
                    <span className="text-sm">Camera is disabled</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-4">
            <button
              onClick={toggleCamera}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                cameraOn
                  ? "bg-red-100 text-red-600 hover:bg-red-200"
                  : "bg-blue-100 text-blue-600 hover:bg-blue-200"
              }`}
            >
              {cameraOn ? <CameraOff size={20} /> : <Camera size={20} />}
              <span>{cameraOn ? "Stop Camera" : "Start Camera"}</span>
            </button>

            {showResponses ? (
              <button
                onClick={() => {
                  setShowResponses(false);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  showResponses
                    ? "bg-purple-100 text-purple-600 hover:bg-purple-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <ListVideo size={20} />
                <span>Hide Feedback</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  handleFeedback();
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  showResponses
                    ? "bg-purple-100 text-purple-600 hover:bg-purple-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                disabled={!cameraOn}
                title={!cameraOn && "Enable Camera"}
              >
                <ListVideo size={20} />
                <span>View Feedback</span>
              </button>
            )}
            <LoadingDialog loading={loading} />
          </div>
          <div>
            <p className="font-bold">Your Answer:</p>
            <Textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={!cameraOn}
              title={!cameraOn && "Enable Camera"}
              placeholder="Your answer will appear here as you speak or you can type it yourself..."
              className="w-full h-32 "
            />
          </div>

          <div className="flex justify-between mt-4 ">
            <button
              onClick={() =>
                currentQuestion > 0 && setCurrentQuestion((prev) => prev - 1)
              }
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentQuestion > 0
                  ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  : "bg-gray-50 text-gray-400 cursor-not-allowed"
              }`}
              disabled={currentQuestion === 0}
            >
              <ChevronLeft size={20} />
              <span>Previous</span>
            </button>
            {complete ? (
              <Button>Complete</Button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  !showResponses && cameraOn
                    ? "bg-blue-600 text-foreground hover:bg-blue-700"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
                disabled={showResponses || !cameraOn}
                title={!cameraOn && "Enable Camera"}
              >
                <span>Next</span>
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Right Panel - Interview Interface */}
        {!showResponses ? (
          <Card className="bg-white">
            <CardContent className="p-6">
              {/* Progress and Timer */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-32 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 transition-all duration-300"
                      style={{
                        width: `${
                          ((currentQuestion + 1) /
                            mockData?.questions?.[currentCategory]?.length) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-600">
                    {currentQuestion + 1}/
                    {mockData?.questions?.[currentCategory].length}
                  </span>
                  <span>({currentCategory})</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Button
                    onClick={() => {
                      localStorage.removeItem("questions");
                      setOk(false);
                    }}
                  >
                    <Timer size={18} />
                    Quit Interview
                  </Button>
                </div>
              </div>

              {/* video hire */}
              <div>
                <div className="video-container">
                  <video
                    ref={myvideoRef}
                    controls
                    width="600"
                    height="400"
                    preload="metadata"
                  >
                    <source src={"/tell5.mp4"} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              {/* Current Question */}
              <div className="bg-gray-50 p-6 rounded-xl mb-0">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-lg font-medium leading-relaxed">
                    {mockData?.questions?.[currentCategory][currentQuestion]}
                  </p>
                  <button
                    onClick={() => {
                      toggleSpeech();
                    }}
                    className={`p-2 rounded-full transition-colors ${
                      isSpeaking
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {isSpeaking ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                  {isSpeaking ? (handleRestart(), handlePlay()) : handleStop()}
                </div>
              </div>

              {/* Permission Error Display */}
              {permissionError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 text-red-700">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Microphone Access Required</span>
                  </div>
                  <p className="text-red-600 text-sm mt-1">{permissionError}</p>
                </div>
              )}

              {/* Recording Controls */}
              <div className="flex justify-center gap-6 mb-8">
                <Button
                  className={`p-4 rounded-full transition-all ${
                    isRecording
                      ? "bg-red-100 text-red-600 hover:bg-red-200"
                      : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                  }`}
                  variant={isRecording ? "destructive" : "default"}
                  onClick={isRecording ? stopSpeechToText : startSpeechToText}
                  disabled={!cameraOn || !micPermission}
                  title={
                    !cameraOn
                      ? "Enable Camera"
                      : !micPermission
                      ? "Microphone access required"
                      : ""
                  }
                >
                  {isRecording ? (
                    <div className="flex items-center space-x-2">
                      <StopCircle className="h-5 w-5" />
                      <span>Stop Recording</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Mic className="h-5 w-5" />
                      <span>Start Recording</span>
                    </div>
                  )}
                </Button>
                <button
                  onClick={handleReset}
                  className="rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  <RotateCcw size={24} />
                </button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-white">
            <CardContent className="p-6">
              {!feedback && (
                <>
                  <h3 className="text-xl font-bold mb-6">Recorded Responses</h3>
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <ListVideo size={48} className="mx-auto mb-4" />
                      <p className="text-gray-500">{feedback.question}</p>
                      <p className="text-sm text-gray-400 mt-2">
                        Start the interview to begin recording your answers
                      </p>
                    </div>
                  </div>
                </>
              )}
              <div className=" ">
                <InterviewFeedbackUI feedback={feedback} />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MockInterview;
