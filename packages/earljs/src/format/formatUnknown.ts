import { Matcher } from '../matchers'
import { formatNumber } from './formatNumber'
import { formatObject } from './formatObject'
import { FormatOptions } from './FormatOptions'
import { formatSymbol } from './formatSymbol'

export function formatUnknown(
  value: unknown,
  sibling: unknown,
  options: FormatOptions,
  valueStack: unknown[],
  siblingStack: unknown[],
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
    if (!options.skipMatcherReplacement && value.check(sibling)) {
      return formatUnknown(sibling, null, options, siblingStack, [])
    } else {
      return [[0, `Matcher ${value.toString()}`]]
    }
  }

  const selfIndex = valueStack.indexOf(value)
  if (selfIndex !== -1) {
    const dots = '.'.repeat(valueStack.length - selfIndex)
    return [[0, `<Circular ${dots}>`]]
  }

  if (typeof value === 'function' || typeof value === 'object') {
    return formatObject(value, sibling, options, valueStack, siblingStack)
  }

  return [[0, `${value}`]]
}
