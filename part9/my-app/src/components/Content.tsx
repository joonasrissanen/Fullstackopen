import React from 'react';
import Part from './Part';
import { CoursePart } from '../type';

interface ContentProps {
  courseParts: Array<CoursePart>
}

const Content: React.FC<ContentProps> = ({ courseParts }: ContentProps) => {
  if (!courseParts || courseParts.length === 0) {
    return null
  }
  return (
    <>
      {courseParts.map(coursePart => <Part key={`coursepart-${coursePart.name}`} part={coursePart} />)}
    </>
  );
};

export default Content;
