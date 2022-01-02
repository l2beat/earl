import { FormatOptions } from './FormatOptions'
import { formatPlainObject } from './formatPlainObject'

export function formatWithObject(
  formatted: string,
  value: object,
  sibling: unknown,
  options: FormatOptions,
  stack: unknown[],
): [number, string][] {
  const object = formatPlainObject(value, sibling, options, stack)
  if (object[0][1] === '{}') {
    return [[0, formatted]]
  } else {
    object[0][1] = `${formatted} & ${object[0][1]}`
    return object
  }
}
