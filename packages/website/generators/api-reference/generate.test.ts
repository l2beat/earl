import { expect } from 'earl'
import { readFileSync } from 'node:fs'

import { generateMarkdownForMethodDocumentation } from './generate'
import { parseTsDocComment } from './tsdocs/parse'
import { sampleMethodComment } from './tsdocs/parse.test'

describe('generateMarkdownForMethodDocumentation', () => {
  it('generates markdown for a comment with params and examples', async () => {
    const result = generateMarkdownForMethodDocumentation(
      parseTsDocComment(sampleMethodComment),
    )

    // @todo use snapshots here
    const expected = readFileSync(require.resolve('./test/docs.txt'), 'utf8')
    expect(result).toEqual(expected)
  })
})
