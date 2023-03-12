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
    between(min: number, max: number): number
  }
}

registerMatcher('between', between)

export function between(min: number, max: number) {
  return (value: unknown) =>
    typeof value === 'number' && value >= min && value < max
}
