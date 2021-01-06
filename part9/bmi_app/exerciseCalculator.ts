interface resultType {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface InputValues {
  value1: number;
  value2: Array<number>;
}

const parseExerArguments = (args: Array<string>): InputValues  => {
    if (args.length < 4) throw new Error('Not enough arguments');
    // if (args.length > 4) throw new Error('Too many arguments');
    const inputArgs = args.splice(2)
    inputArgs.forEach(arg => {
      if (isNaN(Number(arg))) {
        throw new Error('Provided values were not numbers!');
      }
    })
    const value1: number = Number(inputArgs[0])
    const value2: Array<number> = []
    inputArgs.splice(1).map(arg => value2.push(Number(arg)))
    return {
      value1,
      value2
    }
  }

const calculateExercises = (input: Array<number>, target: number): resultType => {
  const periodLength: number = input.length
  const trainingDays: number = input.filter(x => x > 0).length
  const average: number = input.reduce((a, b) => a + b, 0) / periodLength
  const success: boolean = average >= target
  let rating: number
  let ratingDescription: string
  if (target - average <= 0) {
    rating = 3
    ratingDescription = 'Well done!'
  } else if (target - average > 0 && target - average < 1.3){
    rating = 2
    ratingDescription = 'Not too bad but could be better'
  } else {
    rating = 1
    ratingDescription = 'Did you even try?'
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

try {
    const { value1, value2 } = parseExerArguments(process.argv);
    const result: resultType = calculateExercises(value2, value1);
    console.log(result)
  } catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
  }
