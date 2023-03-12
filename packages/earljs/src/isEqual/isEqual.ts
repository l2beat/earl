import { DEFAULT_EQUALITY_OPTIONS } from './EqualityOptions'
import { isEqualUnknown } from './isEqualUnknown'

/**
 * Equality algorithm used by all functions that check deep equality.
 * Do not confuse with `isEqual` validator.
 * @see https://earljs.dev/advanced/equality-algorithm.html
 */
export function isEqual(
  value: unknown,
  other: unknown,
  options = DEFAULT_EQUALITY_OPTIONS,
) {
  return isEqualUnknown(value, [], other, [], options)
}
