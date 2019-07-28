import React from 'react';
import './App.css';

const words = ['car', 'window', 'chair', 'trees'];

const playWord = (word) => {
  const msg = new SpeechSynthesisUtterance(word);
  window.speechSynthesis.speak(msg);
}

function App() {
  return (
    <main>
      <section className="btns">
        <button onClick={() => playWord(words[0])}>Play</button>
      </section>
    </main>
  );
}

export default App;
