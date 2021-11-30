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
      'Core:expect:expect.d.ts',
      'Validators::validators/types.d.ts',
      'Modifiers::modifiers.d.ts',
      'Matchers:expect:matchers/types.d.ts',
      'Mocks:mock:mocks/mockFn.d.ts,types/index.d.ts',
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
