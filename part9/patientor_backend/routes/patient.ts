import express from 'express';
import patients from '../services/patientService';
import { NewPatientEntry } from '../types';
import { toNewPatientEntry } from '../utils';
const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  const data = patients.getEntries();
  res.json(data);
});

patientRouter.post('/', (req, res) => {
  const newPatientEntry: NewPatientEntry = toNewPatientEntry(req.body);
  patients.addEntry(newPatientEntry);
  res.json(newPatientEntry);
});

export default patientRouter;