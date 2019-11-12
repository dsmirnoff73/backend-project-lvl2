import { has } from 'lodash';

const tags = ['before', 'after'];

export default (mapToBeginWith, parsedData, iterator) => {
  const newMap = Object.entries(parsedData)
    .reduce((_map, [key, value]) => {
      const position = tags[iterator];
      const newValue = has(_map, key)
        ? { ..._map[key], [position]: value }
        : { [position]: value };
      return { ..._map, [key]: newValue };
    },
    mapToBeginWith);
  return newMap;
};
