import { useState, useEffect, useContext } from "react";
import logo from "../../assets/images/logo.png";
import {
  changeLanguageBtn,
  changeThemeColorBtn,
  hamburgerBtn,
} from "../../assets/svgs";
import { ThemeContext } from "../../contexts/ThemeContext";
import { languageContext } from "../../contexts/LanguageContext";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { language, toggleLanguage } = useContext(languageContext);
  const englishMode = language === "english";
  const [isGradientLineLoadingAnimate, setIsGradientLineLoadingAnimate] =
    useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsGradientLineLoadingAnimate(true);
    }, 1000);
  }, []);

  return (
    <div className="header-container">
      <div
        className={`header__gradient-line ${
          isGradientLineLoadingAnimate ? "active" : ""
        }`}
      ></div>

      <div className="header__main-content">
        <button className="header__hamburger-btn">
          <img src={hamburgerBtn} alt="תפריט" />
        </button>

        <img className="header__logo" src={logo} alt="לוגו משרד הבריאות" />

        <div
          className="header__title"
          data-title-after={!englishMode ? " של משרד הבריאות" : ""}
          data-title-before={
            language === "english" ? "Ministry of Health's " : ""
          }
        >
          {!englishMode ? "עולם הדאטה" : "World of Data"}
        </div>

        <div className="header__icons">
          <button onClick={toggleLanguage}>
            <img
              className="change-language-icon"
              src={changeLanguageBtn}
              alt="כפתור שינוי שפה"
            />
          </button>

          <button onClick={toggleTheme}>
            <img src={changeThemeColorBtn} alt="כפתור שינוי רקע" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
