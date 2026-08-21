import { HelpCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "../../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../../../components/ui/dialog";
import { Textarea } from "../../../../../components/ui/textarea";
import { AiDoubtSuggestion } from '../../../../../config/AiModels';

function DoubtModal({ isOpen, onClose, setSolve }) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDoubt = async () => {
    // Validate input
    if (!question.trim()) {
      setError("Please describe your doubt before submitting.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const prompt = JSON.stringify({
        instruction: "Provide a comprehensive doubt resolution",
        doubtDescription: question,
      });

      const result = await AiDoubtSuggestion.sendMessage(prompt);
      const text = await result.response.text();
      const json = JSON.parse(text);

      setSolve(json);
      onClose();
      setQuestion("");
    } catch (error) {
      console.error("Doubt resolution error:", error);
      setError("Failed to resolve doubt. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95%] max-w-md mx-auto rounded-lg shadow-xl">
        <DialogHeader className="space-y-2">
          <div className="flex justify-between items-center">
            <DialogTitle className="flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-blue-500" />
              Doubt Clarification
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-gray-100"
            >
              {/* <X className="w-5 h-5 text-gray-600" /> */}
            </Button>
          </div>
          <DialogDescription>
            Describe your doubt in detail to get a comprehensive explanation.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Textarea
            placeholder="Describe your doubt thoroughly..."
            className="w-full min-h-[150px] resize-y"
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
              setError("");
            }}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleDoubt}
              disabled={loading}
              className="w-full sm:w-auto"
            >
              {loading ? "Resolving Doubt..." : "Solve with AI"}
            </Button>
            <Button
              variant="secondary"
              className="w-full sm:w-auto"
              disabled={loading}
              title="this help you to ask to other students"
            >
              Ask Others
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Doubt({ doubt, setSolve, setDoubt }) {
  return (
    <DoubtModal
      isOpen={doubt}
      onClose={() => setDoubt(false)}
      setSolve={setSolve}
    />
  );
}
