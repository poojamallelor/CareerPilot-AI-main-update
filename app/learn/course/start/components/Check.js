import React, { useState } from "react";

function Check({ questions }) {
  const [activeQuestion, setActiveQuestion] = useState(null);

  //   const questions = {
  //     questions: [
  //       {
  //         question:
  //           "Explain the difference between `malloc` and `calloc` in C, and provide an example scenario where one is preferred over the other.",
  //         ideal_answer:
  //           "Both `malloc` and `calloc` are dynamic memory allocation functions.  `malloc` takes a single argument (size in bytes) and returns a pointer to a block of memory of that size. It does not initialize the allocated memory. `calloc` takes two arguments (number of elements and size of each element) and returns a pointer to a block of memory large enough to hold the specified number of elements, each of the specified size. Importantly, `calloc` initializes the allocated memory to zero.  \n\nExample:  If you need an array of integers and you want them initialized to 0, `calloc` is preferred for clarity and avoids potential issues with uninitialized values. If performance is critical and you are going to overwrite the memory anyway, `malloc` might be slightly faster.\n\n```c\nint *arr1 = (int *)malloc(10 * sizeof(int)); // Uninitialized memory\nint *arr2 = (int *)calloc(10, sizeof(int)); // Memory initialized to 0\n```",
  //         resources: [
  //           "https://www.geeksforgeeks.org/malloc-calloc-free-in-c/",
  //           "https://www.tutorialspoint.com/cprogramming/c_dynamic_memory_allocation.htm",
  //         ],
  //       },
  //       {
  //         question:
  //           "Describe a scenario where using `static` keyword is beneficial and explain its impact on the lifecycle of a variable.",
  //         ideal_answer:
  //           "The `static` keyword modifies the lifecycle and scope of a variable or function. For variables, using `static` within a function makes the variable persist across multiple function calls, retaining its value. This is useful for counters or accumulators. At the file level, `static` limits the scope of a variable or function to the current file, preventing name clashes in larger projects. \n\nExample: A `static` variable in a function can maintain a count of how many times the function has been called. \n\n```c\nint counter(){ \n  static int count = 0; \n  count++; \n  return count; \n}\n```",
  //         resources: [
  //           "https://www.tutorialspoint.com/cprogramming/c_static_keyword.htm",
  //           "https://www.geeksforgeeks.org/static-keyword-in-c/",
  //         ],
  //       },
  //       {
  //         question:
  //           "Explain the concept of pointers in C and describe a common pitfall when working with them.",
  //         ideal_answer:
  //           "Pointers in C hold the memory address of a variable. They are declared using the `*` symbol.  A common pitfall is dereferencing a NULL pointer or a pointer that has not been properly initialized, leading to segmentation faults or unexpected behavior.  Another common error is memory leaks, where dynamically allocated memory is not freed using `free()`.  Also, pointer arithmetic requires careful attention to data types to avoid errors.",
  //         resources: [
  //           "https://www.tutorialspoint.com/cprogramming/c_pointers.htm",
  //           "https://www.geeksforgeeks.org/pointers-in-c-and-c-set-1-introduction-arithmetic-and-array/",
  //         ],
  //       },
  //       {
  //         question:
  //           "What are header files and why are they crucial for C programming? Provide an example of including a header file.",
  //         ideal_answer:
  //           "Header files (.h) contain function declarations, macro definitions, and data type declarations. They are crucial for modularity and code reusability.  They allow you to separate interface from implementation.  Including a header file makes the declarations available to your code.  This prevents compiler errors related to undeclared functions or variables.  Example: `#include <stdio.h>` includes the standard input/output library which provides functions like `printf` and `scanf`.",
  //         resources: [
  //           "https://www.tutorialspoint.com/cprogramming/c_header_files.htm",
  //           "https://www.geeksforgeeks.org/header-files-in-c/",
  //         ],
  //       },
  //       {
  //         question:
  //           "How can you prevent buffer overflow vulnerabilities in C? Describe at least two techniques.",
  //         ideal_answer:
  //           "Buffer overflows occur when a program attempts to write data beyond the allocated buffer size. This can lead to serious security vulnerabilities.  Two common techniques to prevent this are: \n1. **Input validation:**  Always check the size of input data before copying it into a buffer.  Ensure that the input size does not exceed the buffer's allocated size.  \n2. **Using safer functions:**  Use functions like `fgets` instead of `gets` for reading strings, as `fgets` allows you to specify the maximum number of characters to read, preventing buffer overflow.  Functions like `snprintf` are also preferred over `sprintf` for similar reasons.  \nAlways remember to allocate enough memory and rigorously check input lengths.",
  //         resources: [
  //           "https://owasp.org/www-project-top-ten/2017/A1-Injection",
  //           "https://en.wikipedia.org/wiki/Buffer_overflow",
  //         ],
  //       },
  //     ],
  //   };

  const formatAnswer = (answer) => {
    return answer.split("\n\n").map((paragraph, idx) => {
      if (paragraph.includes("```")) {
        const [beforeCode, codeBlock, afterCode] = paragraph.split("```");
        return (
          <div key={idx}>
            {beforeCode && <p className="mb-3">{beforeCode}</p>}
            {codeBlock && (
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto my-3 font-mono text-sm">
                {codeBlock.replace("c\n", "")}
              </pre>
            )}
            {afterCode && <p className="mt-3">{afterCode}</p>}
          </div>
        );
      }
      return (
        <p key={idx} className="mb-3">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 border">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          C Programming Questions
        </h1>

        <div className="space-y-6">
          {questions?.question?.map((q, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div
                className="p-6 cursor-pointer hover:bg-gray-50"
                onClick={() =>
                  setActiveQuestion(activeQuestion === index ? null : index)
                }
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">
                    <span className="inline-flex items-center justify-center w-8 h-8 mr-3 bg-blue-600 text-foreground rounded-full text-sm font-bold">
                      {index + 1}
                    </span>
                    {q.question}
                  </h2>
                  <svg
                    className={`w-6 h-6 text-gray-600 transform transition-transform ${
                      activeQuestion === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {activeQuestion === index && (
                <div className="border-t border-gray-200">
                  <div className="p-6 bg-gray-50">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Answer:
                    </h3>
                    <div className="prose max-w-none text-gray-700">
                      {formatAnswer(q.ideal_answer)}
                    </div>

                    {q.resources && q.resources.length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-md font-medium text-gray-900 mb-2">
                          Resources:
                        </h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {q.resources.map((resource, idx) => (
                            <li key={idx}>
                              <a
                                href={resource}
                                className="text-blue-600 hover:text-blue-800 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {resource}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Check;
