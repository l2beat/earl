import { registerMatcher } from '../expect'

declare module '../expect' {
  interface Matchers {
    /**
     * Matches numbers that are between the two numbers.
     * The range is [min, max) (right-exclusive).
     *
     * @param min - minimum value (inclusive)
     * @param max - maximum value (exclusive)
     */
    between(min: number | bigint, max: number | bigint): number
  }
}

registerMatcher('between', between)

export function between(min: number | bigint, max: number | bigint) {
  return (value: unknown) =>
    (typeof value === 'number' || typeof value === 'bigint') &&
    value >= min &&
    value < max
}
