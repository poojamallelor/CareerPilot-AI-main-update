'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, Mic, MicOff, Camera, CameraOff, Settings } from 'lucide-react';

export default function MockInterviewPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [difficultyLevel, setDifficultyLevel] = useState('medium');
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  const [isCameraEnabled, setIsCameraEnabled] = useState(true);

  const [dynamicQuestions, setDynamicQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/mock-interview/questions?category=${selectedCategory}&difficulty=${difficultyLevel}`);
      const data = await res.json();
      if(data.success && data.questions) {
        setDynamicQuestions(data.questions);
      } else {
        setDynamicQuestions(["Failed to generate questions. Please try again.", "What are your core strengths?"]);
      }
    } catch (error) {
      console.error("Failed fetching AI questions", error);
      setDynamicQuestions(["An error occurred fetching questions.", "Please tell us about your background."]);
    } finally {
      setIsLoading(false);
      setCurrentQuestion(0);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [selectedCategory, difficultyLevel]);

  const startInterview = () => {
    setIsInterviewStarted(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < dynamicQuestions.length - 1) {
      setIsFading(true);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setIsFading(false);
      }, 300);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setIsFading(true);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion - 1);
        setIsFading(false);
      }, 300);
    }
  };

  const endInterview = () => {
    setIsInterviewStarted(false);
    setIsRecording(false);
    setCurrentQuestion(0);
    fetchQuestions(); // Regenerate for the next run
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6 border border-white/20">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            🎯 AI-Powered Mock Interview
          </h1>
          <p className="text-blue-200">
            Practice your interview skills with our AI system
          </p>
        </div>

        {!isInterviewStarted ? (
          /* Interview Setup */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Settings Panel */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-foreground mb-6">Interview Settings</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-foreground font-medium mb-2">Interview Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-foreground"
                  >
                    <option value="general">General Questions</option>
                    <option value="technical">Technical Questions</option>
                    <option value="behavioral">Behavioral Questions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-foreground font-medium mb-2">Difficulty Level</label>
                  <select
                    value={difficultyLevel}
                    onChange={(e) => setDifficultyLevel(e.target.value)}
                    className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-foreground"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="medium">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="block text-foreground font-medium">Audio & Video Settings</label>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setIsMicEnabled(!isMicEnabled)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        isMicEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                      } text-foreground`}
                    >
                      {isMicEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                      Microphone
                    </button>
                    <button
                      onClick={() => setIsCameraEnabled(!isCameraEnabled)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        isCameraEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                      } text-foreground`}
                    >
                      {isCameraEnabled ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
                      Camera
                    </button>
                  </div>
                </div>

                <button
                  onClick={startInterview}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-foreground font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105"
                >
                  {isLoading ? 'Generating Interview...' : 'Start Mock Interview'}
                </button>
              </div>
            </div>

            {/* Preview Panel */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-foreground mb-6">AI Generation Status</h3>
              <div className="space-y-4">
                  {isLoading ? (
                    <div className="animate-pulse space-y-4">
                      <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-600 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-600 rounded w-5/6"></div>
                      <div className="text-blue-300 mt-4 text-sm font-medium flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                        Generating unique questions using AI...
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white/10 rounded-lg p-4 transition-all duration-500">
                      <div className="text-blue-300 font-medium mb-2">Preview (Question 1)</div>
                      <div className="text-foreground text-lg font-semibold">{dynamicQuestions[0]}</div>
                      <div className="text-sm text-blue-200 mt-4">Questions are completely generated! Click start to begin your personalized set.</div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        ) : (
          /* Interview Interface */
          <div className="space-y-6">
            {/* Question Display */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 text-center">
              <div className="text-blue-300 font-medium mb-4">
                Question {currentQuestion + 1} of {dynamicQuestions.length}
              </div>
              <h2 className={`text-2xl font-bold text-foreground mb-6 transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
                {dynamicQuestions[currentQuestion]}
              </h2>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / dynamicQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Video/Audio Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Video Feed */}
              <div className="lg:col-span-2 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="bg-gray-800 rounded-lg aspect-video flex items-center justify-center mb-4">
                  {isCameraEnabled ? (
                    <div className="text-foreground text-center">
                      <Camera className="w-16 h-16 mx-auto mb-4" />
                      <div>Camera Feed (Simulated)</div>
                    </div>
                  ) : (
                    <div className="text-gray-400 text-center">
                      <CameraOff className="w-16 h-16 mx-auto mb-4" />
                      <div>Camera Disabled</div>
                    </div>
                  )}
                </div>

                {/* Recording Controls */}
                <div className="flex justify-center gap-4">
                  <button
                    onClick={toggleRecording}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                      isRecording 
                        ? 'bg-red-600 hover:bg-red-700 text-foreground' 
                        : 'bg-green-600 hover:bg-green-700 text-foreground'
                    }`}
                  >
                    {isRecording ? (
                      <>
                        <Square className="w-5 h-5" />
                        Stop Recording
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5" />
                        Start Recording
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Controls */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h3 className="text-lg font-bold text-foreground mb-4">Controls</h3>
                <div className="space-y-3">
                  <button
                    onClick={prevQuestion}
                    disabled={currentQuestion === 0}
                    className="w-full bg-primary hover:opacity-90 text-foreground disabled:bg-gray-600 disabled:cursor-not-allowed text-foreground py-2 px-4 rounded-lg transition-colors"
                  >
                    Previous Question
                  </button>
                  <button
                    onClick={nextQuestion}
                    disabled={currentQuestion === dynamicQuestions.length - 1}
                    className="w-full bg-primary hover:opacity-90 text-foreground disabled:bg-gray-600 disabled:cursor-not-allowed text-foreground py-2 px-4 rounded-lg transition-colors"
                  >
                    Next Question
                  </button>
                  <button
                    onClick={endInterview}
                    className="w-full bg-red-600 hover:bg-red-700 text-foreground py-2 px-4 rounded-lg transition-colors"
                  >
                    End Interview
                  </button>
                </div>

                {/* Audio Controls */}
                <div className="mt-6">
                  <h4 className="text-foreground font-medium mb-3">Audio/Video</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => setIsMicEnabled(!isMicEnabled)}
                      className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                        isMicEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                      } text-foreground`}
                    >
                      {isMicEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                      {isMicEnabled ? 'Mute' : 'Unmute'}
                    </button>
                    <button
                      onClick={() => setIsCameraEnabled(!isCameraEnabled)}
                      className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                        isCameraEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                      } text-foreground`}
                    >
                      {isCameraEnabled ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
                      {isCameraEnabled ? 'Turn Off' : 'Turn On'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="mt-8 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-foreground mb-4">🚀 Interview Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-bold text-blue-300 mb-2">AI Feedback</h4>
              <p className="text-blue-200 text-sm">Get instant feedback on your responses</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-bold text-green-300 mb-2">Video Recording</h4>
              <p className="text-green-200 text-sm">Record and review your performance</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-bold text-purple-300 mb-2">Multiple Categories</h4>
              <p className="text-purple-200 text-sm">Practice different types of questions</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-bold text-yellow-300 mb-2">Progress Tracking</h4>
              <p className="text-yellow-200 text-sm">Track your improvement over time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}