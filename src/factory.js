import fs from 'fs';
import { resolve } from 'path';
import { safeLoad } from 'js-yaml';
import { parse } from 'ini';

const parserFor = {
  json: JSON.parse,
  yml: safeLoad,
  ini: parse,
};

export default (pathToFile) => {
  const fileExtension = pathToFile.slice(pathToFile.lastIndexOf('.') + 1);
  const parser = parserFor[fileExtension];
  if (!parser) throw new Error('Can not find parser for this file. Check file extension');
  const fileContent = fs.readFileSync(resolve(pathToFile), 'utf-8');
  return parser(fileContent);
};
