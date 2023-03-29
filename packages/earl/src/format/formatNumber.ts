import { FormatOptions } from './FormatOptions'
import { toLine } from './toLine'

export function formatNumber(
  value: number,
  sibling: unknown,
  options: FormatOptions,
) {
  if (Object.is(value, -0) && options.minusZero) {
    return toLine('-0')
  } else if (Object.is(value, NaN)) {
    if (options.uniqueNaNs && Object.is(sibling, NaN)) {
      return toLine('NaN (different)')
    }
    return toLine('NaN')
  }
  return toLine(value.toString())
}
