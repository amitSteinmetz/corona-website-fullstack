import { useContext, useState } from "react";
import Section from "../components/main/Section";
import { DataContext } from "./../contexts/DataContext";
import { sideNavArrowBtn } from "./../assets/svgs";
import { HEADER_NAV_LINKS } from "./../constants/main/HeaderConstants";

const Home = () => {
  const { sections } = useContext(DataContext);
  const [activeLinkIndex, setActiveLinkIndex] = useState(0);

  return (
    <div className="home-page__container">
      <div className="header__nav-wrapper">
        <nav className="nav-links">
          {HEADER_NAV_LINKS.map((link, index) => {
            return (
              <div
                className={`header__nav-link ${
                  activeLinkIndex === index ? "active" : ""
                }`}
                key={index}
                onClick={() => {
                  setActiveLinkIndex(index);
                }}
              >
                {link}
              </div>
            );
          })}
        </nav>
      </div>

      <div className="home-page__body">
        <div className="home-page__body__side-nav">
          <img
            src={sideNavArrowBtn}
            alt="hamburger"
            className="side-nav__btn"
          />
        </div>

        <div className="home-page__body__main">
          <div className="page-location">עולם הדאטא &gt; קורונה </div>

          <div className="page-headline">
            <h1 className="page-headline__title font-2xl bold">קורונה</h1>
            <div className="last-update">
              <span className="bold">עדכון אחרון:</span> 11/05/25, 04:10
            </div>
          </div>

          {sections ? (
            sections.map((sectionData, index) => (
              <Section key={index} sectionData={sectionData} />
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
