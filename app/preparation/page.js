"use client";
import ChatBot from "../components/ChatBot";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const componentMap = {
  StartInterview: dynamic(() =>
    import("./components/StartHumanInterview")
  ),
  AptitudeExam: dynamic(() =>
    import("./components/AptitudeExam")
  ),
  CompanyProblem: dynamic(() =>
    import("./components/CompanyProblem")
  ),
};

const PreparationContent = () => {
  const searchParams = useSearchParams();
  const page_name = searchParams.get("page");
  const Component =
    componentMap[page_name] ||
    dynamic(() => import("./components/ModernAssessmentPortal"));
  return (
    <>
      <Component />
      <ChatBot />
    </>
  );
};

const ParamsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PreparationContent />
    </Suspense>
  );
};

export default ParamsPage;
