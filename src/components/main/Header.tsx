import { useState, useEffect, useContext } from "react";
import logo from "../../assets/images/logo.png";
import {
  changeLanguageBtn,
  changeThemeColorBtn,
  hamburgerBtn,
} from "../../assets/svgs";
import { ThemeContext } from "../../contexts/ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
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

        <div className="header__title">עולם הדאטה</div>

        <div className="header__icons">
          <button>
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
