import { formatNumber } from './formatNumber'
import { FormatOptions } from './FormatOptions'

export function format(value: unknown, sibling: unknown, options: FormatOptions): string {
  if (typeof value === 'number') {
    return formatNumber(value, sibling, options)
  }
  return '' + value
}
