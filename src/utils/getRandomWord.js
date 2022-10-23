import { WORDS } from "data/words";

function getRandomWord() {
  const now = new Date();
  const todayDate = now.getDate();
  const todayMonth = now.getMonth() + 1;
  const todayYear= now.getFullYear();
  const today = new Date(`${todayMonth}/${todayDate}/${todayYear}`)

  const randomIndex = today.getTime() % WORDS.length;
  const randomWord = WORDS[randomIndex];
  return randomWord;
}

export default getRandomWord;