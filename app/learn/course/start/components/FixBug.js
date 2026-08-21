import React, { useState } from "react";

function FixBug({ code }) {
  //   const code = [
  //     {
  //       title: "Missing DOCTYPE",
  //       description:
  //         "The DOCTYPE declaration is missing. Without it, browsers may render the page in quirks mode, leading to unexpected behavior.",
  //       code: '<pre><code class="language-html">\n<html>\n<head>\n  <title>My Website</title>\n</head>\n<body>\n  <h1>Hello, world!</h1>\n</body>\n</html>\n</code></pre>',
  //       options: [
  //         "Add a DOCTYPE declaration.",
  //         "Ignore the missing DOCTYPE.",
  //         "Use an outdated DOCTYPE.",
  //       ],
  //       correct_option: "Add a DOCTYPE declaration.",
  //       bug: "Missing DOCTYPE declaration. Should be `<!DOCTYPE html>` at the very beginning.",
  //     },
  //     {
  //       title: "Incorrect Language Attribute",
  //       description:
  //         "The `lang` attribute is used to declare the language of the document, but it's placed in the wrong location. It should be in the `<html>` tag.",
  //       code: '<pre><code class="language-html">\n<!DOCTYPE html>\n<head lang="fr">\n  <title>Bonjour</title>\n</head>\n<body>\n  <h1>Bonjour le monde!</h1>\n</body>\n</html>\n</code></pre>',
  //       options: [
  //         "Move the `lang` attribute to the `<html>` tag.",
  //         "Remove the `lang` attribute.",
  //         "Leave the `lang` attribute in the `<head>` tag.",
  //       ],
  //       correct_option: "Move the `lang` attribute to the `<html>` tag.",
  //       bug: '`lang` attribute is in `<head>`, it should be in `<html>`. Correct code: `<html lang="fr">`',
  //     },
  //     {
  //       title: "Missing `head` Element",
  //       description:
  //         "The `head` element, which contains meta-information about the HTML document, is missing. This can impact SEO and browser functionality.",
  //       code: '<pre><code class="language-html">\n<!DOCTYPE html>\n<html>\n  <title>My Page</title>\n\n  <body>\n    <h1>Welcome!</h1>\n  </body>\n</html>\n</code></pre>',
  //       options: [
  //         "Add a `head` element containing at least a `title`.",
  //         "Omit the `head` element altogether.",
  //         "Put all content directly inside the `html` element.",
  //       ],
  //       correct_option: "Add a `head` element containing at least a `title`.",
  //       bug: "Missing `<head>` section. Should have `<head><title>...</title></head>`",
  //     },
  //     {
  //       title: "Incorrect Tag Nesting",
  //       description:
  //         "Tags are improperly nested. The `body` tag should be inside the `html` tag, and the `title` tag should be inside the `head` tag.",
  //       code: '<pre><code class="language-html">\n<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<h1>heading</h1>\n</body>\n</html>\n\n</code></pre>',
  //       options: [
  //         "Remove the `body` tags.",
  //         "Correct the nesting of the `html`, `head`, and `body` tags.",
  //         "Ignore the nesting error; browsers will fix it.",
  //       ],
  //       correct_option:
  //         "Correct the nesting of the `html`, `head`, and `body` tags.",
  //       bug: "Tag nesting looks correct, no obvious bug for 'basic html structure' related. maybe missing closing title tags or something else",
  //     },
  //     {
  //       title: "Case Sensitivity",
  //       description:
  //         "HTML is generally not case-sensitive, but it's best practice to write tags in lowercase for consistency. The example has inconsistent case.",
  //       code: '<pre><code class="language-html">\n<!DOCTYPE html>\n<HTML>\n<Head>\n  <TITLE>My page</TITLE>\n</Head>\n<BoDY>\n  <H1>My title</H1>\n  <P>Some content.</P>\n</BoDY>\n</HTML>\n</code></pre>',
  //       options: [
  //         "Convert all tags to lowercase.",
  //         "Convert all tags to uppercase.",
  //         "Leave the tags with mixed casing.",
  //       ],
  //       correct_option: "Convert all tags to lowercase.",
  //       bug: "Inconsistent case used for HTML tags. Use lowercase for all tags for consistency and best practice.",
  //     },
  //   ];

  const [currentBugIndex, setCurrentBugIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentBug = code[currentBugIndex];
  const isCorrect = selectedOption === currentBug.correct_option;

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    }

    if (currentBugIndex < code.length - 1) {
      setCurrentBugIndex(currentBugIndex + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentBugIndex(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setCorrectAnswers(0);
    setCompleted(false);
  };

  // Extract the HTML code from the pre/code tags
  const extractCode = (codeString) => {
    const stripped = codeString
      .replace('<pre><code class="language-html">\n', "")
      .replace("\n</code></pre>", "");
    return stripped;
  };

  return (
    <div className="max-w-4xl  p-4">
      <div className="">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-foreground p-4 md:p-6">
            <h1 className="text-xl md:text-2xl font-bold">HTML Bug Finder</h1>
            <p className="mt-2 text-sm md:text-base">
              Find and fix common HTML bugs
            </p>
          </div>

          {!completed ? (
            <div className="p-4 md:p-6">
              {/* Progress indicator */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>
                    {currentBugIndex + 1} of {code.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${((currentBugIndex + 1) / code.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Bug challenge */}
              <div className="mb-6">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                  {currentBug.title}
                </h2>
                <p className="text-gray-600 mb-4">{currentBug?.description}</p>

                {/* Code display */}
                <div className="bg-gray-800 text-foreground p-4 rounded-md overflow-x-auto mb-6">
                  <pre className="font-mono text-sm">
                    <code>{extractCode(currentBug?.code)}</code>
                  </pre>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  <h3 className="font-medium">How would you fix this issue?</h3>
                  {currentBug?.options?.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(option)}
                      className={`w-full text-left p-3 border rounded-md transition ${
                        selectedOption === option
                          ? isCorrect
                            ? "bg-green-100 border-green-500"
                            : "bg-red-100 border-red-500"
                          : "border-gray-300 hover:bg-gray-50"
                      } ${
                        showFeedback &&
                        option === currentBug.correct_option &&
                        "bg-green-100 border-green-500"
                      }`}
                      disabled={showFeedback}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback */}
              {showFeedback && (
                <div
                  className={`p-4 rounded-md mb-6 ${
                    isCorrect ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  <p className="font-medium">
                    {isCorrect ? "✅ Correct!" : "❌ Not quite right."}
                  </p>
                  <p className="mt-2">{currentBug?.bug}</p>
                  <button
                    onClick={handleNext}
                    className="mt-4 bg-blue-600 text-foreground px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    {currentBugIndex < code.length - 1
                      ? "Next Challenge"
                      : "Show Results"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 md:p-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Quiz Complete!
              </h2>
              <p className="text-lg mb-6">
                You got {correctAnswers} out of {code.length} correct (
                {Math.round((correctAnswers / code.length) * 100)}%)
              </p>

              <div className="inline-block bg-gray-100 rounded-full p-1 mb-6">
                <div className="w-40 h-40 md:w-48 md:h-48 relative rounded-full flex items-center justify-center">
                  <svg viewBox="0 0 36 36" className="w-full h-full">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#eee"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#4f46e5"
                      strokeWidth="3"
                      strokeDasharray={`${
                        (correctAnswers / code.length) * 100
                      }, 100`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <span className="text-2xl font-bold">
                      {Math.round((correctAnswers / code.length) * 100)}%
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="bg-blue-600 text-foreground px-6 py-3 rounded-md hover:bg-blue-700 transition"
              >
                Start Over
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FixBug;
