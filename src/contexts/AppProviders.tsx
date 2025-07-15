import ThemeProvider from "./ThemeContext";
import DataProvider from "./DataContext";
import LanguageProvider from "./LanguageContext";

const AppProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <DataProvider>{children}</DataProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
