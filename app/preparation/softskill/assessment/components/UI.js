import React, { useState, useRef } from "react";
import {
  Book,
  User,
  Clock,
  CheckCircle,
  Camera,
  Mic,
  ArrowRight,
  ArrowLeft,
  Save,
  Pause,
  Play,
  Trash2,
} from "lucide-react";

const SoftSkillInterviewUI = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [cameraActive, setCameraActive] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [writtenAnswer, setWrittenAnswer] = useState("");
  const [savedAnswers, setSavedAnswers] = useState({});
  const [audioRecording, setAudioRecording] = useState(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioPlayerRef = useRef(null);
  const [activeSection, setActiveSection] = useState(false);

  const softSkillQuestions = [
    {
      id: 1,
      question: "Tell me about a time you successfully worked in a team.",
      category: "Teamwork",
    },
    {
      id: 2,
      question: "How do you handle stress and pressure in the workplace?",
      category: "Emotional Intelligence",
    },
    {
      id: 3,
      question: "Describe a situation where you showed leadership.",
      category: "Leadership",
    },
  ];

  const skill = [
    {
      name: "communication",
      desc: "Demonstrate your ability to clearly and effectively communicate ideas.",
    },
    {
      name: "teamwork",
      desc: "Show how you approach and resolve complex challenges.",
    },
    {
      name: "adaptability",
      desc: "Ability to adjust to new conditions, challenges, or environments with flexibility and resilience.",
    },
    {
      name: "problem-solving",
      desc: "Ability to identify, analyze, and develop effective solutions for challenges or issues.",
    },

    {
      name: "leadership",
      desc: "Ability to inspire, guide, and influence individuals or teams to achieve common goals.",
    },
    {
      name: "Conflict Resolution",
      desc: "Process of addressing and resolving disagreements or disputes constructively and collaboratively.",
    },
  ];
  const toggleCamera = async () => {
    if (!cameraActive) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      } catch (err) {
        console.error("Camera access denied", err);
        alert("Please allow camera access");
      }
    } else {
      const tracks = videoRef.current.srcObject?.getTracks();
      tracks?.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioRecording(audioUrl);
        setMicActive(false);
      };

      mediaRecorderRef.current.start();
      setMicActive(true);
    } catch (err) {
      console.error("Mic access denied", err);
      alert("Please allow microphone access");
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
  };

  const toggleAudioPlayback = () => {
    if (audioPlayerRef.current) {
      if (audioPlaying) {
        audioPlayerRef.current.pause();
      } else {
        audioPlayerRef.current.play();
      }
      setAudioPlaying(!audioPlaying);
    }
  };

  const deleteRecording = () => {
    if (audioRecording) {
      URL.revokeObjectURL(audioRecording);
      setAudioRecording(null);
      if (audioPlayerRef.current) {
        audioPlayerRef.current.src = "";
      }
    }
  };

  const saveAnswer = () => {
    const currentQuestion = softSkillQuestions[currentSection];
    setSavedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        text: writtenAnswer,
        audio: audioRecording,
      },
    }));
    alert("Answer saved successfully!");
  };

  const nextSection = () => {
    if (currentSection < softSkillQuestions.length - 1) {
      // Save current answer before moving
      if (writtenAnswer.trim() || audioRecording) {
        saveAnswer();
      }

      // Reset written answer and audio for next question
      setWrittenAnswer("");
      setAudioRecording(null);
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      // Save current answer before moving
      if (writtenAnswer.trim() || audioRecording) {
        saveAnswer();
      }

      // Reset written answer and audio for previous question
      setWrittenAnswer("");
      setAudioRecording(null);
      setCurrentSection(currentSection - 1);
    }
  };

  return (
    <>
      {activeSection ? (
        <main className="flex-grow container mx-auto px-4 py-8 grid md:grid-cols-3 gap-6">
          {/* Left Sidebar - Interview Progress */}
          <aside className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">
              Interview Progress
            </h2>
            {skill.map((skill, ind) => (
              <div className="space-y-3" key={ind}>
                <div className="flex items-center">
                  <Clock className="w-6 h-6 text-yellow-500 mr-3" />
                  <span className="capitalize text-base">{skill.name}</span>
                </div>
              </div>
            ))}
          </aside>

          {/* Center Content - Interview Sections */}
          <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">
              Soft Skills Assessment
            </h2>

            {skill.map((skill, ind) => (
              <div className="space-y-4" key={ind}>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2 capitalize">
                    {skill.name}
                  </h3>
                  <p className="text-gray-600">{skill.desc}</p>
                  <button className="mt-3 bg-blue-600 text-foreground px-4 py-2 rounded hover:bg-blue-700 transition">
                    Start Assessment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      ) : (
        <>
          {" "}
          <div className="min-h-screen bg-blue-50 flex flex-col">
            <header className="bg-blue-600 text-foreground p-4 shadow-md">
              <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <Book className="w-8 h-8" />
                  <h1 className="text-2xl font-bold">SoftSkill Insight</h1>
                </div>
              </div>
            </header>

            <main className="flex-grow container mx-auto px-4 py-8 grid md:grid-cols-3 gap-6">
              <aside className="bg-white rounded-lg shadow-md p-6 space-y-4">
                <h2 className="text-xl font-semibold text-blue-700 mb-4">
                  Interview Progress
                </h2>
                <div className="bg-gray-100 rounded-lg  flex flex-col items-center justify-center">
                  <h3 className="text-lg font-semibold mb-4">My Camera</h3>
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className={`w-full aspect-video rounded-md ${
                      !cameraActive ? "bg-gray-200" : ""
                    }`}
                  >
                    {!cameraActive && (
                      <div className="flex items-center justify-center h-full">
                        <Camera className="w-16 h-16 text-gray-500" />
                      </div>
                    )}
                  </video>
                  <button
                    onClick={toggleCamera}
                    className={`mt-2 px-4 py-2 rounded ${
                      cameraActive
                        ? "bg-red-500 text-foreground"
                        : "bg-blue-500 text-foreground"
                    }`}
                  >
                    {cameraActive ? "Stop Camera" : "Start Camera"}
                  </button>
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-blue-700 mb-2">
                    Saved Answers
                  </h3>
                  {Object.entries(savedAnswers).map(([questionId, answer]) => (
                    <div
                      key={questionId}
                      className="bg-blue-50 p-2 rounded mb-2"
                    >
                      <p className="text-sm font-medium">
                        Question {questionId}:
                        <span className="text-xs text-gray-600 ml-2 truncate">
                          {answer.text.length > 50
                            ? answer.text.substring(0, 50) + "..."
                            : answer.text}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </aside>

              <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-blue-700 mb-6">
                  Soft Skills Assessment
                </h2>

                <div className=" bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-800">
                    <span>Question {currentSection + 1}:</span>{" "}
                    {softSkillQuestions[currentSection].question}
                  </p>
                </div>

                <div className="rounded-lg flex flex-col items-center justify-center mt-5">
                  <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center md:w-[600px] w-[300px]">
                    <User className="w-16 h-16 text-gray-500" />
                  </div>
                </div>
                {/* Audio Recording Controls */}
                <div className="mt-4 flex items-center justify-center space-x-4">
                  {!micActive ? (
                    <button
                      onClick={startRecording}
                      className="flex items-center space-x-2 bg-blue-500 text-foreground px-4 py-2 rounded hover:bg-blue-600"
                    >
                      <Mic className="w-5 h-5" />
                      <span>Start Audio Recording</span>
                    </button>
                  ) : (
                    <button
                      onClick={stopRecording}
                      className="flex items-center space-x-2 bg-red-500 text-foreground px-4 py-2 rounded hover:bg-red-600"
                    >
                      <Pause className="w-5 h-5" />
                      <span>Stop Recording</span>
                    </button>
                  )}
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-blue-700 mb-4">
                    Your Answer
                  </h3>
                  <textarea
                    value={writtenAnswer}
                    onChange={(e) => setWrittenAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  {/* Audio Playback Section */}
                  {audioRecording && (
                    <div className="mt-4 bg-gray-100 p-3 rounded-lg flex items-center space-x-4">
                      <audio
                        ref={audioPlayerRef}
                        src={audioRecording}
                        onEnded={() => setAudioPlaying(false)}
                      />
                      <button
                        onClick={toggleAudioPlayback}
                        className="bg-blue-500 text-foreground p-2 rounded"
                      >
                        {audioPlaying ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5" />
                        )}
                      </button>
                      <button
                        onClick={deleteRecording}
                        className="bg-red-500 text-foreground p-2 rounded"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <span className="text-sm text-gray-600">
                        Audio Recording
                      </span>
                    </div>
                  )}

                  <div className="flex justify-end mt-2 space-x-2">
                    <button
                      onClick={deleteRecording}
                      className="flex items-center space-x-2 bg-red-500 text-foreground px-4 py-2 rounded hover:bg-red-600"
                    >
                      <Trash2 className="w-5 h-5" />
                      <span>Clear Audio</span>
                    </button>
                    <button
                      onClick={saveAnswer}
                      className="flex items-center space-x-2 bg-green-500 text-foreground px-4 py-2 rounded hover:bg-green-600"
                    >
                      <Save className="w-5 h-5" />
                      <span>Save Answer</span>
                    </button>
                  </div>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <button
                    onClick={prevSection}
                    disabled={currentSection === 0}
                    className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Previous</span>
                  </button>

                  <button
                    onClick={nextSection}
                    disabled={currentSection === softSkillQuestions.length - 1}
                    className="flex items-center space-x-2 bg-green-500 text-foreground px-4 py-2 rounded disabled:opacity-50"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </main>
          </div>
        </>
      )}
    </>
  );
};

export default SoftSkillInterviewUI;
