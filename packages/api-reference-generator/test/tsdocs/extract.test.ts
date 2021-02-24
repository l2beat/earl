import { expect } from 'earljs'

import { extractTsDocCommentsFromString } from '../../src/tsdocs/extract'

describe('extractTsDocCommentsFromString', () => {
  it('extracts single method comment', () => {
    const input = `
    /** test */
    someMethod(): void {}
    `
    const comments = extractTsDocCommentsFromString(input)

    expect(comments).toEqual([{ signature: 'someMethod(): void', comment: '/** test */' }])
  })

  it('extracts single getter comment', () => {
    const input = `
    /** test */
    get someMethod(): void {}
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
