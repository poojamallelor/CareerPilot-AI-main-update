import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Clock,
  AlertCircle,
  BarChart3,
  ArrowLeft,
} from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import { Progress } from "../../../components/ui/progress";
import { Button } from "../../../components/ui/button";
import { Alert, AlertDescription } from "../../../components/ui/alert";

export default function InterviewPanel() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [marks, setMarks] = useState({});
  const [notes, setNotes] = useState({});
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [questionTime, setQuestionTime] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const questions = JSON.parse(localStorage.getItem("interview"));
  const QUESTION_TIME_LIMIT = 1000;

  useEffect(() => {
    let intervalId;
    if (isActive) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
        setQuestionTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isActive]);

  useEffect(() => {
    setQuestionTime(0);
  }, [currentQuestionIndex]);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const getRemainingTime = () => {
    const remaining = QUESTION_TIME_LIMIT - questionTime;
    return remaining > 0 ? remaining : 0;
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setQuestionTime(0);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
    setQuestionTime(0);
  };

  const handleSubmit = () => {
    setIsActive(false);
    setShowResults(true);
  };

  const calculateTotalScore = () => {
    const totalPossible = questions.length * 5;
    const achieved = Object.values(marks).reduce(
      (sum, score) => sum + score,
      0
    );
    return {
      score: achieved,
      percentage: Math.round((achieved / totalPossible) * 100),
      total: totalPossible,
    };
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const ResultsView = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 pt-20 pb-6 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-blue-800">
            Interview Results
          </h1>
          <Button
            variant="outline"
            onClick={() => setShowResults(false)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Review
          </Button>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <h3 className="text-sm font-medium text-gray-600">
                  Total Score
                </h3>
                <p
                  className={`text-3xl font-bold ${getScoreColor(
                    calculateTotalScore().percentage
                  )}`}
                >
                  {calculateTotalScore().score}/{calculateTotalScore().total}
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-sm font-medium text-gray-600">
                  Percentage
                </h3>
                <p
                  className={`text-3xl font-bold ${getScoreColor(
                    calculateTotalScore().percentage
                  )}`}
                >
                  {calculateTotalScore().percentage}%
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-sm font-medium text-gray-600">
                  Total Time
                </h3>
                <p className="text-3xl font-bold text-gray-800">
                  {formatTime(time)}
                </p>
              </div>
            </div>
            <Progress
              value={calculateTotalScore().percentage}
              className="h-2"
            />
          </CardContent>
        </Card>

        <div className="space-y-4">
          {questions.map((question, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium text-gray-800">
                      Question {index + 1}
                    </h3>
                    <p className="text-gray-600">{question.question}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-lg font-bold ${getScoreColor(
                        (marks[index] / 5) * 100
                      )}`}
                    >
                      {marks[index] || 0}/5
                    </span>
                  </div>
                </div>
                {notes[index] && (
                  <div className="mt-2">
                    <h4 className="text-sm font-medium text-gray-600">
                      Notes:
                    </h4>
                    <p className="text-gray-700">{notes[index]}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  if (showResults) {
    return <ResultsView />;
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <header className="bg-white shadow-md py-4 px-6 fixed top-0 w-full z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-800">
            Teacher Interview Dashboard
          </h1>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1 rounded-lg">
              <Clock className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-600">
                {formatTime(time)}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-600">
                {currentQuestionIndex + 1}/{questions.length}
              </span>
              <Progress value={progress} className="w-32 h-2" />
            </div>

            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setShowResults(true)}
            >
              <BarChart3 className="w-4 h-4" />
              View Results
            </Button>
          </div>
        </div>
      </header>

      {getRemainingTime() <= 60 && (
        <Alert variant="destructive" className="fixed top-20 right-4 w-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Less than 1 minute remaining!</AlertDescription>
        </Alert>
      )}

      <main className="pt-20 pb-20 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Card>
              <CardContent className="p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">
                    Question {currentQuestionIndex + 1}:
                  </h2>
                  <p className="text-lg text-gray-700">
                    {questions[currentQuestionIndex].question}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Key Points:
                  </h3>
                  <ul className="space-y-2">
                    {questions[currentQuestionIndex].points.map(
                      (point, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="w-6 h-6 bg-blue-100 rounded-full text-blue-600 flex items-center justify-center text-sm">
                            {index + 1}
                          </span>
                          <span className="text-gray-700">{point}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-5">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Notes
                </h3>
                <textarea
                  value={notes[currentQuestionIndex] || ""}
                  onChange={(e) =>
                    setNotes({
                      ...notes,
                      [currentQuestionIndex]: e.target.value,
                    })
                  }
                  className="w-full h-32 p-2 border rounded-lg"
                  placeholder="Add any additional notes here..."
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">
                    Model Answer
                  </h2>
                  <p className="text-lg text-gray-700">
                    {questions[currentQuestionIndex].model_answer.map(
                      (answer, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="w-6 h-6 bg-blue-100 rounded-full text-blue-600 flex items-center justify-center text-sm">
                            {index + 1}
                          </span>
                          <span className="text-gray-700">{answer}</span>
                        </li>
                      )
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="mt-5">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Scoring
                </h3>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-4">
                    {[1, 2, 3, 4, 5].map((score) => (
                      <label
                        key={score}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name={`marks-${currentQuestionIndex}`}
                          value={score}
                          checked={marks[currentQuestionIndex] === score}
                          onChange={() =>
                            setMarks({
                              ...marks,
                              [currentQuestionIndex]: score,
                            })
                          }
                          className="w-5 h-5 text-blue-600"
                        />
                        <span className="text-gray-700">{score}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white shadow-lg-up p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </Button>

          {currentQuestionIndex === questions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              className="flex items-center space-x-2"
              variant="default"
            >
              <Check className="w-5 h-5" />
              <span>Submit All</span>
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              className="flex items-center space-x-2"
              variant="default"
            >
              <span>Next</span>
              <ChevronRight className="w-5 h-5" />
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
}
