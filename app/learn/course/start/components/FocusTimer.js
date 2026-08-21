"use client";
import { useState, useEffect } from "react";

export default function FocusTimer() {
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 1 min timer for testing
  const [isBreak, setIsBreak] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const savedTime = localStorage.getItem("focus-timer-timeLeft");
    const savedStartTime = localStorage.getItem("focus-timer-startTime");
    const savedIsBreak = localStorage.getItem("focus-timer-isBreak") === "true";
    const savedIsLocked =
      localStorage.getItem("focus-timer-isLocked") === "true";

    if (savedTime && savedStartTime) {
      const elapsedTime = Math.floor(
        (Date.now() - parseInt(savedStartTime)) / 1000
      );
      const remainingTime = Math.max(0, parseInt(savedTime) - elapsedTime);

      setTimeLeft(remainingTime);
      setIsBreak(savedIsBreak);
      setIsLocked(savedIsLocked);

      if (remainingTime === 0) {
        handleTimerEnd(savedIsBreak);
      }
    } else {
      localStorage.setItem("focus-timer-startTime", Date.now());
      localStorage.setItem("focus-timer-timeLeft", timeLeft);
    }
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleTimerEnd(isBreak);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        localStorage.setItem("focus-timer-timeLeft", newTime);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleTimerEnd = (wasBreak) => {
    if (!wasBreak) {
      setIsBreak(true);
      setIsLocked(true);
      setTimeLeft(10); // 10-sec break
    } else {
      setIsBreak(false);
      setIsLocked(false);
      setTimeLeft(10 * 60); // Restart 1 min timer
    }
    localStorage.setItem("focus-timer-timeLeft", timeLeft);
    localStorage.setItem("focus-timer-isBreak", isBreak);
    localStorage.setItem("focus-timer-isLocked", isLocked);
    localStorage.setItem("focus-timer-startTime", Date.now());
  };

  return (
    <div className="relative">
      {isLocked && (
        <div className="fixed inset-0 bg-black opacity-80 flex items-center justify-center z-50">
          <h1 className="text-foreground text-3xl sm:text-4xl font-semibold">
            Break Time! Relax for{" "}
            <span className="text-blue-400">{timeLeft}</span> seconds.
          </h1>
        </div>
      )}

      <div className="fixed lg:bottom-28 bottom-[104px] right-7 w-17 h-17 sm:w-17 sm:h-17 rounded-full overflow-hidden border-2 border-white shadow-lg">
        {/* <Image
          src="/images.webp"
          alt="Logo"
          width={100}
          height={100}
          className="w-full h-full object-cover"
        /> */}
      </div>
    </div>
  );
}
