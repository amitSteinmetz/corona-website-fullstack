import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TbHomeFilled } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import { useContext, useState } from "react";
import { DataContext } from "../../contexts/DataContext";
import { ThemeContext } from "../../contexts/ThemeContext";

const SideNav = () => {
  const { showSideNav, toggleSideNav } = useContext(DataContext);
  const [showSideNavMenu, setShowSideNavMenu] = useState(false);
  const [currentDivision, setCurrentDivision] = useState("קורונה");
  const { themeColor } = useContext(ThemeContext);
  const sideNavList = [
    "קליטות מלחמה בבתי חולים",
    "שירותים רפואיים בישראל",
    "מבוטחי קופות חולים",
    "הערכת התפתחות הילד",
    "חופים",
    "גדילה והנקה בילדים",
    "איכות במערכת הבריאות",
    "קורונה",
  ];

  return (
    <>
      {showSideNav && (
        <div className="side-nav__container">
          <button
            className="side-nav__mobile__close-btn"
            onClick={toggleSideNav}
          >
            <IoMdClose
              color={`${themeColor === "light" ? "black" : "white"}`}
            />
          </button>

          <div className="side-nav__body">
            <div className="side-nav__title">
              <div className="side-nav__title__homeSvg">
                <TbHomeFilled />
              </div>
              <span className="side-nav__title__text font-sm bold">
                עולם הדאטה
              </span>
              <div
                className="side-nav__title__arrow-btn"
                onClick={() => setShowSideNavMenu(!showSideNavMenu)}
              >
                {showSideNavMenu ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </div>
            </div>

            {showSideNavMenu && (
              <ul className="side-nav__menu">
                {sideNavList.map((division) => (
                  <li
                    className={`side-nav__menu__item font-sm ${
                      currentDivision === division ? "current-division" : ""
                    }`}
                    onClick={() => setCurrentDivision(division)}
                  >
                    {division}
                  </li>
                ))}
              </ul>
            )}

            <ul className="side-nav__more-info-menu bold">
              <li className="side-nav__more-info-menu__item font-sm">אודות</li>
              <li className="side-nav__more-info-menu__item font-sm">
                הצהרת נגישות
              </li>
              <li className="side-nav__more-info-menu__item font-sm">
                תנאי שימוש
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default SideNav;
