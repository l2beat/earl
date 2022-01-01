import { FormatOptions } from './FormatOptions'

export function formatNumber(value: number, sibling: unknown, options: FormatOptions) {
  if (Object.is(value, -0) && options.minusZero) {
    return '-0'
  } else if (Object.is(value, NaN)) {
    if (options.uniqueNaNs && Object.is(sibling, NaN)) {
      return 'NaN (different)'
    }
    return 'NaN'
  }
  return value.toString()
}
