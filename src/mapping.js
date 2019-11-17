import { has, union } from 'lodash';

const keyRuleBook = [
  {
    rule: (key, before, after) => has(before, key) && has(after, key)
      && (typeof before[key] === 'object') && (typeof after[key] === 'object'),
    type: 'haveChildren',
    process: () => {},
  },
  {
    rule: (key, before, after) => has(before, key) && has(after, key)
      && (before[key] === after[key]),
    type: 'same',
    process: (key, before) => ({
      value: before[key],
    }),
  },
  {
    rule: (key, before, after) => has(before, key) && has(after, key),
    type: 'changed',
    process: (key, before, after) => ({
      valueBefore: before[key],
      valueAfter: after[key],
    }),
  },
  {
    rule: (key, before) => has(before, key),
    type: 'deleted',
    process: (key, before) => ({
      value: before[key],
    }),
  },
  {
    rule: () => true,
    type: 'added',
    process: (key, before, after) => ({
      value: after[key],
    }),
  },
];

const buildAST = ([dataBefore, dataAfter]) => {
  const keysBefore = Object.keys(dataBefore);
  const keysAfter = Object.keys(dataAfter);
  const keys = union(keysBefore, keysAfter);
  const resultAST = keys.map(
    (key) => {
      const { type, process } = keyRuleBook.find(({ rule }) => rule(key, dataBefore, dataAfter));
      const prefix = { key, type };
      const suffix = (type === 'haveChildren')
        ? { children: buildAST([dataBefore[key], dataAfter[key]]) }
        : process(key, dataBefore, dataAfter);
      return { ...prefix, ...suffix };
    },
  );
  return resultAST;
};

export default buildAST;
