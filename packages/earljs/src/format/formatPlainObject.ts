import { CanonicalType, getKeys } from '../isEqual'
import { FormatOptions } from './FormatOptions'
import { formatProperties } from './formatProperties'
import { getTypeName } from './getTypeName'

export function formatPlainObject(
  type: CanonicalType,
  value: object,
  sibling: unknown,
  options: FormatOptions,
  valueStack: unknown[],
  siblingStack: unknown[],
): [number, string][] {
  const keys = getKeys(value, type, options)

  let opening = '{'
  if (!options.ignorePrototypes && (type === 'Object' || type === 'Error')) {
    const name = getTypeName(value, sibling)
    if (name !== 'Object') {
      opening = `${name} {`
    }
  } else if (options.ignorePrototypes && type === 'Error') {
    opening = 'Error {'
  }

  if (keys.length === 0) {
    return [[0, `${opening}}`]]
  }

  valueStack.push(value)
  siblingStack.push(sibling)
  const entries = formatProperties(keys, value, sibling, options, valueStack, siblingStack)
  valueStack.pop()
  siblingStack.pop()

  if (options.inline) {
    return [[0, `${opening} ${entries.map((x) => x[1]).join(', ')} }`]]
  } else {
    entries.unshift([0, opening])
    entries.push([0, '}'])
    return entries
  }
}
