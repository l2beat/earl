import { formatArray } from './formatArray'
import { FormatOptions } from './FormatOptions'
import { formatPlainObject } from './formatPlainObject'

export function formatObject(
  value: object,
  sibling: unknown,
  options: FormatOptions,
  stack: unknown[],
): [number, string][] {
  if (Array.isArray(value)) {
    return formatArray(value, sibling, options, stack)
  }
  return formatPlainObject(value, sibling, options, stack)
}
