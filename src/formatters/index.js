import treeRender from './renderTree';
import plainRender from './renderPlain';
import jsonRender from './renderJson';

const renderFor = {
  plain: plainRender,
  tree: treeRender,
  json: jsonRender,
};

export default (format) => {
  const render = renderFor[format];
  if (!render) throw new Error('Unknown output format option. Use -h for help.');
  return render;
};
