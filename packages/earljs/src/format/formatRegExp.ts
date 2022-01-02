import { FormatOptions } from '.'
import { formatWithObject } from './formatWithObject'

export function formatRegExp(value: RegExp, sibling: unknown, options: FormatOptions, stack: unknown[]) {
  const formatted = value.toString()
  return formatWithObject(formatted, value, sibling, options, stack)
}
