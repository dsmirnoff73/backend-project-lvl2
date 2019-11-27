const identity = (x) => x;

const tab = (num) => ' '.repeat(num * 4);

const renderBlock = (lines, level = 0) => `{\n${lines.join('\n')}\n${tab(level)}}`;

const renderObject = (obj, level, f) => renderBlock(Object.entries(obj)
  .map(([key, value]) => f(key, value, level + 1)),
level + 1);

const stringify = (key, value, level, prefix = ' ') => {
  const render = typeof value === 'object' ? renderObject : identity;
  const renderedValue = render(value, level, stringify);
  return `${tab(level)}  ${prefix} ${key}: ${renderedValue}`;
};

const renderFor = {
  added: ({ key, value }, level) => stringify(key, value, level, '+'),
  deleted: ({ key, value }, level) => stringify(key, value, level, '-'),
  same: ({ key, value }, level) => stringify(key, value, level),
  changed: ({ key, valueBefore, valueAfter }, level) => `${stringify(key, valueBefore, level, '-')}\n${stringify(key, valueAfter, level, '+')}`,
  hasChildren: ({ key, children }, level, f) => stringify(key, f(children, level + 1), level),
};

const toString = (data, renderLevel = 0) => renderBlock(data
  .map(({ type, ...noda }) => renderFor[type](noda, renderLevel, toString)), renderLevel);

export default toString;
