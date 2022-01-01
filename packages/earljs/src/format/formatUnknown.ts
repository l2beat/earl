import { formatFunction } from './formatFunction'
import { formatNumber } from './formatNumber'
import { formatObject } from './formatObject'
import { FormatOptions } from './FormatOptions'
import { formatSymbol } from './formatSymbol'

export function formatUnknown(value: unknown, sibling: unknown, options: FormatOptions): [number, string][] {
  if (typeof value === 'number') {
    return [[0, formatNumber(value, sibling, options)]]
  } else if (typeof value === 'symbol') {
    return [[0, formatSymbol(value, sibling, options)]]
  } else if (typeof value === 'string') {
    return [[0, JSON.stringify(value)]]
  } else if (typeof value === 'bigint') {
    return [[0, `${value}n`]]
  } else if (typeof value === 'function') {
    return [[0, formatFunction(value, sibling, options)]]
  } else if (typeof value === 'object' && value !== null) {
    return formatObject(value, sibling, options)
  }
  return [[0, `${value}`]]
}
