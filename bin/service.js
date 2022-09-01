#!/usr/bin/env node

const program = require('commander')

program.version(require('../package.json').version)

program
  .command('init <name>')
  .description('init project')
  .action(require('../lib/service'))
program
  .command('refresh:router')
  .description('refresh router')
  .action(require('../lib/refreshRouter'))

program.parse(process.argv)
