import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../../../../components/ui/card";

const FeedbackReport = ({ feedback }) => {
  //   const feedback = {
  //     skill: "Teamwork and Communication",
  //     skillLevel: "Developing",
  //     EvaluationCriteria: {
  //       CommunicationChallenges:
  //         "Clearly articulating challenges faced during collaboration",
  //       ProblemSolving:
  //         "Describing strategies used to overcome communication barriers",
  //       TeamworkReflection:
  //         "Demonstrating understanding of effective teamwork principles",
  //       Specificity: "Providing concrete examples and details",
  //       ProjectContext: "Providing sufficient context about the project",
  //     },
  //     description:
  //       "The student's response lacks crucial details regarding communication challenges, solutions, and lessons learned.  While they mention a complex project, they fail to illustrate the teamwork and communication aspects in detail.",
  //     feedback:
  //       "Your response demonstrates understanding of the need for teamwork in large projects. However, it needs significant improvement to showcase your teamwork and communication skills.  You haven't described any actual communication challenges, how they were overcome, or what specific lessons you learned about effective teamwork.  The response only focuses on the project scope rather than collaborative aspects.",
  //     strengths: ["Identifies a relevant, complex project"],
  //     weakAreas: [
  //       "Fails to describe specific communication challenges",
  //       "Lacks detail on how communication barriers were overcome",
  //       "Doesn't offer any concrete examples to illustrate teamwork",
  //       "Does not demonstrate reflection on effective teamwork strategies",
  //       "Insufficient depth in project context.",
  //     ],
  //     preparation:
  //       "Insufficient preparation evident in the lack of detail and specific examples.",
  //     resource: "None mentioned explicitly in the response.",
  //     AssessmentandRating:
  //       "Developing (1/5).  The answer demonstrates a basic understanding of the importance of teamwork but does not provide sufficient evidence to demonstrate proficiency.",
  //     AreasforImprovement: [
  //       "Practice describing specific communication challenges faced (e.g., conflicting opinions, scheduling conflicts, unclear instructions).",
  //       "Develop specific examples of how you actively contributed to resolving communication issues.",
  //       "Focus on describing your role in the team, your contributions, and how you interacted with team members.",
  //       "Reflect on the teamwork strategies used and how they impacted project success.",
  //       "Practice articulating lessons learned regarding effective communication and collaboration.",
  //     ],
  //     SuggestionsforFurtherPractice: [
  //       "Engage in mock interviews focusing on teamwork and communication.",
  //       "Reflect on past collaborative projects by documenting communication challenges, solutions, and lessons learned.",
  //       "Read articles and case studies on effective teamwork in technical environments.",
  //       "Seek feedback from peers and mentors on collaborative projects.",
  //       "Participate in team-based activities and workshops to enhance teamwork and communication skills.",
  //     ],
  //     Conclusion:
  //       "The student needs to significantly improve their ability to articulate their experience with teamwork and communication within the context of a challenging project.  More detailed and specific examples are crucial to showcase their skills effectively.",
  //   };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="w-full bg-blue-50 shadow-lg">
        <CardHeader className="bg-blue-600 text-foreground p-4">
          <CardTitle className="text-2xl font-bold">
            Skill Assessment: {feedback.skill}
          </CardTitle>
          <p className="text-sm text-blue-100">
            Assessment Level: {feedback.skillLevel}
          </p>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Overall Description */}
          <section>
            <h2 className="text-xl font-semibold text-blue-800 mb-3">
              Assessment Overview
            </h2>
            <p className="text-gray-700 bg-white p-4 rounded-lg shadow-sm">
              {feedback.description}
            </p>
          </section>

          {/* Detailed Feedback */}
          <section>
            <h2 className="text-xl font-semibold text-blue-800 mb-3">
              Detailed Feedback
            </h2>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-700">{feedback.feedback}</p>
            </div>
          </section>

          {/* Strengths and Weak Areas */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-green-700 mb-2">
                Strengths
              </h3>
              <ul className="bg-green-50 p-4 rounded-lg list-disc pl-6">
                {feedback.strengths.map((strength, index) => (
                  <li key={index} className="text-green-800">
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-700 mb-2">
                Weak Areas
              </h3>
              <ul className="bg-red-50 p-4 rounded-lg list-disc pl-6">
                {feedback.weakAreas.map((area, index) => (
                  <li key={index} className="text-red-800">
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Areas for Improvement */}
          <section>
            <h2 className="text-xl font-semibold text-blue-800 mb-3">
              Areas for Improvement
            </h2>
            <ul className="bg-white p-4 rounded-lg shadow-sm space-y-2 list-disc pl-6">
              {feedback.AreasforImprovement.map((area, index) => (
                <li key={index} className="text-gray-700">
                  {area}
                </li>
              ))}
            </ul>
          </section>

          {/* Suggestions for Practice */}
          <section>
            <h2 className="text-xl font-semibold text-blue-800 mb-3">
              Suggestions for Further Practice
            </h2>
            <ul className="bg-white p-4 rounded-lg shadow-sm space-y-2 list-disc pl-6">
              {feedback.SuggestionsforFurtherPractice.map(
                (suggestion, index) => (
                  <li key={index} className="text-gray-700">
                    {suggestion}
                  </li>
                )
              )}
            </ul>
          </section>
        </CardContent>

        <CardFooter className="bg-blue-100 p-4">
          <div className="w-full">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Conclusion
            </h3>
            <p className="text-gray-800 italic">{feedback.Conclusion}</p>
            <div className="mt-4 text-center">
              <span className="text-sm font-bold text-blue-700">
                Assessment Rating: {feedback.AssessmentandRating}
              </span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FeedbackReport;
