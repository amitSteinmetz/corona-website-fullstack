import { useCallback, useContext, useState, useEffect } from "react";
import { RowItem, TableColumn } from "../../models/table.model";
import { DataContext } from "../../contexts/DataContext";
import { addRowAction, editRowAction } from "../../actions/AdminActions";
import { MdClose } from "react-icons/md";
import { languageContext } from "../../contexts/LanguageContext";

const AdminRowActionsForm = ({
  currentRow,
  action,
  rowType,
  columns,
  sectionId,
  tableId,
  setRowActionForm,
  showApplyRowActionModal,
}: {
  currentRow: RowItem;
  action: string;
  rowType: string;
  columns: TableColumn[];
  sectionId: number;
  tableId: number;
  setRowActionForm: (value: boolean) => void;
  showApplyRowActionModal: (actionStatus: string) => void;
}) => {
  const { language } = useContext(languageContext);
  const englishMode = language === "english";
  const { sectionsDispatch } = useContext(DataContext);
  const getFormData = useCallback(() => {
    if (action === "edit" && currentRow) {
      const initialData = {};
      columns.forEach((column) => {
        const columnKey =
          englishMode && column.keyEnglish !== ""
            ? column.keyEnglish
            : column.key;
        initialData[columnKey] = currentRow[columnKey];
      });
      console.log("formData", initialData);
      return initialData;
    } else return {};
  }, [action, currentRow, columns, englishMode]);

  const [formData, setFormData] = useState<{ [columnName: string]: any }>(
    getFormData()
  );

  useEffect(() => {
    setFormData(getFormData());
  }, [getFormData, language]);

  // function getFormData() {
  //   if (action === "edit" && currentRow) {
  //     const initialData = {};
  //     columns.forEach((column) => {
  //       initialData[column.key] = currentRow[column.key];
  //     });
  //     return initialData;
  //   } else return {};
  // }

  function onChangeInput(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmitForm(event) {
    event.preventDefault();

    const updatedFormData = currentRow
      ? { ...formData, id: currentRow.id }
      : { ...formData };

    if (action === "edit") {
      try {
        await editRowAction(
          sectionsDispatch,
          sectionId,
          tableId,
          currentRow.id,
          rowType,
          updatedFormData
        );
        showApplyRowActionModal("success");
      } catch (err) {
        showApplyRowActionModal("error");
      }
    } else if (action === "add") {
      try {
        await addRowAction(
          sectionsDispatch,
          sectionId,
          tableId,
          updatedFormData,
          rowType
        );
        showApplyRowActionModal("success");
      } catch (err) {
        showApplyRowActionModal("error");
      }
    }

    setFormData({});
    setRowActionForm(false);
  }

  return (
    <div className="admin-actions-form__container">
      <form onSubmit={onSubmitForm}>
        <button
          className="admin-actions-form__close-btn"
          onClick={() => setRowActionForm(false)}
        >
          <MdClose />
        </button>
        {columns.map((column) => {
          return (
            <div>
              <label className="semibold">
                {englishMode ? column?.valueEnglish : column?.value}
              </label>
              <input
                type="text"
                name={
                  englishMode && column?.keyEnglish !== ""
                    ? column?.keyEnglish
                    : column?.key
                }
                value={
                  (englishMode && column?.keyEnglish !== ""
                    ? formData[column?.keyEnglish]
                    : formData[column?.key]) || ""
                }
                onChange={onChangeInput}
              />
            </div>
          );
        })}
        <button
          type="submit"
          className="admin-actions-form__submit-btn semibold"
        >
          {action === "edit"
            ? englishMode
              ? "Update row"
              : "עדכן רשומה"
            : englishMode
            ? "Add row"
            : "הוסף רשומה"}
        </button>
      </form>
    </div>
  );
};

export default AdminRowActionsForm;
