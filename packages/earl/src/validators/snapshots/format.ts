import {
  DEFAULT_FORMAT_OPTIONS,
  type FormatOptions,
} from '../../format/FormatOptions.js'
import { formatStringBlock } from '../../format/formatUnknown.js'

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
  for (const line of snapshot.split('\n')) {
    if (line.startsWith('// ')) {
      if (name) {
        result[name] = value.slice(1, -2)
      }
      name = line.slice(3)
      value = ''
    } else {
      value += `${normalizeLine(line)}\n`
    }
  }
  if (name) {
    result[name] = value.slice(1, -2)
  }
  return result
}

// converts legacy multiline string content to new multiline format
function normalizeLine(line: string): string {
  const legacyContent = getLegacyStringContent(line)
  if (!legacyContent) {
    return line
  }
  const stringBlock = formatStringBlock({
    value: legacyContent.content.replaceAll('\\n', '\n'),
    options: SNAPSHOT_FORMAT_OPTIONS,
    isChild: false,
  })
  const intent = line.length - line.trimStart().length
  const multilineString = stringBlock
    .map(([_, str]) => ' '.repeat(intent) + str)
    .join('\n')

  const beginningContent =
    legacyContent.before.trim().length > 0 ? `${legacyContent.before}\n` : ''

  return `${beginningContent}${multilineString}`
}

function getLegacyStringContent(line: string) {
  const match = line.match(/(.*)"((?:[^"\\]|\\.)*)"/)
  if (!line.includes('\\n') || !match) {
    return undefined
  }

  return {
    before: match[1] ?? '',
    content: match[2] ?? '',
  }
}
