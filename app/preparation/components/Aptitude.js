import { BookOpen, Brain, Clock, Trophy } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "../../../components/ui/card";
import LoadingDialog from "../../components/LoadingDialog";

const AptitudeExamPage = ({ setQuestions, setExam, setExamStatus }) => {
  const [loading, setLoading] = useState(false);
  const handleExam = async () => {
    setLoading(true);
    const branch = "Computer Science and Engineering";
    const prompt = `generate 6 mcq for aptitude exam for interview preparation from branch ${branch},questions of type quantitative,logical roasoning,verbal ability,domain specific,Data Interpretation and Sufficiency.include question,options,answer,explaination.in json formate.`;
    try {
      const result = await AiAptitudeExam.sendMessage(prompt);
      const responseText = await result.response.text();
      console.log("Response Text: ", responseText);
      setQuestions(JSON.parse(responseText));
      setExam(1);
      const jsonData = JSON.parse(responseText);
      localStorage.setItem("aptitudeexam", JSON.stringify(jsonData));
      setLoading(false);
      setExamStatus("ongoing");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <header className="bg-blue-600 text-foreground py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Pre-Aptitude Assessment</h1>
          <p className="text-blue-100">
            Evaluate your skills and prepare for success
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Introduction Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            Welcome to Your Assessment
          </h2>
          <p className="text-gray-600 mb-4">
            This pre-aptitude exam will help evaluate your current knowledge
            level and prepare you for future challenges. Take your time and
            answer each question carefully.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white">
            <CardContent className="p-6">
              <Clock className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="font-semibold text-lg mb-2">60 Minutes</h3>
              <p className="text-gray-600">Time allocated for completion</p>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <Brain className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="font-semibold text-lg mb-2">50 Questions</h3>
              <p className="text-gray-600">Comprehensive assessment</p>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <BookOpen className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="font-semibold text-lg mb-2">5 Sections</h3>
              <p className="text-gray-600">Cover all key areas</p>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <Trophy className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Instant Results</h3>
              <p className="text-gray-600">Get immediate feedback</p>
            </CardContent>
          </Card>
        </div>

        {/* Start Button */}
        <div className="text-center">
          <button
            onClick={handleExam}
            className="bg-primary hover:opacity-90 text-foreground text-foreground font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200"
          >
            {loading ? "Loading..." : "Start Assessment"}
          </button>
          <LoadingDialog loading={loading} />
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            Instructions
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>
              1. Ensure you have a stable internet connection before beginning.
            </p>
            <p>2. Read each question carefully before selecting your answer.</p>
            <p>
              3. You can review and change your answers within the time limit.
            </p>
            <p>4. Submit your answers before the timer runs out.</p>
            <p>
              5. Your results will be available immediately after completion.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-foreground py-4 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-blue-100">
            © 2024 Educational Assessment Platform
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AptitudeExamPage;
