import { uuid } from 'uuidv4';
import patientData from '../data/patients.json';
import { NewPatientEntry, PatientEntry } from '../types';

const patients: Array<PatientEntry> = patientData as Array<PatientEntry>;

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const addEntry = (newEntry: NewPatientEntry): PatientEntry => {
  const patient = { id: uuid(), ...newEntry };
  patients.push(patient);
  return patient;
};

const findById = (id: string): PatientEntry | undefined => {
  const entry = patients.find(p => p.id === id);
  return entry;
};

export default {
  getEntries,
  addEntry,
  findById
};
