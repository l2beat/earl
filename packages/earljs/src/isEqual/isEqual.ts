import { EqualityOptions } from './EqualityOptions'
import { isEqualUnknown } from './isEqualUnknown'

export function isEqual(value: unknown, other: unknown, options: EqualityOptions) {
  return isEqualUnknown(value, [], other, [], options)
}
