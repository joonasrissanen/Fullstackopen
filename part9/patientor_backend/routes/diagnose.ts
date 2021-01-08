import express from 'express';
import diagnoses from '../services/diagnosService';

const diagnosRouter = express.Router();

diagnosRouter.get('/', (_req, res) => {
  const data = diagnoses.getEntries();
  res.json(data);
});

export default diagnosRouter;