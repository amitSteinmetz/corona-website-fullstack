import { SectionModel } from "../models/section.model";
import {
  HospitalBedOccupancyItem,
  IncomingPersonsItem,
  TrafficLightProgramItem,
} from "../models/table.model";

export const AdminReducer = (state: SectionModel[], action) => {
  switch (action.type) {
    case "SET_SECTIONS":
      return action.payload;
    case "DELETE_ROW":
      return state.map((section) => {
        if (section.id !== action.payload.sectionId) return section;

        return {
          ...section,
          tables: section.tables.map((table) => {
            if (table.id !== action.payload.tableId) return table;

            return {
              ...table,
              rows: (
                table.rows as (
                  | IncomingPersonsItem
                  | TrafficLightProgramItem
                  | HospitalBedOccupancyItem
                )[]
              ).filter((row) => row.id !== action.payload.rowId),
            };
          }),
        };
      });
    case "ADD_ROW":
      return state.map((section) => {
        if (section.id !== action.payload.sectionId) return section;

        return {
          ...section,
          tables: section.tables.map((table) => {
            if (table.id !== action.payload.tableId) return table;

            return {
              ...table,
              rows: (
                table.rows as (
                  | IncomingPersonsItem
                  | TrafficLightProgramItem
                  | HospitalBedOccupancyItem
                )[]
              ).concat(action.payload.row),
            };
          }),
        };
      });
    case "EDIT_ROW":
      return state.map((section) => {
        if (section.id !== action.payload.sectionId) return section;
        return {
          ...section,
          tables: section.tables.map((table) => {
            if (table.id !== action.payload.tableId) return table;
            return {
              ...table,
              rows: (
                table.rows as (
                  | IncomingPersonsItem
                  | TrafficLightProgramItem
                  | HospitalBedOccupancyItem
                )[]
              ).map((row) => {
                if (row.id !== action.payload.rowId) return row;
                return action.payload.updatedRow;
              }),
            };
          }),
        };
      });
    default:
      return state;
  }
};
