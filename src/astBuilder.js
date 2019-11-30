import { has, union } from 'lodash';

const rulebookForKeys = [
  {
    rule: (key, dataBefore, dataAfter) => has(dataBefore, key) && has(dataAfter, key)
      && (typeof dataBefore[key] === 'object') && (typeof dataAfter[key] === 'object'),
    type: 'hasChildren',
    process: (key, dataBefore, dataAfter, f) => ({ children: f(dataBefore[key], dataAfter[key]) }),
  },
  {
    rule: (key, dataBefore, dataAfter) => has(dataBefore, key) && has(dataAfter, key)
      && (dataBefore[key] === dataAfter[key]),
    type: 'same',
    process: (key, dataBefore) => ({ value: dataBefore[key] }),
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
    process: (key, dataBefore) => ({ value: dataBefore[key] }),
  },
  {
    rule: () => true,
    type: 'added',
    process: (key, dataBefore, dataAfter) => ({ value: dataAfter[key] }),
  },
];

const buildAST = (dataBefore, dataAfter) => {
  const keysBefore = Object.keys(dataBefore);
  const keysAfter = Object.keys(dataAfter);
  const keys = union(keysBefore, keysAfter);
  const resultAST = keys.map(
    (key) => {
      const { type, process } = rulebookForKeys
        .find(({ rule }) => rule(key, dataBefore, dataAfter));
      const prefix = { key, type };
      const suffix = process(key, dataBefore, dataAfter, buildAST);
      const resultNode = { ...prefix, ...suffix };
      return resultNode;
    },
  );
  return resultAST;
};

export default buildAST;
