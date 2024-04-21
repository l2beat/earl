import type { EqualityOptions } from './EqualityOptions.js'

export function isEqualNumber(
  value: number,
  other: number,
  options: EqualityOptions,
) {
  if (Number.isNaN(value)) {
    return options.uniqueNaNs ? false : Number.isNaN(other)
  }
  if (value === 0) {
    return options.minusZero ? Object.is(value, other) : other === 0
  }
  return value === other
}
