import React from "react";
import "./Grid.css";

const Grid = ({ guesses }) => (
  <div className="grid">
    {guesses.map((guess, index) => (
      <GridRow key={index} guess={guess} />
    ))}
  </div>
);

export default Grid;

const GridRow = ({ guess }) => (
  <div className="grid-row">
    {guess.split("").map((guessChar, index) => (
      <div className="grid-cell" key={index}>
        {guessChar}
      </div>
    ))}
  </div>
);
