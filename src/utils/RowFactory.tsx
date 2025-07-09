import { RowItem, RowType } from "../models/table.model";

export const rowFactory: Record<RowType, () => RowItem> = {
  hospitalBedOccupancy: () => ({
    id: 0,
    hospitalName: "",
    generalBedOccupancy: 0,
    internalDepartmentBedOccupancy: 0,
  }),

  incomingPersons: () => ({
    id: 0,
    srcCountry: "",
    riskLevel: "",
    TotalAmount: 0,
    VerifiedCitizensAmount: 0,
    VerifiedStrangersAmount: 0,
    TotalVerifiedPercentage: 0,
  }),

  trafficLightProgram: () => ({
    id: 0,
    city: "",
    dailyScore: 0,
    newPatientsPer10000People: 0,
    positiveTestsPercentage: 0,
    vrifiedChangeRate: 0,
    activePatients: 0,
  }),
};
