"use client";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ChatBot from "../components/ChatBot";

const componentMap = {
  DepartmentJobRoles: dynamic(() =>
    import("./components/DepartmentJobs")
  ),
  RoleRoadMap: dynamic(() =>
    import("./components/RoleRoadMap")
  ),

  CourseRoadmap: dynamic(() =>
    import("./components/CourseRoadmap")
  ),
};

const CareerPlanningContent = () => {
  const searchParams = useSearchParams();
  const page_name = searchParams.get("page");
  const Component =
    componentMap[page_name] ||
    dynamic(() => import("../components/Instruction"));
  return <Component />;
};

const CareerPlanning = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CareerPlanningContent />
    </Suspense>
  );
};

export default CareerPlanning;
