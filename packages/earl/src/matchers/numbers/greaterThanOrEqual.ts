import { registerMatcher } from '../../expect.js'

declare module '../../expect.js' {
  interface Matchers {
    /**
     * Matches numbers that are greater than or equal to the given target.
     *
     * Works for both numbers and bigints.
     *
     * If you want to match a top level value, use
     * `expect(...).toBeGreaterThanOrEqual(target)` instead.
     *
     * @param target - The target value to compare to.
     *
     * @example
     * ```ts
     * expect({
     *   salary: 100_000,
     *   bonus: 5_000,
     * }).toEqual({
     *   salary: expect.greaterThanOrEqual(50_000),
     *   bonus: expect.greaterThanOrEqual(5_000),
     * })
     * ```
     */
    greaterThanOrEqual(target: number | bigint): never
  }
}

registerMatcher('greaterThanOrEqual', greaterThanOrEqual)

export function greaterThanOrEqual(target: number | bigint) {
  return (value: unknown) =>
    (typeof value === 'number' || typeof value === 'bigint') && value >= target
}
