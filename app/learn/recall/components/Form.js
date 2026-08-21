import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { AiQuizRecall } from "../../../../lib/aiService";
import { useSearchParams } from "next/navigation";
import LoadingDialog from "../../../components/LoadingDialog";

const CourseSelectionForm = ({
  setOutline,
  setCourseData,
  outline,
  setForm,
}) => {
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("");
  const searchparams = useSearchParams("");

  const handleChange = (e) => {
    setTopic(e.target.value);
  };

  useEffect(() => {
    const topic = searchparams.get("recall");
    if (topic) {
      setTopic(topic);
    }
  }, []);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const prompt = `Create a comprehensive study plan for "${topic}" for interview preparation. 

Return ONLY a valid JSON object with this EXACT structure:
{
  "courseTitle": "Complete ${topic} Interview Guide",
  "courseSummary": "Comprehensive interview preparation covering core concepts and practical applications",
  "chapters": [
    {
      "chapterTitle": "Fundamentals",
      "chapterSummary": "Core concepts and basics",
      "topics": ["Basic concepts", "Key principles", "Foundation knowledge"]
    },
    {
      "chapterTitle": "Advanced Topics",
      "chapterSummary": "In-depth advanced concepts",
      "topics": ["Advanced techniques", "Best practices", "Real-world applications"]
    }
  ]
}

Make it specific to ${topic} with 4-6 chapters and 3-5 topics per chapter. Return ONLY the JSON, no markdown, no extra text.`;

    try {
      const result = await AiQuizRecall.sendMessage(prompt);
      const responseText = await result.response.text();
      console.log("Raw API Response: ", responseText);
      
      let json;
      try {
        // First try direct parsing
        json = JSON.parse(responseText.trim());
      } catch (parseError) {
        console.log("Direct parse failed, trying extraction...");
        // Try to extract JSON from response if there's extra text
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          json = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error("No valid JSON found in response");
        }
      }
      
      // Validate the required structure
      if (!json.courseTitle || !json.courseSummary || !Array.isArray(json.chapters)) {
        console.error("Invalid JSON structure:", json);
        throw new Error("Response doesn't match expected format");
      }
      
      console.log("Parsed course data:", json);
      setCourseData(json);
      localStorage.setItem("RecallSyllabus", JSON.stringify(json));
      setOutline(true);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      alert(`Failed to generate study material: ${error.message}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-blue-700/30 blur-3xl"></div>

      <div className="relative z-10 max-w-2xl w-full mx-auto px-6 py-16">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl">
          <h2 className="text-4xl font-extrabold text-center text-foreground mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-100">
            Select Your Learning Path
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Topic Field */}
            <div>
              <label
                htmlFor="topic"
                className="block text-foreground mb-2 font-light"
              >
                Learning Topic
              </label>
              <input
                id="topic"
                name="topic"
                value={topic}
                onChange={handleChange}
                placeholder="Enter your learning topic"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl
                  text-foreground placeholder-blue-200 focus:outline-none
                  focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
            </div>
            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="group relative w-full px-8 py-4 bg-white text-blue-900 font-semibold rounded-full
                  hover:bg-blue-50 transition-all duration-300 ease-in-out
                  flex items-center justify-center space-x-3
                  before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-300 before:to-blue-500
                  before:opacity-0 hover:before:opacity-20 before:rounded-full
                  before:transition-all before:duration-300 before:ease-in-out
                  shadow-xl hover:shadow-2xl"
              >
                <span>Let's Start</span>
                <ChevronRight
                  className="transition-transform group-hover:translate-x-1"
                  size={20}
                />
              </button>
              <LoadingDialog loading={loading} />
            </div>
            <div className="flex justify-center items-center">
              {outline && (
                <div className="text-center">
                  <p className="text-foreground text-sm mb-2">Scroll down to see your study material</p>
                  <div className="animate-bounce">
                    <svg className="w-6 h-6 mx-auto text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Background Animations */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute animate-blob top-1/4 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute animate-blob animation-delay-2000 top-1/2 -right-4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl"></div>
      </div>
    </div>
  );
};

export default CourseSelectionForm;
