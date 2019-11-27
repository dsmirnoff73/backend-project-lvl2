import fs from 'fs';
import { resolve } from 'path';
import genDiff from '../src';

const dummyFile = '../__fixtures__/dummy.file';
const fileWithNoExtension = '../__fixtures__/dummyWithNoExtension';

test('unsuppoted filetype', () => {
  const diff = () => genDiff(dummyFile, fileWithNoExtension);
  expect(diff).toThrowError('Can not find parser for file. Check file extension');
});

test('no extension', () => {
  const diff = () => genDiff(fileWithNoExtension, dummyFile);
  expect(diff).toThrowError('Can not find parser for file without extension. Check file extension');
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
