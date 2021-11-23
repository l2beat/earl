/* eslint-disable no-console */

import * as cliArgs from 'ts-command-line-args'

import { generateApiReference, GenerateApiReferenceOptions } from './index'

const args = cliArgs.parse<GenerateApiReferenceOptions>({
  out: { type: String, alias: 'o', description: 'destination for the written markdown file', optional: true },
  basePath: { type: String, alias: 'b', description: 'path to build directory of the library' },
  files: {
    type: String,
    multiple: true,
    alias: 'f',
    defaultOption: true,
    // @todo we should use TypeScript AST and traverse to definitions of all exports
    // Right now, when somebody moves an export to another file, we'll have broken references.
    description: 'files that will become sections in the API Reference, of format <heading>:<file-glob>',
  },
})

void generateApiReference(args)
  .then(console.log)
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
