import ReactECharts from "echarts-for-react";
import { moreInfoBtn } from "../../../assets/svgs";
import { GraphicalCardModel } from "../../../models/card.model";
import TimeTableFilter from "../TimeTableFilter";
import MoreActionsButton from "../MoreActionsButton";
import { useContext } from "react";
import { languageContext } from "../../../contexts/LanguageContext";

const GraphicalCard = ({ sectionId, card, hasContainerParent }) => {
  const { language } = useContext(languageContext);
  const englishMode = language === "english";
  const graphicalCard: GraphicalCardModel = card as GraphicalCardModel;
  const optionsToParse =
    !englishMode
      ? graphicalCard.options
      : graphicalCard.optionsEnglish;
  const options = JSON.parse(optionsToParse);

  return (
    <div
      className={`responsive-container card ${
        hasContainerParent ? "container-card-child-height" : ""
      }`}
    >
      <div className="card__header">
        <div className="card__title font-base bold line-height-2xl">
          {!englishMode
            ? graphicalCard.title
            : graphicalCard.titleEnglish}
        </div>

        <button className="card__more-info_btn">
          <img src={moreInfoBtn} alt="more info" />
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
