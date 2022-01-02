import { Matcher } from '../matchers'
import { formatNumber } from './formatNumber'
import { formatObject } from './formatObject'
import { FormatOptions } from './FormatOptions'
import { formatSymbol } from './formatSymbol'

export function formatUnknown(
  value: unknown,
  sibling: unknown,
  options: FormatOptions,
  stack: unknown[],
): [number, string][] {
  if (typeof value === 'number') {
    return [[0, formatNumber(value, sibling, options)]]
  } else if (typeof value === 'bigint') {
    return [[0, `${value}n`]]
  } else if (typeof value === 'string') {
    return [[0, JSON.stringify(value)]]
  } else if (value === null || value === undefined || value === true || value === false) {
    return [[0, `${value}`]]
  } else if (typeof value === 'symbol') {
    return [[0, formatSymbol(value, sibling)]]
  }

  if (value instanceof Matcher) {
    if (value.check(sibling)) {
      return formatUnknown(sibling, null, options, [])
    } else {
      return [[0, `Matcher ${value.toString()}`]]
    }
  }

  const selfIndex = stack.indexOf(value)
  if (selfIndex !== -1) {
    const dots = '.'.repeat(stack.length - selfIndex)
    return [[0, `<Circular ${dots}>`]]
  }

  if (typeof value === 'function' || typeof value === 'object') {
    return formatObject(value, sibling, options, stack)
  }

  return [[0, `${value}`]]
}
