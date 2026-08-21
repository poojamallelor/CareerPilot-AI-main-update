import React from "react";
import { ChevronRight } from "lucide-react";

const HeroSection = ({ setForm }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-blue-700/30 blur-3xl"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl">
          <h1 className="text-6xl font-extrabold text-foreground mb-6 tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-100">
            Transform Your Digital Experience
          </h1>

          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto opacity-90 font-light">
            Breakthrough innovations that redefine possibilities. Seamless,
            intelligent, and inspiring solutions designed to elevate your
            digital journey.
          </p>

          <div className="flex justify-center">
            <button
              className="group relative px-8 py-4 bg-white text-blue-900 font-semibold rounded-full 
              hover:bg-blue-50 transition-all duration-300 ease-in-out 
              flex items-center space-x-3 
              before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-300 before:to-blue-500 
              before:opacity-0 hover:before:opacity-20 before:rounded-full 
              before:transition-all before:duration-300 before:ease-in-out
              shadow-xl hover:shadow-2xl"
              onClick={() => setForm(true)}
            >
              <span>Get Started</span>
              <ChevronRight
                className="transition-transform group-hover:translate-x-1"
                size={20}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Subtle Background Animations */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute animate-blob top-1/4 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute animate-blob animation-delay-2000 top-1/2 -right-4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl"></div>
      </div>
    </div>
  );
};

export default HeroSection;
