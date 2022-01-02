import { FormatOptions } from './FormatOptions'
import { formatUnknown } from './formatUnknown'

export function format(value: unknown, sibling: unknown, options: FormatOptions): string {
  const lines = formatUnknown(value, sibling, options, [])
  return lines.map(([n, str]) => ' '.repeat(n * options.indentSize) + str).join('\n')
}
