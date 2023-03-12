import { registerMatcher } from '../expect'

declare module '../expect' {
  interface Matchers {
    /**
     * Matches numbers that are close to the target value.
     * The range is [expected - delta, expected + delta] (inclusive).
     *
     * @param expected - number to aim for
     * @param delta - maximum difference between the values
     */
    closeTo(expected: number, delta: number): number
  }
}

registerMatcher('closeTo', closeTo)

export function closeTo(expected: number, delta: number) {
  const min = expected - delta
  const max = expected + delta
  return (value: unknown) =>
    typeof value === 'number' && value >= min && value <= max
}
