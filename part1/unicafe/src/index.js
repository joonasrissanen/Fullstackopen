import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Buttons = ({ buttons }) => {
  return (
    <div>
      {buttons.map((button) => {
        return (
          <Button
            key={`button-${button.text}`}
            onClick={button.onClick}
            text={button.text}
          />
        );
      })}
    </div>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <th>{text}</th>
      <th>{value}</th>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  if (all === 0) {
    return <p>No feedback given</p>;
  }
  const average = (good - bad) / all;
  const positive = (good / all) * 100;
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average.toFixed(1)} />
        <StatisticLine text="positive" value={`${positive.toFixed(1)}%`} />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const buttons = [
    {
      onClick: () => setGood(good + 1),
      text: "Good",
    },
    {
      onClick: () => setNeutral(neutral + 1),
      text: "Neutral",
    },
    {
      onClick: () => setBad(bad + 1),
      text: "Bad",
    },
  ];
  return (
    <div>
      <Header title="Give feedback" />
      <Buttons buttons={buttons} />
      <Header title="Statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
