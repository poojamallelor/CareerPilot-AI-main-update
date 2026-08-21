"use client";

import { createContext, useContext, useEffect, useState } from "react";
import en from "../locales/en/translation.json";
import hi from "../locales/hi/translation.json";
import mr from "../locales/mr/translation.json";

const translationsMap = { en, hi, mr };
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage && translationsMap[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when changed
  useEffect(() => {
    localStorage.setItem("preferredLanguage", language);
  }, [language]);

  const translations = translationsMap[language] || translationsMap["en"];

  const t = (key) => {
    const keys = key.split(".");
    let value = translations;

    for (const k of keys) {
      value = value?.[k];
      if (!value) break;
    }

    return value || key;
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      translations,
      t,
      availableLanguages: Object.keys(translationsMap)
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
