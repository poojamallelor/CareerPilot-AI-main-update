"use client";
import React, { Suspense } from "react";
import CourseInterface from "../components/NotesSection";

const Page = () => {
  return (
    <div>
      <Suspense fallback={<div className="p-6">Loading...</div>}>
        <CourseInterface />
      </Suspense>
    </div>
  );
};

export default Page;
