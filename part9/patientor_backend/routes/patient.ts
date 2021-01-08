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

patientRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  const patient = patients.findById(id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

export default patientRouter;