import { useEffect, useState } from "react";
import { Button } from "../../../../../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../../../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../../components/ui/tabs";

import {
    AlertCircle,
    CheckCircle2,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import FlishCard from "./FlishCard";
import Matchthepair from "./Matchthepair";

const EducationalActivities = ({ courseData, activeChapter }) => {
  const [currentOddOneOutIndex, setCurrentOddOneOutIndex] = useState(0);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);

  const [selectedOddOneOut, setSelectedOddOneOut] = useState(null);
  const [showOddOneOutExplanation, setShowOddOneOutExplanation] =
    useState(false);

  const [matchedPairs, setMatchedPairs] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);

  const [ooo, setooo] = useState("0");
  const [match, setMatch] = useState("");

  useEffect(() => {
    const match = localStorage.getItem("engagingContent");
    if (match) {
      setMatch(JSON.parse(match));
    }
  }, []);

  // const courseData = {
  //   chapterName: "Basic Structure of an HTML Document",
  //   chapterDescription:
  //     "Understanding the `<html>`, `<head>`, and `<body>` elements. The role of the `<title>` tag and other essential elements.",
  //   activities: [
  //     {
  //       type: "Odd One Out",
  //       title: "HTML Element Odd One Out",
  //       description:
  //         "Identify the element that doesn't belong in each group.  Explain your answer.",
  //       questions: [
  //         {
  //           group: ["<html>", "<head>", "<body>", "<p>"],
  //           oddOne: "<p>",
  //           explanation:
  //             "<p> is a content element, while the others are structural elements.",
  //         },
  //         {
  //           group: ["<h1>", "<h2>", "<p>", "<title>"],
  //           oddOne: "<title>",
  //           explanation:
  //             "<title> is a meta-data element; the others are content elements.",
  //         },
  //         {
  //           group: ["<meta>", "<link>", "<title>", "<style>"],
  //           oddOne: "<title>",
  //           explanation:
  //             "<title> is for the page title; the others are for linking external resources or adding styles.",
  //         },
  //         {
  //           group: ["<div>", "<span>", "<img>", "<body>"],
  //           oddOne: "<body>",
  //           explanation:
  //             "<body> is the main container; the others are inline or block level containers.",
  //         },
  //         {
  //           group: ["<script>", "<link>", "<img>", "<style>"],
  //           oddOne: "<img>",
  //           explanation:
  //             "<img> displays an image; the others involve external or embedded code.",
  //         },
  //         {
  //           group: ["<header>", "<footer>", "<section>", "<a>"],
  //           oddOne: "<a>",
  //           explanation:
  //             "<a> is a hyperlink, while the others are structural elements.",
  //         },
  //         {
  //           group: ["<ul>", "<ol>", "<li>", "<p>"],
  //           oddOne: "<p>",
  //           explanation: "<p> is a paragraph; the others are list elements.",
  //         },
  //         {
  //           group: ["<article>", "<aside>", "<nav>", "<p>"],
  //           oddOne: "<p>",
  //           explanation:
  //             "<p> is a paragraph, while the others are structural elements for different content types.",
  //         },
  //         {
  //           group: ["<h1>", "<h2>", "<h3>", "<br>"],
  //           oddOne: "<br>",
  //           explanation: "<br> is a line break, while the others are headings.",
  //         },
  //         {
  //           group: ["<main>", "<section>", "<article>", "<body>"],
  //           oddOne: "<body>",
  //           explanation:
  //             "<body> encompasses all content; the others are content sections within the body.",
  //         },
  //       ],
  //     },
  //     {
  //       type: "Match the Pair",
  //       title: "HTML Element Matching",
  //       description: "Match the HTML element with its best description.",
  //       questions: [
  //         {
  //           element: "<html>",
  //           description: "The root element of the HTML page",
  //         },
  //         {
  //           element: "<head>",
  //           description: "Contains meta-information about the HTML page",
  //         },
  //         {
  //           element: "<body>",
  //           description: "Contains the visible content of the HTML page",
  //         },
  //         {
  //           element: "<title>",
  //           description: "Specifies a title for the HTML page",
  //         },
  //         {
  //           element: "<meta>",
  //           description: "Provides meta-information (e.g., character set)",
  //         },
  //         {
  //           element: "<link>",
  //           description: "Links to external resources (e.g., CSS)",
  //         },
  //         {
  //           element: "<script>",
  //           description: "Embeds client-side scripts (e.g., JavaScript)",
  //         },
  //         { element: "<style>", description: "Contains style information" },
  //         { element: "<p>", description: "Defines a paragraph" },
  //         { element: "<h1>", description: "Defines a level 1 heading" },
  //       ],
  //     },
  //     {
  //       type: "Flashcard",
  //       title: "HTML Element Flashcards",
  //       description:
  //         "Use these flashcards to test your knowledge of HTML elements.",
  //       questions: [
  //         { front: "<html>", back: "The root element of the HTML page" },
  //         {
  //           front: "<head>",
  //           back: "Contains meta-information (title, links, scripts)",
  //         },
  //         { front: "<body>", back: "Contains the visible page content" },
  //         {
  //           front: "<title>",
  //           back: "Sets the title displayed in the browser tab",
  //         },
  //         {
  //           front: '<meta charset="UTF-8">',
  //           back: "Specifies character encoding",
  //         },
  //         {
  //           front: '<link rel="stylesheet" href="style.css">',
  //           back: "Links an external stylesheet",
  //         },
  //         {
  //           front: '<script src="script.js"></script>',
  //           back: "Includes an external JavaScript file",
  //         },
  //         { front: "<p>", back: "Represents a paragraph of text" },
  //         { front: "<h1>", back: "Defines a level 1 heading" },
  //         { front: "<div>", back: "A generic container for grouping elements" },
  //       ],
  //     },
  //   ],
  // };

  // Odd One Out handlers
  const handleOddOneOutSelect = (answer) => {
    setSelectedOddOneOut(answer);
    setShowOddOneOutExplanation(true);
  };

  const handleNextOddOneOut = () => {
    setCurrentOddOneOutIndex((prev) =>
      prev < courseData?.activities?.oddOneOut?.length - 1 ? prev + 1 : 0
    );
    setSelectedOddOneOut(null);
    setShowOddOneOutExplanation(false);
  };
  const handlePrevOddOneOut = () => {
    setCurrentOddOneOutIndex((prev) =>
      prev < courseData?.activities?.oddOneOut?.length + 1 ? prev - 1 : 0
    );
    setSelectedOddOneOut(null);
    setShowOddOneOutExplanation(false);
  };

  // Flashcard handlers

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="bg-blue-600 text-foreground rounded-t-lg">
          <CardTitle className="text-2xl font-bold">
            {courseData.chapterName}
          </CardTitle>
          <CardDescription className="text-blue-100">
            Choose an activity to begin learning
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 md:p-6">
          <Tabs defaultValue="oddoneout" className="space-y-4 sm:space-y-6">
            {/* Tabs List - Responsive Grid */}
            <TabsList className="grid grid-cols-3 gap-2 sm:gap-4 sm:p-2 bg-blue-50 p-2 ">
              <TabsTrigger
                value="oddoneout"
                className="text-xs sm:text-sm data-[state=active]:bg-blue-600 data-[state=active]:text-foreground"
              >
                Odd One Out
              </TabsTrigger>
              <TabsTrigger
                value="matching"
                className="text-xs sm:text-sm data-[state=active]:bg-blue-600 data-[state=active]:text-foreground"
              >
                Match the Pair
              </TabsTrigger>
              <TabsTrigger
                value="flashcards"
                className="text-xs sm:text-sm data-[state=active]:bg-blue-600 data-[state=active]:text-foreground"
              >
                Flashcards
              </TabsTrigger>
            </TabsList>

            {/* Odd One Out Content */}
            <TabsContent value="oddoneout" className="space-y-2 sm:space-y-4">
              <div className="text-xs sm:text-sm text-blue-600 mb-1 sm:mb-2">
                Question {currentOddOneOutIndex + 1} of{" "}
                {courseData?.activities?.oddOneOut?.length || 0}
              </div>

              {/* Responsive Grid for Options */}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4">
                {courseData?.activities?.oddOneOut[
                  currentOddOneOutIndex
                ].options.map((item, index) => (
                  <Button
                    key={index}
                    variant={selectedOddOneOut === item ? "default" : "outline"}
                    className={`h-auto py-2 px-3 sm:py-4 sm:px-6 text-xs sm:text-base ${
                      selectedOddOneOut === item
                        ? "bg-blue-600 text-foreground"
                        : "hover:bg-blue-50"
                    }`}
                    onClick={() => handleOddOneOutSelect(item)}
                  >
                    {item}
                  </Button>
                ))}
              </div>

              {/* Explanation Section */}
              {showOddOneOutExplanation && (
                <div
                  className={`mt-2 sm:mt-6 p-2 sm:p-4 rounded-lg text-xs sm:text-sm ${
                    selectedOddOneOut ===
                    courseData?.activities?.oddOneOut[currentOddOneOutIndex]
                      .oddOne
                      ? "bg-green-50 border border-green-200"
                      : "bg-red-50 border border-red-200"
                  }`}
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    {selectedOddOneOut ===
                    courseData?.activities?.oddOneOut[currentOddOneOutIndex]
                      .oddOne ? (
                      <CheckCircle2 className="w-4 h-4 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-1" />
                    ) : (
                      <AlertCircle className="w-4 h-4 sm:w-6 sm:h-6 text-red-600 flex-shrink-0 mt-1" />
                    )}
                    <div>
                      <div className="font-medium mb-1">
                        {selectedOddOneOut ===
                        courseData?.activities?.oddOneOut[currentOddOneOutIndex]
                          .oddOne
                          ? "Correct!"
                          : "Not quite right"}
                      </div>
                      <div className="text-xs sm:text-sm">
                        {
                          courseData?.activities?.oddOneOut[
                            currentOddOneOutIndex
                          ].reason
                        }
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-end mt-2 sm:mt-4 gap-2 sm:gap-5">
                <Button
                  onClick={handlePrevOddOneOut}
                  className="bg-primary hover:opacity-90 text-foreground text-xs sm:text-sm"
                  disabled={currentOddOneOutIndex === 0}
                >
                  <ChevronLeft className="mr-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Prev
                </Button>
                <Button
                  onClick={handleNextOddOneOut}
                  className="bg-primary hover:opacity-90 text-foreground text-xs sm:text-sm"
                  disabled={
                    currentOddOneOutIndex ===
                    courseData?.activities?.oddOneOut?.length - 1
                  }
                >
                  Next
                  <ChevronRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </TabsContent>

            {/* Match the Pair Content */}
            <TabsContent value="matching" className="space-y-2 sm:space-y-4">
              <Matchthepair match={courseData} />
            </TabsContent>

            {/* Flashcards Content */}
            <TabsContent value="flashcards" className="space-y-2 sm:space-y-4">
              <div className="text-xs sm:text-sm text-blue-600 mb-1 sm:mb-2">
                Card {currentFlashcardIndex + 1} of{" "}
                {courseData?.activities?.flashcards?.length}
              </div>
              <FlishCard
                courseData={courseData}
                currentFlashcardIndex={currentFlashcardIndex}
                setCurrentFlashcardIndex={setCurrentFlashcardIndex}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EducationalActivities;
