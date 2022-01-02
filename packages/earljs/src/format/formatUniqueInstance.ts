import { getType, ObjectType } from '../isEqual/objectUtils'

export function formatUniqueInstance(type: ObjectType, value: object, sibling: unknown): [number, string][] {
  if (typeof sibling === 'object' && sibling !== null && value !== sibling && getType(sibling) === type) {
    return [[0, `${type} (different)`]]
  }
  return [[0, type]]
}
