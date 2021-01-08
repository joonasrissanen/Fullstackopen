// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export enum Gender {
  Male = 'male',
  Female = 'female'
}

export interface DiagnosEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type NewPatientEntry = Omit<PatientEntry, 'id'>;