import genDiff from '../src';
import fs from 'fs';
import { resolve } from 'path';
import { exportAllDeclaration } from '@babel/types';

const resultFile1_2 = fs.readFileSync('./__fixtures__/resultTestFile1_2', 'utf-8');
const pathToDummyFile = './__fixtures__/dummy.file';
const pathToFileWithNoExtension = './__fixtures__/dummyWithNoExtension';

test('unsuppoted filetype', () => {
	const gen = () => genDiff(pathToDummyFile, pathToFileWithNoExtension);
  expect(gen).toThrowError('Can not find parser for this file. Check file extension');
});

test('no extension', () => {
	const gen = () => genDiff(pathToFileWithNoExtension, pathToDummyFile);
  expect(gen).toThrowError('Can not find parser for this file. Check file extension');
});

test.each([
  ['json'],
  ['yml'],
  ['ini'],
])('add delete change same .%s', (extension) => {
  const path1 = './__fixtures__/testFile1.' + extension;
  const path2 = resolve(__dirname, '../__fixtures__/testFile2.' + extension);
  expect(genDiff(path1, path2)).toEqual(resultFile1_2);
});
