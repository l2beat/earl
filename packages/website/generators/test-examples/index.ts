import FastGlob from 'fast-glob'
import { readFileSync, writeFileSync } from 'fs'
import { basename, join } from 'path'

import { generateTestFile } from './generate'
import { Example } from './types'

export async function main() {
  console.log('Generating test examples from tsdocs...')
  const filePaths = await FastGlob('src/matchers/basic/*.ts', {
    absolute: true,
    cwd: join(__dirname, '../../../earljs'),
    ignore: ['**/*.test.ts'],
  })
  console.log('Found files: ', filePaths.length)
  const files = filePaths.map((filePath) => ({
    name: basename(filePath, '.ts'),
    source: readFileSync(filePath, 'utf-8'),
  }))

  const examples: Example[] = files.map((file) => ({
    name: file.name,
    source: extractExample(file.source),
  }))

  const testFile = generateTestFile(examples)

  // console.log(testFile)
  writeFileSync(join(__dirname, './output.ts'), testFile)
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

main().catch((e) => {
  console.error('Error occured: ', e)
  process.exit(1)
})
