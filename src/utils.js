import { wordsWithLevels } from './source';

/**
 * Get the list of all available speechSynthesis voices
 */
const getSpeechSynthesisVoices = () => {
  let voices = [];
  return new Promise(resolve => {
    window.speechSynthesis.addEventListener('voiceschanged', () => {
      voices = window.speechSynthesis.getVoices();
      resolve(voices)
    })
  })
}

const generateListOfWords = (level, quantity) => {
  const list = wordsWithLevels[level];
  const listLength = list.length;

  let generatedList = [];
  let uniqueNums = []; 
  
  while(generatedList.length < quantity) {
    const num = generateNumInRange(listLength);
    if (!uniqueNums.includes(num)) {
      uniqueNums = [...uniqueNums, num];
      generatedList = [...generatedList, list[num]];
    }
  }
  return generatedList;
}

const generateNumInRange = (length) => {
  return Math.floor(Math.random() * length);
}

const playWord = (word) => {
  if ('speechSynthesis' in window) {
    const speech = new SpeechSynthesisUtterance(word);
    speech.pitch = 1.5;
    speech.rate = 0.8;
    window.speechSynthesis.speak(speech);
  }
}

const areStringsTheSame = (enteredString, currentString) => {
  return enteredString === currentString;
}

export { generateListOfWords, playWord, areStringsTheSame };
 