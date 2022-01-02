import { getType, ObjectType } from '../isEqual/objectUtils'
import { FormatOptions } from './FormatOptions'
import { getTypeName } from './getTypeName'

export function formatUniqueInstance(
  type: ObjectType,
  value: object,
  sibling: unknown,
  options: FormatOptions,
): [number, string][] {
  let typeName = options.ignorePrototypes ? type : getTypeName(value, undefined)
  if (typeof sibling === 'object' && sibling !== null && value !== sibling) {
    const siblingType = options.ignorePrototypes ? getType(sibling) : getTypeName(sibling, undefined)
    if (typeName === siblingType) {
      typeName += ' (different)'
    }
  }
  return [[0, typeName]]
}