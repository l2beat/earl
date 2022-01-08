import { FormatOptions } from './FormatOptions'
import { formatWithObject } from './formatWithObject'
import { getTypeName } from './getTypeName'

export function formatDate(
  value: Date,
  sibling: unknown,
  options: FormatOptions,
  valueStack: unknown[],
  siblingStack: unknown[],
) {
  const typeName = options.ignorePrototypes ? 'Date' : getTypeName(value, sibling)
  const formatted = `${typeName} ${value.toISOString()}`
  return formatWithObject('Date', formatted, value, sibling, options, valueStack, siblingStack)
}
