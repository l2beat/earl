import { registerMatcher } from '../expect'
import { isEqual } from '../isEqual'

declare module '../expect' {
  interface Matchers {
    /**
     * Matches an array containing an exact number of items.
     *
     * @example
     * ```ts
     * expect.arrayOfLength(3)
     * expect.arrayOfLength(expect.min(3))
     * ```
     *
     * @param length - expected array length. Can be a matcher.
     */
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
