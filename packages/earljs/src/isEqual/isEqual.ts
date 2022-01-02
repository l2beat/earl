import { DEFAULT_EQUALITY_OPTIONS } from './EqualityOptions'
import { isEqualUnknown } from './isEqualUnknown'

export function isEqual(value: unknown, other: unknown, options = DEFAULT_EQUALITY_OPTIONS) {
  return isEqualUnknown(value, [], other, [], options)
}
