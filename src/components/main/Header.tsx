import { useState, useEffect, useContext } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import logo from "../../assets/images/logo.png";
import {
  changeLanguageBtn,
  changeThemeColorBtnLight,
  changeThemeColorBtnDark,
} from "../../assets/svgs";
import { ThemeContext } from "../../contexts/ThemeContext";
import { languageContext } from "../../contexts/LanguageContext";
import { useLocation } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext";

const Header = () => {
  const location = useLocation();
  const { themeColor, toggleThemeColor } = useContext(ThemeContext);
  const { language, toggleLanguage } = useContext(languageContext);
  const { toggleSideNav } = useContext(DataContext);
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
        {!location.pathname.includes("admin") && (
          <button className="header__hamburger-btn" onClick={toggleSideNav}>
            <RxHamburgerMenu
              color={`${themeColor === "light" ? "black" : "white"}`}
            />
          </button>
        )}

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
          {location.pathname !== "/admin/control-center" && (
            <button onClick={toggleLanguage}>
              <img
                className="change-language-icon"
                src={changeLanguageBtn}
                alt="כפתור שינוי שפה"
              />
            </button>
          )}

          <button onClick={toggleThemeColor}>
            <img
              src={
                themeColor === "dark"
                  ? changeThemeColorBtnLight
                  : changeThemeColorBtnDark
              }
              alt="כפתור שינוי רקע"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
