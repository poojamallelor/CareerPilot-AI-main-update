import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { AlertTriangle, CheckCircle } from "lucide-react";

const InterviewFeedbackUI = ({ feedback }) => {
  const getRatingColor = (rating) => {
    switch (rating) {
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-yellow-500";
      case 3:
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-blue-50">
      <Card className="shadow-lg border-blue-200">
        <CardHeader className="bg-blue-100 border-b border-blue-200">
          <CardTitle className="text-2xl font-bold text-blue-800">
            Mock Interview Feedback
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 p-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              Interview Question
            </h3>
            <p className="text-gray-700">{feedback?.question}</p>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              Your Answer
            </h3>
            <p className="text-gray-700 italic">{feedback?.user_answer}</p>

            <div className="mt-4 flex items-center">
              <span className="mr-2">Rating:</span>
              <Badge
                className={`${getRatingColor(
                  feedback?.rating
                )} text-foreground px-3 py-1 rounded-full`}
              >
                {feedback?.rating}/5
              </Badge>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4 shadow-sm border border-green-200">
            <h3 className="text-lg font-semibold text-green-700 mb-2 flex items-center">
              <CheckCircle className="mr-2 text-green-500" />
              Sample answer
            </h3>
            <div className="list-disc list-inside text-gray-700">
              <p>{feedback?.ideal_answer}</p>
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-4 shadow-sm border border-red-200">
            <h3 className="text-lg font-semibold text-red-700 mb-2 flex items-center">
              <AlertTriangle className="mr-2 text-red-500" />
              Areas of Improvement
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              {feedback?.my_mistakes?.map((mistake, index) => (
                <li key={index} className="mb-1">
                  {mistake}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 shadow-sm border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-700 mb-2 flex items-center">
              <CheckCircle className="mr-2 text-blue-500" />
              Recommended Improvements
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              {feedback?.area_of_improvements?.map((improvement, index) => (
                <li key={index} className="mb-1">
                  {improvement}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              Detailed Feedback
            </h3>
            <p className="text-gray-700">{feedback?.feedback}</p>
          </div>

          <div className="bg-blue-100 rounded-lg p-4 shadow-sm border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              Conclusion
            </h3>
            <p className="text-gray-700">{feedback?.conclusion}</p>
          </div>
        </CardContent>

        <CardFooter className="bg-blue-50 border-t border-blue-200 p-4 flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Mock Interview Feedback Report
          </span>
          <Badge variant="outline" className="text-blue-700 border-blue-700">
            Technical Assessment
          </Badge>
        </CardFooter>
      </Card>
    </div>
  );
};

export default InterviewFeedbackUI;
