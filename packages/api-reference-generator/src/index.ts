import { readFileSync, writeFileSync } from 'fs'
import { sortBy } from 'lodash'
import { join } from 'path'

import { generateMarkdownForMethodDocumentation, generateTableOfContents } from './generate'
import { extractTsDocCommentsFromString } from './tsdocs/extract'
import { parseTsDocComment } from './tsdocs/parse'

export function generateApiReference() {
  const basePath = join(__dirname, '../../earljs/src')

  const files = {
    Validators: join(basePath, './Expectation.ts'),
  }

  const source = readFileSync(files.Validators, 'utf-8')
  const comments = extractTsDocCommentsFromString(source)
  const parsed = comments.map(parseTsDocComment)
  const sorted = sortBy(parsed, (d) => d.signature)

  const output = `
## Validators
${generateTableOfContents(sorted)}

# Reference

## Validators
${sorted.map(generateMarkdownForMethodDocumentation).join('\n')}
  `

  writeFileSync(join(__dirname, './out.md'), output, 'utf-8')
  console.log('DONE!')
}

generateApiReference()
