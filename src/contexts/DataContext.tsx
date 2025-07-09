import { createContext, useState, useEffect, useReducer } from "react";
import { SectionModel } from "../models/section.model";
import { Card } from "../models/card.model";
import { AdminReducer } from "../reducers/AdminReducer";
import { setSectionsAction } from "../actions/AdminActions";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  // const [sections, setSections] = useState<SectionModel[]>();
  const [sections, sectionsDispatch] = useReducer(AdminReducer, []);

  // First website initialization
  useEffect(() => {
    fetch("https://localhost:7287/api/Sections")
      .then((res) => res.json())
      .then((data: SectionModel[]) => {
        console.log(data);
        setSectionsAction(sectionsDispatch, data);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  // On new time-range of graph was chosen
  function onChangeGraphDataTimeRange(
    sectionId: number,
    cardId: number,
    timeRange: string
  ) {
    fetch(`https://localhost:7287/api/Cards/${sectionId}/${cardId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(timeRange),
    })
      .then((res) => res.json())
      .then((updatedCard: Card) => {
        const updatedSections: SectionModel[] = sections.map((section) => {
          if (section.id === sectionId) {
            const updatedCards = section.cards.map((card) =>
              card.id === cardId ? updatedCard : card
            );
            return { ...section, cards: updatedCards };
          }
          return section;
        });
        setSectionsAction(sectionsDispatch, updatedSections);
      })
      .catch((err) => console.error("Amit Error:", err));
  }

  return (
    <DataContext.Provider
      value={{ sections, sectionsDispatch, onChangeGraphDataTimeRange }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
