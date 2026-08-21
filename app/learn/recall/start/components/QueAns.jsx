import { BookOpen, Brain, ChevronDown, Code, Users } from "lucide-react";
import { useState } from "react";
import { Button } from "../../../../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../../../../components/ui/card";

function QueAns() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [questions, setQuestions] = useState("");
  const [answers, setAnswers] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [ques, setQues] = useState(
    JSON.parse(localStorage.getItem("combinedChapterQA"))
  );

  const categories = [
    "all",
    ...new Set(ques?.interviewQuestions?.map((q) => q?.category)),
  ];

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Behavioral":
        return <Users size={18} />;
      case "Technical":
        return <Code size={18} />;
      case "Problem-Solving":
        return <Brain size={18} />;
      default:
        return <BookOpen size={18} />;
    }
  };

  const filteredQuestions = ques?.interviewQuestions?.filter(
    (q) => selectedCategory === "all" || q?.category === selectedCategory
  );

  const handleAddQuestion = async () => {
    const prompt = `give perfect answer of this question asked in interview ,question:${questions}.in json formate.`;
    try {
      const result = await AiQuestionAnswer.sendMessage(prompt);
      const reponseText = result.response.text();
      const json = JSON.parse(reponseText);
      setAnswers(json);
      console.log(reponseText);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {ques ? (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {categories?.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                  px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300
                  ${selectedCategory === category
                      ? "bg-indigo-600 text-foreground shadow-lg scale-105"
                      : "bg-white text-gray-600 hover:bg-indigo-50"
                    }
                `}
                >
                  {category !== "all" && getCategoryIcon(category)}
                  <span className="capitalize">{category}</span>
                </button>
              ))}
              <button
                onClick={() => setSelectedCategory("other")}
                className={`
                  px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300
                  ${selectedCategory === "other"
                    ? "bg-indigo-600 text-foreground shadow-lg scale-105"
                    : "bg-white text-gray-600 hover:bg-indigo-50"
                  }
                `}
              >
                <span className="capitalize">other</span>
              </button>
            </div>

            {/* Questions Grid */}
            <div className="space-y-4">
              {filteredQuestions?.map((q, index) => (
                <Card
                  key={index}
                  className={`
                  transform transition-all duration-300 hover:shadow-lg
                  ${expandedId === index ? "ring-2 ring-indigo-500" : ""}
                `}
                >
                  <CardHeader
                    className="cursor-pointer"
                    onClick={() =>
                      setExpandedId(expandedId === index ? null : index)
                    }
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                            {q?.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {q?.question}
                        </h3>
                      </div>
                      <ChevronDown
                        className={`transform transition-transform duration-300 mt-1 text-gray-400
                        ${expandedId === index ? "rotate-180" : ""}
                      `}
                      />
                    </div>
                  </CardHeader>

                  {expandedId === index && (
                    <CardContent>
                      <div className="pl-4 border-l-2 border-indigo-200">
                        <h4 className="font-medium text-gray-700 mb-2">
                          Example Answer:
                        </h4>
                        <div className="prose prose-indigo">
                          <p className="text-gray-600">{q?.answerExample}</p>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
              {selectedCategory === "other" && (
                <div>
                  <input
                    type="text"
                    value={questions}
                    onChange={(e) => setQuestions(e.target.value)}
                    placeholder="Enter your question"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="flex justify-center mt-2">
                    <Button
                      type="button"
                      className="mt-2 bg-blue-500 hover:bg-blue-600 text-foreground py-2 px-4 rounded-lg"
                      onClick={handleAddQuestion}
                    >
                      Show Answer
                    </Button>
                  </div>
                  {answers && (
                    <div className="mt-4">
                      <Card className="mb-6 bg-white/80 backdrop-blur">
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <div>
                              <h1 className="text-2xl font-bold text-gray-800">
                                {answers.question}
                              </h1>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="text-gray-600 leading-relaxed">
                            {answers.answer}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-4">
          <p className="text-center text-gray-500">No Question Available</p>
          <Button onClick={() => (window.location.href = "/learn/recall")}>
            Go Back
          </Button>
        </div>
      )}
    </>
  );
}

export default QueAns;
