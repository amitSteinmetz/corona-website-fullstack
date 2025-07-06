import { useState, useContext } from "react";
import { DataContext } from "../../contexts/DataContext";
import { DataContextType } from "../../models/dataContextType.model";
import CardRenderer from "../main/cards/CardRenderer";
import { Table } from "@mui/material";
import TableComponent from "../main/Table";

const AdminControlCenter = () => {
  const { sections } = useContext<DataContextType>(DataContext);
  const [chosenSection, setChosenSection] = useState(null);
  const [showSections, setShowSections] = useState(false);
  const [showSectionItems, setShowSectionItems] = useState(false);
  const [chosenSectionItem, setchosenSectionItem] = useState({
    item: null,
    type: "",
  });

  function onSectionButtonClicked() {
    if (showSections) setChosenSection(null);
    setShowSections(!showSections);
  }

  function renderItem(item) {
    if (item.type === "card") {
      return (
        <CardRenderer
          sectionId={chosenSection?.id}
          card={chosenSectionItem.item}
          hasContainerParent={chosenSectionItem.item.type === "container"}
        />
      );
    } else if (item.type === "table") {
      console.log(chosenSectionItem.item);
      return <TableComponent table={chosenSectionItem.item} />;
    }
    return null;
  }

  return (
    <div className="control-center__container">
      <h2 className="admin-control-center__greeting">שלום, אדמין:</h2>

      <div className="admin-control-center__selection-container">
        <div className="admin-control-center__selection-box">
          <div
            className="admin-control-center__selection-box__title"
            onClick={onSectionButtonClicked}
          >
            בחר מחלקה
          </div>
          {showSections && (
            <div className="admin-control-center__selection-box__options">
              {sections
                ? sections.map((section) => {
                    return (
                      <div
                        className={`semibold admin-control-center__selection-box__options__item ${
                          chosenSection?.title === section.title ? "active" : ""
                        }`}
                        onClick={() => setChosenSection(section)}
                      >
                        {section.title}
                      </div>
                    );
                  })
                : null}
            </div>
          )}
        </div>

        <div className="admin-control-center__selection-box">
          {chosenSection && (
            <div
              className="admin-control-center__selection-box__title"
              onClick={() => setShowSectionItems(!showSectionItems)}
            >
              בחר פריט
            </div>
          )}
          {chosenSection && showSectionItems && (
            <div className="admin-control-center__selection-box__options">
              {chosenSection.cards.map((card) => {
                return (
                  <div
                    className={`semibold admin-control-center__selection-box__options__item ${
                      chosenSectionItem?.item?.id === card.id ? "active" : ""
                    }`}
                    onClick={() =>
                      setchosenSectionItem({ item: card, type: "card" })
                    }
                  >
                    {card.title}
                  </div>
                );
              })}

              {chosenSection.tables.map((table) => {
                return (
                  <div
                    className={`semibold admin-control-center__selection-box__options__item ${
                      chosenSectionItem?.item?.id === table.id ? "active" : ""
                    }`}
                    onClick={() =>
                      setchosenSectionItem({ item: table, type: "table" })
                    }
                  >
                    {table.title}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {chosenSectionItem && renderItem(chosenSectionItem)}
    </div>
  );
};
export default AdminControlCenter;
