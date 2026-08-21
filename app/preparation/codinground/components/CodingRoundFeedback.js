import React, { useState } from "react";
import {
  AlertTriangle,
  CheckCircle,
  Code,
  Lightbulb,
  MessageSquare,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../../../../components/ui/alert";

function CodingRoundFeedback({ feedback }) {
  const [showIdealSolution, setShowIdealSolution] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6 bg-white p-6 rounded-lg shadow-lg">
      {/* Question */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h2 className="text-xl font-semibold text-blue-900 mb-2">Question</h2>
        <p className="text-blue-800">{feedback.question}</p>
      </div>

      {/* Overall Feedback */}
      <Alert className="bg-white border-blue-200">
        <MessageSquare className="h-5 w-5 text-blue-600" />
        <AlertTitle className="text-blue-900 font-semibold">
          Overall Feedback
        </AlertTitle>
        <AlertDescription className="text-gray-700 mt-2">
          {feedback.feedback}
        </AlertDescription>
      </Alert>

      {/* Mistakes Section */}
      {feedback.my_mistakes.length > 0 && (
        <div className="bg-red-50 p-6 rounded-lg border border-red-200">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <h3 className="text-lg font-semibold text-red-900">
              Areas for Improvement
            </h3>
          </div>
          <ul className="list-disc list-inside space-y-2">
            {feedback.my_mistakes.map((mistake, index) => (
              <li key={index} className="text-red-700">
                {mistake}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Improvements Section */}
      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="h-5 w-5 text-green-600" />
          <h3 className="text-lg font-semibold text-green-900">
            Suggested Improvements
          </h3>
        </div>
        <ul className="list-disc list-inside space-y-2">
          {feedback.improvements.map((improvement, index) => (
            <li key={index} className="text-green-700">
              {improvement}
            </li>
          ))}
        </ul>
      </div>

      {/* Ideal Solution */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5 text-gray-700" />
            <h3 className="text-lg font-semibold text-gray-900">
              Ideal Solution
            </h3>
          </div>
          <button
            onClick={() => setShowIdealSolution(!showIdealSolution)}
            className="px-4 py-2 text-sm bg-blue-600 text-foreground rounded-md hover:bg-blue-700 transition-colors"
          >
            {showIdealSolution ? "Hide Solution" : "Show Solution"}
          </button>
        </div>
        {showIdealSolution && (
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
            <code>
              {feedback.ideal_answer
                .replace("<precode>\n", "")
                .replace("\n</precode>", "")}
            </code>
          </pre>
        )}
      </div>

      {/* Success Indicator */}
      <div className="flex items-center justify-center gap-2 p-4 bg-green-50 rounded-lg border border-green-200">
        <CheckCircle className="h-6 w-6 text-green-600" />
        <p className="text-green-700 font-medium">
          Keep practicing! You're on the right track!
        </p>
      </div>
    </div>
  );
}

export default CodingRoundFeedback;
