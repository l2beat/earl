import { ObjectType } from '../isEqual/objectUtils'
import { FormatOptions } from './FormatOptions'
import { formatWithObject } from './formatWithObject'

export function formatPrimitiveInstance(
  type: ObjectType,
  value: object,
  sibling: unknown,
  options: FormatOptions,
  stack: unknown[],
): [number, string][] {
  const formatted = `${type}(${JSON.stringify(value)})`
  return formatWithObject(type, formatted, value, sibling, options, stack)
}
