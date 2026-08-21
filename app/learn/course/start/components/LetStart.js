import { useEffect, useRef, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import { MdHearing, MdHearingDisabled } from "react-icons/md";
import { AlertDialog, AlertDialogContent } from "../../../../../components/ui/alert-dialog";
import { Button } from "../../../../../components/ui/button";
import { AiGeneratePoints } from '../../../../../config/AiModels';
import { handleSpeak, handleStop } from "../../../../components/Speach";

function LetStart({ start, text, header, setStart }) {
  const [state, setState] = useState(0);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [speak, setSpeak] = useState(1);
  const [hear, setHear] = useState(false);
  const [hide, setHide] = useState({
    listening: false,
    speaking: false,
    repeating: false,
  });
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    if (results.length > 0) {
      const newAnswer = results.map((result) => result.transcript).join(" ");
      setUserAnswer((prevAnswer) => prevAnswer + " " + newAnswer);
      setResults([]);
    }
  }, [results, setResults]);

  const handleWriting = async () => {
    setLoading(true);
    const prompt = `Read the following paragraph and extract its main points in the form of concise bullet points. Summarize key ideas, arguments,
    or critical details while keeping the language short, simple and precise.in json formate.Paragraph: ${text}`;
    try {
      const result = await AiGeneratePoints.sendMessage(prompt);
      const responseText = await result.response.text();
      console.log(responseText);
      const jsonreponse = JSON.parse(responseText);
      setSummary(jsonreponse);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const audioRef = useRef(null);

  const handlePlay = () => {
    if (hear) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      setHear(true);
    }
  };

  return (
    <div className="w-full">
      <AlertDialog open={start}>
        <AlertDialogContent className="w-[90vw] max-w-[90vw] sm:w-[80vw] sm:max-w-[80vw] md:w-full md:max-w-3xl p-4 sm:p-6">
          <div className="w-full">
            <p className="font-bold text-lg sm:text-xl">
              {header || "Let's Start"}
            </p>
            {state !== 3 && state !== 4 && (
              <div className="mt-2 text-sm sm:text-base text-justify overflow-y-auto max-h-[40vh]">
                <p>{text}</p>
              </div>
            )}

            {state === 1 && (
              <div className="mt-3 sm:mt-5 p-2 border rounded-md m-1 sm:m-2 overflow-y-auto max-h-[30vh]">
                <ul className="space-y-1">
                  {results.map((result) => (
                    <li
                      key={result.timestamp}
                      className="text-gray-600 text-justify text-sm sm:text-base"
                    >
                      {result.transcript}
                    </li>
                  ))}
                  {interimResult && (
                    <li className="text-sm sm:text-base">{interimResult}</li>
                  )}
                </ul>
                <p className="text-sm sm:text-base mt-2">{userAnswer}</p>
              </div>
            )}

            {state === 2 && (
              <div className="mt-3 sm:mt-5 border rounded-md m-1 sm:m-2 p-2 overflow-y-auto max-h-[30vh]">
                {summary && (
                  <div className="space-y-1">
                    {summary?.mainPoints?.map((point, index) => (
                      <p key={index} className="text-sm sm:text-base">
                        {index + 1}. {point}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}

            {state === 3 && (
              <div className="w-full">
                <p className="text-base sm:text-lg font-bold">
                  Summary of you learn
                </p>
                <div className="mt-3 sm:mt-5 border rounded-md m-1 sm:m-2 p-2 overflow-y-auto h-20 sm:h-24">
                  <ul className="space-y-1">
                    {results.map((result) => (
                      <li
                        key={result.timestamp}
                        className="text-gray-600 text-justify text-sm sm:text-base"
                      >
                        {result.transcript}
                      </li>
                    ))}
                    {interimResult && (
                      <li className="text-sm sm:text-base">{interimResult}</li>
                    )}
                  </ul>
                  <p className="text-sm sm:text-base">{userAnswer}</p>
                </div>
              </div>
            )}

            {state === 4 && (
              <div className="w-full">
                <p className="text-base sm:text-lg font-bold">
                  Communication skills
                </p>
                <p className="text-sm sm:text-base font-bold">
                  Active Listening
                </p>
                <span className="text-xs sm:text-sm">
                  Listening to something or someone is crucial for
                  communication. Listening carefully provides an opportunity to
                  understand others.
                </span>
                <div className="mt-2 w-full">
                  <audio
                    ref={audioRef}
                    controls
                    src="/audio.mp3"
                    onPlay={handlePlay}
                    className="w-full max-w-full"
                  ></audio>
                </div>

                <span className="text-red-500 text-xs sm:text-sm mt-2 block">
                  You can only listen once.
                </span>

                <div className="mt-2 w-full">
                  <input
                    className="w-full border rounded-md p-2 text-sm"
                    type="text"
                    placeholder="Enter your 10 keywords from the statement"
                  />
                </div>
              </div>
            )}

            <div className="mt-4 sm:mt-5">
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <div className="w-full sm:w-1/3">
                  {state === 0 && (
                    <Button
                      className="bg-blue-500 text-foreground hover:bg-blue-600 w-full text-xs sm:text-sm flex items-center justify-center gap-1"
                      title="listen to the text"
                      onClick={() => {
                        !hide.listening
                          ? (setHide((pre) => ({ ...pre, listening: true })),
                            handleSpeak(text),
                            setSpeak(2))
                          : (handleStop(),
                            setHide((pre) => ({ ...pre, listening: false })));
                      }}
                    >
                      {!hide.listening ? "Start Sravanam" : "Stop Sravanam"}
                      {!hide.listening ? <MdHearing /> : <MdHearingDisabled />}
                    </Button>
                  )}
                  {state === 1 && (
                    <Button
                      className="bg-blue-500 text-foreground hover:bg-blue-600 w-full text-xs sm:text-sm"
                      title="Speak you paragraph"
                      onClick={() => {
                        !hide.speaking
                          ? (setHide((pre) => ({ ...pre, speaking: true })),
                            startSpeechToText(text),
                            setSpeak(2))
                          : (setHide((pre) => ({ ...pre, speaking: false })),
                            stopSpeechToText());
                      }}
                    >
                      {!hide.speaking ? "Start Vadanam" : "Stop Vadanam"}
                    </Button>
                  )}
                  {state === 2 && (
                    <Button
                      className="bg-blue-500 text-foreground hover:bg-blue-600 w-full text-xs sm:text-sm"
                      title="Extract Points"
                      onClick={() => {
                        setSpeak(2);
                        handleWriting(text);
                      }}
                      disabled={loading || summary}
                    >
                      {loading ? "Loading..." : "Points for Lekhanam"}
                    </Button>
                  )}
                  {state === 3 && (
                    <Button
                      className="bg-blue-500 text-foreground hover:bg-blue-600 w-full text-xs sm:text-sm"
                      title="Speak you Remember"
                      onClick={() => {
                        !hide.speaking
                          ? (setHide((pre) => ({ ...pre, speaking: true })),
                            startSpeechToText(text),
                            setSpeak(2))
                          : (setHide((pre) => ({ ...pre, speaking: false })),
                            stopSpeechToText());
                      }}
                    >
                      {!hide.speaking ? "Start Mananam" : "Stop Mananam"}
                    </Button>
                  )}
                  {state === 4 && (
                    <Button
                      className="bg-blue-500 text-foreground hover:bg-blue-600 w-full text-xs sm:text-sm"
                      title="Speak you Remember"
                      disabled={!hear}
                    >
                      Check out
                    </Button>
                  )}
                </div>

                <div className="flex justify-between w-full sm:w-2/3 mt-2 sm:mt-0">
                  <Button
                    className="text-xs sm:text-sm"
                    onClick={() => {
                      setState((pre) => pre - 1);
                      setUserAnswer("");
                    }}
                    disabled={state === 0 || loading}
                  >
                    Prev Practice
                  </Button>

                  {state !== 4 ? (
                    <Button
                      className="text-xs sm:text-sm"
                      onClick={() => {
                        setState((pre) => pre + 1);
                        setUserAnswer("");
                        setSpeak(1);
                      }}
                      disabled={state === 4 || loading || speak === 1}
                    >
                      Next Practice
                    </Button>
                  ) : (
                    <Button
                      className="text-xs sm:text-sm"
                      onClick={() => {
                        setStart(false);
                        setState(0);
                      }}
                      disabled={!hear}
                    >
                      Completed
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default LetStart;
