import React from 'react';

const QuestionLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">Loading...</p>
      </div>
  );
};

export default QuestionLoader;
