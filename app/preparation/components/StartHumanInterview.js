import {
  AlertCircle,
  Building,
  CheckCircle,
  ChevronRight,
  ClipboardList,
  Clock,
  PlayCircle,
  UserCircle,
} from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "../../../components/ui/alert";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Progress } from "../../../components/ui/progress";
import { StudentInterview } from '../../../config/AiTeacherStudent.js';
import LoadingDialog from "../../components/LoadingDialog";
import InterviewPanel from "./HumanInterview";

const StartInterview = () => {
  const [interviewerName, setInterviewerName] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [interview, setInterview] = useState("");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(false);
  const [error, setError] = useState("");
  const jobroll = "water treatment";

  const validateForm = () => {
    if (!interviewerName.trim()) {
      setError("Please enter your PRN number");
      return false;
    }
    if (!candidateName.trim()) {
      setError("Please enter candidate's name");
      return false;
    }
    return true;
  };

  const handleStart = async () => {
    if (!validateForm()) return;

    setError("");
    setLoading(true);
    const BASIC_PROMPT = `genarate 5 question that can be asked in interview for the job role ${jobroll} ,include question:question that can be asked for that job role.points:key points that can answer must contain.model_answer:answer in points.in json formate.`;

    try {
      const result = await StudentInterview.sendMessage(BASIC_PROMPT);
      const responseText = await result.response.text();
      const parsedResult = JSON.parse(responseText);
      setInterview(parsedResult);
      localStorage.setItem("interview", JSON.stringify(parsedResult));
      setCode(true);
    } catch (err) {
      setError("Failed to generate interview questions. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (code) {
    return (
      <InterviewPanel
        name={candidateName}
        interviewer={interviewerName}
        interview={interview}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-blue-800">
                  Technical Interview System
                </h1>
                {/* <p className="text-sm text-blue-600">
                  Water Treatment Specialist
                </p> */}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600">45 min assessment</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Progress */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-blue-600" />
                  Interview Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Setup Progress</span>
                      <span className="text-blue-600">1/4 completed</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                  <div className="space-y-4">
                    {[
                      { icon: UserCircle, text: "Enter Details", done: false },
                      {
                        icon: CheckCircle,
                        text: "Review Instructions",
                        done: false,
                      },
                      {
                        icon: PlayCircle,
                        text: "Start Interview",
                        done: false,
                      },
                      {
                        icon: ClipboardList,
                        text: "Complete Assessment",
                        done: false,
                      },
                    ].map((step, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-full ${step.done ? "bg-blue-100" : "bg-gray-100"
                            }`}
                        >
                          <step.icon
                            className={`w-4 h-4 ${step.done ? "text-blue-600" : "text-gray-400"
                              }`}
                          />
                        </div>
                        <span
                          className={
                            step.done ? "text-blue-600" : "text-gray-600"
                          }
                        >
                          {step.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-foreground">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white/20 rounded-full">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold">Important Notes</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Ensure stable internet connection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Allocate full 45 minutes without interruption</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Have necessary documents ready</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCircle className="w-5 h-5 text-blue-600" />
                  Candidate Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                {error && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        PRN Number
                      </label>
                      <input
                        type="text"
                        value={interviewerName}
                        onChange={(e) => setInterviewerName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your PRN number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Candidate Name
                      </label>
                      <input
                        type="text"
                        value={candidateName}
                        onChange={(e) => setCandidateName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter candidate's full name"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      onClick={handleStart}
                      className="w-full h-12 text-lg"
                      disabled={loading}
                    >
                      {loading ? (
                        "Preparing Interview..."
                      ) : (
                        <>
                          <PlayCircle className="w-5 h-5 mr-2" />
                          Begin Interview
                        </>
                      )}
                    </Button>
                  </div>
                </form>

                <div className="mt-6 border-t pt-6">
                  <h3 className="font-medium text-gray-800 mb-4">
                    Interview Structure
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { icon: Clock, label: "Duration", value: "45 minutes" },
                      {
                        icon: ClipboardList,
                        label: "Questions",
                        value: "5 Technical",
                      },
                      {
                        icon: CheckCircle,
                        label: "Scoring",
                        value: "50 Points",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="text-center p-4 bg-gray-50 rounded-lg"
                      >
                        <item.icon className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-600">
                          {item.label}
                        </p>
                        <p className="text-sm text-gray-800">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {loading && <LoadingDialog loading={loading} />}
    </div>
  );
};

export default StartInterview;
