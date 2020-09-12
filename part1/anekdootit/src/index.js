import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Anecdote = ({ text, votes }) => {
  return (
    <div>
      <p>{text}</p>
      <p>has {votes} votes</p>
    </div>
  );
};

const App = (props) => {
  const { anecdotes } = props;
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

  const vote = () => {
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
  };

  return (
    <div>
      <Header title="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} votes={points[selected]} />
      <div>
        <Button text="Vote" onClick={vote} />
        <Button
          text="Next anecdote"
          onClick={() =>
            setSelected(Math.floor(Math.random() * anecdotes.length))
          }
        />
      </div>
      <Header title="Anecdote with most votes" />
      <Anecdote
        text={anecdotes[points.indexOf(Math.max(...points))]}
        votes={Math.max(...points)}
      />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
