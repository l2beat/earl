import { registerMatcher } from '../../expect.js'

declare module '../../expect.js' {
  interface Matchers {
    /**
     * Matches numbers that are close to the target value. The range is
     * `[target - delta, target + delta]`, inclusive on both sides.
     *
     * Works only for numbers and not for bigints.
     *
     * If you want to match a top level value, use
     * `expect(...).toBeCloseTo(target, delta)` instead.
     *
     * @param target - The number to aim for.
     * @param delta - The maximum difference between the values.
     *
     * @example
     * ```ts
     * const vector = getApproximateStrikeTarget()
     * expect(vector).toEqual({
     *   x: expect.closeTo(420, 0.001),
     *   y: expect.closeTo(69, 0.001),
     * })
     * ```
     */
    closeTo(target: number, delta: number): never
  }
}

registerMatcher('closeTo', closeTo)

export function closeTo(target: number, delta: number) {
  const min = target - delta
  const max = target + delta
  return (value: unknown) =>
    typeof value === 'number' && value >= min && value <= max
}
