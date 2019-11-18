import fs from 'fs';
import { resolve, extname } from 'path';
import { safeLoad } from 'js-yaml';
import { parse } from 'ini';

const parserFor = {
  json: JSON.parse,
  yml: safeLoad,
  yaml: safeLoad,
  ini: parse,
};

export default (...filepathes) => filepathes
  .map((filepath) => {
    const extension = extname(filepath).slice(1);
    const parser = parserFor[extension];
    if (!parser) throw new Error(`Can not find parser for ${filepath}. Check file extension.`);
    const fileContent = fs.readFileSync(resolve(filepath), 'utf-8');
    return parser(fileContent);
  });
