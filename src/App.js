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

let guessCount = 0;

function App() {
  const [currentGuess, setCurrentGuess, currentGuessRef] = useStateRef("");
  const [guesses, setGuesses] = useState(
    Array(NUMBER_OF_GUESSES).fill(" ".repeat(GUESS_LENGTH))
  );

  const checkIfCurrentGuessIsCorrect = () => {};

  const updateCurrentGuess = (newCurrentGuess) => {
    setCurrentGuess(newCurrentGuess);

    setGuesses((prevGuesses) => {
      prevGuesses[guessCount] = newCurrentGuess.padEnd(GUESS_LENGTH, " ");
      return prevGuesses;
    });
  };

  const keyDownHandler = (event) => {
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
      <Grid guesses={guesses} />
      <Keyboard keyDownHandler={keyDownHandler} />
    </div>
  );
}

export default App;
