import { expect } from '@earljs/published'

import { MethodComment } from '../types'
import { parseTsDocComment } from './parse'

export const sampleMethodComment: MethodComment = {
  signature: 'someMethod(x: number, y: number): void',
  comment: `/**
  * Returns the average of two numbers.
  *
  * Some other note
  * 
  * @param x - The first input number.
  * @param y - The second input number.
  * 
  * @example
  * Random example
  * \`\`\`ts
  * someMethod(1, 2)
  * \`\`\`
  *
  */`,
}

describe('parseTsDocComment', () => {
  it('parses a comment with params and examples', () => {
    const result = parseTsDocComment(sampleMethodComment)

    expect(result).toEqual({
      signature: 'someMethod(x: number, y: number): void',
      abbreviatedSignature: 'someMethod(x: number, y: number)',
      description: 'Returns the average of two numbers.\n\nSome other note',
      params: [
        { name: 'x', description: 'The first input number.' },
        { name: 'y', description: 'The second input number.' },
      ],
      examples: [
        `Random example
\`\`\`ts
someMethod(1, 2)
\`\`\``,
      ],
    })
  })

  it('abbreviates exported function signature', () => {
    const actual = parseTsDocComment({
      signature:
        'export declare function mockFn<F extends (...args: any) => any>(defaultImpl?: F): Mock.Of<F>',
      comment: '/** */',
    })

    expect(actual.abbreviatedSignature).toEqual(
      'function mockFn<F extends (...args: any) => any>(defaultImpl?: F)',
    )
  })

  it('successfuly parses trailing slashes representing newlines', () => {
    const actual = parseTsDocComment({
      ...sampleMethodComment,
      comment: `/**
        First line \\
        Second line 
      */`,
    })

    expect(actual.description.trim()).toEqual(
      `
        First line
        Second line
      `.trim(),
    )
  })

  it('errors when param description doesnt end with dot', async () => {
    expect(() =>
      parseTsDocComment({
        signature: 'test(x: number): void',
        comment: `/**
  * Returns the average of two numbers.
  * 
  * @param x - The first input number
  */`,
      }),
    ).toThrow(
      `Param description for "x" of "test(x: number): void" doesn't end with a dot (".")!`,
    )
  })

  it('errors when param name is not part of signature', async () => {
    expect(() =>
      parseTsDocComment({
        signature: 'test(x: number): void',
        comment: `/**
  * Returns the average of two numbers.
  * 
  * @param a - The first input number.
  */`,
      }),
    ).toThrow('Param "a" is not part of signature "test(x: number): void"!')
  })
})
