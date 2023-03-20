import { expect } from 'chai'
import { readFileSync } from 'fs'

import { MochaTestContext } from '../validators/snapshots/TestContext'

export function hasTestedExample(context: MochaTestContext) {
  const testFile = context.test?.file
  if (!testFile) {
    throw new Error('Cannot determine test file')
  }

  const sourceFile = testFile.replace('.test.ts', '.ts')

  const testContents = readFileSync(testFile, 'utf8')
  const sourceContents = readFileSync(sourceFile, 'utf8')

  const sourceLines = sourceContents.split('\n')
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

  const flattenedTest = testContents
    .split('\n')
    .map((line) => line.trim())
    .join('\n')

  expect(flattenedTest.includes(example), 'Test file does not contain example')
    .to.be.true
}
