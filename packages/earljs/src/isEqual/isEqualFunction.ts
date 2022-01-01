import { EqualityOptions } from './EqualityOptions'

export function isEqualFunction(value: Function, other: Function, options: EqualityOptions) {
  if (options.looseFunctionCompare) {
    return value.toString() === other.toString()
  } else {
    return value === other
  }
}
