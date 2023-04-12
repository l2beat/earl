import { registerMatcher } from '../../expect.js'

declare module '../../expect.js' {
  interface Matchers {
    /**
     * Matches numbers that are less than or equal to the given target.
     *
     * Works for both numbers and bigints.
     *
     * If you want to match a top level value, use
     * `expect(...).toBeLessThanOrEqual(target)` instead.
     *
     * @param target - The target value to compare to.
     *
     * @example
     * ```ts
     * expect({
     *   salary: 100_000,
     *   bonus: 20_000,
     * }).toEqual({
     *   salary: expect.lessThanOrEqual(200_000),
     *   bonus: expect.lessThanOrEqual(20_000),
     * })
     * ```
     */
    lessThanOrEqual(target: number | bigint): never
  }
}

registerMatcher('lessThanOrEqual', lessThanOrEqual)

export function lessThanOrEqual(target: number | bigint) {
  return (value: unknown) =>
    (typeof value === 'number' || typeof value === 'bigint') && value <= target
}
