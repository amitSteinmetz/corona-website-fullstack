import { useCallback, useContext, useState, useEffect } from "react";
import {
  RowItem,
  TableColumn,
} from "../../models/table.model";
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
    const initialData = {};
    columns.forEach((column) => {
      const columnKey =
        englishMode && column.keyEnglish !== ""
          ? column.keyEnglish
          : column.key;

      initialData[columnKey] =
        currentRow && currentRow[columnKey] != null
          ? currentRow[columnKey]
          : "";
    });
    return initialData;
  }, [currentRow, columns, englishMode]);
  const [formData, setFormData] = useState<{ [columnName: string]: any }>(
    getFormData()
  );
  const [isFormInputValid, setIsFormInputValid] = useState<{
    [inputName: string]: boolean;
  }>(
    columns.reduce((acc, column) => {
      const key =
        englishMode && column.keyEnglish !== ""
          ? column.keyEnglish
          : column.key;
      acc[key] = true;
      return acc;
    }, {} as { [inputName: string]: boolean })
  );
  const [isValidForm, setIsValidForm] = useState(false);

  useEffect(() => {
    setFormData(getFormData());
  }, [getFormData, language]);
  function onChangeInput(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setInputValidity(name, value);
  }
  useEffect(() => {
    let isValidForm = true;

    for (const [, isValid] of Object.entries(isFormInputValid)) {
      if (!isValid) isValidForm = false;
    }

    // Check that all the fields in formData are not empty
    for (const [, value] of Object.entries(formData)) {
      if (value === "") isValidForm = false;
    }

    setIsValidForm(isValidForm);
  }, [formData, isFormInputValid]);

  function setInputValidity(name, value) {
    let isValid = true;

    const column = columns.find(
      (col) => col.key === name || col.keyEnglish === name
    );
    if (!column || value === "" || value.trim() === "") isValid = false;

    if (column.valueType === "number") {
      if (isNaN(Number(value))) {
        console.log("entered string instead a number!!!!!");
        isValid = false;
      }
    } else if (column.valueType === "string") {
      if (!isNaN(Number(value)) || value.trim() === "") {
        console.log("entered number unstead string");
        isValid = false;
      }
    }

    setIsFormInputValid((prev) => ({ ...prev, [name]: isValid }));
  }
  function getInputErrorMessage(columnType) {
    let errorMessage = "";
    if (columnType === "number") {
      errorMessage = englishMode
        ? "* Only digits allowed"
        : "* יש להזין מספרים בלבד";
    } else if (columnType === "string") {
      errorMessage = englishMode
        ? "* Input must contain also text"
        : "* השדה חייב להכיל גם אותיות";
    }
    return errorMessage;
  }

  async function onSubmitForm(event) {
    event.preventDefault();

    const updatedFormData =
      currentRow && action === "edit"
        ? { ...formData, id: currentRow.id }
        : { ...formData };

    console.log("Updated Form Data:", updatedFormData);

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
              {!isFormInputValid[
                englishMode && column?.keyEnglish !== ""
                  ? column?.keyEnglish
                  : column?.key
              ] && (
                <div className="admin-actions-form__input-error-message">
                  {getInputErrorMessage(column.valueType)}
                </div>
              )}
            </div>
          );
        })}

        <button
          type="submit"
          className="admin-actions-form__submit-btn semibold"
          disabled={!isValidForm}
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
