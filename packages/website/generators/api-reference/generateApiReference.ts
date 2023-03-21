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

export async function generateApiReference(
  args: GenerateApiReferenceOptions,
): Promise<string> {
  const sections = args.files.map(
    (file) => file.split(':') as [string, string, string],
  )

  const contents = await Promise.all(
    sections.map(async ([sectionName, prefix, filePaths]) => {
      const patterns = filePaths.split(',')

      const files = await glob(
        patterns.map((pattern) =>
          resolve(process.cwd(), args.basePath, pattern).replace(/\\/g, '/'),
        ),
      )

      const sources = await Promise.all(
        files.map((file) => readFile(file, 'utf-8')),
      )

      if (sources.length === 0) {
        throw new Error(
          `No API definition found for ${sectionName}. Are u sure you've built the 'earl' project?`,
        )
      }

      try {
        return generateSectionReference(
          sectionName,
          prefix,
          sources.join('\n\n'),
        )
      } catch (err) {
        const msg = `Failed to generate section reference for ${sectionName} for paths ${filePaths}`
        console.error(msg, '\n\n', err)
        throw new Error(msg)
      }
    }),
  )

  const output = contents.map((section) => section.reference).join('\n\n')

  if (args.out) {
    await writeFile(args.out, output, 'utf-8')
    return ''
  } else {
    return output
  }
}
