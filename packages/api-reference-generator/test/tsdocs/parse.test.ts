import { expect } from 'earljs'

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
