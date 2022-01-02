import { FormatOptions } from './FormatOptions'
import { formatProperties } from './formatProperties'

export function formatPlainObject(
  value: object,
  sibling: unknown,
  options: FormatOptions,
  stack: unknown[],
): [number, string][] {
  const keys = Object.keys(value).sort()
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
