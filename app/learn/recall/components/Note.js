import jsPDF from "jspdf";
import "jspdf/dist/polyfills.es.js";
import { useRef, useState } from "react";
import { AlertDialog, AlertDialogContent } from "../../../../components/ui/alert-dialog";
import { Button } from "../../../../components/ui/button";
import { Textarea } from "../../../../components/ui/textarea";

function Note({ Course, active2 }) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [solve, setSolve] = useState("");
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("combinedChapterNotesRecall"))
  );
  const notesRef = useRef(null);

  const handleDoubt = async () => {
    setLoading(true);
    const prompt = `give me detailed and clear explanation of my doubt given below. include Acknowledge, clear explanation, example, simplified summary, further classification, encouragement to student, root cause of doubt.in json formate .doubt description:${question}`;
    try {
      const result = await AiDoubtSuggestion.sendMessage(prompt);
      const text = await result.response.text();
      const json = JSON.parse(text);
      console.log(json);
      setSolve(json);
      setDialog(false);
      setQuestion("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const input = notesRef.current;
    if (input) {
      const pdf = new jsPDF({
        orientation: "p",
        unit: "pt",
        format: "a4",
      });
      pdf.html(input, {
        callback: (doc) => {
          doc.save("notes.pdf");
        },
        x: 10,
        y: 10,
        html2canvas: {
          scale: 0.5, // Adjusts the scale of the content in the PDF
        },
      });
    }
  };

  return (
    <>
      {notes ? (
        <div>
          <div
            ref={notesRef}
            dangerouslySetInnerHTML={{
              __html:
                notes?.[active2]?.replace("```html", "").replace("```", "") ||
                ``,
            }}
          />
          <div className="flex justify-center mb-5 space-x-3">
            <Button
              onClick={() => setDialog(true)}
              className="px-8 py-[26px] bg-blue-900 text-foreground border hover:text-foreground font-semibold rounded-full"
            >
              I have a Doubt? 🤔
            </Button>
            <Button
              onClick={handleDownload}
              className="px-8 py-[26px] bg-green-600 text-foreground border hover:text-foreground font-semibold rounded-full"
            >
              Download Notes 📄
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-4 gap-4">
          <p className="text-center text-gray-500">No Notes available</p>
          <Button
            className="bg-gradient-to-r from-green-500 to-blue-500 text-foreground font-semibold rounded-lg px-6 py-3 shadow-md hover:from-green-600 hover:to-blue-600 transition"
            onClick={() => {
              window.open('http://localhost:3001/', '_blank');
            }}
          >
            Start Preparing
          </Button>
          <Button
            className="bg-gradient-to-r from-blue-500 to-yellow-400 text-foreground font-semibold rounded-lg px-6 py-3 shadow-md hover:from-blue-600 hover:to-yellow-500 transition"
            onClick={() => {
              window.location.href = '/home';
            }}
          >
            Watch
          </Button>
        </div>
      )}
      <div>
        <AlertDialog open={dialog}>
          <AlertDialogContent className="w-[420px] md:w-full md:max-w-3xl">
            <p>Do You Have Any Doubt?</p>
            <Textarea
              placeholder="Describe your Doubt"
              className="w-full"
              rows={5}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <Button
              onClick={() => {
                handleDoubt();
              }}
              disabled={loading}
            >
              {loading ? "Loading..." : "Solve It"}
            </Button>
          </AlertDialogContent>
        </AlertDialog>
        {solve && (
          <div className="p-5">
            <p className="text-center text-black">Your Doubt has been Solved</p>
            <p className="mt-2 font-bold">{solve?.doubtDescription}</p>
            <p>{solve?.acknowledgement}</p>
            <p className="mt-2">
              {" "}
              <span className="font-semibold ">Explain</span>{" "}
              {solve?.explanation}
            </p>
            <p className="mt-2">
              {" "}
              <span className="font-semibold ">Example</span> {solve?.example}
            </p>
            <p className="mt-2">
              {" "}
              <span className="font-semibold ">Simplified Summary</span>{" "}
              {solve?.simplifiedSummary}
            </p>
            <p className="mt-2">
              {" "}
              <span className="font-semibold ">
                Further Classification
              </span>{" "}
              {solve?.furtherClassification}
            </p>
            <p className="mt-2">
              {" "}
              <span className="font-semibold ">
                Encouragement To Student
              </span>{" "}
              {solve?.encouragementToStudent}
            </p>
            <p className="mt-2">
              {" "}
              <span className="font-semibold ">Root Cause Of Doubt</span>{" "}
              {solve?.rootCauseOfDoubt}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Note;
