import { useCallback, useContext, useState, useEffect } from "react";
import {
  HospitalBedOccupancyItem,
  IncomingPersonsItem,
  RowItem,
  TableColumn,
  TrafficLightProgramItem,
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
    if (action === "edit" && currentRow) {
      const initialData = {};
      columns.forEach((column) => {
        const columnKey =
          englishMode && column.keyEnglish !== ""
            ? column.keyEnglish
            : column.key;
        initialData[columnKey] = currentRow[columnKey];
      });
      return initialData;
    } else return {};
  }, [action, currentRow, columns, englishMode]);
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
      acc[key] = false;
      return acc;
    }, {} as { [inputName: string]: boolean })
  );

  useEffect(() => {
    setFormData(getFormData());
  }, [getFormData, language]);

  function onChangeInput(event) {
    const { name, value } = event.target;
    setInputValidity(name, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

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

  function getInputErrorMessage(coumnType) {
    return (
      "" + (coumnType === "number" ? "Must be a number" : "Must be a string")
    );
  }

  function isFormValid() {
    for (const [key, isValid] of Object.entries(isFormInputValid)) {
      if (!isValid) {
        console.log(`Input ${key} is invalid`);
        return false;
      }
    }

    return true;

    // for (const column of columns) {
    //   const columnKey =
    //     englishMode && column.keyEnglish !== ""
    //       ? column.keyEnglish
    //       : column.key;
    //   const formValue = formData[columnKey];
    //   if (!formValue) continue;

    //   if (column.valueType === "number") {
    //     if (isNaN(Number(formValue))) {
    //       console.log("entered string instead a number!!!!!");
    //       return false;
    //     }
    //   } else if (column.valueType === "string") {
    //     if (!isNaN(Number(formValue)) || formValue.trim() === "") {
    //       console.log("entered number unstead string");
    //       return false;
    //     }
    //   }
    // }
    // return true;
  }

  async function onSubmitForm(event) {
    event.preventDefault();

    if (!isFormValid()) return;

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
          disabled={!isFormValid()}
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
