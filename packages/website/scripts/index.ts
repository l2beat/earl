import { writeFileSync } from 'fs'
import path from 'path'

import { generateApiReference } from './generateApiReference'

const frontmatter = `\
---
title: API Reference
editLink: false
outline: deep
---

# {{ $frontmatter.title }}

`
async function main() {
  const reference = await generateApiReference({
    basePath: path.resolve(__dirname, '../../earljs/dist'),
    files: [
      'Validators::validators/**/toBeA.d.ts', // replace with once more docs for validators are written: 'Validators:validators:validators/**/*.d.ts',
      'Matchers:expect:matchers/**/*.d.ts',
      'Mocks:mock:mocks/mockFn.d.ts,mocks/types/index.d.ts',
    ],
  })

  const fullPage = frontmatter + reference

  console.log(fullPage)

  // We're prepending frontmatter and styles here, because we Docusaurus doesn't show
  // headings from imported .mdx files in table of contents
  writeFileSync(
    path.resolve(__dirname, '../docs/api/api-reference.md'),
    fullPage,
  )
}

void main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})
