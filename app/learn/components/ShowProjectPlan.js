import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

const Project_plan = ({ setPlanStatus, setCheck }) => {
  const [activeDay, setActiveDay] = useState(null);
  const [plan, setPlan] = useState("");
  useEffect(() => {
    const plan = localStorage.getItem("project_plan");
    if (plan) {
      setPlan(JSON.parse(plan));
    } else {
      alert("Project Completed");
    }
    console.log(plan);
  });

  return (
    <div className="min-h-screen bg-blue-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="w-full shadow-lg">
          <CardHeader className="bg-blue-600 text-foreground">
            <CardTitle className="text-2xl sm:text-3xl font-bold">
              {plan.projectName}
            </CardTitle>
            <p className="text-sm sm:text-base text-blue-100 mt-2">
              {plan.projectDescription}
            </p>
          </CardHeader>

          <CardContent className="p-4 sm:p-6">
            <Accordion type="single" collapsible>
              {plan.projectPlan?.map((dayPlan) => (
                <AccordionItem key={dayPlan?.day} value={`day-${dayPlan?.day}`}>
                  <AccordionTrigger
                    className={`hover:bg-blue-50 p-3 rounded ${
                      activeDay === dayPlan.day
                        ? "bg-blue-100 text-blue-800"
                        : "text-blue-900"
                    }`}
                    onClick={() => setActiveDay(dayPlan.day)}
                  >
                    <div className="flex items-center text-base">
                      <span className="font-bold mr-4 text-blue-600">
                        Day {dayPlan?.day}
                      </span>
                      <span className=" text-gray-600">{dayPlan?.work}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-4 bg-blue-50 border">
                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4  p-2 m-2 ">
                      <div className="text-base">
                        <h4 className="font-semibold text-blue-700">Work</h4>
                        <p className=" text-gray-700">{dayPlan?.work}</p>
                      </div>
                      <div className="text-base">
                        <h4 className="font-semibold text-blue-700">
                          Outcomes
                        </h4>
                        <p className="text-sm text-gray-700">
                          {dayPlan?.outcomes}
                        </p>
                      </div>
                      <div className="text-base">
                        <h4 className="font-semibold text-blue-700">
                          Achievements
                        </h4>
                        <p className="text-sm text-gray-700">
                          {dayPlan?.achievements}
                        </p>
                      </div>
                      <div className="text-base">
                        <h4 className="font-semibold text-blue-700">
                          Key Tips
                        </h4>
                        <p className="text-sm text-gray-700">
                          {dayPlan?.keyTips}
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>

          <CardFooter className="bg-blue-50 p-4 sm:p-6 flex justify-between items-center">
            <p className="text-sm text-blue-800 italic">
              Project Management Tracker
            </p>
            <Button
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-100"
              onClick={() => {
                const levelNumber = localStorage.getItem("levelNumber");
                if (levelNumber != null) {
                  const level = parseInt(levelNumber, 10) + 1;
                  localStorage.setItem("levelNumber", level);
                }
                setPlanStatus(false);
                localStorage.removeItem("project_plan");
                setCheck(true);
                localStorage.removeItem("projects");
                window.location.reload();
              }}
            >
              Completed
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Project_plan;
