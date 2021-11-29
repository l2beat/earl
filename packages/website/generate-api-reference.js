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
    files: [
      'Validators:validators/types.d.ts',
      'Matchers:expect.d.ts',
      'Modifiers:modifiers.d.ts',
      'Mocks:mocks/*.d.ts',
    ],
  })

  // We're prepending frontmatter and styles here, because we Docusaurus doesn't show
  // headings from imported .mdx files in table of contents
  writeFileSync(path.resolve(__dirname, '../docs/api/api-reference.md'), frontmatter + reference)
}

void main().catch((err) => {
  console.error(err)
  process.exit(1)
})
