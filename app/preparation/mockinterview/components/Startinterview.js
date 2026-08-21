"use client";
import { doc, getDoc } from "firebase/firestore";
import { Camera, CameraOff, ChevronLeft, ChevronRight, ListVideo, Mic, RotateCcw, StopCircle, Timer, Volume2, VolumeX } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Textarea } from "../../../../components/ui/textarea";
import { AiFeedbackReport } from "../../../../config/AiModels";
import { db } from "../../../../lib/firebaseConfig";
import LoadingDialog from "../../../components/LoadingDialog";
import InterviewFeedbackUI from "./InterviewFeedbackUI";

const MockInterview = ({ questions, setOk }) => {
  const [isItRecording, setIsItRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // simple countdown removed in UI; keep structure minimal
  const [cameraOn, setCameraOn] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showResponses, setShowResponses] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("General_Questions");
  const [complete, setComplete] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const myvideoRef = useRef(null);
  const params = useParams();
  const mockId = params.mockId;

  useEffect(() => {
    const fetchMockData = async () => {
      if (!mockId) return;
      try {
        const docRef = doc(db, "mockinterview", mockId);
        await getDoc(docRef); // ensure firestore works; data not used here
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchMockData();
  }, [mockId]);

  const { isRecording, results, startSpeechToText, stopSpeechToText, setResults } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
    speechRecognitionProperties: {
      interimResults: true,
      lang: 'en-US'
    },
    timeout: 10000, // Increase timeout to 10 seconds
  });

  // Add microphone permission check
  const [micPermission, setMicPermission] = useState(false);
  const [permissionError, setPermissionError] = useState("");
  const [noSpeechDetected, setNoSpeechDetected] = useState(false);

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
      const newAnswer = results.map((r) => r.transcript).join(" ");
      setUserAnswer((prev) => prev + " " + newAnswer);
      setResults([]);
      // Reset no speech detected flag when we receive results
      setNoSpeechDetected(false);
    }
  }, [results, setResults]);

  // Add a timer to detect when no speech is recognized
  useEffect(() => {
    let noSpeechTimer;

    if (isItRecording && isRecording) {
      // Start a timer to check if no speech is detected for 5 seconds
      noSpeechTimer = setTimeout(() => {
        // Only set this if we haven't received any results yet
        if (userAnswer.trim() === "") {
          setNoSpeechDetected(true);
          console.log("No speech detected after timeout");
          // Stop and restart speech recognition to try again
          stopSpeechToText();
          setTimeout(() => {
            if (isItRecording) {
              startSpeechToText();
            }
          }, 500);
        }
      }, 5000);
    }

    return () => {
      clearTimeout(noSpeechTimer);
    };
  }, [isItRecording, isRecording, userAnswer, startSpeechToText, stopSpeechToText]);

  // timer removed

  const toggleCamera = async () => {
    try {
      if (!cameraOn) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraOn(true);
      } else {
        streamRef.current?.getTracks().forEach((track) => track.stop());
        if (videoRef.current) videoRef.current.srcObject = null;
        setCameraOn(false);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const toggleSpeech = () => {
    if (typeof window === "undefined") return;
    if (isSpeaking) {
      window.speechSynthesis?.cancel?.();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(
        questions[currentCategory][currentQuestion]
      );
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis?.speak?.(utterance);
      setIsSpeaking(true);
      handleStop();
    }
  };

  const handleNextQuestion = () => {
    if (isItRecording) stopSpeechToText();
    if (isSpeaking) {
      if (typeof window !== "undefined") window.speechSynthesis?.cancel?.();
      setIsSpeaking(false);
    }
    if (currentQuestion < questions[currentCategory].length - 1) {
      setCurrentQuestion((prev) => prev + 1);
  // reset timer removed
      setIsItRecording(false);
    }
    if (currentQuestion === questions[currentCategory].length - 1) {
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
    if (isSpeaking && typeof window !== "undefined") window.speechSynthesis?.cancel?.();
    setCurrentQuestion(0);
  // reset timer removed
    setUserAnswer("");
    setIsSpeaking(false);
  };

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      if (typeof window !== "undefined") window.speechSynthesis?.cancel?.();
      if (isItRecording) stopSpeechToText();
    };
  }, [isItRecording, stopSpeechToText]);

  const handlePlay = () => {
    if (myvideoRef.current) myvideoRef.current.play();
  };
  const handleStop = () => {
    if (myvideoRef.current) myvideoRef.current.pause();
  };
  const handleRestart = () => {
    if (myvideoRef.current) {
      myvideoRef.current.currentTime = 0;
      myvideoRef.current.play();
    }
  };

  const handleFeedback = async () => {
    if (userAnswer !== "" && userAnswer.length >= 10) {
      if (!feedback) {
        setLoading(true);
        const prompt = `generate feedback report to the ${currentCategory} given by user.include user_answer,ideal_answer,my_mistakes,Area_of_improvements,feedback,rating(out of 5),conclusion.Question:${questions[currentCategory][currentQuestion]}.User Answer:${userAnswer}.in json formate.`;
        try {
          const result = await AiFeedbackReport.sendMessage(prompt);
          const responseText = result.response.text();
          const feedbackjson = JSON.parse(responseText);
          setFeedback(feedbackjson);
          setShowResponses(true);
          if (typeof window !== "undefined") {
            window.localStorage.setItem("feedback", JSON.stringify(feedbackjson));
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      } else {
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

      {/* Microphone Permission Error */}
      {permissionError && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-3">
            <Mic className="h-5 w-5 text-red-600" />
            <div>
              <h3 className="font-semibold text-red-800">Microphone Access Required</h3>
              <p className="text-red-600 text-sm mt-1">{permissionError}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 px-3 py-1 bg-red-600 text-foreground text-sm rounded hover:bg-red-700"
              >
                Refresh & Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4  p-2 border rounded-lg">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-video bg-background">
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
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
            <button onClick={toggleCamera} className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${cameraOn ? "bg-red-100 text-red-600 hover:bg-red-200" : "bg-blue-100 text-blue-600 hover:bg-blue-200"}`}>
              {cameraOn ? <CameraOff size={20} /> : <Camera size={20} />}
              <span>{cameraOn ? "Stop Camera" : "Start Camera"}</span>
            </button>

            {showResponses ? (
              <button onClick={() => setShowResponses(false)} className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${showResponses ? "bg-purple-100 text-purple-600 hover:bg-purple-200" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                <ListVideo size={20} />
                <span>Hide Feedback</span>
              </button>
            ) : (
              <button onClick={handleFeedback} className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${showResponses ? "bg-purple-100 text-purple-600 hover:bg-purple-200" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`} disabled={!cameraOn} title={!cameraOn && "Enable Camera"}>
                <ListVideo size={20} />
                <span>View Feedback</span>
              </button>
            )}
            <LoadingDialog loading={loading} />
          </div>

          <div>
            <p className="font-bold">Your Answer:</p>
            <Textarea value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} disabled={!cameraOn} title={!cameraOn && "Enable Camera"} placeholder="Your answer will appear here as you speak or you can type it yourself..." className="w-full h-32 " />

            {/* No Speech Detected Warning */}
            {isRecording && noSpeechDetected && (
              <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Mic className="h-5 w-5 text-yellow-600" />
                  <div>
                    <h3 className="font-semibold text-yellow-800">No Speech Detected</h3>
                    <p className="text-yellow-600 text-sm mt-1">
                      We can&apos;t hear your voice. Please speak louder or check your microphone settings.
                    </p>
                    <button
                      onClick={() => {
                        stopSpeechToText();
                        setTimeout(() => {
                          startSpeechToText();
                          setIsItRecording(true);
                          setNoSpeechDetected(false);
                        }, 500);
                      }}
                      className="mt-2 px-3 py-1 bg-yellow-600 text-foreground text-sm rounded hover:bg-yellow-700"
                    >
                      Restart Recording
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between mt-4 ">
            <button onClick={() => currentQuestion > 0 && setCurrentQuestion((prev) => prev - 1)} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${currentQuestion > 0 ? "bg-gray-100 text-gray-600 hover:bg-gray-200" : "bg-gray-50 text-gray-400 cursor-not-allowed"}`} disabled={currentQuestion === 0}>
              <ChevronLeft size={20} />
              <span>Previous</span>
            </button>
            {complete ? (
              <Button>Complete</Button>
            ) : (
              <button onClick={handleNextQuestion} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${!showResponses && cameraOn ? "bg-blue-600 text-foreground hover:bg-blue-700" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`} disabled={showResponses || !cameraOn} title={!cameraOn && "Enable Camera"}>
                <span>Next</span>
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>

        {!showResponses ? (
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-32 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${((currentQuestion + 1) / (questions?.[currentCategory]?.length || 1)) * 100}%` }} />
                  </div>
                  <span className="text-sm text-gray-600">{currentQuestion + 1}/{questions?.[currentCategory]?.length}</span>
                  <span>({currentCategory})</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Button onClick={() => { if (typeof window !== "undefined") { window.localStorage.removeItem("questions"); } setOk(false); }}>
                    <Timer size={18} />
                    Quit Interview
                  </Button>
                </div>
              </div>

              <div>
                <div className="video-container">
                  <video ref={myvideoRef} controls width="600" height="400" preload="metadata">
                    <source src={"/tell5.mp4"} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl mb-0">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-lg font-medium leading-relaxed">{questions?.[currentCategory]?.[currentQuestion]}</p>
                  <button onClick={toggleSpeech} className={`p-2 rounded-full transition-colors ${isSpeaking ? "bg-blue-100 text-blue-600" : "bg-gray-200 text-gray-600"}`}>
                    {isSpeaking ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                  {isSpeaking ? (handleRestart(), handlePlay()) : handleStop()}
                </div>
              </div>

              <div className="flex justify-center gap-6 mb-8">
                <Button
                  className={`p-4 rounded-full transition-all ${isRecording ? "bg-red-100 text-red-600 hover:bg-red-200" : "bg-blue-100 text-blue-600 hover:bg-blue-200"}`}
                  variant={isRecording ? "destructive" : "default"}
                  onClick={() => {
                    if (isRecording) {
                      stopSpeechToText();
                      setIsItRecording(false);
                    } else {
                      startSpeechToText();
                      setIsItRecording(true);
                      setNoSpeechDetected(false);
                    }
                  }}
                  disabled={!cameraOn || !micPermission}
                  title={!cameraOn ? "Enable Camera" : !micPermission ? "Microphone permission required" : ""}
                >
                  {isRecording ? (
                    <div className="flex items-center space-x-2">
                      <StopCircle className="h-5 w-5" />
                      <span>Stop Recording</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Mic className="h-5 w-5" />
                      <span>{micPermission ? "Start Recording" : "Microphone Disabled"}</span>
                    </div>
                  )}
                </Button>
                <button onClick={handleReset} className="rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
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
                      <p className="text-sm text-gray-400 mt-2">Start the interview to begin recording your answers</p>
                    </div>
                  </div>
                </>
              )}
              <div>
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
