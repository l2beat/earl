import { registerMatcher } from '../expect'
import { isEqual } from '../isEqual'

declare module '../expect' {
  interface Matchers {
    /**
     * Matches an array, string or any object with a `length` property that has the given length.
     *
     * @example
     * ```ts
     * expect.length(3)
     * expect.length(expect.min(3))
     * ```
     *
     * @param length - expected array length. Can be a matcher.
     */
    length(length: number): any
    // we can't any[] & string & { length: number } because of missing keys
  }
}

registerMatcher('length', length)

export function length(length: number) {
  return (value: unknown) => {
    const canCheck =
      (value != null && typeof value === 'object' && 'length' in value) ||
      typeof value === 'string'

    return canCheck && isEqual(value.length, length)
  }
}
