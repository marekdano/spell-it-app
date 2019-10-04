import { wordsWithLevels } from './source';

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
  const msg = new SpeechSynthesisUtterance(word);
  window.speechSynthesis.speak(msg);
}

const areStringsTheSame = (enteredString, currentString) => {
  return enteredString === currentString;
}

export { generateListOfWords, playWord, areStringsTheSame };
 