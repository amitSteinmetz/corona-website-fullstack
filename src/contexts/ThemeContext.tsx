import { createContext, useState } from "react";

export const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  const [themeColor, setThemeColor] = useState("light");

  function toggleThemeColor() {
    setThemeColor((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{ themeColor, toggleThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
