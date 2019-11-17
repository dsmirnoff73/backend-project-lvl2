#!/usr/bin/env node
import commander from 'commander';
import genDiff from '..';
import { version } from '../../package.json';

commander
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format (json|plain)', 'json')
  .arguments('<firstConfig>  <secondConfig>')
  .action((firstConfig, secondConfig, option) => {
    const result = genDiff(firstConfig, secondConfig, option.format);
    console.log(result);
  })
  .parse(process.argv);
