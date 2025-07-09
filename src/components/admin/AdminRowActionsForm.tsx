import { useContext, useEffect, useState } from "react";
import { RowItem, RowType, TableColumn } from "../../models/table.model";
import { rowFactory } from "../../utils/RowFactory";
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

  useEffect(() => {
    console.log(formData)
  }, [formData])

  function initFormData() {
    if (action === "edit" && currentRow) {
      const initialData = {};
      columns.forEach((column) => {
        initialData[column.key] = currentRow[column.key];
      });
      return initialData;
    }
    else return {};
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

    const newRow = rowFactory[rowType as RowType]();
    columns.forEach((column) => {
      newRow[column.key] = formData[column.key] || null;
    });

    if (action === "edit") {
      console.log(newRow);
      editRowAction(
        sectionsDispatch,
        sectionId,
        tableId,
        currentRow.id,
        rowType,
        newRow
      );
      setAllowEditField(initAllowEditField());
    } else if (action === "add") {
      addRowAction(sectionsDispatch, sectionId, tableId, newRow, rowType);
    }

    setFormData({});
  }

  function enableEditRow(columnName: string) {
    console.log(columnName);

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
            <label>{column.value}</label>
            {(action === "add" || allowEditField[column.key]) && (
              <input
                type="text"
                name={column.key}
                value={formData[column.key] || ""}
                onChange={onChangeInput}
              />
            )}
            {action === "edit" && (
              <div
                className="row-actions-form__field"
                onClick={() => enableEditRow(column.key)}
              >
                {currentRow[column.key]}
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
