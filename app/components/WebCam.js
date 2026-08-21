"use client";
import React from "react";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from "../../components/ui/button";

// Dynamic import to avoid SSR issues
const Webcam = dynamic(() => import("react-webcam"), { 
  ssr: false,
  loading: () => (
    <div className="animate-pulse bg-gray-200 rounded-lg h-72 w-full flex items-center justify-center">
      <WebcamIcon className="h-20 w-20 text-gray-400" />
    </div>
  )
});

function WebCam() {
  const [webCamEnabled, setWebCamEnabled] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure we're on the client side and DOM is ready
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  // Show loading state during SSR and initial client render
  if (!isClient) {
    return (
      <div className="animate-pulse bg-gray-200 rounded-lg h-72 w-full flex items-center justify-center">
        <WebcamIcon className="h-20 w-20 text-gray-400" />
        <div className="ml-4 text-gray-500">Loading camera...</div>
      </div>
    );
  }

  return (
    <>
      <div>
        {webCamEnabled ? (
          <>
            <div>
              <Webcam
                onUserMedia={() => setWebCamEnabled(true)}
                onUserMediaError={() => setWebCamEnabled(false)}
                mirrored={true}
                style={{
                  height: 300,
                  width: 800,
                }}
              />
            </div>
          </>
        ) : (
          <>
            <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
          </>
        )}
      </div>
    </>
  );
}

export default WebCam;
