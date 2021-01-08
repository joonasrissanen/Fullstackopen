import express from 'express';
import cors = require('cors');

// Routers
import diagnosRouter from './routes/diagnose';
import patientRouter from './routes/patient';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/ping', (_, res) => {
  res.send('pong');
});

app.use('/api/diagnoses', diagnosRouter);
app.use('/api/patients',patientRouter);

export default app;
