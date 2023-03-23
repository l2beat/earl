import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

export async function main() {
  const file = join(__dirname, '../../../earljs/src/matchers/basic/a.ts')
  const outputFile = join(__dirname, './output.ts')

  const source = readFileSync(file, 'utf-8')
  const example = extractExample(source)

  const testFile = generateTestFile('a', example)

  console.log(testFile)
  writeFileSync(outputFile, testFile)
}

function extractExample(source: string): string {
  const sourceLines = source.split('\n')

  const exampleStartIndex = sourceLines.findIndex((line) =>
    line.includes('* @example'),
  )
  const exampleEndIndex = sourceLines.findIndex(
    (line, i) => i > exampleStartIndex + 1 && line.includes('* ```'),
  )

  const example = sourceLines
    .slice(exampleStartIndex + 2, exampleEndIndex)
    .map((line) => line.replace(/^\s*\*\s*/, '').trim())
    .join('\n')

  return example
}

function generateTestFile(name: string, example: string): string {
  // cut off first few lines of preamble as they are comments
  const preamble = readFileSync(join(__dirname, './preamble.ts'), 'utf-8')
    .split('\n')
    .slice(2)
    .join('\n')

  return `
import { expect } from 'earljs'

describe('Examples from tsdocs', () => {

  ${preamble}

  describe('${name}', () => {
    it('should work', () => {
      ${example}
    })
  })
})
  `
}

main().catch((e) => {
  console.error('Error occured: ', e)
  process.exit(1)
})
