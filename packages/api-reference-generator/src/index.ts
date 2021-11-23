/* eslint-disable no-console */
import glob from 'fast-glob'
import * as fs from 'fs'
import { resolve } from 'path'
import { promisify } from 'util'

const writeFile = promisify(fs.writeFile)
const readFile = promisify(fs.readFile)

import { generateSectionReference } from './generate'

export interface GenerateApiReferenceOptions {
  out?: string
  basePath: string
  files: string[]
}

export async function generateApiReference(args: GenerateApiReferenceOptions): Promise<string> {
  const sections = args.files.map((file) => file.split(':') as [string, string])

  const contents = await Promise.all(
    sections.map(async ([sectionName, filePath]) => {
      const path = resolve(process.cwd(), args.basePath, filePath).replace(/\\/g, '/')
      const files = await glob(path)

      const sources = await Promise.all(files.map((file) => readFile(file, 'utf-8')))

      try {
        return generateSectionReference(sectionName, sources.join('\n\n'))
      } catch (err) {
        const msg = `Failed to generate section reference for ${sectionName} for path ${path}`
        console.error(msg, '\n\n', err)
        throw new Error(msg)
      }
    }),
  )

  const output =
    '## Synopsis' +
    '\n\n' +
    contents.map((section) => section.tableOfContents).join('\n\n') +
    '\n\n' +
    '## Reference' +
    '\n\n' +
    contents.map((section) => section.reference).join('\n\n')

  if (args.out) {
    await writeFile(args.out, output, 'utf-8')
    return ''
  } else {
    return output
  }
}
