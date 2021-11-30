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

const pageStyles = `\n
<style>{\`
  :not(h3) + h4 {
    padding-top: 1em;
    border-top: 1px solid var(--ifm-color-emphasis-200);
  }\`
}</style>\n
`

async function main() {
  const reference = await generateApiReference({
    basePath: path.resolve(__dirname, '../earljs/dist'),
    files: [
      'Core:expect:expect.d.ts',
      'Validators::validators/types.d.ts',
      'Modifiers::Modifiers.d.ts',
      'Matchers:expect:matchers/types.d.ts',
      'Mocks:mock:mocks/mockFn.d.ts,mocks/types/index.d.ts',
    ],
  })

  // We're prepending frontmatter and styles here, because we Docusaurus doesn't show
  // headings from imported .mdx files in table of contents
  writeFileSync(path.resolve(__dirname, '../docs/api/api-reference.md'), frontmatter + pageStyles + reference)
}

void main().catch((err) => {
  console.error(err)
  process.exit(1)
})
