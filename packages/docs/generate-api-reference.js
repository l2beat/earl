// @ts-check
/* eslint-disable no-console */

const path = require('path')
const { writeFileSync } = require('fs')
const { generateApiReference } = require('../api-reference-generator')

const frontmatter = `\
---
id: api-reference
hide_title: true
title: API Reference
---
`

async function main() {
  const reference = await generateApiReference({
    basePath: path.resolve(__dirname, '../earljs/dist'),
    files: ['Validators:Expectation.d.ts', 'Matchers:expect.d.ts', 'Mocks:mocks/*.d.ts'],
  })
  writeFileSync(path.resolve(__dirname, './api/api-reference.md'), `${frontmatter}\n${reference}`)
}

void main().catch((err) => {
  console.error(err)
  process.exit(1)
})
