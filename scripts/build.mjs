import * as esbuild from 'esbuild'

await esbuild.build({
  bundle: true,
  entryPoints: ['index.mjs'],
  outfile: 'outfile.cjs',
  format: 'cjs',
  platform: 'node',
  target: 'node14',
})
