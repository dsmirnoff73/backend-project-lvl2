import commander from 'commander';

export default (args) => {
  const program = new commander.Command();
  program
    .version('1.0.2')
    .description('Compares two configuration files and shows a difference.')
    .parse(args);
};
