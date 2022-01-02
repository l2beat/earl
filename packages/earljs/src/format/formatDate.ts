import { FormatOptions } from '.'
import { formatWithObject } from './formatWithObject'

export function formatDate(value: Date, sibling: unknown, options: FormatOptions, stack: unknown[]) {
  const formatted = `Date(${value.toISOString()})`
  return formatWithObject('Date', formatted, value, sibling, options, stack)
}
