import { useContext, useState } from "react";
import { RowItem, TableColumn } from "../../models/table.model";
import { DataContext } from "../../contexts/DataContext";
import { addRowAction, editRowAction } from "../../actions/AdminActions";
import { MdClose } from "react-icons/md";

const AdminRowActionsForm = ({
  currentRow,
  action,
  rowType,
  columns,
  sectionId,
  tableId,
  setRowActionForm,
}: {
  currentRow: RowItem;
  action: string;
  rowType: string;
  columns: TableColumn[];
  sectionId: number;
  tableId: number;
  setRowActionForm: (value: boolean) => void;
}) => {
  const { sectionsDispatch } = useContext(DataContext);
  const [formData, setFormData] = useState<{ [columnName: string]: any }>(
    initFormData()
  );
  
  function initFormData() {
    if (action === "edit" && currentRow) {
      const initialData = {};
      columns.forEach((column) => {
        initialData[column.key] = currentRow[column.key];
      });
      return initialData;
    } else return {};
  }

  function initAllowEditField() {
    if (action === "edit" && currentRow) {
      const initialData = {};
      columns.forEach((column) => {
        initialData[column.key] = false;
      });
      return initialData;
    }
  }

  function onChangeInput(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function onSubmitForm(event) {
    event.preventDefault();

    const updatedFormData = currentRow
      ? { ...formData, id: currentRow.id }
      : { ...formData };

    if (action === "edit") {
      editRowAction(
        sectionsDispatch,
        sectionId,
        tableId,
        currentRow.id,
        rowType,
        updatedFormData
      );

    } else if (action === "add") {
      addRowAction(
        sectionsDispatch,
        sectionId,
        tableId,
        updatedFormData,
        rowType
      );
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
              <label className="semibold">{column?.value}</label>
              <input
                type="text"
                name={column?.key}
                value={formData[column?.key] || ""}
                onChange={onChangeInput}
              />
            </div>
          );
        })}
        <button
          type="submit"
          className="admin-actions-form__submit-btn semibold"
        >
          {action === "edit" ? "עדכן רשומה" : "הוסף רשומה"}
        </button>
      </form>
    </div>
  );
};

export default AdminRowActionsForm;
