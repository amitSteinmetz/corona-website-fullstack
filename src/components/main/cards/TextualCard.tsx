import { useContext } from "react";
import { IoMdInformationCircle } from "react-icons/io";
import { TextualCardModel } from "../../../models/card.model";
import { languageContext } from "../../../contexts/LanguageContext";
import { ThemeContext } from "../../../contexts/ThemeContext";

const TextualCard = ({ card, hasContainerParent }) => {
  const { themeColor } = useContext(ThemeContext);
  const { language } = useContext(languageContext);
  const englishMode = language === "english";
  const textualCard: TextualCardModel = card as TextualCardModel;
  const textualCardAdditionalData = textualCard?.data[0]?.text
    ? textualCard.data
    : textualCard.data.slice(1);

  return (
    <div
      className={`card ${hasContainerParent && "container-card-child-height"}`}
    >
      <div className="card__header">
        <div className="card__title font-base bold line-height-2xl">
          {!englishMode ? textualCard.title : textualCard.titleEnglish}
        </div>

        <button className="card__more-info_btn">
          <IoMdInformationCircle
            color={`${themeColor === "light" ? "#233333" : "white"}`}
          />
        </button>

        <div className="card__more-info_content-container">
          <div className="card__more-info_content">
            {!englishMode
              ? textualCard.description
              : textualCard.descriptionEnglish}
          </div>
        </div>
      </div>

      <div className="card__body">
        {!textualCard.data[0].text && (
          <span className="main-data__amount bold line-height-xl main-data-bigger-font">
            {textualCard.data[0].amount}
          </span>
        )}

        {textualCardAdditionalData.map(
          (line, index: number) =>
            line.text && (
              <div className="additional-data-line" key={index}>
                <span className="additional-data__amount font-xs bold line-height-xl">
                  {line.amount}
                </span>
                <span className="additional-data__text font-xs">
                  {!englishMode ? line.text : line.textEnglish}
                </span>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default TextualCard;
