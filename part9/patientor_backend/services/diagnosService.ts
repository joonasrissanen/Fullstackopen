import diagnosData from '../data/diagnoses.json';
import { DiagnosEntry } from '../types';

const diagnoses: Array<DiagnosEntry> = diagnosData;

const getEntries = (): Array<DiagnosEntry> => {
  return diagnoses;
}

export default {
  getEntries
}