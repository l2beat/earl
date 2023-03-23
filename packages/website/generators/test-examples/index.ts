import FastGlob from 'fast-glob'
import { readFileSync, writeFileSync } from 'fs'
import { basename, join } from 'path'

import { generateTestFile } from './generate'
import { Example } from './types'

export async function main() {
  console.log('Generating test examples from tsdocs...')
  const filePaths = await FastGlob('src/**/*.ts', {
    absolute: true,
    cwd: join(__dirname, '../../../earljs'),
    ignore: [
      '**/*.test.ts',
      '**/*/toMatchSnapshot.ts', // ignore because example uses uvu and mocha
    ],
  })
  const files = filePaths.map((filePath) => ({
    name: basename(filePath, '.ts'),
    source: readFileSync(filePath, 'utf-8'),
  }))

  const examples: Example[] = files
    .flatMap((file) => {
      const examples = extractExamples(file.source)
      return examples.map((example, index) => ({
        name: `${file.name}${examples.length > 1 ? index + 1 : ''}`,
        source: example,
      }))
    })
    .filter((example): example is Example => !!example.source)
  console.log(
    `Found ${examples.length} examples across ${filePaths.length} source files`,
  )

  const testFile = generateTestFile(examples)

  writeFileSync(join(__dirname, './output/examples.test.ts'), testFile)
}

// extract multiple examples from a single file
function extractExamples(source: string): string[] {
  const sourceLines = source.split('\n')

  const exampleStartIndex = sourceLines.findIndex((line) =>
    line.includes('* @example'),
  )
  if (exampleStartIndex === -1) {
    return []
  }

  const exampleEndIndex = sourceLines.findIndex(
    (line, i) => i > exampleStartIndex + 1 && line.includes('* ```'),
  )

  let example = sourceLines
    .slice(exampleStartIndex + 2, exampleEndIndex)
    .map((line) => line.replace(/^\s*\*\s*/, '').trim())
    .filter((line) => !line.startsWith('import'))
    .join('\n')

  if (example.includes('@ts-expect-error')) {
    throw new Error(
      `Example contains "@ts-expect-error". Due to a bug in tsdoc it will break the formatting. Please replace it with // type-error: ...`,
    )
  }
  example = example.replace(/type-error/g, '@ts-expect-error')

  return [
    example,
    ...extractExamples(sourceLines.slice(exampleEndIndex + 1).join('\n')),
  ]
}

main().catch((e) => {
  console.error('Error occured: ', e)
  process.exit(1)
})
