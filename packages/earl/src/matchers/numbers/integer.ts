import { registerMatcher } from '../../expect.js'

declare module '../../expect.js' {
  interface Matchers {
    /**
     * Matches numbers that are integers.
     *
     * Works for both numbers and bigints.
     *
     * If you want to match a top level value, use `expect(...).toBeAnInteger()`
     * instead.
     *
     * @example
     * ```ts
     * const counts = getParticleCounts()
     * expect(counts).toEqual({
     *   min: 0,
     *   max: expect.integer(),
     *   median: expect.integer(),
     * })
     * ```
     */
    integer(): never
  }
}

registerMatcher('integer', integer)

export function integer() {
  return (value: unknown) => {
    if (typeof value === 'number') {
      return Number.isInteger(value)
    } else if (typeof value === 'bigint') {
      return true
    }
    return false
  }
}
