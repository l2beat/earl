import { expect } from 'earljs'

import { generateMarkdownForMethodDocumentation } from '../src/generate'
import { parseTsDocComment } from '../src/tsdocs/parse'
import { sampleMethodComment } from './tsdocs/parse.test'

describe('generateMarkdownForMethodDocumentation', () => {
  it('generates markdown for a comment with params and examples', async () => {
    const result = generateMarkdownForMethodDocumentation(parseTsDocComment(sampleMethodComment))

    expect(result).toMatchSnapshot()
  })
})
