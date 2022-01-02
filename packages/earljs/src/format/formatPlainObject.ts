import { getKeys, ObjectType } from '../isEqual/objectUtils'
import { FormatOptions } from './FormatOptions'
import { formatProperties } from './formatProperties'

export function formatPlainObject(
  type: ObjectType,
  value: object,
  sibling: unknown,
  options: FormatOptions,
  stack: unknown[],
): [number, string][] {
  const keys = getKeys(value, type)
  if (keys.length === 0) {
    return [[0, '{}']]
  }
  stack.push(value)
  const entries = formatProperties(keys, value, sibling, options, stack)
  stack.pop()

  if (options.inline) {
    return [[0, `{ ${entries.map((x) => x[1]).join(', ')} }`]]
  } else {
    entries.unshift([0, '{'])
    entries.push([0, '}'])
    return entries
  }
}
