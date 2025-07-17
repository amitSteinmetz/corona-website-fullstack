import { useContext, useState, useRef, createRef, useEffect } from "react";
import Section from "../components/main/Section";
import { DataContext } from "./../contexts/DataContext";
import { sideNavArrowLeftBtn, sideNavArrowRightBtn } from "../assets/svgs";
import SideNav from "./main/SideNav";
import { languageContext } from "../contexts/LanguageContext";

const Home = () => {
  const { sections } = useContext(DataContext);
  const { language } = useContext(languageContext);
  const { showSideNav, toggleSideNav } = useContext(DataContext);
  const englishMode = language === "english";
  const [activeLinkIndex, setActiveLinkIndex] = useState(0);
  const sectionRefs = useRef({});

  useEffect(() => {
    const handleScrollSpy = () => {
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;

      if (isAtBottom) {
        setActiveLinkIndex(sections.length - 1);
        return;
      }

      let currentIndex = 0;

      for (let i = 0; i < sections.length; i++) {
        const key = sections[i].id;
        const ref = sectionRefs.current[key];

        if (!ref?.current) continue;

        const rect = ref.current.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 140) {
          currentIndex = i;
          break;
        }
      }

      setActiveLinkIndex(currentIndex);
    };

    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [sections]);

  const getRefFor = (key) => {
    if (!sectionRefs.current[key]) {
      sectionRefs.current[key] = createRef();
    }
    return sectionRefs.current[key];
  };

  const handleScroll = (key) => {
    const ref = sectionRefs.current[key];
    if (ref?.current) {
      const yOffset = -123; // negative means scroll up more
      const y =
        ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y });
    }
  };

  return (
    <div className="home-page__container">
      <div className="header__nav-wrapper">
        <nav className="nav-links">
          {sections.map((section, index) => {
            return (
              <div
                className={`header__nav-link ${
                  activeLinkIndex === index ? "active" : ""
                }`}
                key={index}
                onClick={() => {
                  setActiveLinkIndex(index);
                  handleScroll(section.id);
                }}
              >
                {englishMode ? section.titleEnglish : section.title}
              </div>
            );
          })}
        </nav>
      </div>

      <div className="home-page__body">
        <button
          className="side-nav__open-nav-btn"
          style={{ right: showSideNav ? "228px" : "22px" }}
          onClick={toggleSideNav}
        >
          <img
            src={showSideNav ? sideNavArrowRightBtn : sideNavArrowLeftBtn}
            alt="Toggle Side Navigation"
            className="side-nav__btn"
          />
        </button>

        <SideNav />

        <div className="home-page__body__main">
          <div className="page-location">
            {!englishMode ? "עולם הדאטא > קורונה" : "Data World > COVID-19"}
          </div>

          <div className="page-headline">
            <h1 className="page-headline__title font-2xl bold">
              {!englishMode ? "קורונה" : "COVID-19"}
            </h1>
            <div className="last-update">
              <span className="bold">
                {!englishMode ? "עדכון אחרון: " : "Last update: "}
              </span>{" "}
              15/07/25, 12:58
            </div>
          </div>

          {sections ? (
            sections.map((sectionData, index) => (
              <div ref={getRefFor(sectionData.id)}>
                <Section key={index} sectionData={sectionData} />
              </div>
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
