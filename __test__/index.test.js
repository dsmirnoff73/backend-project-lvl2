import genDiff from '../src';
import fs from 'fs';
import { resolve } from 'path';
import { exportAllDeclaration } from '@babel/types';

const pathToEmptyFile1 = './__fixtures__/empty1.json';
const pathToEmptyFile2 = './__fixtures__/empty2.json';
const resultFile1_2 = fs.readFileSync('./__fixtures__/resultTestFile1_2', 'utf-8');
const pathToFile1JSON = './__fixtures__/testFile1.json';
const pathToFile2JSON = './__fixtures__/testFile2.json';
const pathToFile1YAML = './__fixtures__/testFile1.yml';
const pathToFile2YAML = './__fixtures__/testFile2.yml';
const pathToDummyFile = './__fixtures__/dummy.file';
const pathToFileWithNoExtension = './__fixtures__/dummyWithNoExtension';

test('unsuppoted filetype', () => {
	const gen = () => genDiff(pathToFile1YAML, pathToDummyFile);
  expect(gen).toThrowError('Can not find parser for this file. Check file extension');
});

test('no extension', () => {
	const gen = () => genDiff(pathToFile1YAML, pathToFileWithNoExtension);
  expect(gen).toThrowError('Can not find parser for this file. Check file extension');
});

test('empty JSONSs', () => {
  expect(genDiff(pathToEmptyFile1, pathToEmptyFile2)).toEqual('{\n\t\n}');
});

test('absolut path', () => {
  expect(genDiff(resolve(__dirname, '..',pathToEmptyFile1), resolve(__dirname, '..',pathToEmptyFile2))).toEqual('{\n\t\n}');
});

test('add delete change same JSON', () => {
  expect(genDiff(pathToFile1JSON, pathToFile2JSON)).toEqual(resultFile1_2);
});

test('add delete change same YAML', () => {
  expect(genDiff(pathToFile1YAML, pathToFile2YAML)).toEqual(resultFile1_2);
});

test('different filetypes', () => {
  expect(genDiff(pathToFile1YAML, pathToFile2JSON)).toEqual(resultFile1_2);
});