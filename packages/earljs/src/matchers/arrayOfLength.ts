import { registerMatcher } from '../expect'
import { isEqual } from '../isEqual'

declare module '../expect' {
  interface Matchers {
    arrayOfLength(length: number): any[]
  }
}

registerMatcher('arrayOfLength', arrayOfLength)

export function arrayOfLength(length: number) {
  return (value: unknown) => {
    if (!Array.isArray(value)) {
      return false
    }

    return isEqual(value.length, length)
  }
}
