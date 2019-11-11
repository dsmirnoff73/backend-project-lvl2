import fs from 'fs';
import { resolve } from 'path';
import { has } from 'lodash';

const tags = ['before', 'after'];

const readAndParseFile = (pathToFile) => {
  const fileContent = fs.readFileSync(resolve(pathToFile), 'utf-8');
  return JSON.parse(fileContent);
};

const mapParsedFile = (mapToBeginWith, parsedFile, fileNumber) => {
  const newMap = Object.entries(parsedFile)
    .reduce((_map, [key, value]) => {
      const position = tags[fileNumber];
      const newValue = has(_map, key)
        ? { ..._map[key], [position]: value }
        : { [position]: value };
      return { ..._map, [key]: newValue };
    },
    mapToBeginWith);
  return newMap;
};

const tagMap = (differences) => Object.entries(differences)
  .map(([key, value]) => {
    if (value.after === undefined) return { key, value, tag: 'deleted' };
    if (value.before === undefined) return { key, value, tag: 'added' };
    if (value.before === value.after) return { key, value, tag: 'same' };
    return { key, value, tag: 'changed' };
  });

const render = {
  changed: (key, value) => `- ${key}: ${value.before}\n\t+ ${key}: ${value.after}`,
  deleted: (key, value) => `- ${key}: ${value.before}`,
  added: (key, value) => `+ ${key}: ${value.after}`,
  same: (key, value) => `  ${key}: ${value.before}`,
};

const toString = (taggedMap) => {
  const result = taggedMap.map(({ key, value, tag }) => render[tag](key, value));
  return `{\n\t${result.join('\n\t')}\n}`;
};

export default (...pathToFile) => {
  const resultMap = pathToFile
    .map(readAndParseFile)
    .reduce(mapParsedFile, {});
  return toString(tagMap(resultMap));
};
