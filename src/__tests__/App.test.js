import React from 'react';
import App from '../App';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

it('initialises and updates score when a level is selected', () => {
  const {getByLabelText, getByTestId, getByText} = render(<App />);

  expect(getByTestId('correct-words').innerHTML).toEqual('0');
  expect(getByTestId('total-words').innerHTML).toEqual('0');
  expect(getByText(/play/i)).toBeDisabled()

  fireEvent.click(getByText(/Level 1/i));

  expect(getByTestId('correct-words').innerHTML).toEqual('0');
  expect(getByTestId('total-words').innerHTML).toEqual('10');
  expect(getByText(/play/i)).not.toBeDisabled();
})

it('increases score when correct word is entered.', () => {
  const {getByLabelText, getByTestId, getByText} = render(<App />);

  fireEvent.click(getByText(/Level 1/i));
  fireEvent.click(getByText(/play/i));
  const guessingWordElemValue = getByTestId('guessing-word').innerHTML;
  const inputElem = getByLabelText('word-input');
  fireEvent.change(inputElem, {target: {value: guessingWordElemValue}});
  fireEvent.submit(getByTestId('form'))

  expect(getByTestId('correct-words').innerHTML).toEqual('1');
})

it('does not update score when wrong word is entered.', () => {
  const {getByLabelText, getByTestId, getByText} = render(<App />);

  fireEvent.click(getByText(/Level 1/i));
  fireEvent.click(getByText(/play/i));
  const inputElem = getByLabelText('word-input');
  fireEvent.change(inputElem, {target: {value: 'TEST'}});
  fireEvent.submit(getByTestId('form'))

  expect(getByTestId('correct-words').innerHTML).toEqual('0');
})
