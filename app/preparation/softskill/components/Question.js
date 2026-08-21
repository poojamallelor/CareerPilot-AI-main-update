import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { ChevronDown, ChevronUp } from "lucide-react";

function Question() {
  const [softskill, setSoftSkill] = useState([]);
  const [expandedQuestions, setExpandedQuestions] = useState({});

  useEffect(() => {
    const softSkillQuestions = localStorage.getItem("softSkillQuestions");
    if (softSkillQuestions) {
      setSoftSkill(JSON.parse(softSkillQuestions));
    } else {
      alert("Data not found");
    }
  }, []);

  const toggleQuestion = (index) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Soft Skill Questions
      </h1>
      <div className="grid gap-6">
        {softskill.map((question, ind) => (
          <Card key={ind} className="overflow-hidden">
            <CardHeader
              className="cursor-pointer"
              onClick={() => toggleQuestion(ind)}
            >
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold">
                  {question.question}
                </CardTitle>
                {expandedQuestions[ind] ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>
            </CardHeader>
            {expandedQuestions[ind] && (
              <CardContent>
                <div className="mt-2">
                  <Badge variant="secondary">{question.skill}</Badge>
                </div>
                <p className="mt-4 text-gray-600">
                  This question assesses your {question.skill.toLowerCase()}{" "}
                  skills. Practice answering it to improve your soft skills in
                  this area.
                </p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Question;
