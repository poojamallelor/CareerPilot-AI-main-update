"use client"

import React from 'react';

export const AlertDialog = ({ children, open }) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
        {children}
      </div>
    </div>
  );
};

export const AlertDialogContent = ({ children }) => {
  return <div className="flex flex-col gap-4">{children}</div>;
};

export const AlertDialogTitle = ({ children }) => {
  return <h2 className="text-xl font-semibold">{children}</h2>;
};

export const AlertDialogDescription = ({ children }) => {
  return <p className="text-gray-500 dark:text-gray-400">{children}</p>;
};

export const AlertDialogFooter = ({ children }) => {
  return <div className="flex justify-end gap-2 mt-4">{children}</div>;
};

export const AlertDialogCancel = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      {children}
    </button>
  );
};

export const AlertDialogAction = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-amber-500 text-foreground rounded-md hover:bg-amber-600"
    >
      {children}
    </button>
  );
}; 