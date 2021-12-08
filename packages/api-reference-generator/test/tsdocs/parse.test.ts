import { expect } from '@earljs/published'

import { parseTsDocComment } from '../../src/tsdocs/parse'
import { MethodComment } from '../../src/types'

export const sampleMethodComment: MethodComment = {
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

describe('parseTsDocComment', () => {
  it('parses a comment with params and examples', () => {
    const result = parseTsDocComment(sampleMethodComment)

    expect(result).toEqual({
      signature: 'someMethod(x: number, y: number): void',
      abbreviatedSignature: 'someMethod(x: number, y: number)',
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

  it('abbreviates exported function signature', () => {
    const actual = parseTsDocComment({
      signature: 'export declare function mockFn<F extends (...args: any) => any>(defaultImpl?: F): Mock.Of<F>',
      comment: '/** */',
    })

    expect(actual.abbreviatedSignature).toEqual('function mockFn<F extends (...args: any) => any>(defaultImpl?: F)')
  })
})
