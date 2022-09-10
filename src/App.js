import { useEffect, useState } from "react";

import Grid from "components/Grid/Grid";
import Header from "components/Header/Header";
import Keyboard from "components/Keyboard/Keyboard";
import Toast from "components/Toast/Toast";
import useStateRef from "hooks/useStateRef";
import getRandomWord from "utils/getRandomWord";
import {
  GAME_STATUS,
  GUESS_LENGTH,
  GUESS_STATUS,
  KEYS,
  NUMBER_OF_GUESSES,
} from "data/constants";
import { WORDS } from "data/words";
import "./App.css";

let guessCount = 0;

const flipTransitionDuration =
  getComputedStyle(document.documentElement, null).getPropertyValue(
    "--flip-transition-duration"
  ) * GUESS_LENGTH;
const shakeTransitionDuration = getComputedStyle(
  document.documentElement,
  null
).getPropertyValue("--shake-transition-duration");

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
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");

  const setToast = (text) => {
    setShowToast(true);
    setToastText(text);
  };

  const addRowShakeAnimation = () => {
    const gridRow = document.querySelectorAll(".grid-row")?.[guessCount];
    if (!gridRow) return;

    gridRow.setAttribute("data-animation", "shake");

    setTimeout(() => {
      gridRow.removeAttribute("data-animation");
    }, shakeTransitionDuration);
  };

  const addFlipAnimation = () => {
    const gridRow = document.querySelectorAll(".grid-row")?.[guessCount];
    if (!gridRow) return;

    gridRow.setAttribute("data-animation", "flip");

    setTimeout(() => {
      gridRow.setAttribute("data-animation", "idle");
    }, flipTransitionDuration);
  };

  const waitTillFlipAnimationIsCompleted = (callback) => {
    setTimeout(callback, flipTransitionDuration);
  };

  const addKeyboardStatus = (key, status) => {
    const keyboardKey = document.querySelector(
      `.keyboard-key[data-key=${key.toUpperCase()}]`
    );
    if (keyboardKey && keyboardKey.dataset?.status !== GUESS_STATUS.CORRECT)
      keyboardKey.dataset.status = status;
  };

  const checkIfCurrentGuessIsCorrect = () => {
    let currentGuess = currentGuessRef.current.toLowerCase(),
      correctGuess = randomWordRef.current.toLowerCase();

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

    for (let index = 0; index < GUESS_LENGTH; index++) {
      addKeyboardStatus(currentGuess[index], currentGuessStatus[index]);
    }

    setGuessStatus((prevGuessStatus) => {
      prevGuessStatus[guessCount - 1] = currentGuessStatus;
      return prevGuessStatus;
    });

    addFlipAnimation();

    if (currentGuess === correctGuess) {
      waitTillFlipAnimationIsCompleted(() => {
        setToast("You Won!");
        setGameStatus(GAME_STATUS.WON);
      });
    }
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
      if (currentGuessRef.current.length !== GUESS_LENGTH) {
        addRowShakeAnimation();
        setToast("Not enough letters");
        return;
      }

      if (!WORDS.includes(currentGuessRef.current.toLowerCase())) {
        addRowShakeAnimation();
        setToast("Not in word list");
        return;
      }

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
    if (
      guessCount === NUMBER_OF_GUESSES &&
      gameStatusRef.current !== GAME_STATUS.WON
    ) {
      waitTillFlipAnimationIsCompleted(() => {
        setGameStatus(GAME_STATUS.LOSE);
        setToast(randomWordRef.current.toUpperCase());
      });
    }
  }, [guessCount]);

  return (
    <div className="app">
      <Header />
      <Grid guesses={guesses} guessStatus={guessStatus} />
      <Keyboard keyDownHandler={keyDownHandler} />
      {showToast && (
        <Toast
          setShowToast={setShowToast}
          showToast={showToast}
          toastText={toastText}
        />
      )}
    </div>
  );
}

export default App;
