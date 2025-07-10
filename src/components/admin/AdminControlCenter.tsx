import { useState, useContext } from "react";
import { DataContext } from "../../contexts/DataContext";
import { deleteRowAction } from "../../actions/AdminActions";
import AdminRowActionsForm from "./AdminRowActionsForm";
import TableComponent from "../main/Table";
import { IoMdAdd } from "react-icons/io";
import { on } from "events";

const AdminControlCenter = () => {
  const { sections, sectionsDispatch } = useContext(DataContext);
  const [chosenSectionId, setChosenSectionId] = useState<number | null>(null);
  const [chosenTableId, setChosenTableId] = useState<number | null>(null);
  const [chosenRowId, setChosenRowId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddRowForm, setShowAddRowForm] = useState(false);
  const [rowAction, setRowAction] = useState("");

  const chosenSection = sections.find((s) => s.id === chosenSectionId);
  const chosenTable = chosenSection?.tables.find((t) => t.id === chosenTableId);
  const chosenRow = chosenTable?.rows.find((r) => r.id === chosenRowId);

  function onActionRowButtonClicked(action: string) {
    setShowAddRowForm(true);
    setShowModal(false);
    setRowAction(action);
  }

  function onDeleteRowButtonClicked() {
    setShowModal(false);
    deleteRowAction(
      sectionsDispatch,
      chosenSectionId,
      chosenTableId,
      chosenRowId
    );
  }

  const handleRowClick = (row) => {
    if (chosenRow === row) {
      if (showModal) {
        setShowModal(false);
        setChosenRowId(null);
      } else setShowModal(true);
    } else {
      setShowModal(false);
      setChosenRowId(row.id);
    }
  };

  return (
    <div className="control-center__container">
      <h2 className="admin-control-center__greeting">שלום, אדמין:</h2>

      <>
        <div className="admin-control-center__selection-container">
          <div className="admin-control-center__selection-box">
            <div className="admin-control-center__selection-box__title bold">
              בחר מחלקה
            </div>

            <div className="admin-control-center__selection-box__options">
              {sections ? (
                sections
                  .filter((section) => section.tables.length > 0)
                  .map((section) => {
                    return (
                      <div
                        className={`semibold admin-control-center__selection-box__options__item ${
                          chosenSection?.title === section.title ? "active" : ""
                        }`}
                        onClick={() => {
                          setChosenSectionId(section.id);
                          setChosenTableId(null);
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
              <div className="admin-control-center__selection-box__title bold">
                בחר טבלה
              </div>
            )}
            {chosenSection && (
              <div className="admin-control-center__selection-box__options">
                {chosenSection.tables.map((table) => {
                  return (
                    <div
                      className={`semibold admin-control-center__selection-box__options__item ${
                        chosenTableId === table.id ? "active" : ""
                      }`}
                      onClick={() => {
                        setChosenTableId(table.id);
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

        {chosenTableId && (
          <>
            <h4 className="admin-control-center__table-greeting">
              הקש על רשומה כדי לבצע פעולות:
            </h4>
            <button
              className="admin-control-center__action-button"
              onClick={() => onActionRowButtonClicked("add")}
            >
              <span className="admin-control-center__action-button__extra-text">
                {" הוסף רשומה"}
              </span>
              <IoMdAdd />
            </button>

            {chosenTableId && (
              <TableComponent
                table={chosenTable}
                onRowClicked={handleRowClick}
              />
            )}
          </>
        )}
      </>

      {showModal && (
        <div className="row-actions-container">
          <div className="row-actions-modal">
            <button
              className="row-actions-modal__close-btn"
              onClick={() => setShowModal(false)}
            >
              X
            </button>
            <div className="bold">בחר פעולה:</div>
            <div className="row-actions-modal__buttons">
              <button onClick={() => onActionRowButtonClicked("edit")}>
                ערוך רשומה
              </button>
              <button onClick={onDeleteRowButtonClicked}>מחק רשומה</button>
            </div>
          </div>
        </div>
      )}

      {showAddRowForm && (
        <AdminRowActionsForm
          currentRow={chosenRow}
          action={rowAction}
          rowType={chosenTable?.type}
          columns={chosenTable?.columns}
          sectionId={chosenSection?.id}
          tableId={chosenTable?.id}
        />
      )}
    </div>
  );
};
export default AdminControlCenter;
