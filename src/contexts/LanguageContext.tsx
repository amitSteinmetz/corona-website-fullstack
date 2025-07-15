import { useState, createContext } from "react";

export const languageContext = createContext(null);

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("hebrew");

  function toggleLanguage() {
    setLanguage((prev) => (prev === "english" ? "hebrew" : "english"));
  }

  return (
    <languageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </languageContext.Provider>
  );
};

export default LanguageProvider;
