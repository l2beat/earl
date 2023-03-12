// @ts-check

import { writeFileSync } from 'fs'
import path from 'path'

import { generateApiReference } from './generateApiReference'

const frontmatter = `\
---
title: API Reference
outline: deep
---

# {{ $frontmatter.title }}

`

const pageStyles = `\n
<style>
  h4 {
    padding-top: 1em;
  }

  :not(h3) + h4 {
    border-top: 1px solid var(--vp-c-divider);
  }
</style>\n
`

async function main() {
  const reference = await generateApiReference({
    basePath: path.resolve(__dirname, '../node_modules/@earljs/published/dist'),
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
  writeFileSync(
    path.resolve(__dirname, '../docs/api/api-reference.md'),
    frontmatter + pageStyles + reference,
  )
}

void main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})
