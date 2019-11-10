#!/usr/bin/env node
import commander from 'commander';
import genDiff from '..';

new commander.Command()
  .version('1.0.2')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig>  <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const result = genDiff(firstConfig, secondConfig);
    console.log(result);
  })
  .parse(process.argv);
