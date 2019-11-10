#!/usr/bin/env node
import commander from 'commander';
import genDiff from '..';

new commander.Command()
    .version('1.0.2')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'Output format')
    .arguments('<firstConfig>  <secondConfig>')
    .action((firstConfig, secondConfig) => {
      try {
        const difference = genDiff(firstConfig, secondConfig);
        console.log(difference);
      } catch (error) {
        console.log(error.toString());
      }
    })
    .parse(process.argv);
