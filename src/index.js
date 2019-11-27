import fs from 'fs';
import { resolve, extname } from 'path';
import parseFor from './parser';
import buildAST from './astBuilder';
import renderFor from './formatters';

const readFile = (filepath) => {
  const extension = extname(filepath).slice(1);
  const fullpath = resolve(__dirname, filepath);
  const content = fs.readFileSync(fullpath, 'utf-8');
  return { content, extension };
};

export default (pathToFileBefore, pathToFileAfter, outputFormat = 'pretty') => {
  const paths = [pathToFileBefore, pathToFileAfter];
  const parsedData = paths
    .map((path) => readFile(path))
    .map(({ content, extension }) => {
      const parse = parseFor(extension);
      return parse(content);
    });
  const ast = buildAST(...parsedData);
  const render = renderFor(outputFormat);
  const result = render(ast);
  return result;
};
