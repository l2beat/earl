import { expect } from 'earljs'

import {
  extractTsDocCommentsFromString,
  generateMarkdownForMethodDocumentation,
  MethodComment,
  parseComment,
} from '../src/generate-docs'

describe('extractTsDocCommentsFromString', () => {
  it('extracts single method comment', () => {
    const input = `
    /** test */
    someMethod(): void {}
    `
    const comments = extractTsDocCommentsFromString(input)

    expect(comments).toEqual([{ signature: 'someMethod(): void', comment: '/** test */' }])
  })

  it('extracts multiple method comments', () => {
    const input = `
    /** test */
    someMethod(): void {}
    /** test2 */
    totallyDifferentMethod(): void {}
    `
    const comments = extractTsDocCommentsFromString(input)

    expect(comments).toEqual([
      { signature: 'someMethod(): void', comment: '/** test */' },
      { signature: 'totallyDifferentMethod(): void', comment: '/** test2 */' },
    ])
  })

  it('extracts multiple method comments from overrides', () => {
    const input = `
    /** test */
    someMethod(): void
    /** test2 */
    someMethod(arg1: number): void
    `
    const comments = extractTsDocCommentsFromString(input)

    expect(comments).toEqual([
      { signature: 'someMethod(): void', comment: '/** test */' },
      { signature: 'someMethod(arg1: number): void', comment: '/** test2 */' },
    ])
  })
})

const sampleMethodComment: MethodComment = {
  signature: 'someMethod(x: number, y: number): void',
  comment: `/**
  * Returns the average of two numbers.
  *
  * Some other note
  * 
  * @param x - The first input number
  * @param y - The second input number
  * 
  * @example
  * Random example
  * \`\`\`ts
  * someMethod(1, 2)
  * \`\`\`
  *
  */`,
}

describe('parseComment', () => {
  it('parses a comment with params and examples', () => {
    const result = parseComment(sampleMethodComment)

    expect(result).toEqual({
      signature: 'someMethod(x: number, y: number): void',
      description: 'Returns the average of two numbers.\n\nSome other note',
      params: [
        { name: 'x', description: 'The first input number' },
        { name: 'y', description: 'The second input number' },
      ],
      examples: [
        `Random example
\`\`\`ts
someMethod(1, 2)
\`\`\``,
      ],
    })
  })
})

describe('generateMarkdownForMethodDocumentation', () => {
  it('generates markdown for a comment with params and examples', async () => {
    const result = generateMarkdownForMethodDocumentation(parseComment(sampleMethodComment))

    expect(result).toMatchSnapshot()
  })
})
