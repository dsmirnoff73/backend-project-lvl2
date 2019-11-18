import { has, union } from 'lodash';

const ruleBookForKyes = [
  {
    rule: (key, dataBefore, dataAfter) => has(dataBefore, key) && has(dataAfter, key)
      && (typeof dataBefore[key] === 'object') && (typeof dataAfter[key] === 'object'),
    type: 'hasChildren',
    process: () => {},
  },
  {
    rule: (key, dataBefore, dataAfter) => has(dataBefore, key) && has(dataAfter, key)
      && (dataBefore[key] === dataAfter[key]),
    type: 'same',
    process: (key, dataBefore) => ({
      value: dataBefore[key],
    }),
  },
  {
    rule: (key, dataBefore, dataAfter) => has(dataBefore, key) && has(dataAfter, key),
    type: 'changed',
    process: (key, dataBefore, dataAfter) => ({
      valueBefore: dataBefore[key],
      valueAfter: dataAfter[key],
    }),
  },
  {
    rule: (key, dataBefore) => has(dataBefore, key),
    type: 'deleted',
    process: (key, dataBefore) => ({
      value: dataBefore[key],
    }),
  },
  {
    rule: () => true,
    type: 'added',
    process: (key, dataBefore, dataAfter) => ({
      value: dataAfter[key],
    }),
  },
];

const buildAST = ([dataBefore, dataAfter]) => {
  const keysBefore = Object.keys(dataBefore);
  const keysAfter = Object.keys(dataAfter);
  const keys = union(keysBefore, keysAfter);
  const resultAST = keys.map(
    (key) => {
      const { type, process } = ruleBookForKyes
        .find(({ rule }) => rule(key, dataBefore, dataAfter));
      const prefix = { key, type };
      const suffix = (type === 'hasChildren')
        ? { children: buildAST([dataBefore[key], dataAfter[key]]) }
        : process(key, dataBefore, dataAfter);
      const resultNoda = { ...prefix, ...suffix };
      return resultNoda;
    },
  );
  return resultAST;
};

export default buildAST;
