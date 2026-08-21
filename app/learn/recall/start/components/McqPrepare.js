import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card";
import { Button } from "../../../../../components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";

function McqPrepare({ active2, course }) {
  const [mcq, setMcq] = useState(
    JSON.parse(localStorage.getItem("combinedChapterQuiz"))
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = mcq?.[active2]?.[currentQuestionIndex];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    setCurrentQuestionIndex((prev) => (prev + 1) % mcq[active2].length);
  };
  const handlePrevQuestion = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    setCurrentQuestionIndex((prev) => (prev - 1) % mcq[active2].length);
  };
  return (
    <>
      {mcq ? (
        <div className="max-w-2xl mx-auto p-4 bg-gray-50 min-h-screen">
          <Card className="w-full">
            <CardHeader className="bg-blue-50 border-b">
              <CardTitle className="text-2xl font-bold text-blue-800">
                {course.courseTitle}
              </CardTitle>
              <p className="text-sm text-gray-600">
                Question Type: {currentQuestion?.type}
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Question {currentQuestionIndex + 1} of{" "}
                  {mcq?.[active2]?.length}
                </p>
                <p className="text-lg font-medium text-gray-800">
                  {currentQuestion?.question}
                </p>

                <div className="space-y-3">
                  {currentQuestion?.options?.map((option, index) => (
                    <Button
                      key={index}
                      variant={
                        selectedOption === option
                          ? option === currentQuestion?.correct_answer
                            ? "default"
                            : "destructive"
                          : "outline"
                      }
                      className="w-full justify-start text-left"
                      onClick={() => handleOptionSelect(option)}
                    >
                      {selectedOption === option &&
                        (option === currentQuestion?.correct_answer ? (
                          <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="mr-2 h-5 w-5 text-red-500" />
                        ))}
                      {option}
                    </Button>
                  ))}
                </div>

                {showExplanation && (
                  <div
                    className={`p-4 rounded-lg ${
                      selectedOption === currentQuestion?.correct_answer
                        ? "bg-green-50 border-green-200"
                        : "bg-red-50 border-red-200"
                    }`}
                  >
                    <h3 className="font-semibold mb-2">
                      {selectedOption === currentQuestion?.correct_answer
                        ? "Correct!"
                        : "Incorrect"}
                    </h3>
                    <p className="text-gray-700">
                      {currentQuestion?.explanation}
                    </p>
                  </div>
                )}

                <div className="flex justify-between items-center mt-4">
                  <Button
                    onClick={handlePrevQuestion}
                    disabled={!showExplanation || currentQuestionIndex === 0}
                  >
                    Previous
                  </Button>

                  <Button
                    onClick={handleNextQuestion}
                    disabled={!showExplanation}
                  >
                    Next Question
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-4">
          <p className="text-center text-gray-500">No Mcqs Available</p>
          <Button onClick={() => (window.location.href = "/learn/recall")}>
            Go Back
          </Button>
        </div>
      )}
    </>
  );
}

export default McqPrepare;
