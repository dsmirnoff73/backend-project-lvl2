const render = {
  changed: (key, value) => `- ${key}: ${value.before}\n\t+ ${key}: ${value.after}`,
  deleted: (key, value) => `- ${key}: ${value.before}`,
  added: (key, value) => `+ ${key}: ${value.after}`,
  same: (key, value) => `  ${key}: ${value.before}`,
};

const tagData = (differences) => Object.entries(differences)
  .map(([key, value]) => {
    if (value.after === undefined) return { key, value, tag: 'deleted' };
    if (value.before === undefined) return { key, value, tag: 'added' };
    if (value.before === value.after) return { key, value, tag: 'same' };
    return { key, value, tag: 'changed' };
	});

	export default (data) => {
		const result = tagData(data).map(({ key, value, tag }) => render[tag](key, value));
		return `{\n\t${result.join('\n\t')}\n}`;
	};
	