import { identity } from 'lodash';


const formatFor = {
  object: () => '[complex value]',
  string: (string) => `'${string}'`,
};

const stringify = (value) => {
  const format = formatFor[typeof value] || identity;
  return format(value);
};

const renderFor = {
  added: (name, { value }) => `Property '${name}' was added with value: ${stringify(value)}`,
  deleted: (name) => `Property '${name}' was removed`,
  same: () => null,
  changed: (name, { valueBefore, valueAfter }) => `Property '${name}' was updated. From ${stringify(valueBefore)} to ${stringify(valueAfter)}`,
  hasChildren: (prefix, { children }, f) => f(children, prefix),
};

const toString = (data, oldPrefix) => `${data.map(
  ({ key, type, ...values }) => {
    const newPrefix = oldPrefix ? `${oldPrefix}.${key}` : key;
    const renderedLine = renderFor[type](newPrefix, values, toString);
    return renderedLine;
  },
).filter((s) => s !== null)
  .join('\n')}`;

export default toString;
