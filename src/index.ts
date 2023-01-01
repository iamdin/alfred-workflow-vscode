#!/usr/bin/env node

import minimist from 'minimist'
import fg from 'fast-glob'
import { output } from './util'

const CODEDIR_PATH = process.env.CODEDIR_PATH || process.env.HOME
const argv = minimist<{
  f?: boolean
  file?: boolean
}>(process.argv.slice(2))

export async function start() {
  const onlyFiles = !!(argv.f || argv.file)
  const filter = argv._ || []

  let result = await fg(filter.length ? filter.map(e => `*${e}*`) : "**", {
    cwd: CODEDIR_PATH,
    ignore: ['**/node_modules/**'],
    absolute: true,
    objectMode: true,
    onlyFiles,
    deep: 1,
  })

  const items = result.map(({ name, path }) => ({
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
  
  output({ items })
}

start()
