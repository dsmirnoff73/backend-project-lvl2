import parseFiles from './parser';
import buildAST from './mapping';
import render from './formatters';

export default (pathToFileBefore, pathToFileAfter, outputFormat) => {
  const parsedContent = parseFiles(pathToFileBefore, pathToFileAfter);
  const differenceMap = buildAST(parsedContent);
  return render(outputFormat)(differenceMap);
};
