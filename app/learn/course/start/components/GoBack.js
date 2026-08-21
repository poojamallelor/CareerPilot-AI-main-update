"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Home } from "lucide-react";

const HomeNavigationIcon = () => {
  const router = useRouter();

  const handleHomeNavigation = () => {
    router.push("/");
  };

  return (
    <div
      onClick={handleHomeNavigation}
      className="fixed top-2 left-2 z-50 cursor-pointer hover:bg-blue-200 rounded-full p-2 transition-colors duration-200"
      aria-label="Go to Home"
    >
      <Home
        size={35}
        className="text-gray-700 hover:text-black bg-amber-50 rounded-full p-2"
      />
    </div>
  );
};

export default HomeNavigationIcon;
