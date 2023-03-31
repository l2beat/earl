import { expect } from 'earl'

import { extractTsDocCommentsFromString } from './extract'

describe('extractTsDocCommentsFromString', () => {
  it('extracts single method comment', () => {
    const input = `
    /** test */
    someMethod(): void;
    `
    const comments = extractTsDocCommentsFromString(input)

    expect(comments).toEqual([
      { signature: 'someMethod(): void', comment: '/** test */' },
    ])
  })

  it('extracts single getter comment', () => {
    const input = `
    /** test */
    get someMethod(): void;
    `
    const comments = extractTsDocCommentsFromString(input)

    expect(comments).toEqual([
      { signature: 'someMethod(): void', comment: '/** test */' },
    ])
  })

  it('extracts multiple method comments', () => {
    const input = `
    /** test */
    someMethod(): void;
    /** test2 */
    totallyDifferentMethod(): void;
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
    someMethod(): void;
    /** test2 */
    someMethod(arg1: number): void;
    `
    const comments = extractTsDocCommentsFromString(input)

    expect(comments).toEqual([
      { signature: 'someMethod(): void', comment: '/** test */' },
      { signature: 'someMethod(arg1: number): void', comment: '/** test2 */' },
    ])
  })

  it('extracts given inline object literal type', () => {
    const input = `
      /** boop */
      method(args: { a: number, b: number }): void;
    `

    expect(extractTsDocCommentsFromString(input)).toEqual([
      {
        signature: 'method(args: { a: number, b: number }): void',
        comment: '/** boop */',
      },
    ])
  })

  it('handles multiline signatures', () => {
    const input = `
      /** boop */
      method(args: {
        a: number,
        b: number
      }): void;
    `

    expect(extractTsDocCommentsFromString(input)).toEqual([
      {
        signature: 'method(args: { a: number, b: number }): void',
        comment: '/** boop */',
      },
    ])
  })

  it('handles signatures with union types and semicolon at the end', () => {
    const input = `
      /** boop */
      between(min: number | bigint, max: number | bigint): never;
    `

    expect(extractTsDocCommentsFromString(input)).toEqual([
      {
        signature: 'between(min: number | bigint, max: number | bigint): never',
        comment: '/** boop */',
      },
    ])
  })

  it('handles multiline signatures with union types and generics', () => {
    const input = `
      /** boop */
      toHaveLength(
        this: Validators<string | any[] | { length: number }>,
        length: number,
      ): void;
    `

    expect(extractTsDocCommentsFromString(input)).toEqual([
      {
        signature:
          'toHaveLength(this: Validators<string | any[] | { length: number }>, length: number): void',
        comment: '/** boop */',
      },
    ])
  })
})
