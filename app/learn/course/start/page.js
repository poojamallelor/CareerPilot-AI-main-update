"use client";
import { Book, ChevronRight, Code, Video } from "lucide-react";
import { useEffect, useState } from "react";
import nextDynamic from 'next/dynamic';
import { Button } from "../../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import {
  AiChapterExam,
  AiCheatSheet,
  AiCodingRoundQuestion,
  AiEngagingContent,
  Aiexpand,
  AiFixBug,
  AiInter,
  AiTraslator,
} from '../../../../config/AiModels';
import service from "../../../../config/service";
import McqExam from "../components/McqExam";
import ChapterExam from "./components/ChapterExam";
import CheatSheet from "./components/CheatSheet";

// Dynamic imports to avoid SSR issues
const YouTube = nextDynamic(() => import("react-youtube"), { ssr: false });
import Doubt from "./components/Doubt";
import FixBug from "./components/FixBug";
import InterviewQuestionUI from "./components/InterviewQuestion";
import LetStart from "./components/LetStart";
import OddOneOut from "./components/OddOneOut";
import PracticeQuestion from "./components/PracticeQuestion";
import ShowDoubt from "./components/ShowDoubt";

const CoursePage = () => {
  const [name, setName] = useState("");
  const [restart, setRestart] = useState(false);
  const [activeChapterlocal, setActiveChapterlocal] = useState(5);
  const [expandChapter, setExpandChapter] = useState("");
  const [activeChapter, setActiveChapter] = useState(0);
  const [complete, setComplete] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [chapterExam, setChapterExam] = useState("");
  const [examData, setExamData] = useState(false);
  const [exam, setExam] = useState(1);
  const [topicName, setTopicName] = useState("");
  const [combinedChapterData, setCombinedChapterData] = useState(null);

  // Initialize all localStorage data on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem("combinedChapterData");
      setCombinedChapterData(data ? JSON.parse(data) : null);

      const savedChapter = localStorage.getItem("activeChapter");
      if (savedChapter) {
        setActiveChapter(parseInt(savedChapter, 10));
      }

      const formData = JSON.parse(localStorage.getItem("formData") || "{}");
      if (formData) {
        setLanguage(formData.video_language);
      }
    }
  }, []);
  const [expand, setExpand] = useState(true);
  const [expandindex, setExpandindex] = useState(null);
  const [expandContent, setExpandContent] = useState("");
  const [category, setCategory] = useState("");
  const [cheat, setCheat] = useState(false);
  const [cheatSheet, setCheatSheet] = useState("");
  const [exp, setExp] = useState(false);
  const [cheatindex, setCheatIndex] = useState(null);
  const [practice, setPractice] = useState("");
  const [view, setView] = useState(false);
  const [play, setPlay] = useState(false);
  const [currentPlay, setCurrentPlay] = useState(null);
  const [enggaging, setEnggaging] = useState(false);
  const [Interview, setInterview] = useState(false);
  const [enggagingContent, setEnggagingContent] = useState("");
  const [enggagingContent2, setEnggagingContent2] = useState("");
  const [videoId, setVideoId] = useState("");
  const [speechIndex, setSpeechIndex] = useState(null);
  const [start, setStart] = useState(false);
  const [text, setText] = useState("");
  const [heading, setHeading] = useState("");
  const [translate, setTranslate] = useState("");
  const [doubt, setDoubt] = useState(false);
  const [solve, setSolve] = useState("");
  const [translateIndex, setTranslateIndex] = useState(null);
  const [fontValue, setFontValue] = useState(4);
  const [font, setFont] = useState({
    1: "text-sm",
    2: "text-md",
    3: "text-base",
    4: "text-lg",
    5: "text-xl",
    6: "text-2xl",
    7: "text-3xl",
    8: "text-4xl",
    9: "text-5xl",
    10: "text-6xl",
  });
  const [loading, setLoading] = useState({
    exam: false,
    chapter: false,
    cheatSheet: false,
    practice: false,
    interview: false,
    learnWithFunctions: false,
    translate: false,
    code: false,
  });
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");

  // Speech-to-text state
  const [speechError, setSpeechError] = useState(null);
  const [speechResults, setSpeechResults] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [speechModule, setSpeechModule] = useState(null);

  // Initialize speech-to-text on client side only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import("react-hook-speech-to-text").then((module) => {
        setSpeechModule(module);
      });
    }
  }, []);

  // Placeholder functions for speech to text
  const startSpeechToText = () => {
    console.log('Speech to text not available');
  };

  const stopSpeechToText = () => {
    console.log('Speech to text not available');
  };

  useEffect(() => {
    if (restart) {
      takeExam();
    }
    if (complete) {
      if (combinedChapterData.length - 1 === activeChapter) {
        alert("course completed! Let's Take Final Exam!");
        setExam(0);
        setActiveChapter("");
      } else {
        setExamData(false);
        const index = activeChapter + 1;
        setActiveChapter(index);
        if (typeof window !== 'undefined') {
          localStorage.setItem("activeChapter", index);
        }
      }
    }
  }, [restart, complete]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const expandContent = localStorage.getItem("expandContent");
      const expandindex = localStorage.getItem("expandindex");
      if (expandContent && expandindex) {
        setExpandContent(JSON.parse(expandContent));
        setExpandindex(expandindex);
      }
      const topicName = localStorage.getItem("topicName");
      if (topicName) {
        setTopicName(topicName);
      }
      const category = localStorage.getItem("category");
      if (category) {
        setCategory(category);
      }
      const activeChapterlocal = localStorage.getItem("activeChapter");
      if (activeChapterlocal) {
        setActiveChapterlocal(activeChapterlocal);
      }
      const expandChapter = localStorage.getItem("expandChapter");
      if (expandChapter) {
        setExpandChapter(expandChapter);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cheatSheet = localStorage.getItem("cheatSheet");
      const cheatindex = localStorage.getItem("cheatindex");
      if (cheatSheet && cheatindex) {
        setCheatSheet(JSON.parse(cheatSheet));
        setCheatIndex(cheatindex);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const engagingContent = localStorage.getItem("engagingContent");
      const TopicInterviewQuestion = localStorage.getItem(
        "TopicInterviewQuestion"
      );
      const PreacticeQuestion = localStorage.getItem("PreacticeQuestion");

      if (engagingContent) {
        setEnggagingContent(JSON.parse(engagingContent));
      }
      if (TopicInterviewQuestion) {
        setEnggagingContent2(JSON.parse(TopicInterviewQuestion));
        setInterview(true);
      }
      if (PreacticeQuestion) {
        setPractice(JSON.parse(PreacticeQuestion));
      }
    }
  }, []);

  useEffect(() => {
    setCheat(false), setInterview(false), setView(false), setEnggaging(false);
    if (!combinedChapterData && typeof window !== 'undefined') {
      if (typeof window !== 'undefined') {
        window.location.replace("/learn/course");
      }
    }
  }, []);

  const takeExam = async (chapterName) => {
    console.log(chapterName);
    setLoading((prevState) => ({
      ...prevState,
      exam: true,
    }));
    const prompt = `generate 10 mcq for exam on chapter ${chapterName} of course ${topicName}, include question, answer, options, explanation. In JSON format.`;
    try {
      const result = await AiChapterExam.sendMessage(prompt);
      const responseText = await result.response.text();
      const parsedResult = JSON.parse(responseText);
      setChapterExam(parsedResult);
      if (typeof window !== 'undefined') {
        localStorage.setItem("chapterExam", JSON.stringify(parsedResult));
      }
      console.log(parsedResult);
      setExamData(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading((prevState) => ({
        ...prevState,
        exam: false,
      }));
      setRestart(false);
    }
  };

  const handleExpandChapter = async (topicName, index) => {
    if (index !== expandindex) {
      setLoading((prevState) => ({
        ...prevState,
        chapter: true,
      }));
      prompt = `explain the concept in details ${combinedChapterData[activeChapter].content.content[index].heading} of course:${topicName}.include title:title of content.description:detailed descritpion.code(if applicable):code example (<precode> formate ).in json formate`;
      try {
        const result = await Aiexpand.sendMessage(prompt);
        const responseText = await result.response.text();
        const parsedResult = JSON.parse(responseText);
        console.log(parsedResult);
        setLoading(false);
        setExpandContent(parsedResult);
        if (typeof window !== 'undefined') {
          localStorage.setItem("expandContent", JSON.stringify(parsedResult));
          localStorage.setItem("expandindex", index);
          localStorage.setItem("expandChapter", activeChapter);
        }
        setExpand(false);
        setExpandindex(index);
        if (typeof window !== 'undefined') {
          localStorage.setItem("expandindex", index);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading((prevState) => ({
          ...prevState,
          chapter: false,
        }));
      }
    }
  };

  const handleVideoChange = async (activeChapter) => {
    const videoResponse = await service.getVideos(
      `${combinedChapterData[activeChapter]?.chapterName}`
    );
    const videoId = videoResponse[0]?.id?.videoId;
    setVideoId(videoId);
  };

  const createCheatSheet = async () => {
    setLoading((prevState) => ({
      ...prevState,
      cheatSheet: true,
    }));
    const prompt = `from interview purspective create concise,organized,and purpose oriented cheat sheet for chapter ${combinedChapterData[activeChapter].chapterName} of course:${topicName}.include headind:content heading,explanation,code (<pre> formate) if applicable,tips.in json format.`;
    try {
      const result = await AiCheatSheet.sendMessage(prompt);
      const responseText = await result.response.text();
      const parsedResult = JSON.parse(responseText);
      console.log(parsedResult);
      setCheatSheet(parsedResult);
      if (typeof window !== 'undefined') {
        localStorage.setItem("cheatSheet", JSON.stringify(parsedResult));
        localStorage.setItem("cheatindex", activeChapter);
      }
      setCheatIndex(activeChapter);
      setCheat(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading((prevState) => ({
        ...prevState,
        cheatSheet: false,
      }));
    }
  };

  const handlePreacticeQuestion = async () => {
    setLoading((prevState) => ({
      ...prevState,
      practice: true,
    }));
    const level = "beginner";
    const prompt = `Generate 5 ${level}-level practice questions for a ${topicName} programming course, focusing on fundamental concepts related to ${combinedChapterData[activeChapter].chapterName}, with clear problem statements, and concise solution outlines, tailored to facilitate effective learning and assessment.in json formate.`;
    try {
      const result = await AiCodingRoundQuestion.sendMessage(prompt);
      const responseText = result.response.text();
      console.log(responseText);
      const json = JSON.parse(responseText);
      if (typeof window !== 'undefined') {
        localStorage.setItem("PreacticeQuestion", JSON.stringify(json));
      }
      setPractice(json);
      setView(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading((prevState) => ({
        ...prevState,
        practice: false,
      }));
    }
  };

  const learnWithFun = async () => {
    setLoading((prevState) => ({
      ...prevState,
      learnWithFunctions: true,
    }));
    const prompt = `chapterName: ${combinedChapterData[activeChapter].chapterName}. chapteDescription: ${combinedChapterData[activeChapter].content.description}. on the basic of give content generate engaging content like 10 match the pair, 10 odd one out,10 flashcard.in json formate.`;
    try {
      const result = await AiEngagingContent.sendMessage(prompt);
      const responseText = await result.response.text();
      const json = JSON.parse(responseText);
      if (typeof window !== 'undefined') {
        localStorage.setItem("engagingContent", JSON.stringify(json));
      }
      console.log(json);
      setEnggagingContent(json);
      setEnggaging(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading((prevState) => ({
        ...prevState,
        learnWithFunctions: false,
      }));
    }
  };

  const InterviewQuestion = async () => {
    setLoading((prevState) => ({
      ...prevState,
      interview: true,
    }));
    const prompt2 = `Design a set of five interview-style questions on the topic of ${combinedChapterData[activeChapter].chapterName} in ${topicName}, focusing on common use cases, best practices, and edge cases. Each question should be concise, clear, and objective. Provide the questions and ideal answers and resources. in JSON format.`;
    try {
      const result2 = await AiInter.sendMessage(prompt2);
      const responseText2 = await result2.response.text();
      const json2 = JSON.parse(responseText2);
      if (typeof window !== 'undefined') {
        localStorage.setItem("TopicInterviewQuestion", JSON.stringify(json2));
      }
      setEnggagingContent2(json2);
      setInterview(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading((prevState) => ({
        ...prevState,
        interview: false,
      }));
    }
  };

  const handleTranslate = async (index) => {
    setLoading((prevState) => ({
      ...prevState,
      translate: true,
    }));
    setTranslate("");
    const text =
      combinedChapterData?.[activeChapter]?.content?.content?.[index]?.text;
    setTranslateIndex(index);
    const prompt = `Translate the following text from English to ${language}: ${text}.in json formate.`;
    try {
      const result = await AiTraslator.sendMessage(prompt);
      const responseText = result.response.text();
      console.log(responseText);
      const json = JSON.parse(responseText);
      setTranslate(json);
      // console.log(prompt);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading((prevState) => ({
        ...prevState,
        translate: false,
      }));
    }
  };

  const handleFixBug = async () => {
    setLoading((prevState) => ({
      ...prevState,
      code: true,
    }));
    const prompt = `give me five code with bug to master this topic "Basic HTML Structure" .include code(pre block),options,description.in json formate.`;
    try {
      const result = await AiFixBug.sendMessage(prompt);
      const responseText = result.response.text();
      const json = JSON.parse(responseText);
      console.log(json);
      setCode(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading((prevState) => ({
        ...prevState,
        code: false,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-blue-600 text-foreground py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold capitalize">
            {topicName} Course
          </h1>
          <p className="mt-2 text-blue-100">
            Master the fundamentals of {topicName} in {language}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - Chapter List */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="w-5 h-5 text-blue-600" />
                  Course Chapters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {combinedChapterData?.map((chapter, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveChapter(index);
                        setExam(1);
                      }}
                      className={`w-full text-left p-3 rounded-lg flex items-center gap-2 transition-colors ${activeChapter === index
                          ? "bg-blue-100 text-blue-700"
                          : "hover:bg-blue-50"
                        }`}
                      disabled={activeChapterlocal < index}
                      title={chapter?.chapterName}
                    >
                      <ChevronRight
                        className={`w-4 h-4 ${activeChapter === index
                            ? "text-blue-600"
                            : "text-gray-400"
                          }`}
                      />
                      <span className="flex-1">{chapter?.chapterName}</span>
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setExam(1);
                      setActiveChapter("");
                    }}
                    className={`w-full text-left p-3 rounded-lg flex items-center gap-2 transition-colors ${exam ? "hover:bg-blue-50" : "bg-blue-100 text-blue-700"
                      }`}
                    disabled={
                      parseInt(activeChapterlocal, 10) !==
                      combinedChapterData?.length - 1
                    }
                    title="This section work after final chapter"
                  >
                    <ChevronRight
                      className={`w-4 h-4 ${exam ? "text-gray-400" : "text-blue-600"
                        }`}
                    />
                    <span className="flex-1">Final Exam</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* final exam */}
          {exam ? (
            <div className="lg:col-span-2 space-y-6">
              {/* Video Section */}
              <Card className="">
                <CardHeader>
                  <CardTitle>
                    <p className="text-lg font-bold bg-blue-500 p-2 rounded-lg text-foreground text-center">
                      {combinedChapterData?.[activeChapter]?.chapterName}
                    </p>
                    <div className="flex items-center gap-2 mt-5">
                      <Video className="w-5 h-5 text-blue-600" />
                      Video Tutorial{" "}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className=" bg-gray-100 rounded-lg flex items-center justify-center ">
                    <YouTube
                      videoId={
                        videoId || combinedChapterData?.[activeChapter]?.videoId
                      }
                      className="w-[550px] h-[200px] md:w-[700px] md:h-[400px]"
                      opts={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button
                      className="bg-blue-800 hover:bg-blue-900 text-foreground p-2 rounded-lg"
                      onClick={() => handleVideoChange(activeChapter)}
                    >
                      Change Video 🔀
                    </Button>
                    <Button
                      title="increase font size"
                      disabled={fontValue == 6}
                      onClick={() => setFontValue(fontValue + 1)}
                    >
                      ╋
                    </Button>
                    <Button
                      title="descrease font size"
                      disabled={fontValue == 1}
                      onClick={() => setFontValue(fontValue - 1)}
                    >
                      ―
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Code Example */}
              {combinedChapterData?.[activeChapter]?.content?.code && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="w-5 h-5 text-blue-600" />
                      Code Example
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                      <code>
                        {combinedChapterData[activeChapter].content.code}
                      </code>
                    </pre>
                  </CardContent>
                </Card>
              )}

              {/* Content Sections */}
              {combinedChapterData?.[activeChapter]?.content?.content?.map(
                (section, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className={`${font[fontValue]}`}>
                        {section.heading}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        {/* {section.text && (
                          <div className="cursor-pointer">
                            {play && currentPlay == index ? (
                              <GiSpeakerOff
                                size={24}
                                onClick={() => {
                                  handleStop();
                                  setPlay(false);
                                  setCurrentPlay(null);
                                }}
                              />
                            ) : (
                              <GiSpeaker
                                size={24}
                                onClick={() => {
                                  const text = section.text;
                                  handleSpeak(text);
                                  setPlay(true);
                                  setCurrentPlay(index);
                                }}
                              />
                            )}

                            <div>
                              <div>
                                {isRecording && speechIndex === index ? (
                                  <button
                                    onClick={() => {
                                      stopSpeechToText(); // Invoke the stop function
                                    }}
                                  >
                                    <MdMicOff size={24} />
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => {
                                      setSpeechIndex(index);
                                      startSpeechToText(); // Invoke the start function
                                    }}
                                  >
                                    <MdMicNone size={24} />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        )} */}
                        <p className={`${font[fontValue]} text-justify`}>
                          {section.text}
                        </p>
                      </div>
                      {section.code && (
                        <pre
                          className={`bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mt-5 ${font[fontValue]}`}
                        >
                          <code>{section?.code}</code>
                        </pre>
                      )}

                      {/* Responsive Button Container */}
                      {section.text && (
                        <div>
                          {translate && translateIndex == index && (
                            <div className="mt-5 p-2 border border-blue-500 rounded-lg">
                              <p className="text-gray-600 text-justify">
                                {translate[language]}
                              </p>
                            </div>
                          )}

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-5 md:items-center">
                            {/* Translate Button */}
                            <Button
                              className="w-full bg-[#003F87] text-foreground"
                              onClick={() => handleTranslate(index)}
                              disabled={loading.translate}
                            >
                              {loading.translate && translateIndex == index
                                ? "Loading..."
                                : "Translate 🔄"}
                            </Button>

                            {/* Expand Content Button */}
                            {expandChapter !== activeChapter &&
                              expandindex != index && (
                                <Button
                                  className="w-full"
                                  onClick={() =>
                                    handleExpandChapter(topicName, index)
                                  }
                                  title="Click to know more about"
                                  disabled={loading.chapter}
                                >
                                  {loading.chapter
                                    ? "Loading..."
                                    : "Expand Content ↔️"}
                                </Button>
                              )}
                            {/* Conditional Expand Content Handling */}
                            {expandChapter == activeChapter &&
                              expandindex == index && (
                                <div className="mt-2 text-center">
                                  {expandindex === index &&
                                    expandContent !== "" &&
                                    expandChapter == activeChapter &&
                                    exp ? (
                                    <Button
                                      className="w-full"
                                      onClick={() => setExp(false)}
                                      title="Click to Hide"
                                    >
                                      Hide Content
                                    </Button>
                                  ) : (
                                    <Button
                                      className="w-full"
                                      onClick={() => {
                                        setExpandindex(index);
                                        setExp(true);
                                      }}
                                      title="Click to View"
                                    >
                                      View Content
                                    </Button>
                                  )}
                                </div>
                              )}

                            {/* Start/View Content Button */}
                            <Button
                              className="w-full bg-blue-500 hover:bg-blue-600 text-foreground"
                              onClick={() => {
                                setStart(true);
                                setText(section.text);
                                setHeading(section.heading);
                              }}
                            >
                              Let's प्रारम्भ (Start) 🚀
                            </Button>
                          </div>
                        </div>
                      )}

                      {speechIndex == index && (
                        <div className="mt-5 ml-8">
                          <ul>
                            {results.map((result) => (
                              <li
                                key={result.timestamp}
                                className="text-gray-600 text-justify"
                              >
                                {result.transcript}
                              </li>
                            ))}
                            {interimResult && <li>{interimResult}</li>}
                          </ul>
                        </div>
                      )}

                      {exp &&
                        expandindex == index &&
                        expandChapter == activeChapter && (
                          <>
                            <Card className="mt-5 border-blue-600 border-2">
                              <CardHeader>
                                <CardTitle>{expandContent.title}</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-gray-600">
                                  {expandContent.description}
                                </p>
                                {expandContent?.code && (
                                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mt-5">
                                    <code>{expandContent?.code}</code>
                                  </pre>
                                )}
                                <div className="text-gray-600 mt-5">
                                  {expandContent?.explanation?.map(
                                    (exp, ind) => (
                                      <div key={ind}>
                                        <p className="font-bold">
                                          {exp.heading}
                                        </p>
                                        <p>{exp.content}</p>
                                      </div>
                                    )
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          </>
                        )}
                    </CardContent>
                  </Card>
                )
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                {category === "programming & code" && (
                  <>
                    {cheatSheet && activeChapter == cheatindex ? (
                      <Button
                        className="bg-blue-800 text-foreground hover:bg-blue-900"
                        onClick={() => {
                          cheat
                            ? setCheat(false)
                            : (setCheat(true),
                              setInterview(false),
                              setView(false),
                              setEnggaging(false));
                        }}
                      >
                        {cheat ? "Hide CheatSheet 📝" : "View CheatSheet 📝"}
                      </Button>
                    ) : (
                      <Button
                        className="bg-blue-800 text-foreground hover:bg-blue-900"
                        onClick={() => {
                          createCheatSheet();
                        }}
                        disabled={loading.cheatSheet}
                      >
                        {loading.cheatSheet
                          ? "Loading..."
                          : "Generate CheatSheet 📝"}
                      </Button>
                    )}
                    <Button
                      onClick={() => handleFixBug()}
                      className="bg-blue-800 text-foreground hover:bg-blue-900"
                      disabled={loading.code}
                    >
                      {loading.code ? "Loading..." : "Fix Bug 🐞"}
                    </Button>
                  </>
                )}

                {!enggagingContent ? (
                  <Button
                    className="bg-blue-800 text-foreground hover:bg-blue-900"
                    onClick={() => {
                      setEnggaging((prev) => !prev);
                      learnWithFun();
                    }}
                    disabled={loading.learnWithFunctions}
                  >
                    {loading.learnWithFunctions
                      ? "Loading..."
                      : "Learn With Fun 🎮"}
                  </Button>
                ) : (
                  <Button
                    className="bg-blue-800 text-foreground hover:bg-blue-900"
                    onClick={() => {
                      enggaging
                        ? setEnggaging((prev) => !prev)
                        : (setEnggaging((prev) => !prev),
                          setInterview(false),
                          setCheat(false),
                          setView(false));
                    }}
                  >
                    {enggaging ? "Hide games 🎮" : "View games 🎮"}
                  </Button>
                )}
                {!enggagingContent2 ? (
                  <Button
                    className="bg-blue-800 w-full text-foreground hover:bg-blue-900"
                    onClick={() => {
                      InterviewQuestion();
                    }}
                    disabled={loading.interview}
                  >
                    {loading.interview ? "Loading..." : "Interview Question 💼"}
                  </Button>
                ) : (
                  <div>
                    {Interview ? (
                      <Button
                        className="bg-blue-800 w-full text-foreground hover:bg-blue-900"
                        onClick={() => {
                          setInterview((prev) => !prev);
                        }}
                      >
                        Hide Interview Question 💼
                      </Button>
                    ) : (
                      <Button
                        className=" text-foreground w-full bg-blue-900"
                        onClick={() => {
                          setInterview((prev) => !prev);
                          setEnggaging(false);
                          setCheat(false);
                          setView(false);
                        }}
                      >
                        View Interview Question 💼
                      </Button>
                    )}
                  </div>
                )}
                <div>
                  {!practice ? (
                    <Button
                      className="bg-blue-800 w-full text-foreground   hover:bg-blue-900"
                      onClick={() => {
                        handlePreacticeQuestion();
                      }}
                      disabled={loading.practice}
                    >
                      {loading.practice
                        ? "Loading..."
                        : "Practical Question 🧑🏻‍💻"}
                    </Button>
                  ) : (
                    <div>
                      <Button
                        className="bg-blue-800 w-full text-foreground hover:bg-blue-900"
                        onClick={() => {
                          !view
                            ? (setView(true),
                              setInterview(false),
                              setCheat(false),
                              setEnggaging(false))
                            : setView(false);
                        }}
                      >
                        {!view ? "View Practical" : "Hide Practical"}
                      </Button>
                    </div>
                  )}
                </div>

                {solve ? (
                  <div>
                    <Button
                      className="bg-[#E0E0E0] w-full text-foreground hover:bg-blue-900"
                      onClick={() => setSolve("")}
                    >
                      hide solution 🤔
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Button
                      onClick={() => setDoubt(true)}
                      className="bg-blue-800 w-full text-foreground hover:bg-blue-900"
                    >
                      I Have Doubt 🤔
                    </Button>
                  </div>
                )}

                {!examData && (
                  <Button
                    onClick={() => {
                      const chapterName =
                        combinedChapterData[activeChapter].chapterName;
                      setName(chapterName);
                      takeExam(chapterName);
                    }}
                    title="Chapterwise Exam"
                    className="bg-[#FF5722] text-foreground hover:bg-blue-900"
                    disabled={loading.exam}
                  >
                    {loading.exam ? "Loading..." : "Take a Exam ✍🏼"}
                  </Button>
                )}
              </div>
              {examData && (
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Exam Section</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChapterExam
                        setRestart={setRestart}
                        setComplete={setComplete}
                        topicName={name}
                      />
                    </CardContent>
                  </Card>
                </div>
              )}

              {cheat && activeChapter == cheatindex && (
                <CheatSheet cheatSheet={cheatSheet} setCheat={setCheat} />
              )}

              {/* show content */}
              {view && <PracticeQuestion practice={practice} />}
              {solve && <ShowDoubt solve={solve} setSolve={setSolve} />}

              {enggaging && (
                <OddOneOut
                  courseData={enggagingContent}
                  activeChapter={activeChapter}
                />
              )}

              {Interview && (
                <InterviewQuestionUI questions={enggagingContent2} />
                // <Check questions={enggagingContent2} />
              )}
              {/* <Check /> */}
              {code && <FixBug code={code} />}
              {/* let start */}
              <div className="w-[400px]">
                <LetStart
                  start={start}
                  text={text}
                  header={heading}
                  setStart={setStart}
                />

                <Doubt
                  doubt={doubt}
                  setDoubt={setDoubt}
                  setSolve={setSolve}
                  solve={solve}
                />
              </div>
            </div>
          ) : (
            <>
              <div className="lg:col-span-2 space-y-6 ">
                <Card>
                  <CardHeader>
                    <CardTitle>Exam Section</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <McqExam topicName={topicName} />
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default CoursePage;
