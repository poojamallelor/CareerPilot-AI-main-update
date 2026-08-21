"use client";
import React, { useEffect, useState } from "react";
import HeroSection from "./components/HeroSection";
import CourseSelectionForm from "./components/Form";
import SyallbusOutline from "./components/PreviewOutline.js";

const Recall = () => {
  const [form, setForm] = useState(false);
  const [outline, setOutline] = useState(false);
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    const RecallSyllabus = localStorage.getItem("RecallSyllabus");
    if (RecallSyllabus) {
      try {
        const parsed = JSON.parse(RecallSyllabus);
        setCourseData(parsed);
        setOutline(true);
        setForm(true);
      } catch (error) {
        console.error("Failed to parse stored syllabus:", error);
        localStorage.removeItem("RecallSyllabus");
      }
    }
  }, []);

  return (
    <>
      <div>
        {form ? (
          <CourseSelectionForm
            setOutline={setOutline}
            setCourseData={setCourseData}
            outline={outline}
          />
        ) : (
          <HeroSection setForm={setForm} />
        )}
        {outline && courseData && <SyallbusOutline courseData={courseData} />}
      </div>
    </>
  );
};

export default Recall;
