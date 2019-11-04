import React, { useState, useRef } from 'react';
import { generateListOfWords, playWord, areStringsTheSame } from './utils.js';
import './App.css';

const level = {
  Level1: 'level1',
  Level2: 'level2',
  Level3: 'level3'
}

const initScore = {
  correct: 0,
  wrong: 0,
  total: 0
}

function App() {
  const [words, setWords] = useState([]);
  const [indexOfCurrentWord, setIndexOfCurrentWord] = useState(null);
  const [word, setWord] = useState('');
  const [levelName, setLevelName] = useState(null);
  const [score, setScore] = useState(initScore);
  const inputEl = useRef(null);

  const startGame = (level) => {
    const generatedWords = generateListOfWords(level, 10);
    setWords(generatedWords);
    setIndexOfCurrentWord(0);
    setLevelName(level);
    setScore({...initScore, total: generatedWords.length});
  }

  const playCurrentWord = () => {
    playWord(words[indexOfCurrentWord]);
    inputEl.current.focus();
  }

  const validateEnteredWord = (enteredWord) => {
    if (areStringsTheSame(enteredWord.trim(), words[indexOfCurrentWord])) {
      alert('Correct spelling!');
      setScore({...score, correct: score.correct + 1})
    } else {
      alert('Wrong spelling');
      setScore({...score, wrong: score.wrong + 1})
    }

    (indexOfCurrentWord + 1 < words.length) && setIndexOfCurrentWord(indexOfCurrentWord + 1)
  }

  const gameOver = () => {
    const isGameOver = indexOfCurrentWord + 1 === words.length
    if (isGameOver) {
      alert(`Game over! You got ${score.correct} words right. Congratulation!!!`);
    }
  }

  return (
    <main>
      <section className="levels">
        <ul>
          <li className={levelName === level.Level1 ? 'active': null} onClick={() => startGame(level.Level1)}>Level 1</li>
          <li className={levelName === level.Level2 ? 'active': null} onClick={() => startGame(level.Level2)}>Level 2</li>
          <li className={levelName === level.Level3 ? 'active': null} onClick={() => startGame(level.Level3)}>Level 3</li>
        </ul>
      </section>
      <section className="btns">
        <button 
          disabled={!levelName || indexOfCurrentWord + 1 === words.length}
          onClick={playCurrentWord}
        >
          Play
        </button>
      </section>
      {/* {words.toString()} */}
      <mark><span data-testid="correct-words">{score.correct}</span> / <span data-testid="total-words">{score.total}</span></mark>
      <form
        data-testid="form"
        onSubmit={event => {
          event.preventDefault()
          validateEnteredWord(word)
          setWord('')
          gameOver()
        }}
      > 
        <input   
          type="text"
          value={word}
          ref={inputEl}
          aria-label="word-input"
          onChange={event => setWord(event.target.value)}
        />
      </form>

      <div className="invisible" data-testid="guessing-word">{words[indexOfCurrentWord]}</div>
    </main>
  );
}

export default App;
