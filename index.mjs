#!/usr/bin/env node

import parseArgs from 'minimist'
import glob from 'fast-glob'

const CODEDIR_PATH = process.env.CODEDIR_PATH ?? process.env.HOME
const argv = parseArgs(process.argv.slice(2))

const query = argv._.map((e) => `**/*${e}*`)

async function run() {
  let dirs =  glob.sync([...(query.length ? query : '**')], {
    onlyDirectories: true,
    // onlyFiles: false,
    ignore: ['**/node_modules/**'],
    cwd: CODEDIR_PATH,
    absolute: true,
    objectMode: true,
    // stats: true,
    // deep: 1,
  })

  const items = dirs.map(({ name, path }) => ({
    uid: name,
    type: 'file',
    title: name,
    subtitle: path,
    arg: path,
    icon: {
      type: 'fileicon',
      path: path,
    },
  }))
  console.log(JSON.stringify({ items }))
}

run()
