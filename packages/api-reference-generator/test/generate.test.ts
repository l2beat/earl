import { expect } from 'earljs'

import { generateMarkdownForMethodDocumentation, generateTableOfContents } from '../src/generate'
import { parseTsDocComment } from '../src/tsdocs/parse'
import { MethodDocumentation } from '../src/types'
import { sampleMethodComment } from './tsdocs/parse.test'

describe('generateMarkdownForMethodDocumentation', () => {
  it('generates markdown for a comment with params and examples', async () => {
    const result = generateMarkdownForMethodDocumentation(parseTsDocComment(sampleMethodComment))

    expect(result).toMatchSnapshot()
  })
})

describe('generateTableOfContents', () => {
  it('generates valid TOC', () => {
    const docs: MethodDocumentation[] = [
      {
        signature: 'sample()',
        description: '',
        examples: [],
        params: [],
      },
      {
        signature: 'expect(value: any, options: Options)',
        description: '',
        examples: [],
        params: [],
      },
    ]

    const result = generateTableOfContents(docs)

    expect(result).toMatchSnapshot()
  })
})
