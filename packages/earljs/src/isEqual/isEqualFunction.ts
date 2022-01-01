import { EqualityOptions } from './EqualityOptions'
import { isEqualObject } from './isEqualObject'

export function isEqualFunction(value: Function, other: Function, options: EqualityOptions) {
  if (options.looseFunctionCompare) {
    return value.toString() === other.toString() && isEqualObject(value, other, options)
  } else {
    return value === other
  }
}
