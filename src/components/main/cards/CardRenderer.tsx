import TextualCard from "./TextualCard";
import GraphicalCard from "./GraphicalCard";
import { useContext } from "react";
import { languageContext } from "../../../contexts/LanguageContext";

const CardRenderer = ({ sectionId, card, hasContainerParent }) => {
  const { language } = useContext(languageContext);
  
  function isCardHasChildren() {
    return card.type === "container";
  }

  function renderCard() {
    switch (card.type) {
      case "textual":
        return (
          <TextualCard card={card} hasContainerParent={hasContainerParent} />
        );
      case "graphical":
        return (
          <GraphicalCard
            sectionId={sectionId}
            card={card}
            hasContainerParent={hasContainerParent}
          />
        );
    }
  }

  return (
    <>
      {isCardHasChildren() ? (
        <div className="container-card">
          <div className="container-card__title bold">
            {language === "english" ? card.titleEnglish : card.title}
          </div>

          <div className="container-card__children-wrapper">
            {card.children.map((child, index: number) => (
              <CardRenderer
                sectionId={sectionId}
                key={index}
                card={child}
                hasContainerParent={hasContainerParent}
              />
            ))}
          </div>
        </div>
      ) : (
        renderCard()
      )}
    </>
  );
};

export default CardRenderer;
