import  genDiff from '../src';
import fs from 'fs';
import { resolve } from 'path';
import { exportAllDeclaration } from '@babel/types';

const pathToEmptyFile1 = './__fixtures__/empty1.json';
const pathToEmptyFile2 = './__fixtures__/empty2.json';
const resultFile1_2 = fs.readFileSync('./__fixtures__/resultTestFile1_2', 'utf-8');
const pathToFile1 = './__fixtures__/testFile1.json';
const pathToFile2 = './__fixtures__/testFile2.json';

test('empty JSONSs', () => {
  expect(genDiff(pathToEmptyFile1, pathToEmptyFile2)).toEqual('{\n\t\n}');
});

test('absolut path', () => {
  expect(genDiff(resolve(__dirname, '..',pathToEmptyFile1), resolve(__dirname, '..',pathToEmptyFile2))).toEqual('{\n\t\n}');
});

test('add delete change same', () => {
  expect(genDiff(pathToFile2, pathToFile1)).toEqual(resultFile1_2);
});
