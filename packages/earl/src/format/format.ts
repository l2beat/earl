import { DEFAULT_FORMAT_OPTIONS } from './FormatOptions.js'
import { formatUnknown } from './formatUnknown.js'

export function format(
  value: unknown,
  sibling: unknown,
  options = DEFAULT_FORMAT_OPTIONS,
): string {
  const lines = formatUnknown(value, sibling, options, [], [])
  return lines
    .map(([n, str]) => ' '.repeat(n * options.indentSize) + str)
    .join('\n')
}
