import React from 'react';
import { CoursePart } from '../type';

interface TotalProps {
  courseParts: Array<CoursePart>
}

const Total: React.FC<TotalProps> = ({ courseParts }: TotalProps) => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
};

export default Total;
