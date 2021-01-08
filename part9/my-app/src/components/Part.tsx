import React from 'react';
import { CoursePart } from '../type';

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface PartProps {
  part: CoursePart;
}

const Part: React.FC<PartProps> = ({ part }: PartProps) => {
  switch (part.name) {
    case 'Fundamentals':
      return <p>{part.name} {part.description} ExerciseCount: {part.exerciseCount}</p>;
    case 'Using props to pass data':
      return (
        <p>{part.name} Group project: {part.groupProjectCount} ExerciseCount: {part.exerciseCount}</p>
      );
    case 'Deeper type usage':
      return (
        <p>{part.name} {part.description} Submission link: {part.exerciseSubmissionLink} ExerciseCount: {part.exerciseCount}</p>
      );
    case 'CourseFour':
      return (
        <p>{part.name} {part.description} Optional exercise count: {part.optionalExerciseCount} ExerciseCount: {part.exerciseCount}</p>
      );
    default:
      return assertNever(part);
  }
};

export default Part;