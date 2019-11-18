const stringifyFor = {
  object: () => '[complex value]',
  string: (value) => `'${value}'`,
};

const stringify = (value) => {
  const render = stringifyFor[typeof value] || ((x) => x);
  return render(value);
};

const renderFor = {
  added: (name, { value }) => `Property '${name}' was added with value: ${stringify(value)}`,
  deleted: (name) => `Property '${name}' was removed`,
  same: () => '',
  changed: (name, { valueBefore, valueAfter }) => `Property '${name}' was updated. From ${stringify(valueBefore)} to ${stringify(valueAfter)}`,
};

const toString = (data, oldPrefix) => `${data.map(
  ({
    key,
    type,
    children,
    ...values
  }) => {
    const newPrefix = oldPrefix ? `${oldPrefix}.${key}` : key;
    return (type !== 'hasChildren')
      ? renderFor[type](newPrefix, values)
      : toString(children, newPrefix);
  },
).filter((s) => s !== '')
  .join('\n')}`;

export default toString;
