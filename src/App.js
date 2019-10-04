import React, {useState} from 'react';
import { generateListOfWords, playWord, areStringsTheSame } from './utils.js';
import './App.css';

function App() {
  const [words, setWords] = useState([]);
  const [indexOfCurrentWord, setIndexOfCurrentWord] = useState(null);
  const [word, setWord] = useState('');

  const startGame = (level) => {
    const generatedWords = generateListOfWords(level, 10);
    setWords(generatedWords);
    setIndexOfCurrentWord(0);
  }

  const playCurrentWord = () => {
    playWord(words[indexOfCurrentWord]);
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
          <li onClick={() => startGame('level1')}>Level 1</li>
          <li onClick={() => startGame('level2')}>Level 2</li>
          <li onClick={() => startGame('level3')}>Level 3</li>
        </ul>
      </section>
      <section className="btns">
        <button onClick={playCurrentWord}>Play</button>
      </section>
      {words.toString()}
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
          onChange={event => setWord(event.target.value)}
        />
      </form>
    </main>
  );
}

export default App;
