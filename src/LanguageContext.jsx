import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Initialize a map to store language preferences for each section
  const [sectionLanguages, setSectionLanguages] = useState({
    section1: "english",
    section2: "english",
    section3: "english",
    section4: "english"
  });

  const setLanguageForSection = (sectionId, language) => {
    setSectionLanguages(prev => ({
      ...prev,
      [sectionId]: language
    }));
  };

  return (
    <LanguageContext.Provider value={{ sectionLanguages, setLanguageForSection }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(sectionId) {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return {
    language: context.sectionLanguages[sectionId],
    setLanguage: (newLanguage) => context.setLanguageForSection(sectionId, newLanguage)
  };
}
