import { EqualityOptions } from './EqualityOptions'
import { isEqualNumber } from './isEqualNumber'
import { isEqualObject } from './isEqualObject'

export function isEqual(value: unknown, other: unknown, options: EqualityOptions) {
  if (typeof value !== typeof other) {
    return false
  } else if (typeof value === 'number') {
    return isEqualNumber(value, other as number, options)
  } else if (typeof value === 'object' && value !== null) {
    return isEqualObject(value, other as object, options)
  }
  return value === other
}
