import { safeLoad } from 'js-yaml';
import { parse } from 'ini';

const parserFor = {
  json: JSON.parse,
  yml: safeLoad,
  yaml: safeLoad,
  ini: parse,
};

export default (format) => {
  const parser = parserFor[format];
  if (!parser) throw new Error(`Can not find parser for ${format || 'this'} format.`);
  return parser;
};
