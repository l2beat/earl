import type { FormatOptions } from './FormatOptions.js'
import { formatString } from './formatString.js'
import { toLine } from './toLine.js'

export function formatStringBlock({
  value,
  options,
  valueStack,
}: {
  value: string
  options: FormatOptions
  valueStack: unknown[]
}): [number, string][] {
  if (!options.splitMultilineStrings || !value.includes('\n')) {
    return toLine(formatString(value, options))
  }

  const lines: [number, string][] = value.split('\n').map((line) => [0, line])
  const blocks: [number, string][] = [[0, '"""'], ...lines, [0, '"""']]

  const withNewLine = shouldIncludeNewLine(valueStack)

  return withNewLine ? [[0, ''], ...blocks] : blocks
}

function shouldIncludeNewLine(valueStack: unknown[]): boolean {
  if (valueStack.length < 1) {
    return false
  }

  const parent = valueStack[valueStack.length - 1]
  return (
    !!parent &&
    typeof parent === 'object' &&
    !Array.isArray(parent) &&
    !(parent instanceof Set)
  )
}
