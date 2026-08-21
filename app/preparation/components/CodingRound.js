"use client";
import React, { useState, useEffect } from "react";
import { Compass, Code, Target, CheckSquare, Brain, Library, Book } from "lucide-react";

export default function CodingRound() {
  const [questions, setQuestions] = useState("");
  const [exam, setExam] = useState(false);
  
  // New dynamically fetched data
  const [codingDetails, setCodingDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch('/api/preparation/coding-details');
        const result = await response.json();
        setCodingDetails(result.data.codingRound);
      } catch (err) {
        console.error("Failed to fetch dynamic coding definitions", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, []);

  const sections = [
    { id: "overview", icon: <Compass />, label: "Overview" },
    { id: "types", icon: <Code />, label: "Interview Types" },
    { id: "evaluation", icon: <Target />, label: "Evaluation" },
    { id: "preparation", icon: <CheckSquare />, label: "Preparation" },
    { id: "skills", icon: <Brain />, label: "Skills" },
    { id: "languages", icon: <Library />, label: "Languages" },
    { id: "resources", icon: <Book />, label: "Resources" },
  ];

  const StartInterview = async () => {
    // Dynamically pull a recommended language if available
    const languageToUse = codingDetails?.allowedLanguages?.[0]?.language || "python";
    const Prompt = `generate 5 question for coding round in "${languageToUse}", include question, input, output, time required to complete, level. in json format.`;
    try {
      // Assuming AiCodingRoundQuestion is defined somewhere or imported
      // const result = await AiCodingRoundQuestion.sendMessage(Prompt);
      // const responseText = await result.response.text();
      // setQuestions(JSON.parse(responseText));
      setExam(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4 p-8 w-full max-w-4xl mx-auto">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-8"></div>
        
        <div className="grid grid-cols-2 gap-4">
           <div className="h-32 bg-gray-200 rounded"></div>
           <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return exam ? (
    <div>
       {/* If CodingAssessment exists it should go here. Assuming it is imported properly. */}
       {/* <CodingAssessment stateExam={setExam} questions={questions} /> */}
       <p className="p-4 bg-green-100 text-green-700">Exam mode started dynamically</p>
    </div>
  ) : (
    <div className="p-8 w-full max-w-4xl mx-auto border rounded-xl bg-white shadow-sm mt-8">
      <h2 className="text-2xl font-bold mb-4">Coding Round Overview</h2>
      <p className="text-gray-700 mb-6">{codingDetails?.define}</p>

      <h3 className="text-xl font-bold mb-3">Evaluation Criteria</h3>
      <ul className="list-disc pl-6 mb-6">
        {codingDetails?.evaluation?.criteria?.map((crit, idx) => (
          <li key={idx} className="mb-2"><strong>{crit.name}:</strong> {crit.description}</li>
        ))}
      </ul>

      <h3 className="text-xl font-bold mb-3">Recommended Resources</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {codingDetails?.resources?.youtubeQueries?.map((query, idx) => (
          <div key={idx} className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
            <span className="font-semibold text-blue-800">YouTube Search:</span> {query}
          </div>
        ))}
        {codingDetails?.resources?.books?.map((book, idx) => (
          <div key={idx} className="p-4 bg-green-50 border border-green-100 rounded-lg">
            <span className="font-semibold text-green-800">Book:</span> {book.title}
          </div>
        ))}
      </div>

      <button 
        onClick={StartInterview}
        className="px-6 py-3 bg-primary hover:opacity-90 text-foreground text-foreground font-bold rounded-lg transition"
      >
        Start Dynamic Interview
      </button>
    </div>
  );
}
