import fs from 'fs';
import { resolve, extname } from 'path';
import { safeLoad } from 'js-yaml';
import { parse } from 'ini';

const parserFor = {
  json: JSON.parse,
  yml: safeLoad,
  ini: parse,
};

export default (files) => files
  .map((file) => {
    const extension = extname(file).slice(1);
    const parser = parserFor[extension];
    if (!parser) throw new Error(`Can not find parser for ${file}. Check file extension.`);
    const fileContent = fs.readFileSync(resolve(file), 'utf-8');
    return parser(fileContent);
  });
