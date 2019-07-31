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

function App() {
  const [words, setWords] = useState([]);

  const startGame = (level) => {
    setWords(generateListOfWords(level, 10));
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
        <button onClick={() => playWord(wordsWithLevels['level1'][1])}>Play</button>
      </section>
      {words.toString()}
    </main>
  );
}

export default App;
