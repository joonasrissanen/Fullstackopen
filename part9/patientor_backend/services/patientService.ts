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

export default {
  getEntries,
  addEntry
};
