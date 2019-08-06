import React, {useState} from 'react';
import './App.css';
import {wordsWithLevels} from './source';

export const generateListOfWords = (level, quantity) => {
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

const areWordsTheSame = (enteredWord, currentWord) => {
  return enteredWord === currentWord;
}

function App() {
  const [words, setWords] = useState([]);
  const [indexOfCurrentWord, setIndexOfCurrentWord] = useState();

  const startGame = (level) => {
    const generatedWords = generateListOfWords(level, 10);
    setWords(generatedWords);
    setIndexOfCurrentWord(0);
  }

  const playCurrentWord = () => {
    playWord(words[indexOfCurrentWord]);
  }

  const validateEnteredWord = (enteredWord) => {
    areWordsTheSame(enteredWord.trim(), words[indexOfCurrentWord]) 
      ? alert('Correct spelling!')
      : alert('Wrong spelling');

    (indexOfCurrentWord + 1 < words.length) && setIndexOfCurrentWord(indexOfCurrentWord + 1)
  }

  return (
    <main>
      <section className="levels">
        <ul>
          <li onClick={() => startGame('level1')}>Level 1</li>
          <li onClick={() => startGame('level2')}>Level 2</li>
          <li onClick={() => startGame('level3')}>Level 3</li>
        </ul>
      </section>
      <section className="btns">
        <button onClick={playCurrentWord}>Play</button>
      </section>
      {words.toString()}
    </main>
  );
}

export default App;
