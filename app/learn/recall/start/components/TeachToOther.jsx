import { Mic, MicOff, Video, VideoOff } from "lucide-react";
import { useRef, useState } from "react";
import { Alert, AlertDescription } from "../../../../../components/ui/alert";
import { Button } from "../../../../../components/ui/button";
import WebCam from "../../../../components/WebCam";

const TeachToOther = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [error, setError] = useState("");
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [teach, setTeach] = useState(
    JSON.parse(localStorage.getItem("teachToOther"))
  );

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraOn(true);
      setError("");
    } catch (err) {
      setError("Failed to access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
  };

  const startRecording = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US'; // Set language explicitly

      // Increase timeout for speech recognition
      let silenceTimeout = null;
      const resetSilenceTimeout = () => {
        if (silenceTimeout) clearTimeout(silenceTimeout);
        silenceTimeout = setTimeout(() => {
          // Restart recognition if no speech detected for 5 seconds
          if (recognition) {
            console.log("No speech detected - restarting recognition");
            recognition.stop();
            setTimeout(() => {
              if (mediaRecorderRef.current === recognition) {
                recognition.start();
              }
            }, 500);
          }
        }, 5000);
      };

      resetSilenceTimeout();

      recognition.onresult = (event) => {
        resetSilenceTimeout(); // Reset timeout on result
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          }
        }
        setTranscript((prevTranscript) => prevTranscript + finalTranscript);
      };

      recognition.onerror = (event) => {
        console.log("Speech recognition error:", event.error);
        if (event.error === 'no-speech') {
          // Handle no speech detected
          resetSilenceTimeout();
        } else {
          setError("Error occurred in recognition: " + event.error);
        }
      };

      mediaRecorderRef.current = recognition;
      recognition.start();
      setIsRecording(true);
      setError("");
    } else {
      setError("Speech recognition is not supported in this browser.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <>
      {teach ? (
        <div className="max-w-4xl mx-auto p-4 space-y-4">
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">
                Question {activeQuestion + 1}:{" "}
                {teach?.questions[activeQuestion]?.type}
              </h3>
              <p className="text-gray-700">
                {teach?.questions[activeQuestion]?.question}
              </p>
              <div className="mt-2">
                <span className="text-sm text-gray-500">Key Topics: </span>
                {teach?.questions[activeQuestion]?.key_topics?.map(
                  (topic, index) => (
                    <span
                      key={index}
                      className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded mr-2 mb-2"
                    >
                      {topic}
                    </span>
                  )
                )}
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="">
              {isCameraOn && (
                <div className="  rounded-lg ">
                  <WebCam
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="bg-gray-50 p-4 rounded-lg ">
                <h3 className="font-medium mb-2">Your Answer:</h3>
                {/* <p className="text-gray-700 whitespace-pre-wrap">{transcript}</p> */}
                <textarea
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="flex justify-between items-center gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  setActiveQuestion((prev) => Math.max(0, prev - 1))
                }
                disabled={activeQuestion === 0}
              >
                Previous
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={isCameraOn ? stopCamera : startCamera}
                >
                  {isCameraOn ? (
                    <VideoOff className="h-4 w-4" />
                  ) : (
                    <Video className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant={isRecording ? "destructive" : "outline"}
                  onClick={isRecording ? stopRecording : startRecording}
                >
                  {isRecording ? (
                    <MicOff className="h-4 w-4" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <Button
                variant="outline"
                onClick={() =>
                  setActiveQuestion((prev) =>
                    Math.min(teach?.questions?.length - 1, prev + 1)
                  )
                }
                disabled={activeQuestion === teach?.questions?.length - 1}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-4">
          <p className="text-center text-gray-500">No Question Available</p>
          <Button onClick={() => (window.location.href = "/learn/recall")}>
            Go Back
          </Button>
        </div>
      )}
    </>
  );
};

export default TeachToOther;
