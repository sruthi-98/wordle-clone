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

const GridRow = React.memo(({ guess, status }) => (
  <div className="grid-row">
    {guess.split("").map((guessChar, index) => (
      <div
        className="grid-cell"
        data-status={status[index]}
        key={index}
        style={{
          "--cell-index": index,
        }}
      >
        <span className="grid-cell__front">{guessChar}</span>
        <span className="grid-cell__back">{guessChar}</span>
      </div>
    ))}
  </div>
));
