import prettyRender from './renderPretty';
import plainRender from './renderPlain';
import jsonRender from './renderJson';

const renderFor = {
  plain: plainRender,
  pretty: prettyRender,
  json: jsonRender,
};

export default (format) => {
  const render = renderFor[format];
  if (!render) throw new Error(`Unknown output format option ${format}. Use -h for help.`);
  return render;
};
