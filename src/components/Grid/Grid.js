import React from "react";
import "./Grid.css";

const Grid = ({ guesses, guessStatus }) => (
  <div className="grid">
    {guesses.map((guess, index) => (
      <GridRow key={index} guess={guess} status={guessStatus[index]} />
    ))}
  </div>
);

export default Grid;

const GridRow = ({ guess, status }) => (
  <div className="grid-row">
    {guess.split("").map((guessChar, index) => (
      <div className="grid-cell" data-status={status[index]} key={index}>
        {guessChar}
      </div>
    ))}
  </div>
);
