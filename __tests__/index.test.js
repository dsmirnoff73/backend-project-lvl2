import fs from 'fs';
import { resolve } from 'path';
import genDiff from '../src';

const pathToDummyFile = '../__fixtures__/dummy.file';
const pathToFileWithNoExtension = '../__fixtures__/dummyWithNoExtension';

test('unsuppoted filetype', () => {
  const diff = () => genDiff(pathToDummyFile, pathToFileWithNoExtension);
  expect(diff).toThrowError('Can not find parser for file format.');
});

test('no extension', () => {
  const diff = () => genDiff(pathToFileWithNoExtension, pathToDummyFile);
  expect(diff).toThrowError('Can not find parser for this format.');
});

test.each([
  ['json', 'yml', 'pretty'],
  ['yml', 'json', 'plain'],
  ['ini', 'ini', 'json'],
])('file before: .%s, file after: .%s, output format: %s',
  (extensionBefore, extensionAfter, resultFormat) => {
    const path1 = `../__fixtures__/beforeDeep.${extensionBefore}`;
    const path2 = resolve(__dirname, `../__fixtures__/afterDeep.${extensionAfter}`);
    const result = fs.readFileSync(`./__fixtures__/resultDeep${resultFormat}`, 'utf-8');
    expect(genDiff(path1, path2, resultFormat)).toEqual(result);
  });
