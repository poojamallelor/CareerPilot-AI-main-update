import { Award, BookOpen, Briefcase } from "lucide-react";
import React from "react";

function HowWork() {
  return (
    <>
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              How CareerLaunch Works
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              We guide you through every step of your professional journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="bg-indigo-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Discover Your Path
              </h3>
              <p className="text-gray-600">
                Take our assessment to find career paths that match your skills,
                interests, and academic background.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="bg-indigo-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Build Your Skills
              </h3>
              <p className="text-gray-600">
                Access tailored resources, courses, and workshops to develop the
                skills employers need.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="bg-indigo-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Briefcase className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Land Your Job
              </h3>
              <p className="text-gray-600">
                Connect with employers, apply for positions, and prepare for
                interviews with expert guidance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HowWork;
