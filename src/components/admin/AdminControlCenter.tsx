import { useState, useContext, useMemo } from "react";
import { DataContext } from "../../contexts/DataContext";
import CardRenderer from "../main/cards/CardRenderer";
import TableComponent from "../main/Table";
import { deleteRowAction } from "../../actions/AdminActions";
import AdminRowActionsForm from "./AdminRowActionsForm";

const AdminControlCenter = () => {
  const { sections, sectionsDispatch } = useContext(DataContext);
  const [chosenSection, setChosenSection] = useState(null);
  const [chosenSectionItem, setchosenSectionItem] = useState({
    item: null,
    type: "",
  });
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddRowForm, setShowAddRowForm] = useState(false);
  const [rowAction, setRowAction] = useState("");
  const filteredSections = useMemo(() => {
    return sections?.filter((section) => section.tables.length > 0);
  }, [sections]);

  const handleRowClick = (row) => {
    if (selectedRow === row) setShowModal(true);
    else setSelectedRow(row);
  };

  const handleKeyDown = (event, row) => {
    if (event.key === "Enter" && selectedRow === row) setShowModal(true);
  };

  function onActionRowButtonClicked(action: string) {
    setShowAddRowForm(true);
    setRowAction(action);
  }

  function onDeleteRowButtonClicked() {
    deleteRowAction(
      sectionsDispatch,
      chosenSection.id,
      chosenSectionItem.item.id,
      selectedRow.id
    );
    setShowModal(false);
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
      return (
        <TableComponent
          table={chosenSectionItem.item}
          onRowClicked={handleRowClick}
          onKeyDownOnRow={handleKeyDown}
        />
      );
    }
    return null;
  }

  return (
    <div className="control-center__container">
      <h2 className="admin-control-center__greeting">שלום, אדמין:</h2>

      <>
        <div className="admin-control-center__selection-container">
          <div className="admin-control-center__selection-box">
            <div className="admin-control-center__selection-box__title">
              בחר מחלקה
            </div>

            <div className="admin-control-center__selection-box__options">
              {filteredSections ? (
                filteredSections.map((section) => {
                  return (
                    <div
                      className={`semibold admin-control-center__selection-box__options__item ${
                        chosenSection?.title === section.title ? "active" : ""
                      }`}
                      onClick={() => {
                        setChosenSection(section);
                        setchosenSectionItem(null);
                        setShowAddRowForm(false);
                      }}
                    >
                      {section.title}
                    </div>
                  );
                })
              ) : (
                <div>loading..</div>
              )}
            </div>
          </div>

          <div className="admin-control-center__selection-box">
            {chosenSection && (
              <div className="admin-control-center__selection-box__title">
                בחר טבלה
              </div>
            )}
            {chosenSection && (
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
                      onClick={() => {
                        setchosenSectionItem({ item: table, type: "table" });
                        setShowModal(false);
                      }}
                    >
                      {table.title}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {chosenSectionItem && (
          <>
            <h4>הקש על רשומה כדי לבצע פעולות:</h4>
            <button onClick={() => onActionRowButtonClicked("add")}>
              הוסף רשומה
            </button>
            {renderItem(chosenSectionItem)}

            {showModal && (
              <div className="row-actions-modal">
                <button onClick={() => onActionRowButtonClicked("edit")}>
                  ערוך רשומה
                </button>
                <button onClick={onDeleteRowButtonClicked}>מחק רשומה</button>
              </div>
            )}
          </>
        )}
      </>

      {showAddRowForm && (
        <AdminRowActionsForm
          currentRow={selectedRow}
          action={rowAction}
          rowType={chosenSectionItem?.item.type}
          columns={chosenSectionItem?.item.columns}
          sectionId={chosenSection?.id}
          tableId={chosenSectionItem?.item.id}
        />
      )}
    </div>
  );
};
export default AdminControlCenter;
