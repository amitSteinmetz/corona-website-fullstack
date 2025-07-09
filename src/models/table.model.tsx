export interface TableModel {
  id: number;
  title: string;
  type: string; // this will act as the "discriminator"
  description: string;
  columns: TableColumn[];
}

export interface TableColumn {
  id: number;
  key: string;
  value: string;
  inPercentages: boolean;
}

export interface HospitalBedOccupancyTable extends TableModel {
  rows: HospitalBedOccupancyItem[];
}

export interface IncomingPersonsTable extends TableModel {
  rows: IncomingPersonsItem[];
}

export interface TrafficLightProgramTable extends TableModel {
  rows: TrafficLightProgramItem[];
}

export interface HospitalBedOccupancyItem {
  id: number;
  hospitalName: string;
  generalBedOccupancy: number;
  internalDepartmentBedOccupancy: number;
}

export interface IncomingPersonsItem {
  id: number;
  srcCountry: string;
  riskLevel: string;
  TotalAmount: number;
  VerifiedCitizensAmount: number;
  VerifiedStrangersAmount: number;
  TotalVerifiedPercentage: number;
}

export interface TrafficLightProgramItem {
  id: number;
  city: string;
  dailyScore: number;
  newPatientsPer10000People: number;
  positiveTestsPercentage: number;
  vrifiedChangeRate: number;
  activePatients: number;
}

export type RowType =
  | "hospitalBedOccupancy"
  | "incomingPersons"
  | "trafficLightProgram";

export type RowItem =
  | HospitalBedOccupancyItem
  | IncomingPersonsItem
  | TrafficLightProgramItem;

export type Table =
  | HospitalBedOccupancyTable
  | IncomingPersonsTable
  | TrafficLightProgramTable;
