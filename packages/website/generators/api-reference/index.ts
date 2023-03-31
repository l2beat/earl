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
    basePath: path.resolve(__dirname, '../../../earl/dist/cjs'),
    files: [
      'Validators::validators/**/*.d.ts',
      'Matchers:expect:matchers/**/*.d.ts',
      'Mocks:mock:mocks/mockFn.d.ts,mocks/types/index.d.ts',
    ],
  })

  const fullPage = frontmatter + reference

  const outputPath = path.resolve(__dirname, '../../docs/api/api-reference.md')
  writeFileSync(outputPath, fullPage)
  console.log(`Wrote API reference to ${outputPath}`)
}

void main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})
