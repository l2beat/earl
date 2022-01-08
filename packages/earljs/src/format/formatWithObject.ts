import { ObjectType } from '../isEqual/objectUtils'
import { FormatOptions } from './FormatOptions'
import { formatPlainObject } from './formatPlainObject'

export function formatWithObject(
  type: ObjectType,
  formatted: string,
  value: object,
  sibling: unknown,
  options: FormatOptions,
  valueStack: unknown[],
  siblingStack: unknown[],
): [number, string][] {
  const object = formatPlainObject(type, value, sibling, options, valueStack, siblingStack)
  if (object[0][1] === '{}') {
    return [[0, formatted]]
  } else {
    object[0][1] = `${formatted} & ${object[0][1]}`
    return object
  }
}
