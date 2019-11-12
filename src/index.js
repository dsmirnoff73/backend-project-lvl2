import buildDataFromFile from './factory';
import buildMap from './mapping';
import toString from './render';

export default (...pathToFile) => {
  const data = pathToFile.map(buildDataFromFile);
  const differenceMap = data.reduce(buildMap, {});
  return toString(differenceMap);
};
