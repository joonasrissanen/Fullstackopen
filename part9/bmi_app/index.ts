import express from 'express';
import type { Request } from 'express';
import bodyParser from 'body-parser';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, resultType as ExerciseResult } from './exerciseCalculator';

const app: express.Express = express();

const PORT = 3002;

app.use(bodyParser());

app.get('/hello', (_, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request, res) => {
  const { height, weight } = req.query;
  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.json({ error: 'malformatted parameters' });
  }
  const bmi: string = calculateBmi(Number(height), Number(weight));
  const json = {
    weight: Number(weight),
    height: Number(height),
    bmi: bmi,
  };
  return res.json(json);
});

app.post('/exercises', (req: Request, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;
  if (!daily_exercises || !target) {
    return res.json({ error: 'parameters missing' });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  if (isNaN(Number(target))) {
    return res.json({ error: 'malformatted parameters'});
  }
  const result: ExerciseResult = calculateExercises(daily_exercises, target);
  return res.json(result);
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));