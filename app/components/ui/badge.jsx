import React from 'react';

export const Badge = ({ variant = "default", className, ...props }) => {
  const variantClasses = {
    default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    secondary: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    destructive: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    outline: "text-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700",
    primary: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        variantClasses[variant] || variantClasses.default
      } ${className || ''}`}
      {...props}
    />
  );
}; 