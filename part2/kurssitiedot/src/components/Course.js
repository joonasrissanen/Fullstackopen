import React from 'react';

const Header = ({ title }) => {
  return <h2>{title}</h2>;
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => {
        return <Part part={part} />;
      })}
    </div>
  );
};

const Total = ({ parts }) => {
  const total = parts
    .map((part) => part.exercises)
    .reduce((a, b) => {
      return a + b;
    }, 0);
  return <strong>Number of exercises {total}</strong>;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;