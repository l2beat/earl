import { ObjectType } from '../isEqual/objectUtils'
import { FormatOptions } from './FormatOptions'
import { formatWithObject } from './formatWithObject'
import { getTypeName } from './getTypeName'

export function formatPrimitiveInstance(
  type: ObjectType,
  value: object,
  sibling: unknown,
  options: FormatOptions,
  stack: unknown[],
): [number, string][] {
  const typeName = options.ignorePrototypes ? type : getTypeName(value, sibling)
  const formatted = `${typeName} ${JSON.stringify(value)}`
  return formatWithObject(type, formatted, value, sibling, options, stack)
}
