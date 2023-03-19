import { registerMatcher } from '../../expect'

declare module '../../expect' {
  interface Matchers {
    /**
     * Matches numbers that are between the two numbers.
     * The range is [min, max) (right-exclusive).
     *
     * Works for both numbers and bigints.
     *
     * @param min - minimum value (inclusive)
     * @param max - maximum value (exclusive)
     */
    between(min: number | bigint, max: number | bigint): never
  }
}

registerMatcher('between', between)

export function between(min: number | bigint, max: number | bigint) {
  const [realMin, realMax] = min < max ? [min, max] : [max, min]

  return (value: unknown) =>
    (typeof value === 'number' || typeof value === 'bigint') &&
    value >= realMin &&
    value < realMax
}
