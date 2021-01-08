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
}

export type NewPatientEntry = Omit<PatientEntry, 'id'>;