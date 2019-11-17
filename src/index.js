import parseFiles from './parser';
import buildAST from './mapping';
import render from './formatters';

export default (fileBefore, fileAfter, format) => {
  const data = parseFiles([fileBefore, fileAfter]);
  const differenceMap = buildAST(data);
  return render(format)(differenceMap);
};
