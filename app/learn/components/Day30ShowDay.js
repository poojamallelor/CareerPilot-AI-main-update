import {
  Book,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";

const StudyPlan = ({ data }) => {
  const [expandedWeek, setExpandedWeek] = useState(0);
  const [completedDays, setCompletedDays] = useState(new Set());

  const totalDays = data?.studyPlan?.weeks.reduce(
    (acc, week) => acc + week.days.length,
    0
  );
  const progress = (completedDays.size / totalDays) * 100;

  useEffect(() => {
    if (!data) {
      alert("something went wrong please try again!..");
    }
  }, []);

  const toggleDayCompletion = (dayNumber) => {
    const newCompletedDays = new Set(completedDays);
    if (newCompletedDays.has(dayNumber)) {
      newCompletedDays.delete(dayNumber);
    } else {
      newCompletedDays.add(dayNumber);
    }
    setCompletedDays(newCompletedDays);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* SEO-friendly header */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          {data?.studyPlan?.title}
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
          {data?.studyPlan?.description}
        </p>

        {/* Progress Overview */}
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6">
            <div className="text-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Overall Progress
              </h2>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {completedDays.size} / {totalDays} Days
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300 ease-in-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-sm text-gray-600 text-center mt-2">
              {progress.toFixed(1)}% Complete
            </p>
          </CardContent>
        </Card>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto">
        {/* Weeks */}
        {data?.studyPlan?.weeks?.map((week) => (
          <Card key={week.weekNumber} className="mb-6 overflow-hidden">
            <CardHeader
              className="cursor-pointer bg-white hover:bg-gray-50 transition-colors"
              onClick={() =>
                setExpandedWeek(
                  expandedWeek === week.weekNumber ? null : week.weekNumber
                )
              }
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Calendar className="h-6 w-6 text-blue-600" />
                  <div>
                    <CardTitle className="text-xl text-gray-900">
                      Week {week?.weekNumber}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{week.focus}</p>
                  </div>
                </div>
                {expandedWeek === week.weekNumber ? (
                  <ChevronUp className="h-6 w-6 text-gray-400" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-gray-400" />
                )}
              </div>
            </CardHeader>

            {expandedWeek === week.weekNumber && (
              <CardContent className="pt-4">
                {/* Days */}
                <div className="space-y-4">
                  {week?.days?.map((day) => (
                    <div
                      key={day.day}
                      className={`p-4 rounded-lg transition-colors border ${
                        completedDays.has(day.day) ? "bg-blue-50" : "bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                          <Clock className="h-4 w-4 mt-1 flex-shrink-0 text-gray-400" />
                          Day {day.day}
                        </h3>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleDayCompletion(day.day);
                          }}
                          className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                          aria-label={
                            completedDays.has(day.day)
                              ? "Mark as incomplete"
                              : "Mark as complete"
                          }
                        >
                          <CheckCircle
                            className={`h-5 w-5 transition-colors ${
                              completedDays.has(day.day)
                                ? "text-green-600"
                                : "text-gray-400"
                            }`}
                          />
                          <span
                            className={
                              completedDays.has(day.day)
                                ? "text-green-600"
                                : "text-gray-500"
                            }
                          >
                            {completedDays.has(day.day)
                              ? "Completed"
                              : "Mark Complete"}
                          </span>
                        </button>
                      </div>

                      <ul className="space-y-2">
                        {day?.tasks?.map((task, index) => (
                          <>
                            <li
                              key={index}
                              className="flex items-start gap-2 text-gray-700"
                            >
                              <Book className="h-5 w-5 text-blue-600" />
                              <span className="w-full">{task}</span>
                            </li>
                            <div className="flex justify-end">
                              <Button
                                onClick={() => {
                                  window.location.href = `/recall?recall=${encodeURIComponent(
                                    task
                                  )}`;
                                }}
                              >
                                Let's Do It
                              </Button>
                            </div>
                          </>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}

        {/* Resources */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-xl">Learning Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data?.studyPlan?.resources.map((resource, index) => (
                <div
                  key={index}
                  className="p-3 bg-blue-50 text-blue-700 rounded-lg flex items-center gap-2"
                >
                  <Book className="h-4 w-4" />
                  <span>{resource}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-5">
              <Button
                onClick={() => {
                  localStorage.removeItem("data");
                  window.location.reload();
                }}
              >
                Change
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default StudyPlan;
