'use client';

import React, { useState, useRef } from 'react';
import { Play, Save, Download, Upload, RefreshCw } from 'lucide-react';

export default function OnlineIDEPage() {
  const [code, setCode] = useState(`// Welcome to CareerPilot AI Online IDE
// Choose your language and start coding!

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log("Fibonacci sequence:");
for (let i = 0; i < 10; i++) {
  console.log("F(" + i + ") = " + fibonacci(i));
}
`);
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [isRunning, setIsRunning] = useState(false);
  const fileInputRef = useRef(null);

  const runCode = async () => {
    setIsRunning(true);
    setOutput('Running code...\n');
    
    try {
      const response = await fetch('/api/execute-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language,
        }),
      });

      const result = await response.json();
      setOutput(result.output || result.error || 'Code executed successfully');
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const saveCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${language === 'javascript' ? 'js' : language === 'python' ? 'py' : 'txt'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const loadCode = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCode(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const clearCode = () => {
    setCode('');
    setOutput('');
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6 border border-white/20">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            💻 Online IDE - Code Editor
          </h1>
          <p className="text-blue-200">
            Write, run, and test your code in multiple programming languages
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-6 border border-white/20">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <label className="text-foreground font-medium">Language:</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-foreground"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                onClick={runCode}
                disabled={isRunning}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-foreground px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                {isRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                {isRunning ? 'Running...' : 'Run Code'}
              </button>

              <button
                onClick={saveCode}
                className="flex items-center gap-2 bg-primary hover:opacity-90 text-foreground text-foreground px-4 py-2 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Save
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 bg-primary hover:opacity-90 text-foreground text-foreground px-4 py-2 rounded-lg transition-colors"
              >
                <Upload className="w-4 h-4" />
                Load
              </button>

              <button
                onClick={clearCode}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-foreground px-4 py-2 rounded-lg transition-colors"
              >
                Clear
              </button>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".js,.py,.java,.cpp,.html,.css,.txt"
            onChange={loadCode}
            className="hidden"
          />
        </div>

        {/* Code Editor and Output */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Editor */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-foreground mb-4">Code Editor</h3>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-96 bg-gray-900 text-green-400 font-mono text-sm p-4 rounded-lg border border-gray-700 resize-none focus:outline-none focus:border-blue-500"
              placeholder="Enter your code here..."
              spellCheck={false}
            />
            <div className="mt-2 text-sm text-blue-200">
              Lines: {code.split('\n').length} | Characters: {code.length}
            </div>
          </div>

          {/* Output */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-foreground mb-4">Output</h3>
            <div className="w-full h-96 bg-gray-900 text-foreground font-mono text-sm p-4 rounded-lg border border-gray-700 overflow-auto">
              <pre className="whitespace-pre-wrap">{output || 'Output will appear here...'}</pre>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-foreground mb-4">🚀 IDE Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-bold text-blue-300 mb-2">Multi-Language</h4>
              <p className="text-blue-200 text-sm">Support for JavaScript, Python, Java, C++, HTML, CSS</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-bold text-green-300 mb-2">Code Execution</h4>
              <p className="text-green-200 text-sm">Run code instantly with real-time output</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-bold text-purple-300 mb-2">File Management</h4>
              <p className="text-purple-200 text-sm">Save and load code files easily</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-bold text-yellow-300 mb-2">Syntax Highlighting</h4>
              <p className="text-yellow-200 text-sm">Clean code display with proper formatting</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}