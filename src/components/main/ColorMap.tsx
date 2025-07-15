import { useContext } from "react";
import { languageContext } from "../../contexts/LanguageContext";

const ColorMap = ({ colorsMap, tableType }) => {
  const { language } = useContext(languageContext);
  const englishMode = language === "english";
  const itemTitleObj = {
    incomingPersons: {
      High: !englishMode ? "מדינות בסיכון מירבי" : "High risk",
      Medium: !englishMode ? "מדינות בסיכון" : "Risk",
      Low: !englishMode ? "מדינות בסיכון נמוך" : "Low risk",
    },
    trafficLightProgram: {
      High: !englishMode ? "אדום" : "red",
      Medium: !englishMode ? "כתום" : "orange",
      Low: !englishMode ? "צהוב" : "yellow",
      None: !englishMode ? "ירוק" : "green",
    },
  };

  const itemSubtitleObj = {
    High: !englishMode ? "ציון 7.5 ומעלה" : "Score 7.5 and above",
    Medium: !englishMode ? "ציון בין 6 ל - 7.5" : "Score between 6 and 7.5",
    Low: !englishMode ? "ציון בין 4.5 ל - 6" : "Score between 4.5 and 6",
    None: !englishMode ? "ציון עד 4.5" : "Score 4.5 and below",
  };

  return (
    <div className="map-container">
      <div className="map-item">
        <div
          className="risk-level-square"
          style={{ backgroundColor: colorsMap.High }}
        ></div>

        <div className="map-item__text">
          <div className="map-item__title semibold">
            {tableType === "incomingPersons"
              ? itemTitleObj.incomingPersons.High
              : itemTitleObj.trafficLightProgram.High}
          </div>
          {tableType === "trafficLightProgram" && (
            <div className="map-item__subtitle">{itemSubtitleObj.High}</div>
          )}
        </div>
      </div>
      <div className="map-item">
        <div
          className="risk-level-square"
          style={{ backgroundColor: colorsMap.Medium }}
        ></div>

        <div className="map-item__text">
          <div className="map-item__title semibold">
            {tableType === "incomingPersons"
              ? itemTitleObj.incomingPersons.Medium
              : itemTitleObj.trafficLightProgram.Medium}
          </div>
          {tableType === "trafficLightProgram" && (
            <div className="map-item__subtitle">{itemSubtitleObj.Medium}</div>
          )}
        </div>
      </div>
      <div className="map-item">
        <div
          className="risk-level-square"
          style={{ backgroundColor: colorsMap.Low }}
        ></div>

        <div className="map-item__text">
          <div className="map-item__title semibold">
            {tableType === "incomingPersons"
              ? itemTitleObj.incomingPersons.Low
              : itemTitleObj.trafficLightProgram.Low}
          </div>
          {tableType === "trafficLightProgram" && (
            <div className="map-item__subtitle">{itemSubtitleObj.Low}</div>
          )}
        </div>
      </div>
      {tableType === "trafficLightProgram" && (
        <div className="map-item">
          <div
            className="risk-level-square"
            style={{ backgroundColor: colorsMap.None }}
          ></div>

          <div className="map-item__text">
            <div className="map-item__title semibold">
              {tableType === "incomingPersons"
                ? null
                : itemTitleObj.trafficLightProgram.None}
            </div>
            <div className="map-item__subtitle">{itemSubtitleObj.None}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorMap;
