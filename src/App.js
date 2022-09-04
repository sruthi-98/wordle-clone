import { useEffect, useState } from "react";

import Grid from "components/Grid/Grid";
import Header from "components/Header/Header";
import Keyboard from "components/Keyboard/Keyboard";
import useStateRef from "hooks/useStateRef";
import "./App.css";

const NUMBER_OF_GUESSES = 6;
const GUESS_LENGTH = 5;
const KEYS = {
  BACKSPACE: "Backspace",
  ENTER: "Enter",
};
const GAME_STATUS = {
  PLAYING: "playing",
  WON: "won",
  LOSE: "lose",
};
const GUESS_STATUS = {
  EMPTY: "empty",
  NOT_PRESENT: "not-present",
  CORRECT: "correct",
  WRONG_POSITION: "wrong-position",
};

let guessCount = 0;
const correctWord = "hello";

function App() {
  const [, setCurrentGuess, currentGuessRef] = useStateRef("");
  const [, setGameStatus, gameStatusRef] = useStateRef(GAME_STATUS.PLAYING);
  const [guessStatus, setGuessStatus] = useState(
    Array.from(new Array(NUMBER_OF_GUESSES), () =>
      new Array(GUESS_LENGTH).fill(GUESS_STATUS.EMPTY)
    )
  );
  const [guesses, setGuesses] = useState(
    Array(NUMBER_OF_GUESSES).fill(" ".repeat(GUESS_LENGTH))
  );

  const checkIfCurrentGuessIsCorrect = () => {
    let currentGuess = currentGuessRef.current.toLowerCase(),
      correctGuess = correctWord.toLowerCase();

    if (currentGuessRef === correctGuess) {
      setGameStatus(GAME_STATUS.WON);
      alert("You Won!");
    }

    const currentGuessStatus = Array(GUESS_LENGTH).fill(
      GUESS_STATUS.NOT_PRESENT
    );

    for (let index = 0; index < GUESS_LENGTH; index++) {
      if (currentGuess[index] !== correctGuess[index]) continue;

      currentGuessStatus[index] = GUESS_STATUS.CORRECT;
    }

    for (let index = 0; index < GUESS_LENGTH; index++) {
      if (currentGuessStatus[index] === GUESS_STATUS.CORRECT) continue;

      const charIndex = currentGuess.indexOf(correctGuess[index]);
      if (
        charIndex > -1 &&
        currentGuessStatus[charIndex] !== GUESS_STATUS.CORRECT
      )
        currentGuessStatus[charIndex] = GUESS_STATUS.WRONG_POSITION;
    }

    setGuessStatus((prevGuessStatus) => {
      prevGuessStatus[guessCount - 1] = currentGuessStatus;
      return prevGuessStatus;
    });
  };

  const updateCurrentGuess = (newCurrentGuess) => {
    setCurrentGuess(newCurrentGuess);

    setGuesses((prevGuesses) => {
      prevGuesses[guessCount] = newCurrentGuess.padEnd(GUESS_LENGTH, " ");
      return prevGuesses;
    });
  };

  const keyDownHandler = (event) => {
    if (
      gameStatusRef.current === GAME_STATUS.WON ||
      gameStatusRef.current === GAME_STATUS.LOSE
    )
      return;

    if (event.key === KEYS.BACKSPACE)
      updateCurrentGuess(
        currentGuessRef.current.slice(0, currentGuessRef.current.length - 1)
      );

    if (event.key === KEYS.ENTER) {
      if (currentGuessRef.current.length !== GUESS_LENGTH) return;

      checkIfCurrentGuessIsCorrect();
      setCurrentGuess("");
      guessCount++;
    }

    if (event.key.match(/^[a-zA-Z]{1}$/)) {
      if (guessCount === NUMBER_OF_GUESSES) return;

      if (currentGuessRef.current.length === GUESS_LENGTH) return;

      updateCurrentGuess(
        `${currentGuessRef.current}${event.key.toUpperCase()}`
      );
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return (
    <div className="app">
      <Header />
      <Grid guesses={guesses} guessStatus={guessStatus} />
      <Keyboard keyDownHandler={keyDownHandler} />
    </div>
  );
}

export default App;
