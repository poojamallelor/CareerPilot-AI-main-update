import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card";
import { Badge } from "../../../../../components/ui/badge";
import { Button } from "../../../../../components/ui/button";
import { ChevronLeft, ChevronRight, Mic, Video, VideoOff } from "lucide-react";
import Speech from "react-text-to-speech";
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi";
import { FaPause } from "react-icons/fa6";
import { FiMic } from "react-icons/fi";
import { LuMicOff } from "react-icons/lu";

function Que({
  questions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  setUserAnswer,
  setCheck,
}) {
  const nextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex < questions.length - 1 ? prevIndex + 1 : prevIndex
    );
    setUserAnswer("");
    setCheck(false);
  };
  const [play, setPlay] = useState(false);

  const previousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };
  const handleSpeak = (text) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    }
  };

  const handleStop = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };
  return (
    <>
      <div className="w-full p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Interview Practice</h1>
        {questions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-gray-800">
                {questions[currentQuestionIndex].question}
                {/* <Speech
                  text={questions[currentQuestionIndex]?.question || ""}
                  pitch="1"
                  rate="1"
                  volume="1"
                  lang="en-GB"
                  voice="Daniel"
                >
                  {({ speechStatus, start, pause, stop }) => (
                    <div style={{ display: "flex", columnGap: "0.5rem" }}>
                      {speechStatus !== "started" ? (
                        <GiSpeaker onClick={start} size={36}>
                          Start
                        </GiSpeaker>
                      ) : (
                        <FaPause onClick={pause} size={36}>
                          Pause
                        </FaPause>
                      )}
                    </div>
                  )}
                </Speech> */}
                <div className="flex items-center gap-2 cursor-pointer">
                  {play ? (
                    <GiSpeakerOff
                      size={24}
                      onClick={() => {
                        handleStop();
                        setPlay(false);
                      }}
                    />
                  ) : (
                    <GiSpeaker
                      size={24}
                      onClick={() => {
                        const text = questions[currentQuestionIndex].question;
                        handleSpeak(text);
                        setPlay(true);
                      }}
                    />
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary" className="mb-4">
                {questions[currentQuestionIndex].skill}
              </Badge>
              <p className="text-gray-600 mb-4">
                This question assesses your{" "}
                {questions[currentQuestionIndex].skill.toLowerCase()} skills.
              </p>
              <div className="flex justify-between mt-4">
                <Button
                  onClick={previousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="bg-blue-500 text-foreground hover:bg-blue-600"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <Button
                  onClick={nextQuestion}
                  disabled={currentQuestionIndex === questions.length - 1}
                  className="bg-blue-500 text-foreground hover:bg-blue-600"
                >
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                {currentQuestionIndex === questions?.length - 1 && (
                  <Button>End Interview</Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}

export default Que;
