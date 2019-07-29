import React from 'react';
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
  return (
    <main>
      <section className="btns">
        <button onClick={() => playWord(wordsWithLevels['level1'][1])}>Play</button>
        <button>Reset</button>
      </section>
    </main>
  );
}

export default App;
