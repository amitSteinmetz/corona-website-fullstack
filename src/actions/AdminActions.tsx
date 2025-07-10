import { RowItem } from "../models/table.model";

export function setSectionsAction(dispatch, sections) {
  dispatch({ type: "SET_SECTIONS", payload: sections });
}

export async function editRowAction(
  dispatch,
  sectionId,
  tableId,
  rowId,
  rowType: string,
  updatedRow
) {
  try {
    const res = await fetch(
      `https://localhost:7287/api/Tables/update-row/${getRowTypeForUrl(
        rowType
      )}/${sectionId}/${tableId}/${rowId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRow),
      }
    );
    const response = await res.json();
    console.log("Response from editRowAction:", response);
    dispatch({ type: "EDIT_ROW", payload: response });
  } catch (err) {
    console.error("Failed to edit row", err);
  }
}

export async function deleteRowAction(dispatch, sectionId, tableId, rowId) {
  try {
    const res = await fetch(
      `https://localhost:7287/api/Tables/delete-row/${sectionId}/${tableId}/${rowId}`,
      {
        method: "DELETE",
      }
    );
    const response = await res.json();
    dispatch({ type: "DELETE_ROW", payload: response });
  } catch (err) {
    console.error("Failed to delete row", err);
  }
}

export async function addRowAction(
  dispatch,
  sectionId,
  tableId,
  newRow,
  rowType
) {
  try {
    const res = await fetch(
      `https://localhost:7287/api/Tables/add-row/${getRowTypeForUrl(
        rowType
      )}/${sectionId}/${tableId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRow),
      }
    );
    const response = await res.json();
    dispatch({ type: "ADD_ROW", payload: response });
  } catch (err) {
    console.error("Failed to add row", err);
  }
}

function getRowTypeForUrl(rowType: string) {
  if (rowType === "hospitalBedOccupancy") {
    return "hospital-bed-occupancy";
  } else if (rowType === "incomingPersons") {
    return "incoming-persons";
  } else if (rowType === "trafficLightProgram") {
    return "traffic-light-program";
  } else throw new Error("Unknown row type: " + rowType);
}
