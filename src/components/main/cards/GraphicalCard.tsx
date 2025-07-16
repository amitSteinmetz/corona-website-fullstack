import ReactECharts from "echarts-for-react";
import { IoMdInformationCircle } from "react-icons/io";
import { GraphicalCardModel } from "../../../models/card.model";
import TimeTableFilter from "../TimeTableFilter";
import MoreActionsButton from "../MoreActionsButton";
import { useContext, useEffect, useState } from "react";
import { languageContext } from "../../../contexts/LanguageContext";
import { ThemeContext } from "../../../contexts/ThemeContext";

const GraphicalCard = ({ sectionId, card, hasContainerParent }) => {
  const { themeColor } = useContext(ThemeContext);
  const { language } = useContext(languageContext);
  const englishMode = language === "english";
  const graphicalCard: GraphicalCardModel = card as GraphicalCardModel;
  const optionsToParse = !englishMode
    ? graphicalCard.options
    : graphicalCard.optionsEnglish;
  const [options, setOptions] = useState({});

  useEffect(() => {
    const parsedOptions = JSON.parse(optionsToParse);

    parsedOptions.legend = {
      ...parsedOptions.legend,
      textStyle: {
        ...parsedOptions.legend?.textStyle,
        color: themeColor === "light" ? "#484d49" : "white",
      },
    };

    parsedOptions.xAxis = {
      ...parsedOptions.xAxis,
      nameTextStyle: {
        ...parsedOptions.xAxis?.nameTextStyle,
        color: themeColor === "light" ? "#484d49" : "white",
      },
      axisLabel: {
        ...parsedOptions.xAxis?.axisLabel,
        color: themeColor === "light" ? "#484d49" : "white",
      },
    };

    parsedOptions.yAxis = {
      ...parsedOptions.yAxis,
      nameTextStyle: {
        ...parsedOptions.yAxis?.nameTextStyle,
        color: themeColor === "light" ? "#484d49" : "white",
      },
      axisLabel: {
        ...parsedOptions.yAxis?.axisLabel,
        color: themeColor === "light" ? "#484d49" : "white",
      },
    };

    if (parsedOptions?.series) {
      parsedOptions.series = parsedOptions.series.map((serie) => {
        if (serie.label) {
          return {
            ...serie,
            label: {
              ...serie.label,
              color: themeColor === "light" ? "#333" : "white",
            },
          };
        }
        return serie;
      });
    }

    setOptions(parsedOptions);
  }, [themeColor, optionsToParse]);

  return (
    <div
      className={`responsive-container card ${
        hasContainerParent ? "container-card-child-height" : ""
      }`}
    >
      <div className="card__header">
        <div className="card__title font-base bold line-height-2xl">
          {!englishMode ? graphicalCard.title : graphicalCard.titleEnglish}
        </div>

        <button className="card__more-info_btn">
          <IoMdInformationCircle
            color={`${themeColor === "light" ? "#233333" : "white"}`}
          />
        </button>

        <div className="card__more-info_content-container">
          <div className="card__more-info_content font-xs">
            {!englishMode
              ? graphicalCard.description
              : graphicalCard.descriptionEnglish}
          </div>
        </div>

        <MoreActionsButton></MoreActionsButton>
      </div>

      {graphicalCard.hasTimeRangeFilter && (
        <TimeTableFilter sectionId={sectionId} cardId={card.id} />
      )}

      <ReactECharts option={options} className="graph-content" />
    </div>
  );
};

export default GraphicalCard;
