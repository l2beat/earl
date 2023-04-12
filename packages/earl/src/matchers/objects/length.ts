import { registerMatcher } from '../../expect.js'
import { isEqual } from '../../isEqual/index.js'

declare module '../../expect.js' {
  interface Matchers {
    /**
     * Matches an array, string or any object with a `length` property that has
     * the given length.
     *
     * If you want to match a top level value, use
     * `expect(...).toHaveLength(length)` instead.
     *
     * @param length - The expected length. Can be a matcher.
     *
     * @example
     * ```ts
     * expect({
     *   numbers: [1, 2, 3],
     *   letters: 'abcdef',
     * }).toEqual({
     *   numbers: expect.length(3),
     *   letters: expect.length(expect.greaterThan(3)),
     * })
     * ```
     */
    length(length: number): never
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
