import {generateListOfWords} from '../utils';

it('generate list of unique ten words', () => {
  const quantity = 10
  const result = generateListOfWords('level1', quantity);
  const isArrayUnique = arr => new Set(arr).size === arr.length;

  expect(result.length).toBe(quantity);
  expect(isArrayUnique(result)).toBeTruthy();
});
