import React from 'react';
import ReactDOM from 'react-dom';
import App, {generateListOfWords} from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('generate list of unique ten words', () => {
  const quantity = 10
  const result = generateListOfWords('level1', quantity);
  const isArrayUnique = arr => new Set(arr).size === arr.length;

  expect(result.length).toBe(quantity);
  expect(isArrayUnique(result)).toBeTruthy();
})
