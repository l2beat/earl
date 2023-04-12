import { registerMatcher } from '../../expect.js'

declare module '../../expect.js' {
  interface Matchers {
    /**
     * Matches numbers that are greater than the given target.
     *
     * Works for both numbers and bigints.
     *
     * If you want to match a top level value, use
     * `expect(...).toBeGreaterThan(target)` instead.
     *
     * @param target - The target value to compare to.
     *
     * @example
     * ```ts
     * expect({
     *   salary: 100_000,
     *   bonus: 10_000,
     * }).toEqual({
     *   salary: expect.greaterThan(50_000),
     *   bonus: expect.greaterThan(5_000),
     * })
     * ```
     */
    greaterThan(target: number | bigint): never
  }
}

registerMatcher('greaterThan', greaterThan)

export function greaterThan(target: number | bigint) {
  return (value: unknown) =>
    (typeof value === 'number' || typeof value === 'bigint') && value > target
}
