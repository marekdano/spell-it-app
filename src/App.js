import React, { useState, useRef } from 'react';
import { generateListOfWords, playWord, areStringsTheSame } from './utils.js';
import './App.css';

const level = {
  Level1: 'level1',
  Level2: 'level2',
  Level3: 'level3'
}

function App() {
  const [words, setWords] = useState([]);
  const [indexOfCurrentWord, setIndexOfCurrentWord] = useState(null);
  const [word, setWord] = useState('');
  const [levelName, setLevelName] = useState(null);
  const inputEl = useRef(null);

  const startGame = (level) => {
    const generatedWords = generateListOfWords(level, 10);
    setWords(generatedWords);
    setIndexOfCurrentWord(0);
    setLevelName(level);
  }

  const playCurrentWord = () => {
    playWord(words[indexOfCurrentWord]);
    inputEl.current.focus();
  }

  const validateEnteredWord = (enteredWord) => {
    areStringsTheSame(enteredWord.trim(), words[indexOfCurrentWord]) 
      ? alert('Correct spelling!')
      : alert('Wrong spelling');

    (indexOfCurrentWord + 1 < words.length) && setIndexOfCurrentWord(indexOfCurrentWord + 1)
  }

  return (
    <main>
      <section className="levels">
        <ul>
          <li className={levelName === level.Level1 && 'active'} onClick={() => startGame(level.Level1)}>Level 1</li>
          <li className={levelName === level.Level2 && 'active'} onClick={() => startGame(level.Level2)}>Level 2</li>
          <li className={levelName === level.Level3 && 'active'} onClick={() => startGame(level.Level3)}>Level 3</li>
        </ul>
      </section>
      <section className="btns">
        <button 
          disabled={!levelName}
          onClick={playCurrentWord}
        >
          Play
        </button>
      </section>
      {/* {words.toString()} */}
      <form
        onSubmit={event => {
          event.preventDefault();
          validateEnteredWord(word)
          setWord('')
        }}
      > 
        <input 
          data-testid="word-input"
          type="text"
          value={word}
          ref={inputEl}
          onChange={event => setWord(event.target.value)}
        />
      </form>
    </main>
  );
}

export default App;
