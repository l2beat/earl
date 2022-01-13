import { DEFAULT_EQUALITY_OPTIONS } from './EqualityOptions'
import { isEqualUnknown } from './isEqualUnknown'

/**
 * Extensible equality algorithm used by all functions that check deep equality.
 * @internal
 *   Not exported itself, but it's exposed through validators. \
 *   Do not confuse with `isEqual` validator.
 * @see https://earljs.dev/docs/advanced/equality-algorithm
 */
export function isEqual(value: unknown, other: unknown, options = DEFAULT_EQUALITY_OPTIONS) {
  return isEqualUnknown(value, [], other, [], options)
}
