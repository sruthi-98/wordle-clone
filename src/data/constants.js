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

export { GAME_STATUS, GUESS_LENGTH, GUESS_STATUS, KEYS, NUMBER_OF_GUESSES };
