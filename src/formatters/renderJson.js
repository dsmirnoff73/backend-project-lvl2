export default (data) => {
  const iter = (_data) => _data.reduce(
    (acc, { key, children, ...rest }) => (!children
      ? { ...acc, [key]: rest }
      : { ...acc, [key]: { ...rest, children: iter(children) } }),
    {},
  );
  return JSON.stringify(iter(data));
};
