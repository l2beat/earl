import { extractTsDocCommentsFromString, MethodComment, parseComment } from '../generate-docs'
import { expect } from '../src'

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

describe.only('parseComment', () => {
  it.only('works', () => {
    const input: MethodComment = {
      signature: 'someMethod(x: number, y: number): void',
      comment: `/**
      * Returns the average of two numbers.
      *
      * Some other note
      * 
      * @param x - The first input number
      * @param y - The second input number
      */`,
    }
    const result = parseComment(input)

    expect(result).toEqual({
      signature: 'someMethod(x: number, y: number): void',
      description: 'Returns the average of two numbers.\n\nSome other note\n\n',
      params: [
        { name: 'x', description: 'The first input number' },
        { name: 'y', description: 'The second input number' },
      ],
      examples: [],
    })
  })
})
