const tab = (level) => ' '.repeat(level * 4);

const stringify = (element, level) => ((typeof element !== 'object')
  ? `${element}`
  : `{\n${Object.entries(element).map(
    ([key, value]) => `${tab(level + 2)}${key}: ${stringify(value, level + 1)}`,
  ).join('\n')}\n${tab(level + 1)}}`
);


const renderFor = {
  added: (key, { value }, level) => `${tab(level)}  + ${key}: ${stringify(value, level)}`,
  deleted: (key, { value }, level) => `${tab(level)}  - ${key}: ${stringify(value, level)}`,
  same: (key, { value }, level) => `${tab(level + 1)}${key}: ${stringify(value, level)}`,
  changed: (key, { valueBefore, valueAfter }, level) => [
    `${tab(level)}  - ${key}: ${stringify(valueBefore, level)}`,
    `${tab(level)}  + ${key}: ${stringify(valueAfter, level)}`,
  ].join('\n'),
};

const toString = (data, level = 0) => `{\n${data.map(
  ({
    key,
    type,
    children,
    ...values
  }) => ((type !== 'haveChildren')
    ? renderFor[type](key, values, level)
    : `${tab(level + 1)}${key}: ${toString(children, level + 1)}`
  ),
).join('\n')}\n${tab(level)}}`;

export default toString;
