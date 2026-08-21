import { useState } from "react";
import { Alert, AlertDescription } from "../../../../components/ui/alert";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { geminiModel } from '../../../../config/AiModels';

const Assisment = ({
  questions,
  field,
  setAssessment,
  assessment,
  setShow,
}) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  // JSON parsing helper function
  const parseAIResponse = (text) => {
    if (!text) return null;

    try {
      // First, try direct JSON parse
      return JSON.parse(text);
    } catch (error) {
      console.log('Direct JSON parse failed, attempting to extract JSON from markdown...');

      try {
        // Remove common markdown formatting
        let cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        // Try to find JSON boundaries with multiple patterns
        const jsonPatterns = [
          /\{[\s\S]*\}/,
          /\[[\s\S]*\]/,
          /\{[^}]*\}[\s\S]*$/m,
          /\[[^\]]*\][\s\S]*$/m
        ];

        for (const pattern of jsonPatterns) {
          const matches = cleanedText.match(pattern);
          if (matches) {
            try {
              const parsed = JSON.parse(matches[0]);
              console.log('Successfully parsed JSON from pattern match');
              return parsed;
            } catch (e) {
              continue;
            }
          }
        }

        // If no pattern works, try to extract content between first { and last }
        const firstBrace = cleanedText.indexOf('{');
        const lastBrace = cleanedText.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
          try {
            const jsonString = cleanedText.slice(firstBrace, lastBrace + 1);
            return JSON.parse(jsonString);
          } catch (e) {
            console.log('Failed to parse extracted JSON');
          }
        }

        // If all else fails, return fallback structure
        console.log('All JSON parsing attempts failed, using fallback');
        return null;
      } catch (e) {
        console.log('JSON extraction failed:', e);
        return null;
      }
    }
  };

  const handleOptionSelect = (questionIndex, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  const handleResponse = async () => {
    setLoading(true);
    const assessmentTypes = {
      1: 'passion',
      2: 'profession',
      3: 'vocation',
      4: 'mission'
    };

    const assessmentType = assessmentTypes[assessment] || 'assessment';

    const prompt = `Analyze the following ${assessmentType} assessment responses for the ${field} career field. Based strictly on the answers provided, determine the individual's true level of ${assessmentType} for this highly specific field and provide highly personalized guidance. 
    Ensure the advice directly references their answers and the specific technical realities of ${field}.
    
    Assessment responses: ${JSON.stringify(results)}

    Return strictly a raw JSON object starting with { and ending with }. No markdown, no codeblocks.
    Format exact properties: {"recommendation": "...", "what_next": "...", "conclusion": "..."}`;

    try {
      const result = await geminiModel.sendMessage(prompt);
      const text = await result.response.text();
      console.log('Raw assessment response:', text.substring(0, 200) + '...');

      const parsedResult = parseAIResponse(text);

      if (parsedResult) {
        localStorage.setItem(`assessment_${assessment}`, JSON.stringify(parsedResult));
        setAssessment((prev) => prev + 1);
        setShow(false);
        localStorage.setItem("assessment", assessment + 1);

        // Trigger parent component to refresh assessment states
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('assessmentUpdated'));
        }
      } else {
        // Fallback assessment result
        console.log('Using fallback assessment result for assessment', assessment);
        const fallbackResult = {
          recommendation: `Based on your ${assessmentType} assessment responses for ${field}, you show ${results.filter(r => r.answer === 'Yes').length > results.length / 2 ? 'strong' : 'moderate'} alignment.`,
          what_next: `Continue exploring ${field} through research, networking, and practical experience to validate your ${assessmentType} for this career path.`,
          conclusion: `Your ${assessmentType} assessment indicates ${results.filter(r => r.answer === 'Yes').length > results.length / 2 ? 'positive' : 'mixed'} potential for ${field}. Consider additional exploration and guidance.`
        };
        localStorage.setItem(`assessment_${assessment}`, JSON.stringify(fallbackResult));
        setAssessment((prev) => prev + 1);
        setShow(false);
        localStorage.setItem("assessment", assessment + 1);

        // Trigger parent component to refresh assessment states
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('assessmentUpdated'));
        }
      }
    } catch (error) {
      console.error('Error in handleResponse:', error);
      // Use fallback result on any error
      const fallbackResult = {
        recommendation: `Assessment completed for ${field} ${assessmentType}.`,
        what_next: `Review your responses and consider seeking additional guidance.`,
        conclusion: `${assessmentType.charAt(0).toUpperCase() + assessmentType.slice(1)} assessment completed. Consider professional career counseling for detailed analysis.`
      };
      localStorage.setItem(`assessment_${assessment}`, JSON.stringify(fallbackResult));
      setAssessment((prev) => prev + 1);
      setShow(false);
      localStorage.setItem("assessment", assessment + 1);

      // Trigger parent component to refresh assessment states
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('assessmentUpdated'));
      }
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }
    const combinedResults = questions.map((q, index) => ({
      question: q.question,
      answer: answers[index],
    }));
    setResults(combinedResults);
    setSubmitted(true);
    console.log(combinedResults);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-gray-800">
              Assessment {assessment}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!submitted ? (
              <div className="space-y-6">
                {questions.map((q, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-sm"
                  >
                    <p className="text-lg font-medium mb-4 text-gray-700">
                      {index + 1}. {q.question}
                    </p>
                    <div className="flex gap-4">
                      {q.options.map((option) => (
                        <Button
                          key={option}
                          onClick={() => handleOptionSelect(index, option)}
                          className={`px-6 py-2 ${answers[index] === option
                              ? "bg-blue-600 text-foreground"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="flex justify-center mt-8">
                  <Button
                    onClick={() => {
                      handleSubmit();
                    }}
                    className="bg-blue-500 text-foreground px-8 py-3 text-base hover:bg-blue-700"
                  >
                    Submit Assessment
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <Alert className="bg-green-50 border-green-200">
                  <AlertDescription className="text-green-800">
                    Thank you for completing the assessment! Here are your
                    responses:
                  </AlertDescription>
                </Alert>
                {results.map((result, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-sm"
                  >
                    <p className="font-medium text-gray-700">
                      {result.question}
                    </p>
                    <p className="mt-2 text-blue-600">
                      Answer: {result.answer}
                    </p>
                  </div>
                ))}
                <Button
                  className="w-full bg-gray-600 text-foreground hover:bg-gray-700"
                  disabled={loading}
                  onClick={() => {
                    handleResponse();
                  }}
                >
                  {loading ? "Please Wait..." : "Start Over"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Assisment;
