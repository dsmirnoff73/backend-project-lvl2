import genDiff from '../src';
import fs from 'fs';
import { resolve } from 'path';

const pathToDummyFile = './__fixtures__/dummy.file';
const pathToFileWithNoExtension = './__fixtures__/dummyWithNoExtension';

test('unsuppoted filetype', () => {
	const gen = () => genDiff(pathToDummyFile, pathToFileWithNoExtension);
  expect(gen).toThrowError('Can not find parser for ' + pathToDummyFile + '. Check file extension');
});

test('no extension', () => {
	const gen = () => genDiff(pathToFileWithNoExtension, pathToDummyFile);
  expect(gen).toThrowError('Can not find parser for ' + pathToFileWithNoExtension + '. Check file extension');
});

test.each([
  ['json', 'yml', 'pretty'],
  ['yml', 'json', 'plain'],
  ['ini', 'ini', 'json'],
])('file before: .%s, file after: .%s, output fromat: %s',
    (extensionBefore, extensionAfter, resultFormat) => {
      const path1 = './__fixtures__/beforeDeep.' + extensionBefore;
      const path2 = resolve(__dirname, '../__fixtures__/afterDeep.' + extensionAfter);
      const result = fs.readFileSync('./__fixtures__/resultDeep' + resultFormat, 'utf-8');
      expect(genDiff(path1, path2, resultFormat)).toEqual(result);
    },
  );
