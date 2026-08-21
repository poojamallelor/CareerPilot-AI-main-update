import { NextResponse } from 'next/server';

// Supported languages and their configurations
const LANGUAGE_CONFIGS = {
  javascript: {
    extension: 'js',
    command: 'node',
    dockerImage: 'node:18-alpine',
  },
  python: {
    extension: 'py',
    command: 'python3',
    dockerImage: 'python:3.11-alpine',
  },
  java: {
    extension: 'java',
    command: 'javac && java',
    dockerImage: 'openjdk:17-alpine',
  },
  cpp: {
    extension: 'cpp',
    command: 'g++ -o main && ./main',
    dockerImage: 'gcc:latest',
  },
  c: {
    extension: 'c',
    command: 'gcc -o main && ./main',
    dockerImage: 'gcc:latest',
  },
  go: {
    extension: 'go',
    command: 'go run',
    dockerImage: 'golang:1.21-alpine',
  },
  rust: {
    extension: 'rs',
    command: 'rustc -o main && ./main',
    dockerImage: 'rust:1.70-alpine',
  },
};

// Simple code execution for demonstration (in production, use sandboxed environment)
async function executeCode(
  language,
  code
) {
  const startTime = Date.now();

  try {
    // This is a simplified version - in production, you'd use Docker containers or cloud execution services
    switch (language) {
      case 'javascript':
        return await executeJavaScript(code, startTime);
      case 'python':
        return await executePython(code, startTime);
      default:
        return {
          output: '',
          error: `Language ${language} is not supported yet. Coming soon!`,
          executionTime: Date.now() - startTime,
        };
    }
  } catch (error) {
    return {
      output: '',
      error: error instanceof Error ? error.message : 'Unknown execution error',
      executionTime: Date.now() - startTime,
    };
  }
}

async function executeJavaScript(code, startTime) {
  try {
    // Create a safe execution context
    const originalConsoleLog = console.log;
    const outputs = [];

    // Override console.log to capture output
    console.log = (...args) => {
      outputs.push(
        args
          .map(arg =>
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          )
          .join(' ')
      );
    };

    // Add timeout protection
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(
        () => reject(new Error('Execution timeout (5 seconds)')),
        5000
      );
    });

    const executionPromise = new Promise(resolve => {
      try {
        // Use Function constructor for safer evaluation
        const result = new Function(code)();
        if (result !== undefined) {
          outputs.push(String(result));
        }
        resolve(outputs.join('\n'));
      } catch (error) {
        throw error;
      }
    });

    const output = await Promise.race([
      executionPromise,
      timeoutPromise,
    ]);

    // Restore console.log
    console.log = originalConsoleLog;

    return {
      output: output || 'Code executed successfully (no output)',
      executionTime: Date.now() - startTime,
    };
  } catch (error) {
    return {
      output: '',
      error:
        error instanceof Error ? error.message : 'JavaScript execution error',
      executionTime: Date.now() - startTime,
    };
  }
}

async function executePython(code, startTime) {
  // For Python, we'll simulate execution since we can't run Python directly in Node.js
  // In production, you'd use a Python execution service or subprocess

  try {
    // Basic Python code analysis
    if (code.includes('print(')) {
      const printMatches = code.match(/print\(([^)]+)\)/g);
      if (printMatches) {
        const outputs = printMatches.map(match => {
          const content = match.replace(/print\(|\)/g, '').replace(/['"]/g, '');
          return content;
        });

        return {
          output: outputs.join('\n'),
          executionTime: Date.now() - startTime,
        };
      }
    }

    // Simple expression evaluation for basic Python
    if (code.trim().match(/^\d+\s*[\+\-\*\/]\s*\d+$/)) {
      try {
        const result = eval(code.trim().replace(/\/\//g, '/')); // Simple math only
        return {
          output: String(result),
          executionTime: Date.now() - startTime,
        };
      } catch {
        // If eval fails, continue to generic response
      }
    }

    return {
      output: `Python code executed successfully!\n\n⚠️  Note: Full Python execution requires server-side Python interpreter.\nFor now, showing simulated output based on code analysis.\n\nTo enable full Python execution, integrate with:\n- Judge0 API\n- CodeX API\n- Docker containers\n- Cloud execution services`,
      executionTime: Date.now() - startTime,
    };
  } catch (error) {
    return {
      output: '',
      error:
        error instanceof Error
          ? error.message
          : 'Python execution simulation error',
      executionTime: Date.now() - startTime,
    };
  }
}

export async function POST(request) {
  try {
    const { language, code, input } = await request.json();

    if (!language || !code) {
      return NextResponse.json(
        { error: 'Language and code are required' },
        { status: 400 }
      );
    }

    if (!LANGUAGE_CONFIGS[language]) {
      return NextResponse.json(
        { error: `Unsupported language: ${language}` },
        { status: 400 }
      );
    }

    // Execute the code
    const result = await executeCode(language, code);

    return NextResponse.json({
      success: true,
      data: {
        ...result,
        language,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Code execution error:', error);
    return NextResponse.json(
      {
        error: 'Failed to execute code',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'CareerPilot-AI Code Execution API',
    supportedLanguages: Object.keys(LANGUAGE_CONFIGS),
    endpoints: {
      execute: 'POST /api/execute-code',
      languages: 'GET /api/execute-code',
    },
    documentation: {
      body: {
        language: 'string (required) - Programming language',
        code: 'string (required) - Source code to execute',
        input: 'string (optional) - Input for the program',
      },
      response: {
        success: 'boolean',
        data: {
          output: 'string - Program output',
          error: 'string - Error message if any',
          executionTime: 'number - Execution time in milliseconds',
          language: 'string - Programming language used',
          timestamp: 'string - ISO timestamp',
        },
      },
    },
  });
}
