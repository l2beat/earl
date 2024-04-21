import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import type { Example } from './types'

export function generateTestFile(examples: Example[]): string {
  const preamble = readFileSync(
    join(__dirname, './chunks/preamble.ts'),
    'utf-8',
  )

  return `${preamble}
  
  import { expect, mockFn, mockObject } from 'earl'
  
  
  describe('Examples from tsdocs', () => {
  
  
    ${examples.map(generateExampleTest).join('\n\n')}
  })
    `
}

function generateExampleTest(example: Example) {
  return `
    describe('${example.name}', () => {
      it('works', async () => {
        ${example.source}
      })
    })`
}
