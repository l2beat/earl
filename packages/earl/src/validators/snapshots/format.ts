import {
  DEFAULT_FORMAT_OPTIONS,
  type FormatOptions,
} from '../../format/FormatOptions.js'
import { MULTILINE_DELIMITER } from '../../format/formatStringBlock.js'

export const SNAPSHOT_FORMAT_OPTIONS: FormatOptions = {
  ...DEFAULT_FORMAT_OPTIONS,
  splitMultilineStrings: true,
}

export function formatSnapshot(snapshot: Record<string, string>) {
  return Object.entries(snapshot)
    .map(([name, value]) => `// ${name}\n\n${value}\n`)
    .join('\n')
}

export function parseSnapshot(snapshot: string) {
  const result: Record<string, string> = {}
  let name: string | undefined
  let value = ''
  let isMultilineBlock = false

  for (const line of snapshot.split('\n')) {
    if (line.startsWith('// ') && !isMultilineBlock) {
      if (name) {
        result[name] = value.slice(1, -2)
      }
      name = line.slice(3)
      value = ''
    } else {
      if (line === MULTILINE_DELIMITER) {
        isMultilineBlock = !isMultilineBlock
      }

      value += `${line}\n`
    }
  }
  if (name) {
    result[name] = value.slice(1, -2)
  }
  return result
}
