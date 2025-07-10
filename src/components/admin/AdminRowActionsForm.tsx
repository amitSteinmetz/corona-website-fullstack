import { useContext, useState } from "react";
import { RowItem, TableColumn } from "../../models/table.model";
import { DataContext } from "../../contexts/DataContext";
import { addRowAction, editRowAction } from "../../actions/AdminActions";

const AdminRowActionsForm = ({
  currentRow,
  action,
  rowType,
  columns,
  sectionId,
  tableId,
}: {
  currentRow: RowItem;
  action: string;
  rowType: string;
  columns: TableColumn[];
  sectionId: number;
  tableId: number;
}) => {
  const { sectionsDispatch } = useContext(DataContext);
  const [formData, setFormData] = useState<{ [columnName: string]: any }>(
    initFormData()
  );
  const [allowEditField, setAllowEditField] = useState<{
    [columnName: string]: Boolean;
  }>(initAllowEditField());

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
      setAllowEditField(initAllowEditField());
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
  }

  function enableEditRow(columnName: string) {
    setAllowEditField((prev) => ({
      ...prev,
      [columnName]: !prev[columnName],
    }));
  }

  return (
    <form onSubmit={onSubmitForm}>
      {columns.map((column) => {
        return (
          <div>
            <label>{column?.value}</label>
            {(action === "add" || allowEditField[column?.key]) && (
              <input
                type="text"
                name={column?.key}
                value={formData[column?.key] || ""}
                onChange={onChangeInput}
              />
            )}
            {action === "edit" && (
              <div
                className="row-actions-form__field"
                onClick={() => enableEditRow(column?.key)}
              >
                {currentRow[column?.key]}
              </div>
            )}
          </div>
        );
      })}
      <button type="submit">הוסף רשומה</button>
    </form>
  );
};

export default AdminRowActionsForm;
