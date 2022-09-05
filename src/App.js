import { useEffect, useState } from "react";

import Grid from "components/Grid/Grid";
import Header from "components/Header/Header";
import Keyboard from "components/Keyboard/Keyboard";
import useStateRef from "hooks/useStateRef";
import getRandomWord from "utils/getRandomWord";
import {
  GAME_STATUS,
  GUESS_LENGTH,
  GUESS_STATUS,
  KEYS,
  NUMBER_OF_GUESSES,
} from "data/constants";
import "./App.css";

let guessCount = 0;

function App() {
  const [, setCurrentGuess, currentGuessRef] = useStateRef("");
  const [, setGameStatus, gameStatusRef] = useStateRef(GAME_STATUS.PLAYING);
  const [, setRandomWord, randomWordRef] = useStateRef("");

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
      correctGuess = randomWordRef.current.toLowerCase();

    if (currentGuess === correctGuess) setGameStatus(GAME_STATUS.WON);

    const currentGuessStatus = Array(GUESS_LENGTH).fill(
      GUESS_STATUS.NOT_PRESENT
    );

    // Check for correct letters
    for (let index = 0; index < GUESS_LENGTH; index++) {
      if (currentGuess[index] !== correctGuess[index]) continue;

      currentGuessStatus[index] = GUESS_STATUS.CORRECT;
    }

    // Check for wrongly positioned letters
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
    setRandomWord(getRandomWord());

    window.addEventListener("keydown", keyDownHandler);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  useEffect(() => {
    if (guessCount === NUMBER_OF_GUESSES) setGameStatus(GAME_STATUS.LOSE);
  }, [guessCount]);

  return (
    <div className="app">
      <Header />
      <Grid guesses={guesses} guessStatus={guessStatus} />
      <Keyboard keyDownHandler={keyDownHandler} />
    </div>
  );
}

export default App;
