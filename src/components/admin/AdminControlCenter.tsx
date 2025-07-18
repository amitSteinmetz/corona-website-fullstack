import { useState, useContext } from "react";
import { DataContext } from "../../contexts/DataContext";
import { deleteRowAction } from "../../actions/AdminActions";
import AdminRowActionsForm from "./AdminRowActionsForm";
import TableComponent from "../main/Table";
import { IoMdAdd } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { languageContext } from "../../contexts/LanguageContext";

const AdminControlCenter = () => {
  const { language } = useContext(languageContext);
  const englishMode = language === "english";
  const { sections, sectionsDispatch } = useContext(DataContext);
  const [chosenSectionId, setChosenSectionId] = useState<number | null>(null);
  const [chosenTableId, setChosenTableId] = useState<number | null>(null);
  const [chosenRowId, setChosenRowId] = useState<number | null>(null);
  const [showActionsModal, setShowActionsModal] = useState(false);
  const [showAddRowForm, setRowActionForm] = useState(false);
  const [rowActionStatus, setRowActionStatus] = useState({
    success: false,
    error: false,
  });
  const [rowAction, setRowAction] = useState("");
  const chosenSection = sections.find((s) => s.id === chosenSectionId);
  const chosenTable = chosenSection?.tables.find((t) => t.id === chosenTableId);
  const chosenRow = chosenTable?.rows.find((r) => r.id === chosenRowId);

  function showApplyRowActionModal(actionStatus: string) {
    setRowActionStatus({ ...rowActionStatus, [actionStatus]: true });
    setTimeout(() => {
      setRowActionStatus({
        ...rowActionStatus,
        [actionStatus]: false,
      });
    }, 4000);
  }
  function onActionRowButtonClicked(action: string) {
    setRowActionForm(true);
    setShowActionsModal(false);
    setRowAction(action);
  }
  async function onDeleteRowButtonClicked() {
    setShowActionsModal(false);
    try {
      await deleteRowAction(
        sectionsDispatch,
        chosenSectionId,
        chosenTableId,
        chosenRowId
      );
      showApplyRowActionModal("success");
    } catch (err) {
      showApplyRowActionModal("error");
    }
  }
  const handleRowClick = (row) => {
    if (row !== chosenRow) setChosenRowId(row.id);
    else setShowActionsModal(true);

    // if (chosenRow === row) {
    //   if (showActionsModal) {
    //     setShowActionsModal(false);
    //     setChosenRowId(null);
    //   } else setShowActionsModal(true);
    // } else {
    //   // setShowActionsModal(false);
    //   setChosenRowId(row.id);
    // }
  };

  return (
    <div className="control-center__container">
      <h2 className="admin-control-center__greeting">שלום, אדמין:</h2>

      <>
        <div className="admin-control-center__selection-container">
          <div className="admin-control-center__selection-box">
            <div className="admin-control-center__selection-box__title bold">
              {englishMode ? "Choose Section" : "בחר מחלקה"}
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
                          setRowActionForm(false);
                        }}
                      >
                        {englishMode ? section.titleEnglish : section.title}
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
                {englishMode ? "Choose Table" : "בחר טבלה"}
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
                        setShowActionsModal(false);
                      }}
                    >
                      {englishMode ? table.titleEnglish : table.title}
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
              {englishMode
                ? "Press on Row for actions"
                : "הקש על רשומה כדי לבצע פעולות:"}
            </h4>
            <button
              className="admin-control-center__action-button"
              onClick={() => onActionRowButtonClicked("add")}
            >
              <span className="admin-control-center__action-button__extra-text">
                {englishMode ? "Add row" : "הוסף רשומה"}
              </span>
              <IoMdAdd />
            </button>

            {chosenTableId && (
              <TableComponent
                table={chosenTable}
                onRowClicked={handleRowClick}
                rowActionsModalVisible={showActionsModal}
              />
            )}
          </>
        )}
      </>

      {showActionsModal && (
        <div className="row-actions-container">
          <div className="row-actions-modal">
            <button
              className="row-actions-modal__close-btn"
              onClick={() => {
                setShowActionsModal(false);
                setChosenRowId(null);
              }}
            >
              <MdClose />
            </button>
            <div className="bold">
              {englishMode ? "Choose Action" : "בחר פעולה"}
            </div>
            <div className="row-actions-modal__buttons">
              <button onClick={() => onActionRowButtonClicked("edit")}>
                {englishMode ? "Edit row" : "ערוך רשומה"}
              </button>
              <button onClick={onDeleteRowButtonClicked}>
                {englishMode ? "Delete row" : "מחק רשומה"}
              </button>
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
          setRowActionForm={setRowActionForm}
          showApplyRowActionModal={showApplyRowActionModal}
        />
      )}

      {rowActionStatus.success && (
        <div className="row-action-modal successful-action">
          <span className="bold">
            {englishMode ? "Row" : "רשומה"}
            {!rowAction
              ? englishMode
                ? " deleted "
                : " נמחקה "
              : rowAction === "add"
              ? englishMode
                ? " added "
                : " נוספה "
              : englishMode
              ? " edited "
              : " נערכה "}
            {englishMode ? "successfully" : "בהצלחה"}
          </span>
        </div>
      )}

      {rowActionStatus.error && (
        <div className="row-action-modal bad-action">
          <span className="bold">
            {!rowAction
              ? englishMode
                ? " deleting "
                : " מחיקת "
              : rowAction === "add"
              ? englishMode
                ? " adding "
                : " הוספת "
              : englishMode
              ? " editing "
              : " עריכת "}
            {englishMode ? "row failed" : "רשומה נכשלה"}
          </span>
        </div>
      )}
    </div>
  );
};
export default AdminControlCenter;
