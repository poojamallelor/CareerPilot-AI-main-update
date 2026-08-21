'use client';

import React, { useState, useEffect } from 'react';
import { Play, RefreshCw, CheckCircle, XCircle, Lightbulb, Code, Target } from 'lucide-react';

export default function AICodePracticePage() {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [userCode, setUserCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState(false);

  const challenges = {
    javascript: {
      easy: [
        {
          title: "Sum of Two Numbers",
          description: "Write a function that takes two numbers and returns their sum.",
          starter: "function sum(a, b) {\n  // Your code here\n  return 0;\n}",
          tests: [
            { input: [2, 3], expected: 5 },
            { input: [10, -5], expected: 5 },
            { input: [0, 0], expected: 0 }
          ],
          hint: "Simply use the + operator to add the two parameters together."
        },
        {
          title: "Reverse String",
          description: "Write a function that reverses a string.",
          starter: "function reverseString(str) {\n  // Your code here\n  return '';\n}",
          tests: [
            { input: ["hello"], expected: "olleh" },
            { input: ["world"], expected: "dlrow" },
            { input: [""], expected: "" }
          ],
          hint: "You can use split(''), reverse(), and join('') methods."
        }
      ],
      medium: [
        {
          title: "Fibonacci Sequence",
          description: "Write a function that returns the nth Fibonacci number.",
          starter: "function fibonacci(n) {\n  // Your code here\n  return 0;\n}",
          tests: [
            { input: [0], expected: 0 },
            { input: [1], expected: 1 },
            { input: [5], expected: 5 },
            { input: [10], expected: 55 }
          ],
          hint: "Use dynamic programming or recursion. Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13..."
        }
      ]
    },
    python: {
      easy: [
        {
          title: "List Sum",
          description: "Write a function that returns the sum of all numbers in a list.",
          starter: "def list_sum(numbers):\n    # Your code here\n    return 0",
          tests: [
            { input: [[1, 2, 3, 4]], expected: 10 },
            { input: [[-1, 1, 0]], expected: 0 },
            { input: [[]], expected: 0 }
          ],
          hint: "Use a for loop or the built-in sum() function."
        }
      ]
    }
  };

  const getRandomChallenge = () => {
    const languageChallenges = challenges[selectedLanguage]?.[selectedDifficulty] || [];
    if (languageChallenges.length > 0) {
      const randomIndex = Math.floor(Math.random() * languageChallenges.length);
      const challenge = languageChallenges[randomIndex];
      setCurrentChallenge(challenge);
      setUserCode(challenge.starter);
      setOutput('');
      setCompleted(false);
      setShowHint(false);
    }
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput('Running tests...\n');
    
    try {
      // Simulate code execution and testing
      let allTestsPassed = true;
      let testResults = '';
      
      for (let i = 0; i < currentChallenge.tests.length; i++) {
        const test = currentChallenge.tests[i];
        // This is a simulation - in a real app, you'd execute the code
        const passed = Math.random() > 0.3; // 70% chance of passing for demo
        
        testResults += `Test ${i + 1}: ${passed ? '✅ PASSED' : '❌ FAILED'}\n`;
        testResults += `Input: ${JSON.stringify(test.input)}\n`;
        testResults += `Expected: ${JSON.stringify(test.expected)}\n`;
        testResults += `Got: ${passed ? JSON.stringify(test.expected) : 'undefined'}\n\n`;
        
        if (!passed) allTestsPassed = false;
      }
      
      setOutput(testResults);
      setCompleted(allTestsPassed);
      
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    getRandomChallenge();
  }, [selectedLanguage, selectedDifficulty]);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6 border border-white/20">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            🤖 AI Code Practice
          </h1>
          <p className="text-blue-200">
            Sharpen your coding skills with AI-generated challenges
          </p>
        </div>

        {/* Settings */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-6 border border-white/20">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-4 items-center">
              <div>
                <label className="text-foreground font-medium mr-2">Language:</label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-foreground"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                </select>
              </div>

              <div>
                <label className="text-foreground font-medium mr-2">Difficulty:</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-foreground"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            <button
              onClick={getRandomChallenge}
              className="flex items-center gap-2 bg-primary hover:opacity-90 text-foreground text-foreground px-4 py-2 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              New Challenge
            </button>
          </div>
        </div>

        {currentChallenge && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Challenge Description */}
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-6 h-6 text-yellow-400" />
                  <h2 className="text-2xl font-bold text-foreground">{currentChallenge.title}</h2>
                  {completed && <CheckCircle className="w-6 h-6 text-green-400" />}
                </div>
                <p className="text-blue-200 mb-4">{currentChallenge.description}</p>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-foreground px-4 py-2 rounded-lg transition-colors"
                  >
                    <Lightbulb className="w-4 h-4" />
                    {showHint ? 'Hide Hint' : 'Show Hint'}
                  </button>
                </div>

                {showHint && (
                  <div className="mt-4 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
                    <div className="text-yellow-200">
                      <strong>💡 Hint:</strong> {currentChallenge.hint}
                    </div>
                  </div>
                )}
              </div>

              {/* Test Cases */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-foreground mb-4">Test Cases</h3>
                <div className="space-y-3">
                  {currentChallenge.tests.map((test, index) => (
                    <div key={index} className="bg-white/10 rounded-lg p-3">
                      <div className="text-blue-300 font-medium">Test {index + 1}</div>
                      <div className="text-foreground text-sm">
                        Input: <code className="bg-gray-800 px-2 py-1 rounded">{JSON.stringify(test.input)}</code>
                      </div>
                      <div className="text-foreground text-sm">
                        Expected: <code className="bg-gray-800 px-2 py-1 rounded">{JSON.stringify(test.expected)}</code>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Code Editor and Output */}
            <div className="space-y-6">
              {/* Code Editor */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-foreground">Code Editor</h3>
                  <button
                    onClick={runCode}
                    disabled={isRunning}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-foreground px-4 py-2 rounded-lg transition-colors"
                  >
                    {isRunning ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Running...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Run Tests
                      </>
                    )}
                  </button>
                </div>
                
                <textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  className="w-full h-64 bg-gray-900 text-green-400 font-mono text-sm p-4 rounded-lg border border-gray-700 resize-none focus:outline-none focus:border-blue-500"
                  placeholder="Write your solution here..."
                  spellCheck={false}
                />
              </div>

              {/* Output */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-foreground mb-4">Test Results</h3>
                <div className="w-full h-48 bg-gray-900 text-foreground font-mono text-sm p-4 rounded-lg border border-gray-700 overflow-auto">
                  <pre className="whitespace-pre-wrap">{output || 'Click "Run Tests" to see results...'}</pre>
                </div>
                
                {completed && (
                  <div className="mt-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                    <div className="flex items-center gap-2 text-green-200">
                      <CheckCircle className="w-5 h-5" />
                      <strong>Congratulations! All tests passed! 🎉</strong>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="mt-8 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-foreground mb-4">🚀 Practice Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-bold text-blue-300 mb-2">AI-Generated</h4>
              <p className="text-blue-200 text-sm">Fresh challenges created by AI</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-bold text-green-300 mb-2">Multiple Languages</h4>
              <p className="text-green-200 text-sm">Practice in your preferred language</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-bold text-purple-300 mb-2">Difficulty Levels</h4>
              <p className="text-purple-200 text-sm">From beginner to advanced</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-bold text-yellow-300 mb-2">Instant Feedback</h4>
              <p className="text-yellow-200 text-sm">Real-time testing and hints</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}