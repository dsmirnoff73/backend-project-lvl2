import treeRender from './renderJson';
import plainRender from './renderPlain';

const renderFor = {
  plain: plainRender,
  json: treeRender,
};

export default (format) => {
  const render = renderFor[format];
  if (!render) throw new Error('Unknown output format option. Use -h for help.');
  return render;
};
