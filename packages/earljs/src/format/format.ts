import { formatNumber } from './formatNumber'
import { FormatOptions } from './FormatOptions'
import { formatSymbol } from './formatSymbol'

export function format(value: unknown, sibling: unknown, options: FormatOptions): string {
  if (typeof value === 'number') {
    return formatNumber(value, sibling, options)
  } else if (typeof value === 'symbol') {
    return formatSymbol(value, sibling, options)
  }
  return `${value}`
}
