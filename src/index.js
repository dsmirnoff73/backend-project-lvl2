import fs from 'fs';
import { resolve } from 'path';
import { has } from 'lodash';

const tags = ['before', 'after'];

const readAndParseFile = (pathToFile) => {
  const fileContent = fs.readFileSync(resolve(pathToFile), 'utf-8');
  return JSON.parse(fileContent);
};

const mapParsedFile = (map, parsedFile, fileNumber) => {
  const newMap = Object.entries(parsedFile)
    .reduce((_map, [key, value]) => {
      const position = tags[fileNumber];
      const newValue = has(_map, key)
        ? { ..._map[key], [position]: value }
        : { [position]: value };
      return { ..._map, [key]: newValue };
    },
    map);
  return newMap;
};

const mapToString = (differences) => {
  const result = Object.entries(differences)
    .map(([key, value]) => {
      if (value.after === undefined) return `- ${key}: ${value.before}`;
      if (value.before === undefined) return `+ ${key}: ${value.after}`;
      if (value.before === value.after) return `  ${key}: ${value.before}`;
      return `- ${key}: ${value.before}\n\t+ ${key}: ${value.after}`;
    });
  return `{\n\t${result.join('\n\t')}\n}`;
};

export default (...pathToFile) => {
  const resultMap = pathToFile
    .map(readAndParseFile)
    .reduce(mapParsedFile, {});
  return mapToString(resultMap);
};
